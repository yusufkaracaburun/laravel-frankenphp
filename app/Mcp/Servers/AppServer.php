<?php

namespace App\Mcp\Servers;

use App\Mcp\Prompts\BugReportPrompt;
use App\Mcp\Resources\ReadmeResource;
use App\Mcp\Tools\AppInfoTool;
use Laravel\Mcp\Server;
use Laravel\Mcp\Server\Attributes\Instructions;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Version;

#[Name('App Server')]
#[Version('1.0.0')]
#[Instructions('This server exposes basic tools and resources for inspecting this Laravel application, including app info, README contents, and a bug-report helper prompt.')]
class AppServer extends Server
{
    /**
     * The tools registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Tool>>
     */
    protected array $tools = [
        AppInfoTool::class,
    ];

    /**
     * The resources registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Resource>>
     */
    protected array $resources = [
        ReadmeResource::class,
    ];

    /**
     * The prompts registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Prompt>>
     */
    protected array $prompts = [
        BugReportPrompt::class,
    ];
}

