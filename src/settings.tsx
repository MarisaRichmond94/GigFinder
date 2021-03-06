const settings = {
  ANY_TYPE: 'Any',
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
  MIN_TABLET_WIDTH: 450,
  MIN_RESULTS_PER_LOAD: 25,
  PANEL_IDS: {
    FIND_ROUTE: {
      CENTER: {
        BUFFER: 40,
        DESKTOP: [
          'header',
          'search-panel-section',
        ],
        MOBILE: [
          'header',
          'search-panel-section',
          'filter-panel-section',
          'find-center-panel-selector',
          'active-resume-section',
        ]
      },
      RIGHT: {
        BUFFER: 40,
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
        BUFFER: 120,
        DESKTOP: [
          'employer-sign-out-button',
          'message-template-section',
          'gig-creation-button-container',
        ],
      },
    },
  }
}

export default settings;
