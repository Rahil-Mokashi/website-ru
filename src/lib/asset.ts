/** Prefixes '/assets/...' with the deploy base so it works on GitHub Pages sub-paths. */
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '')
