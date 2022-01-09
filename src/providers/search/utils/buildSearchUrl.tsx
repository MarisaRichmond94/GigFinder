import settings from 'settings';

const buildSearchUrl = (typeOptions: string[]): string => {
  const query = new URLSearchParams(window.location.search);
  let url = `${process.env.REACT_APP_BASE_SERVER_URL}/gigs?`;

  const title = query.get('title') || '';
  if (title !== '') url += `title_like=${title}&`;

  const location = query.get('location') || '';
  if (location && location !== '') url += `city_like=${location.trim()}&`;

  const type = typeOptions?.find(x => x === query.get('type')) || undefined;
  if (type && type !== settings.ANY_TYPE) {
    url += `type=${type}&`;
  }

  return url.slice(0, -1);
}

export { buildSearchUrl };
