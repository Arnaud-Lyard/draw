<?php

namespace App\Dto\User;

use Symfony\Component\Validator\Constraints as Assert;

#[
    Assert\Expression(
        "this.password == this.confirmPassword",
        message: "The password and confirmation password do not match.",
    ),
]
class RegisterUserDto
{
    public function __construct(
        #[Assert\NotBlank] #[
            Assert\Length(min: 2, max: 255),
        ]
        public readonly string $username,
        public readonly string $password,
        public readonly string $confirmPassword,
        #[Assert\NotBlank] #[Assert\Email] public readonly string $email,
    ) {}
}
