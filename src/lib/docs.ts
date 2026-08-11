import { getCollection, type CollectionEntry } from "astro:content";
import {
  defaultLocale,
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
    description:
      locale === "fr"
        ? `Guides et réponses sur ${category.toLowerCase()}.`
        : `Guides and answers about ${category.toLowerCase()}.`,
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
