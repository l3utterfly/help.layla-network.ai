export const locales = ["en", "fr", "de", "it", "ja", "ko"] as const;

export type Locale = (typeof locales)[number];

export interface LocaleLink {
  locale: Locale;
  href: string;
}

export const defaultLocale: Locale = "en";
export const languagePreferenceKey = "layla-help-locale";

export interface LocaleMetadata {
  name: string;
  shortName: string;
  direction: "ltr" | "rtl";
  ogLocale: string;
}

export const localeMetadata: Record<Locale, LocaleMetadata> = {
  en: {
    name: "English",
    shortName: "EN",
    direction: "ltr",
    ogLocale: "en_GB",
  },
  fr: {
    name: "Français",
    shortName: "FR",
    direction: "ltr",
    ogLocale: "fr_FR",
  },
  de: {
    name: "Deutsch",
    shortName: "DE",
    direction: "ltr",
    ogLocale: "de_DE",
  },
  it: {
    name: "Italiano",
    shortName: "IT",
    direction: "ltr",
    ogLocale: "it_IT",
  },
  ja: {
    name: "日本語",
    shortName: "JA",
    direction: "ltr",
    ogLocale: "ja_JP",
  },
  ko: {
    name: "한국어",
    shortName: "KO",
    direction: "ltr",
    ogLocale: "ko_KR",
  },
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

const englishUi = {
  siteHome: "Layla Wiki home",
  guides: "Guides",
  faq: "FAQ",
  getHelp: "Get help",
  download: "Download",
  selectLanguage: "Select language",
  languageHome: "Homepage",
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
  website: "Website",
  footerLocation: "Gold Coast, Australia",
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
  aiTranslatedTitle: "AI-translated page",
  aiTranslatedWarning:
    "This page was translated with AI and may contain mistakes.",
  viewEnglishVersion: "Check the English version for authoritative information",
  topicFallback: (category: string) =>
    `Guides and answers about ${category.toLowerCase()}.`,
  searchTerms: ["local models", "licence", "characters", "voice"],
  articleCount: (count: number) =>
    count === 1 ? "1 article" : `${count} articles`,
  searchCount: (count: number) =>
    `Search ${count} ${count === 1 ? "article" : "articles"}`,
  resultCount: (count: number) =>
    `${count} ${count === 1 ? "result" : "results"}`,
  readingMinutes: (count: number) => `${count} min read`,
};

const frenchUi: typeof englishUi = {
  siteHome: "Accueil du wiki Layla",
  guides: "Guides",
  faq: "FAQ",
  getHelp: "Obtenir de l’aide",
  download: "Télécharger",
  selectLanguage: "Choisir la langue",
  languageHome: "Accueil",
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
  website: "Site web",
  footerLocation: "Gold Coast, Australie",
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
  aiTranslatedTitle: "Page traduite par l’IA",
  aiTranslatedWarning:
    "Cette page a été traduite par une IA et peut contenir des erreurs.",
  viewEnglishVersion: "Consulter la version anglaise comme source de référence",
  topicFallback: (category: string) =>
    `Guides et réponses sur ${category.toLowerCase()}.`,
  searchTerms: ["modèles locaux", "licence", "personnages", "voix"],
  articleCount: (count: number) =>
    count === 1 ? "1 article" : `${count} articles`,
  searchCount: (count: number) =>
    `Rechercher dans ${count} ${count === 1 ? "article" : "articles"}`,
  resultCount: (count: number) =>
    `${count} ${count === 1 ? "résultat" : "résultats"}`,
  readingMinutes: (count: number) => `${count} min de lecture`,
};

const germanUi: typeof englishUi = {
  siteHome: "Startseite des Layla-Wikis",
  guides: "Anleitungen",
  faq: "FAQ",
  getHelp: "Hilfe",
  download: "Herunterladen",
  selectLanguage: "Sprache auswählen",
  languageHome: "Startseite",
  documentation: "Dokumentation",
  topics: "Themen",
  wiki: "Wiki",
  guide: "Anleitung",
  updated: "Aktualisiert",
  recently: "Kürzlich",
  onThisPage: "Auf dieser Seite",
  wasHelpful: "War diese Seite hilfreich?",
  yes: "Ja",
  no: "Nein",
  feedbackThanks: "Danke – dein Feedback hilft uns, das Wiki zu verbessern.",
  editOnGitHub: "Auf GitHub bearbeiten ↗",
  editThisPage: "Diese Seite auf GitHub bearbeiten",
  edit: "Bearbeiten",
  articlePagination: "Artikelnavigation",
  breadcrumb: "Navigationspfad",
  communitySupport: "Community und Support",
  website: "Website",
  footerLocation: "Gold Coast, Australien",
  homeTitle: "Alles über die Nutzung von Layla",
  homeDescription:
    "Anleitungen und Antworten zur Nutzung von Layla, deinem privaten Offline-KI-Assistenten.",
  homeIntro:
    "Einrichtungsanleitungen, Modellformate, Charaktere, Agenten und Lösungen für Ladeprobleme.",
  gettingStarted: "Erste Schritte",
  browseTopics: "Nach Thema durchsuchen",
  recentlyUpdated: "Kürzlich aktualisiert",
  getLayla: "Layla herunterladen",
  comingSoon: "Demnächst verfügbar",
  all: "Alle",
  filterArticles: "Artikel filtern",
  searchTrigger: "Artikel suchen",
  searchWiki: "Wiki durchsuchen",
  searchDocumentation: "Dokumentation durchsuchen",
  searchPlaceholder: "Wiki durchsuchen…",
  searchStart: "Tippe etwas ein, um das Wiki zu durchsuchen.",
  searching: "Suche…",
  noResults: "Keine Ergebnisse gefunden.",
  searchBuildOnly:
    "Die Suche ist nach dem Erstellen des Produktions-Builds verfügbar.",
  recentSearches: "Letzte Suchanfragen",
  cancel: "Abbrechen",
  untitledPage: "Unbenannte Seite",
  aiTranslatedTitle: "KI-übersetzte Seite",
  aiTranslatedWarning:
    "Diese Seite wurde mit KI übersetzt und kann Fehler enthalten.",
  viewEnglishVersion: "Die englische Version als verbindliche Quelle ansehen",
  topicFallback: (category: string) =>
    `Anleitungen und Antworten zu ${category.toLowerCase()}.`,
  searchTerms: ["lokale Modelle", "Lizenz", "Charaktere", "Stimme"],
  articleCount: (count: number) =>
    count === 1 ? "1 Artikel" : `${count} Artikel`,
  searchCount: (count: number) => `${count} Artikel durchsuchen`,
  resultCount: (count: number) =>
    `${count} ${count === 1 ? "Ergebnis" : "Ergebnisse"}`,
  readingMinutes: (count: number) => `${count} Min. Lesezeit`,
};

const italianUi: typeof englishUi = {
  siteHome: "Pagina iniziale del wiki di Layla",
  guides: "Guide",
  faq: "FAQ",
  getHelp: "Assistenza",
  download: "Scarica",
  selectLanguage: "Seleziona la lingua",
  languageHome: "Pagina iniziale",
  documentation: "Documentazione",
  topics: "Argomenti",
  wiki: "Wiki",
  guide: "Guida",
  updated: "Aggiornato",
  recently: "Di recente",
  onThisPage: "In questa pagina",
  wasHelpful: "Questa pagina ti è stata utile?",
  yes: "Sì",
  no: "No",
  feedbackThanks: "Grazie: il tuo feedback ci aiuta a migliorare il wiki.",
  editOnGitHub: "Modifica su GitHub ↗",
  editThisPage: "Modifica questa pagina su GitHub",
  edit: "Modifica",
  articlePagination: "Navigazione tra gli articoli",
  breadcrumb: "Percorso di navigazione",
  communitySupport: "Community e assistenza",
  website: "Sito web",
  footerLocation: "Gold Coast, Australia",
  homeTitle: "Tutto sull’utilizzo di Layla",
  homeDescription:
    "Guide e risposte per usare Layla, il tuo assistente IA privato e offline.",
  homeIntro:
    "Guide alla configurazione, formati dei modelli, personaggi, agenti e soluzioni ai problemi di caricamento.",
  gettingStarted: "Per iniziare",
  browseTopics: "Sfoglia per argomento",
  recentlyUpdated: "Aggiornati di recente",
  getLayla: "Scarica Layla",
  comingSoon: "Prossimamente",
  all: "Tutti",
  filterArticles: "Filtra gli articoli",
  searchTrigger: "Cerca articoli",
  searchWiki: "Cerca nel wiki",
  searchDocumentation: "Cerca nella documentazione",
  searchPlaceholder: "Cerca nel wiki…",
  searchStart: "Inizia a digitare per cercare nel wiki.",
  searching: "Ricerca in corso…",
  noResults: "Nessun risultato trovato.",
  searchBuildOnly:
    "La ricerca è disponibile dopo aver eseguito la build di produzione.",
  recentSearches: "Ricerche recenti",
  cancel: "Annulla",
  untitledPage: "Pagina senza titolo",
  aiTranslatedTitle: "Pagina tradotta con l’IA",
  aiTranslatedWarning:
    "Questa pagina è stata tradotta con l’IA e potrebbe contenere errori.",
  viewEnglishVersion: "Consulta la versione inglese come fonte autorevole",
  topicFallback: (category: string) =>
    `Guide e risposte su ${category.toLowerCase()}.`,
  searchTerms: ["modelli locali", "licenza", "personaggi", "voce"],
  articleCount: (count: number) =>
    count === 1 ? "1 articolo" : `${count} articoli`,
  searchCount: (count: number) =>
    `Cerca in ${count} ${count === 1 ? "articolo" : "articoli"}`,
  resultCount: (count: number) =>
    `${count} ${count === 1 ? "risultato" : "risultati"}`,
  readingMinutes: (count: number) => `${count} min di lettura`,
};

const japaneseUi: typeof englishUi = {
  siteHome: "Layla Wikiのホーム",
  guides: "ガイド",
  faq: "よくある質問",
  getHelp: "ヘルプ",
  download: "ダウンロード",
  selectLanguage: "言語を選択",
  languageHome: "ホーム",
  documentation: "ドキュメント",
  topics: "トピック",
  wiki: "Wiki",
  guide: "ガイド",
  updated: "更新",
  recently: "最近",
  onThisPage: "このページの内容",
  wasHelpful: "このページは役に立ちましたか？",
  yes: "はい",
  no: "いいえ",
  feedbackThanks:
    "ありがとうございます。皆さまのご意見はWikiの改善に役立ちます。",
  editOnGitHub: "GitHubで編集 ↗",
  editThisPage: "このページをGitHubで編集",
  edit: "編集",
  articlePagination: "記事の移動",
  breadcrumb: "パンくずリスト",
  communitySupport: "コミュニティとサポート",
  website: "ウェブサイト",
  footerLocation: "オーストラリア・ゴールドコースト",
  homeTitle: "Laylaの使い方がすべて分かる",
  homeDescription:
    "プライベートなオフラインAIアシスタント「Layla」の使い方を紹介するガイドと回答集です。",
  homeIntro:
    "セットアップ、モデル形式、キャラクター、エージェント、読み込みに関する問題の解決方法を紹介します。",
  gettingStarted: "はじめに",
  browseTopics: "トピックから探す",
  recentlyUpdated: "最近更新された記事",
  getLayla: "Laylaを入手",
  comingSoon: "近日公開",
  all: "すべて",
  filterArticles: "記事を絞り込む",
  searchTrigger: "記事を検索",
  searchWiki: "Wikiを検索",
  searchDocumentation: "ドキュメントを検索",
  searchPlaceholder: "Wikiを検索…",
  searchStart: "入力してWikiを検索してください。",
  searching: "検索中…",
  noResults: "結果が見つかりませんでした。",
  searchBuildOnly: "検索は本番用ビルドの実行後に利用できます。",
  recentSearches: "最近の検索",
  cancel: "キャンセル",
  untitledPage: "無題のページ",
  aiTranslatedTitle: "AI翻訳ページ",
  aiTranslatedWarning:
    "このページはAIで翻訳されており、誤りを含む場合があります。",
  viewEnglishVersion: "正確な情報については英語版を確認してください",
  topicFallback: (category: string) => `${category}に関するガイドと回答。`,
  searchTerms: ["ローカルモデル", "ライセンス", "キャラクター", "音声"],
  articleCount: (count: number) => `${count}件の記事`,
  searchCount: (count: number) => `${count}件の記事を検索`,
  resultCount: (count: number) => `${count}件の結果`,
  readingMinutes: (count: number) => `読了時間 ${count}分`,
};

const koreanUi: typeof englishUi = {
  siteHome: "Layla 위키 홈",
  guides: "가이드",
  faq: "자주 묻는 질문",
  getHelp: "도움받기",
  download: "다운로드",
  selectLanguage: "언어 선택",
  languageHome: "홈",
  documentation: "문서",
  topics: "주제",
  wiki: "위키",
  guide: "가이드",
  updated: "업데이트",
  recently: "최근",
  onThisPage: "이 페이지의 내용",
  wasHelpful: "이 페이지가 도움이 되었나요?",
  yes: "예",
  no: "아니요",
  feedbackThanks:
    "감사합니다. 보내주신 의견은 위키를 개선하는 데 도움이 됩니다.",
  editOnGitHub: "GitHub에서 편집 ↗",
  editThisPage: "GitHub에서 이 페이지 편집",
  edit: "편집",
  articlePagination: "문서 이동",
  breadcrumb: "이동 경로",
  communitySupport: "커뮤니티 및 지원",
  website: "웹사이트",
  footerLocation: "호주 골드코스트",
  homeTitle: "Layla 사용에 관한 모든 것",
  homeDescription:
    "개인용 오프라인 AI 어시스턴트 Layla를 사용하는 데 필요한 가이드와 답변입니다.",
  homeIntro:
    "설정 방법, 모델 형식, 캐릭터, 에이전트와 로딩 문제 해결 방법을 확인하세요.",
  gettingStarted: "시작하기",
  browseTopics: "주제별로 둘러보기",
  recentlyUpdated: "최근 업데이트",
  getLayla: "Layla 다운로드",
  comingSoon: "곧 제공",
  all: "전체",
  filterArticles: "문서 필터링",
  searchTrigger: "문서 검색",
  searchWiki: "위키 검색",
  searchDocumentation: "문서 검색",
  searchPlaceholder: "위키 검색…",
  searchStart: "검색어를 입력하여 위키를 검색하세요.",
  searching: "검색 중…",
  noResults: "검색 결과가 없습니다.",
  searchBuildOnly: "프로덕션 빌드를 실행한 후 검색을 사용할 수 있습니다.",
  recentSearches: "최근 검색어",
  cancel: "취소",
  untitledPage: "제목 없는 페이지",
  aiTranslatedTitle: "AI 번역 페이지",
  aiTranslatedWarning: "이 페이지는 AI로 번역되었으며 오류가 있을 수 있습니다.",
  viewEnglishVersion: "정확한 정보는 영어 버전에서 확인하세요",
  topicFallback: (category: string) =>
    `${category}에 관한 가이드와 답변입니다.`,
  searchTerms: ["로컬 모델", "라이선스", "캐릭터", "음성"],
  articleCount: (count: number) => `${count}개 문서`,
  searchCount: (count: number) => `${count}개 문서 검색`,
  resultCount: (count: number) => `${count}개 결과`,
  readingMinutes: (count: number) => `읽는 데 ${count}분`,
};

const ui: Record<Locale, typeof englishUi> = {
  en: englishUi,
  fr: frenchUi,
  de: germanUi,
  it: italianUi,
  ja: japaneseUi,
  ko: koreanUi,
};

export function getUi(locale: Locale) {
  return ui[locale];
}
