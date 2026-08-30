import { getCollection, type CollectionEntry } from "astro:content";
import {
  defaultLocale,
  getUi,
  isLocale,
  localePath,
  locales,
  type Locale,
  type LocaleLink,
} from "./i18n";

export type DocEntry = CollectionEntry<"docs">;

export interface TopicDefinition {
  name: string;
  category: string;
  slug: string;
  description: string;
  icon: string;
  translations?: Partial<Record<Locale, { name: string; description: string }>>;
}

export const topics: TopicDefinition[] = [
  {
    name: "Chat & memory",
    category: "Chat & memory",
    slug: "chat-memory",
    description:
      "Manage conversations, message actions, translation, and Long-Term Memory.",
    icon: "comment-discussion",
    translations: {
      fr: {
        name: "Chat et mémoire",
        description:
          "Gérez les conversations, les messages, la traduction et la mémoire à long terme.",
      },
      de: {
        name: "Chat und Gedächtnis",
        description:
          "Verwalte Unterhaltungen, Nachrichtenaktionen, Übersetzungen und das Langzeitgedächtnis.",
      },
      it: {
        name: "Chat e memoria",
        description:
          "Gestisci conversazioni, azioni sui messaggi, traduzioni e memoria a lungo termine.",
      },
      ja: {
        name: "チャットとメモリ",
        description: "会話、メッセージ操作、翻訳、長期記憶を管理します。",
      },
      ko: {
        name: "채팅 및 메모리",
        description: "대화, 메시지 작업, 번역 및 장기 메모리를 관리합니다.",
      },
    },
  },
  {
    name: "Models & performance",
    category: "Models & performance",
    slug: "models-performance",
    description:
      "Choose, configure, and tune local or cloud models for your device.",
    icon: "ai-model",
    translations: {
      fr: {
        name: "Modèles et performances",
        description:
          "Choisissez, configurez et optimisez les modèles locaux ou cloud pour votre appareil.",
      },
      de: {
        name: "Modelle und Leistung",
        description:
          "Wähle, konfiguriere und optimiere lokale oder Cloud-Modelle für dein Gerät.",
      },
      it: {
        name: "Modelli e prestazioni",
        description:
          "Scegli, configura e ottimizza modelli locali o cloud per il tuo dispositivo.",
      },
      ja: {
        name: "モデルとパフォーマンス",
        description:
          "デバイスに合わせてローカルモデルやクラウドモデルを選択、設定、調整します。",
      },
      ko: {
        name: "모델 및 성능",
        description:
          "기기에 맞는 로컬 또는 클라우드 모델을 선택하고 설정하고 최적화합니다.",
      },
    },
  },
  {
    name: "Characters & voice",
    category: "Characters & voice",
    slug: "characters-voice",
    description:
      "Create and import characters, then give them local voices and voice chat.",
    icon: "person",
    translations: {
      fr: {
        name: "Personnages et voix",
        description:
          "Créez et importez des personnages, puis ajoutez des voix locales et le chat vocal.",
      },
      de: {
        name: "Charaktere und Stimme",
        description:
          "Erstelle und importiere Charaktere und statte sie mit lokalen Stimmen und Sprachchat aus.",
      },
      it: {
        name: "Personaggi e voce",
        description:
          "Crea e importa personaggi, quindi aggiungi voci locali e chat vocale.",
      },
      ja: {
        name: "キャラクターと音声",
        description:
          "キャラクターを作成、インポートし、ローカル音声やボイスチャットを設定します。",
      },
      ko: {
        name: "캐릭터 및 음성",
        description:
          "캐릭터를 만들고 가져온 다음 로컬 음성과 음성 채팅을 설정합니다.",
      },
    },
  },
  {
    name: "Agents & tools",
    category: "Agents & tools",
    slug: "agents-tools",
    description:
      "Build on-device agents that use functions, Python, APIs, and MCP tools.",
    icon: "agent",
    translations: {
      fr: {
        name: "Agents et outils",
        description:
          "Créez des agents sur l’appareil utilisant des fonctions, Python, des API et des outils MCP.",
      },
      de: {
        name: "Agenten und Werkzeuge",
        description:
          "Erstelle Agenten auf dem Gerät, die Funktionen, Python, APIs und MCP-Werkzeuge verwenden.",
      },
      it: {
        name: "Agenti e strumenti",
        description:
          "Crea agenti sul dispositivo che usano funzioni, Python, API e strumenti MCP.",
      },
      ja: {
        name: "エージェントとツール",
        description:
          "関数、Python、API、MCPツールを使用するオンデバイスエージェントを構築します。",
      },
      ko: {
        name: "에이전트 및 도구",
        description:
          "함수, Python, API 및 MCP 도구를 사용하는 온디바이스 에이전트를 구축합니다.",
      },
    },
  },
  {
    name: "Mini-apps & integrations",
    category: "Mini-apps & integrations",
    slug: "mini-apps-integrations",
    description:
      "Add optional features, build mini-apps, and connect Layla to Android tools.",
    icon: "apps",
    translations: {
      fr: {
        name: "Mini-apps et intégrations",
        description:
          "Ajoutez des fonctions, créez des mini-apps et connectez Layla aux outils Android.",
      },
      de: {
        name: "Mini-Apps und Integrationen",
        description:
          "Füge optionale Funktionen hinzu, erstelle Mini-Apps und verbinde Layla mit Android-Werkzeugen.",
      },
      it: {
        name: "Mini-app e integrazioni",
        description:
          "Aggiungi funzionalità opzionali, crea mini-app e collega Layla agli strumenti Android.",
      },
      ja: {
        name: "ミニアプリと連携",
        description:
          "オプション機能やミニアプリを追加し、LaylaをAndroidツールと連携させます。",
      },
      ko: {
        name: "미니 앱 및 연동",
        description:
          "선택 기능과 미니 앱을 추가하고 Layla를 Android 도구와 연결합니다.",
      },
    },
  },
  {
    name: "Layla SDK",
    category: "Layla SDK",
    slug: "layla-sdk",
    description:
      "Build mini-apps and integrations with Layla's chat, character, media, and device APIs.",
    icon: "code-square",
    translations: {
      fr: {
        name: "Layla SDK",
        description:
          "Créez des mini-apps et des intégrations avec les API de chat, de personnages, de médias et d’appareil de Layla.",
      },
      de: {
        name: "Layla SDK",
        description:
          "Erstelle Mini-Apps und Integrationen mit Laylas APIs für Chat, Charaktere, Medien und Gerätefunktionen.",
      },
      it: {
        name: "Layla SDK",
        description:
          "Crea mini-app e integrazioni con le API di Layla per chat, personaggi, contenuti multimediali e dispositivo.",
      },
      ja: {
        name: "Layla SDK",
        description:
          "Laylaのチャット、キャラクター、メディア、デバイスAPIを使用してミニアプリや連携機能を構築します。",
      },
      ko: {
        name: "Layla SDK",
        description:
          "Layla의 채팅, 캐릭터, 미디어 및 기기 API로 미니 앱과 연동 기능을 구축합니다.",
      },
    },
  },
  {
    name: "Image generation",
    category: "Image generation",
    slug: "image-generation",
    description: "Create images locally and connect generation to characters.",
    icon: "image",
    translations: {
      fr: {
        name: "Génération d’images",
        description:
          "Créez des images localement et reliez leur génération aux personnages.",
      },
      de: {
        name: "Bilderzeugung",
        description:
          "Erstelle Bilder lokal und verknüpfe die Bilderzeugung mit Charakteren.",
      },
      it: {
        name: "Generazione di immagini",
        description:
          "Crea immagini in locale e collega la generazione ai personaggi.",
      },
      ja: {
        name: "画像生成",
        description:
          "ローカルで画像を生成し、キャラクターと画像生成を連携させます。",
      },
      ko: {
        name: "이미지 생성",
        description:
          "로컬에서 이미지를 만들고 이미지 생성을 캐릭터와 연결합니다.",
      },
    },
  },
  {
    name: "Troubleshooting",
    category: "Troubleshooting",
    slug: "troubleshooting",
    description: "Fix model loading, performance, setup, and app issues.",
    icon: "tools",
    translations: {
      fr: {
        name: "Dépannage",
        description:
          "Résolvez les problèmes de chargement, de performances, de configuration et d’application.",
      },
      de: {
        name: "Fehlerbehebung",
        description:
          "Behebe Probleme beim Laden von Modellen sowie Leistungs-, Einrichtungs- und App-Probleme.",
      },
      it: {
        name: "Risoluzione dei problemi",
        description:
          "Risolvi problemi di caricamento dei modelli, prestazioni, configurazione e app.",
      },
      ja: {
        name: "トラブルシューティング",
        description:
          "モデルの読み込み、パフォーマンス、セットアップ、アプリの問題を解決します。",
      },
      ko: {
        name: "문제 해결",
        description: "모델 로딩, 성능, 설정 및 앱 문제를 해결합니다.",
      },
    },
  },
];

