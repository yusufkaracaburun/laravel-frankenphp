<?php

namespace App\Mcp\Resources;

use Illuminate\Support\Facades\File;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\MimeType;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Title;
use Laravel\Mcp\Server\Resource;

#[Name('project-readme')]
#[Title('Project README')]
#[Description('Exposes the project README.md so AI agents can understand the repository at a glance.')]
#[MimeType('text/markdown')]
class ReadmeResource extends Resource
{
    /**
     * Handle the resource request.
     */
    public function handle(Request $request): Response
    {
        $path = base_path('README.md');

        if (! File::exists($path)) {
            return Response::error('README.md not found in project root.');
        }

        return Response::text(File::get($path));
    }
}

