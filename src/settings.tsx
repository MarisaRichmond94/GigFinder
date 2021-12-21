const settings = {
  ANY_TYPE: 'Any',
  BASE_SERVER_URL: 'http://localhost:5001/gigfinder-83a7f/us-central1/main', // 'https://us-central1-gigfinder-83a7f.cloudfunctions.net/main',
  CREATE_ROUTE: '/create',
  FIND_ROUTE: '/find',
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
  PANEL_IDS: {
    FIND_ROUTE: {
      CENTER: {
        BUFFER: 49,
        DESKTOP: [
          'header',
          'search-panel-section'
        ],
        MOBILE: [
          'header',
          'search-panel-section',
          'filter-panel-section',
          'find-center-panel-selector',
        ]
      },
      RIGHT: {
        BUFFER: 25,
        DESKTOP: [
          'action-button-wrapper',
          'active-resume-section',
          'search-filters-section',
          'right-panel-selector',
        ],
      },
    },
    CREATE_ROUTE: {
      CENTER: {
        BUFFER: 20,
        DESKTOP: [],
        MOBILE: []
      },
      RIGHT: {
        BUFFER: 95,
        DESKTOP: [
          'employer-sign-out-button',
          'message-template-section',
        ],
      },
    },
  }
}

export default settings;
