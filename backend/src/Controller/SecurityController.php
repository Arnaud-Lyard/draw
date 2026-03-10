<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

final class SecurityController extends AbstractController
{
    #[Route("/login", name: "login", methods: ["POST"])]
    public function login(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->json(
                [
                    "message" => "missing credentials",
                ],
                Response::HTTP_UNAUTHORIZED,
            );
        }
        $token = "token";
        return $this->json([
            "user" => $user->getUserIdentifier(),
            +"token" => $token,
        ]);
    }

    #[Route("/logout-redirect", name: "logout_redirect", methods: ["POST"])]
    public function logout(): Response {}
}
