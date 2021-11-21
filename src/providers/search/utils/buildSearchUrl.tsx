import settings from 'settings';

const buildSearchUrl = (gigTypes): string => {
  const query = new URLSearchParams(window.location.search);
  let url = `${settings.BASE_SERVER_URL}/gigs?`;

  const title = query.get('title') || '';
  if (title !== '') url += `title_like=${title}&`;

  const location = query.get('location') || '';
  if (location && location !== '') url += `city_like=${location.trim()}&`;

  const type = gigTypes?.find(x => x.displayName === query.get('type')) || undefined;
  if (type && type.displayName !== settings.ANY_TYPE) {
    url += `type=${type.displayName.toLowerCase()}&`;
  }

  return url.slice(0, -1);
}

export { buildSearchUrl };
