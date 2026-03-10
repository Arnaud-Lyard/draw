export const ERROR_MESSAGES = {
  401: "Vous n'êtes pas autorisé à consulter cette page.",
  403: "Vous n'avez pas la permission d'effectuer cette action.",
  409: "La demande n'a pas pu être traitée en raison d'un conflit dans la demande.",
  422: "Le format de la requête est invalide.",
  429: "Veuillez patienter avant de renouveller votre demande.",
  500: "Une erreur interne du serveur est survenue. Veuillez réessayer plus tard.",
  GENERIC_ERROR: "Une erreur est survenue. Veuillez réessayer.",
  NETWORK_ERROR:
    "Erreur réseau, impossible de joindre le serveur. Veuillez vérifier votre connexion.",
} as const;
