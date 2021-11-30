import { useCallback, useEffect, useState } from 'react';

import { usePrevious } from 'hooks/usePrevious';
import { useViewport } from 'hooks/useViewport';
import AppContext from 'providers/app/context';

const DESKTOP_CENTER_PANEL_IDS = [
  'header',
  'search-panel-section'
];
const MOBILE_CENTER_PANEL_IDS = [
  'header',
  'search-panel-section',
  'filter-panel-section',
  'center-panel-selector',
];
const CENTER_PANEL_BUFFER = 20;
const DESKTOP_RIGHT_PANEL_IDS = [
  'action-button-wrapper',
  'active-resume-section',
  'search-filters-section',
  'right-panel-selector',
];
const RIGHT_PANEL_BUFFER = 25;

const AppProvider = (props: object) => {
  const { width } = useViewport();
  const prevWidth = usePrevious(width);
  const [unusableCenterPanelHeight, setUnusableCenterPanelHeight] = useState(0);
  const [unusableRightPanelHeight, setUnusableRightPanelHeight] = useState(0);

  const calculateTotalHeight = useCallback((): void => {
    setTimeout(() => {
      const isCalculatingMobile = width <= 850;
      const centerPanelIds = isCalculatingMobile
        ? MOBILE_CENTER_PANEL_IDS
        : DESKTOP_CENTER_PANEL_IDS;

      let totalCenterPanelHeight = 0;
      for (let index = 0; index < centerPanelIds.length; index++) {
        const element = document.getElementById(centerPanelIds[index]);
        totalCenterPanelHeight += (element?.offsetHeight || 0);
      }
      setUnusableCenterPanelHeight(totalCenterPanelHeight + CENTER_PANEL_BUFFER);

      if (!isCalculatingMobile) {
        let totalRightPanelHeight = 0;
        for (let index = 0; index < DESKTOP_RIGHT_PANEL_IDS.length; index++) {
          const element = document.getElementById(DESKTOP_RIGHT_PANEL_IDS[index]);
          totalRightPanelHeight += (element?.offsetHeight || 0);
        }
        setUnusableRightPanelHeight(totalRightPanelHeight + RIGHT_PANEL_BUFFER);
      }
    }, 200);
  }, [width]);

  useEffect(() => {
    // @ts-ignore
    if (prevWidth && ((prevWidth >= 850 && width <= 850) || (prevWidth <= 850 && width >= 850))) {
      calculateTotalHeight();
    }
  }, [calculateTotalHeight, prevWidth, width]);

  const value = {
    unusableCenterPanelHeight,
    unusableRightPanelHeight,
    calculateTotalHeight,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