function normalizedDocId(id: string) {
  return id.replaceAll("\\", "/").replace(/\.(md|mdx)$/, "");
}

export function docLocale(id: string): Locale {
  const firstSegment = normalizedDocId(id).split("/")[0];
  return isLocale(firstSegment) && firstSegment !== defaultLocale
    ? firstSegment
    : defaultLocale;
}

export function docSlug(id: string) {
  const locale = docLocale(id);
  const localizedId =
    locale === defaultLocale
      ? normalizedDocId(id)
      : normalizedDocId(id).replace(new RegExp(`^${locale}/`), "");

  return localizedId.replace(/\/index$/, "");
}

export function docKey(entry: DocEntry) {
  return entry.data.translationKey ?? docSlug(entry.id);
}

export function docHref(id: string, locale = docLocale(id)) {
  const slug = docSlug(id);
  return localePath(locale, slug ? `/${slug}/` : "/");
}

export function topicForCategory(
  category: string,
  locale: Locale = defaultLocale,
) {
  const topic = topics.find((candidate) => candidate.category === category);
  if (topic) {
    const translation = topic.translations?.[locale];
    return translation ? { ...topic, ...translation } : topic;
  }

  return {
    name: category,
    category,
    slug: category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    description: getUi(locale).topicFallback(category),
    icon: "book",
  };
}

