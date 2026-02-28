<?php

declare(strict_types=1);

namespace App\DTOs;

abstract readonly class DataTransferObject
{
    /**
     * Convert the DTO to an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $data = [];

        foreach (get_object_vars($this) as $key => $value) {
            if ($value instanceof \BackedEnum) {
                $data[$key] = $value->value;
            } elseif ($value instanceof self) {
                $data[$key] = $value->toArray();
            } elseif (is_array($value)) {
                $data[$key] = array_map(
                    fn ($item) => $item instanceof self ? $item->toArray() : $item,
                    $value
                );
            } else {
                $data[$key] = $value;
            }
        }

        return $data;
    }
}
