<?php

namespace App\Controller;

use App\Dto\User\RegisterUserDto;
use App\Entity\User;
use App\Enum\Role;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class SecurityController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route("/api/me", name: "api_me", methods: ["GET"])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(
                ["message" => "Not authenticated."],
                Response::HTTP_UNAUTHORIZED,
            );
        }

        return $this->json([
            "email" => $user->getUserIdentifier(),
            "roles" => $user->getRoles(),
        ]);
    }

    #[Route("/api/register", name: "api_register", methods: ["POST"])]
    public function register(
        #[MapRequestPayload] RegisterUserDto $registerUserDto,
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
    ): JsonResponse {
        $existingUser = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(["email" => $registerUserDto->email]);

        if ($existingUser) {
            return new JsonResponse(
                ["message" => "success"],
                Response::HTTP_OK,
            );
        }

        $user = new User();
        $user->setUsername($registerUserDto->username);
        $user->setEmail($registerUserDto->email);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $registerUserDto->password),
        );
        $user->setRoles([Role::RoleUser->value]);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(["message" => "success"], Response::HTTP_OK);
    }
}
