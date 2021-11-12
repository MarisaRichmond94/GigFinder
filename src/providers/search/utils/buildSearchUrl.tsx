import settings from 'settings';

const buildSearchUrl = (): string => {
  const query = new URLSearchParams(window.location.search);
  let url = 'http://localhost:8080/jobs?';

  const title = query.get('title') || '';
  if (title !== '') url += `title_like=${title}&`;

  const location = query.get('location') || '';
  const [city, state] = location.split(',');
  if (city && city !== '') url += `city_like=${city.trim()}&`;
  if (state && state !== '') {
    url += (state.trim().length <= 2)
      ? `abbrev_state_like=${state.trim().toUpperCase()}&`
      : `state_like=${state.trim()}&`;
  }

  const type = settings.TYPE_OPTIONS.find(x => x.displayName === query.get('type')) || undefined;
  if (type && type.displayName !== settings.ANY_TYPE) {
    url += `type=${type.displayName.toLowerCase()}&`;
  }

  return url.slice(0, -1);
}

export { buildSearchUrl };
