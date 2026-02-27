<?php

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Foundation\Application;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Title;
use Laravel\Mcp\Server\Tools\Annotations\IsIdempotent;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Laravel\Mcp\Server\Tool;

#[Name('app-info')]
#[Title('Application Info')]
#[Description('Returns basic information about this Laravel application, including name, environment, and framework version.')]
#[IsReadOnly]
#[IsIdempotent]
class AppInfoTool extends Tool
{
    /**
     * Create a new tool instance.
     */
    public function __construct(
        protected Application $app,
    ) {
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\JsonSchema\Types\Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'include_env' => $schema->boolean()
                ->description('Whether to include the current APP_ENV value.')
                ->default(true),
        ];
    }

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $includeEnv = $request->boolean('include_env', true);

        $data = [
            'app_name' => config('app.name'),
            'laravel_version' => $this->app->version(),
        ];

        if ($includeEnv) {
            $data['environment'] = config('app.env');
        }

        return Response::structured($data);
    }
}

