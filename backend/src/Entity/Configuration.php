<?php

namespace App\Entity;

use App\Repository\ConfigurationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConfigurationRepository::class)]
class Configuration
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, nullable: true)]
    private ?string $emailReplyTo = null;

    #[ORM\Column(length: 180, nullable: true)]
    private ?string $emailFrom = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $appName = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmailReplyTo(): ?string
    {
        return $this->emailReplyTo;
    }

    public function setEmailReplyTo(?string $emailReplyTo): static
    {
        $this->emailReplyTo = $emailReplyTo;

        return $this;
    }

    public function getEmailFrom(): ?string
    {
        return $this->emailFrom;
    }

    public function setEmailFrom(?string $emailFrom): static
    {
        $this->emailFrom = $emailFrom;

        return $this;
    }

    public function getAppName(): ?string
    {
        return $this->appName;
    }

    public function setAppName(?string $appName): static
    {
        $this->appName = $appName;

        return $this;
    }
}
