import { useEffect, useRef, useState } from "react";
import { getUi, type Locale } from "../../lib/i18n";

interface PagefindData {
  url: string;
  meta: { title?: string; category?: string };
  excerpt: string;
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindData>;
}

interface PagefindModule {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

async function loadPagefind() {
  const pagefindUrl = "/pagefind/pagefind.js";
  return import(/* @vite-ignore */ pagefindUrl) as Promise<PagefindModule>;
}

interface Props {
  locale: Locale;
}

export default function Search({ locale }: Props) {
  const ui = getUi(locale);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindData[]>([]);
  const [status, setStatus] = useState(ui.searchStart);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-site-search-trigger]")) setIsOpen(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      setResults([]);
      setStatus(ui.searchStart);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setStatus(ui.searching);

      try {
        const pagefind = await loadPagefind();
        const response = await pagefind.search(normalizedQuery);
        const data = await Promise.all(
          response.results.slice(0, 8).map((result) => result.data()),
        );

        if (!cancelled) {
          setResults(data);
          setStatus(
            data.length === 0 ? ui.noResults : ui.resultCount(data.length),
          );
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setStatus(ui.searchBuildOnly);
        }
      }
    }, 150);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, ui]);

  return (
    <>
      <button
        className="search-trigger"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={ui.searchWiki}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
          <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
        </svg>
        <span>{ui.searchTrigger}</span>
        <kbd>Ctrl K</kbd>
      </button>

      <dialog
        className="search-dialog"
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <div className="search-panel">
          <div className="search-field">
            <label className="sr-only" htmlFor="site-search">
              {ui.searchDocumentation}
            </label>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
              <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
            </svg>
            <input
              id="site-search"
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={ui.searchPlaceholder}
              autoComplete="off"
            />
            <button type="button" onClick={() => setIsOpen(false)}>
              {ui.cancel}
            </button>
          </div>

          <p className="search-status" aria-live="polite">
            {status}
          </p>

          {results.length > 0 && (
            <ul className="search-results">
              {results.map((result) => (
                <li key={result.url}>
                  <a href={result.url}>
                    <small>{result.meta.category ?? "Layla Wiki"}</small>
                    <strong>{result.meta.title ?? ui.untitledPage}</strong>
                    <span
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {!query.trim() && (
            <div className="recent-searches">
              <h2>{ui.recentSearches}</h2>
              <div>
                {ui.searchTerms.map((term) => (
                  <button
                    type="button"
                    key={term}
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
