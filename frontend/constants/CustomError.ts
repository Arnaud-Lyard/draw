export const ERROR_MESSAGES = {
  fr: {
    401: "Vous n'êtes pas autorisé à consulter cette page.",
    403: "Vous n'avez pas la permission d'effectuer cette action.",
    409: "La demande n'a pas pu être traitée en raison d'un conflit dans la demande.",
    422: "Le format de la requête est invalide.",
    429: "Veuillez patienter avant de renouveller votre demande.",
    500: "Une erreur interne du serveur est survenue. Veuillez réessayer plus tard.",
    GENERIC_ERROR: "Une erreur est survenue. Veuillez réessayer.",
    NETWORK_ERROR:
      "Erreur réseau, impossible de joindre le serveur. Veuillez vérifier votre connexion.",
  },
  en: {
    401: "You are not authorized to view this page.",
    403: "You do not have permission to perform this action.",
    409: "The request could not be processed due to a conflict in the request.",
    422: "The request format is invalid.",
    429: "Please wait before retrying your request.",
    500: "An internal server error occurred. Please try again later.",
    GENERIC_ERROR: "An error occurred. Please try again.",
    NETWORK_ERROR:
      "Network error, unable to reach the server. Please check your connection.",
  },
} as const;
