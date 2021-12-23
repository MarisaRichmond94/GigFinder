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
  const [isMobileView, setIsMobileView] = useState(false);
  const [routePanelIds, setRoutePanelIds] = useState(
    pathname === settings.FIND_ROUTE
      ? settings.PANEL_IDS.FIND_ROUTE
      : settings.PANEL_IDS.CREATE_ROUTE
  );
  const [unusableCenterPanelHeight, setUnusableCenterPanelHeight] = useState(0);
  const [unusableRightPanelHeight, setUnusableRightPanelHeight] = useState(0);

  const calculateTotalHeight = useCallback((panelIds?: any): void => {
    const finalRoutePanelIds = panelIds || routePanelIds;

    setTimeout(() => {
      const isCalculatingMobile = width <= 850;
      const centerPanelIds = isCalculatingMobile
        ? finalRoutePanelIds.CENTER.MOBILE
        : finalRoutePanelIds.CENTER.DESKTOP;

      if (centerPanelIds.length) {
        let totalCenterPanelHeight = 0;
        for (let index = 0; index < centerPanelIds.length; index++) {
          const element = document.getElementById(centerPanelIds[index]);
          totalCenterPanelHeight += (element?.offsetHeight || 0);
        }
        setUnusableCenterPanelHeight(totalCenterPanelHeight + finalRoutePanelIds.CENTER.BUFFER);
      }

      if (!isCalculatingMobile && finalRoutePanelIds.RIGHT.DESKTOP?.length) {
        let totalRightPanelHeight = 0;
        for (let index = 0; index < finalRoutePanelIds.RIGHT.DESKTOP.length; index++) {
          const element = document.getElementById(finalRoutePanelIds.RIGHT.DESKTOP[index]);
          totalRightPanelHeight += (element?.offsetHeight || 0);
        }
        setUnusableRightPanelHeight(totalRightPanelHeight + finalRoutePanelIds.RIGHT.BUFFER);
      }
    }, 200);
  }, [routePanelIds, width]);

  useEffect(() => {
    if (prevPathname && pathname !== prevPathname) {
      const updateRoutePanelIds = pathname === settings.FIND_ROUTE
        ? settings.PANEL_IDS.FIND_ROUTE
        : settings.PANEL_IDS.CREATE_ROUTE
      setRoutePanelIds(updateRoutePanelIds);
      calculateTotalHeight(updateRoutePanelIds);
    }
  }, [pathname, prevPathname, calculateTotalHeight]);

  useEffect(() => {
    // @ts-ignore
    if (prevWidth && ((prevWidth >= 850 && width <= 850) || (prevWidth <= 850 && width >= 850))) {
      calculateTotalHeight();
    }
  }, [calculateTotalHeight, prevWidth, width]);

  useEffect(() => {
    if ((!prevWidth && width) || (prevWidth && prevWidth !== width)) {
      if (isMobileView && width > settings.MIN_DESKTOP_WIDTH) setIsMobileView(false);
      else if (!isMobileView && width <= settings.MIN_DESKTOP_WIDTH) setIsMobileView(true);
    }
  }, [isMobileView, prevWidth, width]);

  const value = {
    unusableCenterPanelHeight,
    unusableRightPanelHeight,
    isMobileView,
    calculateTotalHeight,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
