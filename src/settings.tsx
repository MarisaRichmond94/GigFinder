const settings = {
  ANY_TYPE: 'Any',
  AUTH_FIELD_TYPES: {
    name: 'name',
    email: 'email',
    password: 'password',
    all: 'all',
  },
  BASE_SERVER_URL: 'http://localhost:8080',
  CREATE_ROUTE: '/create',
  HOME_ROUTE: '/',
  INITIAL_FEEDBACK: {
    mood: null,
    positiveTraits: null,
    negativeTraits: null,
    technicalFit: null,
    culturalFit: null,
    additionalNotes: null,
  },
  MIN_DESKTOP_WIDTH: 850,
  MIN_RESULTS_PER_LOAD: 25,
  FIND_ROUTE: '/find',
}

export default settings;
