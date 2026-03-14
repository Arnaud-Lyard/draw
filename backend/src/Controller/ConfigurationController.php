<?php

namespace App\Controller;

use App\Entity\Configuration;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ConfigurationController extends AbstractController
{
    #[Route("/api/configuration", name: "api_configuration", methods: ["GET"])]
    public function getConfiguration(
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        $config = $entityManager
            ->getRepository(Configuration::class)
            ->findOneBy(["id" => 1]);

        if (!$config) {
            // Return defaults if no configuration exists
            return $this->json([
                "name" => null,
            ]);
        }

        return $this->json([
            "name" => $config->getAppName(),
        ]);
    }
}
