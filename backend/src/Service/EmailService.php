<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\ConfigurationRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class EmailService
{
    private $mailer;
    private $logger;
    private $configurationRepository;

    public function __construct(
        MailerInterface $mailer,
        LoggerInterface $logger,
        ConfigurationRepository $configurationRepository,
    ) {
        $this->mailer = $mailer;
        $this->logger = $logger;
        $this->configurationRepository = $configurationRepository;
    }

    /**
     * @throws \RuntimeException If email configuration is missing
     * @throws TransportExceptionInterface If email sending fails
     */
    public function sendRegistrationEmail(
        User $user,
        string $locale,
    ): void {
        $config = $this->configurationRepository->findOneBy(["id" => 1]);
        if (
            !$config ||
            !$config->getEmailFrom() ||
            !$config->getEmailReplyTo()
        ) {
            $this->logger->error("Email configuration is missing (from/replyTo).");
            throw new \RuntimeException("Email configuration is missing (from/replyTo).");
        }

        $templatedEmail = (new TemplatedEmail())
            ->from($config->getEmailFrom())
            ->replyTo($config->getEmailReplyTo())
            ->to($user->getEmail())
            ->subject('email.registration.subject')
            ->htmlTemplate("emails/registration-confirmation.html.twig")
            ->context([
                "user" => $user,
                "locale" => $locale,
            ]);

        $this->mailer->send($templatedEmail);
    }
}
