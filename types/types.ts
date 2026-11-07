declare global {
  var turnstile: any;
  var toggleModal: (id: string) => void;
  var toggleDarkTheme: () => void;
  var toggleLightTheme: () => void;
  var getSpain: (event: Event) => void;
  var getEnglish: (event: Event) => void;
}

export interface I18nTranslations {
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
    list: Record<
      string,
      {
        name: string;
        description: string;
        url: string;
      }
    >;
    others: Record<
      string,
      {
        name: string;
        description: string;
        url: string;
      }
    >;
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
    toasts: {
      success: string;
      error: string;
      loading: string;
    };
    placeholders: {
      email: string;
      message: string;
    };
  };
  ui: {
    tagline: string;
    skipToContent: string;
    nav: { label: string };
    facts: { github: string; linkedin: string; email: string; location: string; locationValue: string };
    projects: {
      showMore: string;
      showLess: string;
      others: string;
      goToProject: string;
      goToRepo: string;
      goToSite: string;
    };
    aria: {
      openMenu: string;
      closeMenu: string;
      changeLanguage: string;
      toLightTheme: string;
      toDarkTheme: string;
    };
    social: { github: string; linkedin: string; email: string };
    seo: { title: string; description: string };
  };
}

export type ProjectKey =
  | "amanahacademia"
  | "ferrum"
  | "ferrum-web"
  | "thefluentspanishhouse"
  | "olimpiadas-informaticas"
  | "elend-talk"
  | "bytes-colaborativos";

export type TypeFormEnum = {
  SENDING: string;
  EMPTY_EMAIL: string;
  EMPTY_MESSAGE: string;
  MESSAGE_SENT: string;
  MESSAGE_ERROR: string;
};
