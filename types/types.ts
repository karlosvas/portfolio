// Tipos de Typescript
export interface i18nTranslations {
  profile: {
    title: string;
    subtitle: string;
    name: string;
    presentation: {
      v1: string;
      v2: string;
    };
  };
  projects: {
    title: string;
    thefluentspanishhouse: {
      name: string;
      description: string;
    };
    "olimpiadas-informaticas": {
      name: string;
      description: string;
    };
    "elend-talk": {
      name: string;
      description: string;
    };
    "bytes-colaborativos": {
      name: string;
      description: string;
    };
  };
  experience: {
    title: string;
    description: string;
    technologies: string;
  };
  history: {
    title: string;
    viewFullResume: string;
    jobs: Array<{
      title: string;
      company: string;
      date: string;
      description: string;
    }>;
  };
  contact: {
    title: string;
    email: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
}

export type ProjectKey = "thefluentspanishhouse" | "olimpiadas-informaticas" | "elend-talk" | "bytes-colaborativos";

export type TypeFormEnum = {
  SENDING: string;
  EMPTY_EMAIL: string;
  EMPTY_MESSAGE: string;
  MESSAGE_SENT: string;
  MESSAGE_ERROR: string;
};
