<?php

namespace App\Mcp\Prompts;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Title;
use Laravel\Mcp\Server\Prompt;
use Laravel\Mcp\Server\Prompts\Argument;

#[Name('bug-report')]
#[Title('Bug Report Helper')]
#[Description('Guides the AI assistant to collect a high-quality bug report for this Laravel application.')]
class BugReportPrompt extends Prompt
{
    /**
     * Get the prompt's arguments.
     *
     * @return array<int, \Laravel\Mcp\Server\Prompts\Argument>
     */
    public function arguments(): array
    {
        return [
            new Argument(
                name: 'area',
                description: 'Optional area of the app where the bug occurs (e.g., authentication, billing, dashboard).',
                required: false,
            ),
        ];
    }

    /**
     * Handle the prompt request.
     *
     * @return array<int, \Laravel\Mcp\Response>
     */
    public function handle(Request $request): array
    {
        $area = $request->string('area') ?: 'the application';

        $systemMessage = "You are helping a user file a clear, reproducible bug report for {$area} in this Laravel application.";

        $userMessage = <<<'MARKDOWN'
Please ask the user, step-by-step, for:

- A short summary of the bug
- Exact steps to reproduce (including URLs)
- What they expected to happen
- What actually happened (including full error messages)
- Environment details (browser, OS, etc.)
- Any relevant screenshots or logs

Then, compile their answers into a single, well-structured bug report.
MARKDOWN;

        return [
            Response::text($systemMessage)->asAssistant(),
            Response::text($userMessage),
        ];
    }
}

