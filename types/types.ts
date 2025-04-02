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
      real: boolean;
    };
    "olimpiadas-informaticas": {
      name: string;
      description: string;
    };
    "elend-talk": {
      name: string;
      description: string;
    };
    "coworking-space": {
      name: string;
      description: string;
    };
  };
  experience: {
    title: string;
    description: string;
    technologies: string;
  };
  contact: {
    title: string;
    email: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
}

export type ProjectKey = "thefluentspanishhouse" | "olimpiadas-informaticas" | "elend-talk" | "coworking-space";
