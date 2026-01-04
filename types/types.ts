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
    [key: string]: string | {
      name: string;
      description: string;
      url?: string;
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

export type ProjectKey =
  | "amanahacademia"
  | "thefluentspanishhouse"
  | "olimpiadas-informaticas"
  | "elend-talk"
  | "octa-rust"
  | "bytes-colaborativos";

export type TypeFormEnum = {
  SENDING: string;
  EMPTY_EMAIL: string;
  EMPTY_MESSAGE: string;
  MESSAGE_SENT: string;
  MESSAGE_ERROR: string;
};
