import { useEffect, useRef, useState } from 'react'

interface PagefindData {
  url: string
  meta: { title?: string }
  excerpt: string
}

interface PagefindResult {
  id: string
  data: () => Promise<PagefindData>
}

interface PagefindModule {
  search: (query: string) => Promise<{ results: PagefindResult[] }>
}

async function loadPagefind() {
  const pagefindUrl = '/pagefind/pagefind.js'
  return import(/* @vite-ignore */ pagefindUrl) as Promise<PagefindModule>
}

export default function Search() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PagefindData[]>([])
  const [status, setStatus] = useState('Start typing to search the help center.')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
      window.setTimeout(() => inputRef.current?.focus(), 0)
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const normalizedQuery = query.trim()
    if (!normalizedQuery) {
      setResults([])
      setStatus('Start typing to search the help center.')
      return
    }

    let cancelled = false
    const timer = window.setTimeout(async () => {
      setStatus('Searching…')

      try {
        const pagefind = await loadPagefind()
        const response = await pagefind.search(normalizedQuery)
        const data = await Promise.all(
          response.results.slice(0, 8).map((result) => result.data()),
        )

        if (!cancelled) {
          setResults(data)
          setStatus(data.length === 0 ? 'No results found.' : `${data.length} results`)
        }
      } catch {
        if (!cancelled) {
          setResults([])
          setStatus('Search becomes available after running the production build.')
        }
      }
    }, 150)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [query])

  return (
    <>
      <button className="search-trigger" type="button" onClick={() => setIsOpen(true)}>
        <span aria-hidden="true">⌕</span>
        <span>Search</span>
        <kbd>Ctrl K</kbd>
      </button>

      <dialog
        className="search-dialog"
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false)
        }}
      >
        <div className="search-panel">
          <div className="search-field">
            <label className="sr-only" htmlFor="site-search">Search documentation</label>
            <input
              id="site-search"
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Layla Help…"
              autoComplete="off"
            />
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close search">×</button>
          </div>

          <p className="search-status" aria-live="polite">{status}</p>

          {results.length > 0 && (
            <ul className="search-results">
              {results.map((result) => (
                <li key={result.url}>
                  <a href={result.url}>
                    <strong>{result.meta.title ?? 'Untitled page'}</strong>
                    <span dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  )
}
