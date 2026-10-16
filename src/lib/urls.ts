/** One source of truth for GitHub project-site paths, including anchors. */
export function localUrl(path = ''): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
