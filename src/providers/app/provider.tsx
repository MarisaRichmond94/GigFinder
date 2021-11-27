import { useEffect, useState } from 'react';

import { usePrevious } from 'hooks/usePrevious';
import { useViewport } from 'hooks/useViewport';
import AppContext from 'providers/app/context';

const CENTER_PANEL_IDS = [
  'header',
  'search-panel-section',
  'filter-panel-section',
  'center-panel-selector',
];
const CENTER_PANEL_BUFFER = 20;
const RIGHT_PANEL_IDS = [
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

  useEffect(() => {
    calculateTotalHeight();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (prevWidth && ((prevWidth >= 850 && width <= 850) || (prevWidth <= 850 && width >= 850))) {
      calculateTotalHeight();
    }
  }, [prevWidth, width]);

  const calculateTotalHeight = (): number => {
    setTimeout(() => {
      const isCalculatingCenterPanel = width <= 850;
      const ids = isCalculatingCenterPanel ? CENTER_PANEL_IDS : RIGHT_PANEL_IDS;
      const buffer = isCalculatingCenterPanel ? CENTER_PANEL_BUFFER : RIGHT_PANEL_BUFFER;

      let totalHeight = 0;
      for (let index = 0; index < ids.length; index++) {
        const element = document.getElementById(ids[index]);
        totalHeight += (element?.offsetHeight || 0);
      }

      isCalculatingCenterPanel
        ? setUnusableCenterPanelHeight(totalHeight + buffer)
        : setUnusableRightPanelHeight(totalHeight + buffer);
    }, 200);
  };

  const value = {
    unusableCenterPanelHeight,
    unusableRightPanelHeight,
    calculateTotalHeight,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
