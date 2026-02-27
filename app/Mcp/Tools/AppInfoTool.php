<?php

namespace App\Mcp\Tools;

use Illuminate\Foundation\Application;
use Laravel\Mcp\Server\Tool;
use Laravel\Mcp\Server\Tools\Annotations\IsIdempotent;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Laravel\Mcp\Server\Tools\ToolInputSchema;
use Laravel\Mcp\Server\Tools\ToolResult;

#[IsReadOnly]
#[IsIdempotent]
class AppInfoTool extends Tool
{
    /**
     * Create a new tool instance.
     */
    public function __construct(
        protected Application $app,
    ) {}

    /**
     * Get the description of the tool's purpose.
     */
    public function description(): string
    {
        return 'Returns basic information about this Laravel application, including name, environment, and framework version.';
    }

    /**
     * Get the tool's input schema.
     */
    public function schema(ToolInputSchema $schema): ToolInputSchema
    {
        return $schema->boolean('include_env')
            ->description('Whether to include the current APP_ENV value.')
            ->required(false);
    }

    /**
     * Handle the tool request.
     *
     * @param  array<string, mixed>  $arguments
     */
    public function handle(array $arguments): ToolResult
    {
        $includeEnv = $arguments['include_env'] ?? true;

        $data = [
            'app_name' => config('app.name'),
            'laravel_version' => $this->app->version(),
        ];

        if ($includeEnv) {
            $data['environment'] = config('app.env');
        }

        return ToolResult::json($data);
    }
}
