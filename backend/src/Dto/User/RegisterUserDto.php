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
        #[Assert\NotBlank(message: "Le mot de passe est obligatoire.")] #[
            Assert\Length(
                min: 8,
                minMessage: "Le mot de passe doit faire au moins {{ limit }} caractères.",
            ),
        ]
        #[
            Assert\Regex(
                pattern: "/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/",
                message: "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.",
            ),
        ]
        public readonly string $password,
        public readonly string $confirmPassword,
        #[Assert\NotBlank] #[Assert\Email] public readonly string $email,
    ) {}
}
