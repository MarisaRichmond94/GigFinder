import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { usePrevious } from 'hooks/usePrevious';
import { useViewport } from 'hooks/useViewport';
import AppContext from 'providers/app/context';
import settings from 'settings';

const AppProvider = (props: object) => {
  // hook variables
  const { pathname } = useLocation();
  const { width } = useViewport();
  const prevPathname = usePrevious(pathname);
  const prevWidth = usePrevious(width);
  // local state variables and functions
  const [routePanelIds, setRoutePanelIds] = useState(
    pathname === settings.FIND_ROUTE
      ? settings.PANEL_IDS.FIND_ROUTE
      : settings.PANEL_IDS.CREATE_ROUTE
  );
  const [unusableCenterPanelHeight, setUnusableCenterPanelHeight] = useState(0);
  const [unusableRightPanelHeight, setUnusableRightPanelHeight] = useState(0);

  useEffect(() => {
    if (prevPathname && pathname !== prevPathname) {
      setRoutePanelIds(
        pathname === settings.FIND_ROUTE
          ? settings.PANEL_IDS.FIND_ROUTE
          : settings.PANEL_IDS.CREATE_ROUTE
      );
    }
  }, [pathname, prevPathname]);

  const calculateTotalHeight = useCallback((): void => {
    setTimeout(() => {
      const isCalculatingMobile = width <= 850;
      const centerPanelIds = isCalculatingMobile
        ? routePanelIds.CENTER.MOBILE
        : routePanelIds.CENTER.DESKTOP;

      if (centerPanelIds.length) {
        let totalCenterPanelHeight = 0;
        for (let index = 0; index < centerPanelIds.length; index++) {
          const element = document.getElementById(centerPanelIds[index]);
          totalCenterPanelHeight += (element?.offsetHeight || 0);
        }
        setUnusableCenterPanelHeight(totalCenterPanelHeight + routePanelIds.CENTER.BUFFER);
      }

      if (!isCalculatingMobile && routePanelIds.RIGHT.DESKTOP?.length) {
        let totalRightPanelHeight = 0;
        for (let index = 0; index < routePanelIds.RIGHT.DESKTOP.length; index++) {
          const element = document.getElementById(routePanelIds.RIGHT.DESKTOP[index]);
          totalRightPanelHeight += (element?.offsetHeight || 0);
        }
        setUnusableRightPanelHeight(totalRightPanelHeight + routePanelIds.RIGHT.BUFFER);
      }
    }, 200);
  }, [routePanelIds, width]);

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
