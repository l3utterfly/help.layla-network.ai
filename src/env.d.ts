/// <reference types="astro/client" />

declare module '@primer/octicons' {
  interface Octicon {
    toSVG(options?: Record<string, string | number>): string
  }

  const octicons: Record<string, Octicon>
  export default octicons
}
