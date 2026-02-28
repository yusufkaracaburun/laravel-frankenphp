<?php

declare(strict_types=1);

namespace App\DTOs;

use App\Models\User;

final readonly class UserData extends DataTransferObject
{
    public function __construct(
        public string $name,
        public string $email,
        public ?string $password = null,
    ) {}

    public static function from(User $user): self
    {
        return new self(
            name: $user->name,
            email: $user->email,
        );
    }

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            email: $data['email'],
            password: $data['password'] ?? null,
        );
    }
}
