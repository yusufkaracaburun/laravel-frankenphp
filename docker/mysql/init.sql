-- MySQL initialization script for Laravel
-- Ensures default charset and collation for new databases
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Grant privileges for tenant databases (Tenancy for Laravel)
-- Laravel user needs CREATE for new tenant DBs and full access to tenant_* databases
GRANT CREATE ON *.* TO 'laravel'@'%';
GRANT ALL PRIVILEGES ON `tenant%`.* TO 'laravel'@'%';
GRANT ALL PRIVILEGES ON `laravel`.* TO 'laravel'@'%';
FLUSH PRIVILEGES;
