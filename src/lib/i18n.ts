export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export interface LocaleLink {
  locale: Locale;
  href: string;
}

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  if (normalized === "/") return `/${locale}/`;
  return `/${locale}${normalized}`;
}

export function homeLocaleLinks(): LocaleLink[] {
  return locales.map((locale) => ({ locale, href: localePath(locale) }));
}

const ui = {
  en: {
    siteHome: "Layla Wiki home",
    guides: "Guides",
    faq: "FAQ",
    getHelp: "Get help",
    download: "Download",
    selectLanguage: "Select language",
    documentation: "Documentation",
    topics: "Topics",
    wiki: "Wiki",
    guide: "Guide",
    updated: "Updated",
    recently: "Recently",
    onThisPage: "On this page",
    wasHelpful: "Was this page helpful?",
    yes: "Yes",
    no: "No",
    feedbackThanks: "Thanks — your feedback helps us improve the wiki.",
    editOnGitHub: "Edit on GitHub ↗",
    editThisPage: "Edit this page on GitHub",
    edit: "Edit",
    articlePagination: "Article pagination",
    breadcrumb: "Breadcrumb",
    communitySupport: "Community and support",
    homeTitle: "Everything about running Layla",
    homeDescription:
      "Guides and answers for using Layla, your private offline AI assistant.",
    homeIntro:
      "Setup guides, model formats, characters, agents, and fixes for when something will not load.",
    gettingStarted: "Getting started",
    browseTopics: "Browse by topic",
    recentlyUpdated: "Recently updated",
    getLayla: "Get Layla",
    comingSoon: "Coming soon",
    all: "All",
    filterArticles: "Filter articles",
    searchTrigger: "Search articles",
    searchWiki: "Search the wiki",
    searchDocumentation: "Search documentation",
    searchPlaceholder: "Search the wiki…",
    searchStart: "Start typing to search the wiki.",
    searching: "Searching…",
    noResults: "No results found.",
    searchBuildOnly:
      "Search becomes available after running the production build.",
    recentSearches: "Recent searches",
    cancel: "Cancel",
    untitledPage: "Untitled page",
    searchTerms: ["local models", "licence", "characters", "voice"],
    articleCount: (count: number) =>
      count === 1 ? "1 article" : `${count} articles`,
    searchCount: (count: number) =>
      `Search ${count} ${count === 1 ? "article" : "articles"}`,
    resultCount: (count: number) =>
      `${count} ${count === 1 ? "result" : "results"}`,
    readingMinutes: (count: number) => `${count} min read`,
  },
  fr: {
    siteHome: "Accueil du wiki Layla",
    guides: "Guides",
    faq: "FAQ",
    getHelp: "Obtenir de l’aide",
    download: "Télécharger",
    selectLanguage: "Choisir la langue",
    documentation: "Documentation",
    topics: "Sujets",
    wiki: "Wiki",
    guide: "Guide",
    updated: "Mis à jour",
    recently: "Récemment",
    onThisPage: "Sur cette page",
    wasHelpful: "Cette page vous a-t-elle été utile ?",
    yes: "Oui",
    no: "Non",
    feedbackThanks: "Merci — votre avis nous aide à améliorer le wiki.",
    editOnGitHub: "Modifier sur GitHub ↗",
    editThisPage: "Modifier cette page sur GitHub",
    edit: "Modifier",
    articlePagination: "Pagination des articles",
    breadcrumb: "Fil d’Ariane",
    communitySupport: "Communauté et assistance",
    homeTitle: "Tout savoir sur Layla",
    homeDescription:
      "Guides et réponses pour utiliser Layla, votre assistant IA privé et hors ligne.",
    homeIntro:
      "Guides de configuration, formats de modèles, personnages, agents et solutions aux problèmes de chargement.",
    gettingStarted: "Bien démarrer",
    browseTopics: "Parcourir par sujet",
    recentlyUpdated: "Récemment mis à jour",
    getLayla: "Obtenir Layla",
    comingSoon: "Bientôt disponible",
    all: "Tous",
    filterArticles: "Filtrer les articles",
    searchTrigger: "Rechercher des articles",
    searchWiki: "Rechercher dans le wiki",
    searchDocumentation: "Rechercher dans la documentation",
    searchPlaceholder: "Rechercher dans le wiki…",
    searchStart: "Commencez à saisir votre recherche.",
    searching: "Recherche…",
    noResults: "Aucun résultat.",
    searchBuildOnly:
      "La recherche est disponible après la compilation de production.",
    recentSearches: "Recherches récentes",
    cancel: "Annuler",
    untitledPage: "Page sans titre",
    searchTerms: ["modèles locaux", "licence", "personnages", "voix"],
    articleCount: (count: number) =>
      count === 1 ? "1 article" : `${count} articles`,
    searchCount: (count: number) =>
      `Rechercher dans ${count} ${count === 1 ? "article" : "articles"}`,
    resultCount: (count: number) =>
      `${count} ${count === 1 ? "résultat" : "résultats"}`,
    readingMinutes: (count: number) => `${count} min de lecture`,
  },
};

export function getUi(locale: Locale) {
  return ui[locale];
}
