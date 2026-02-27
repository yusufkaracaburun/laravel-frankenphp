<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Mollie\Laravel\Facades\Mollie;

/**
 * Payment controller stub for Mollie integration.
 * Extend with payment/subscription creation logic as needed.
 */
class PaymentController extends Controller
{
    public function createPayment(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user === null) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Example: Create a one-time payment
        // Replace with actual amount, description, and redirect URLs
        $payment = Mollie::api()->payments->create([
            'amount' => [
                'currency' => 'EUR',
                'value' => '10.00',
            ],
            'description' => 'Payment for user '.$user->id,
            'redirectUrl' => rtrim(env('FRONTEND_URL', config('app.url')), '/').'/payment/complete',
            'webhookUrl' => url(config('mollie.webhooks.path', '/webhooks/mollie')),
            'metadata' => [
                'user_id' => (string) $user->id,
            ],
        ]);

        return response()->json([
            'payment_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
        ]);
    }
}
