<?php

namespace App\Mcp\Prompts;

use Laravel\Mcp\Server\Prompt;
use Laravel\Mcp\Server\Prompts\Argument;
use Laravel\Mcp\Server\Prompts\Arguments;
use Laravel\Mcp\Server\Prompts\PromptResult;

class BugReportPrompt extends Prompt
{
    protected string $description = 'Guides the AI assistant to collect a high-quality bug report for this Laravel application.';

    /**
     * Get the prompt's arguments.
     */
    public function arguments(): Arguments
    {
        return (new Arguments)->add(
            new Argument(
                name: 'area',
                description: 'Optional area of the app where the bug occurs (e.g., authentication, billing, dashboard).',
                required: false,
            ),
        );
    }

    /**
     * Handle the prompt request.
     */
    public function handle(array $arguments): PromptResult
    {
        $area = $arguments['area'] ?? 'the application';

        $content = "You are helping a user file a clear, reproducible bug report for {$area} in this Laravel application.\n\n";
        $content .= <<<'MARKDOWN'
Please ask the user, step-by-step, for:

- A short summary of the bug
- Exact steps to reproduce (including URLs)
- What they expected to happen
- What actually happened (including full error messages)
- Environment details (browser, OS, etc.)
- Any relevant screenshots or logs

Then, compile their answers into a single, well-structured bug report.
MARKDOWN;

        return new PromptResult(
            content: $content,
            description: $this->description(),
        );
    }
}
