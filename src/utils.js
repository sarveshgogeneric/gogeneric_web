export function cleanImageUrl(url) {
  if (!url) return null;
  url = url.replaceAll('//', '/').replace('https:/', 'https://');
  if (!url.includes('/public/')) {
    url = url.replace('/storage/', '/public/storage/');
  }

  if (!url.startsWith('http')) {
    url = `https://www.gogenericpharma.com${url}`;
  }
  return url;
}