export function topicHref(category: string, locale: Locale = defaultLocale) {
  return localePath(
    locale,
    `/topics/${topicForCategory(category, locale).slug}/`,
  );
}

export function estimateReadingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>|[#>*_`[\]()!-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 210));
}

export async function getPublishedDocs(locale: Locale = defaultLocale) {
  const docs = await getCollection("docs", ({ data }) => !data.draft);

  return docs
    .filter((entry) => docLocale(entry.id) === locale)
    .sort((left, right) => {
      if (left.data.category !== right.data.category) {
        return left.data.category.localeCompare(right.data.category);
      }

      if (left.data.order !== right.data.order) {
        return left.data.order - right.data.order;
      }

      return left.data.title.localeCompare(right.data.title);
    });
}

export async function getArticleLocaleLinks(
  entry: DocEntry,
): Promise<LocaleLink[]> {
  const docs = await getCollection("docs", ({ data }) => !data.draft);
  const key = docKey(entry);

  return locales.flatMap((locale) => {
    const translation = docs.find(
      (candidate) =>
        docLocale(candidate.id) === locale && docKey(candidate) === key,
    );
    return translation
      ? [{ locale, href: docHref(translation.id, locale) }]
      : [];
  });
}

export async function getTopicLocaleLinks(
  category: string,
): Promise<LocaleLink[]> {
  const links = await Promise.all(
    locales.map(async (locale) => {
      const docs = await getPublishedDocs(locale);
      return docs.some((entry) => entry.data.category === category)
        ? { locale, href: topicHref(category, locale) }
        : undefined;
    }),
  );

  return links.filter((link): link is LocaleLink => Boolean(link));
}
