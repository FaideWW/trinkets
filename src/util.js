export function parseWowheadURL(str) {
  const wowheadRegex = /wowhead.com\/item=(\d+)(?:\/([^&]+))?(?:&bonus=([:\d]+))?/g;

  return wowheadRegex.exec(str);
}
