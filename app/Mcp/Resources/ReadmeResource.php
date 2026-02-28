<?php

namespace App\Mcp\Resources;

use Illuminate\Support\Facades\File;
use Laravel\Mcp\Server\Resource;

class ReadmeResource extends Resource
{
    protected string $description = 'Exposes the project README.md so AI agents can understand the repository at a glance.';

    /**
     * Read the resource content.
     */
    public function read(): string
    {
        $path = base_path('README.md');

        if (! File::exists($path)) {
            return 'README.md not found in project root.';
        }

        return File::get($path);
    }

    /**
     * Get the MIME type for the resource.
     */
    public function mimeType(): string
    {
        return 'text/markdown';
    }
}
