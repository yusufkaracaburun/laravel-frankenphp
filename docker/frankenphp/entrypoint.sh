#!/bin/bash
set -e

echo "🚀 Starting Laravel + FrankenPHP..."

if [ -n "$DB_HOST" ]; then
    echo "⏳ Waiting for MySQL at $DB_HOST:${DB_PORT:-3306}..."
    until php -r "
        try {
            \$pdo = new PDO(
                'mysql:host=${DB_HOST};port=${DB_PORT:-3306};dbname=${DB_DATABASE}',
                '${DB_USERNAME}',
                '${DB_PASSWORD}'
            );
            exit(0);
        } catch (Exception \$e) {
            exit(1);
        }
    " 2>/dev/null; do
        echo "   MySQL not ready, retrying in 2s..."
        sleep 2
    done
    echo "✅ MySQL is ready!"
fi

cd /app

# Run composer install when vendor is missing or when dev deps needed (APP_DEBUG)
if [ ! -f "vendor/autoload.php" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install --optimize-autoloader --no-interaction
elif [ "${APP_DEBUG:-false}" = "true" ]; then
    # Ensure dev deps (Debugbar, etc.) when debugging
    if [ ! -d "vendor/barryvdh/laravel-debugbar" ]; then
        echo "📦 Installing dev dependencies for debugging..."
        composer install --optimize-autoloader --no-interaction
    fi
fi

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
    php artisan key:generate --force
fi

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    php artisan migrate --force
fi

chown -R www-data:www-data /app/storage /app/bootstrap/cache
chmod -R 775 /app/storage /app/bootstrap/cache

echo "✅ Laravel setup complete. Starting server..."
exec "$@"
