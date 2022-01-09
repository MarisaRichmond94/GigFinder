import './index.scss';

import { ReactElement, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import icon from 'assets/icons/applications.svg';
import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import buildNoPanelContent from 'libs/no_panel_content';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import GigApplicationItem from 'routes/find/components/applications/item';
import GigDetailsModal from 'routes/find/components/gig_details_modal';
import settings from 'settings';
import { Gig } from 'types';

type UserApplicationsPanelProps = {
  isCenterPanel?: boolean,
  unusableHeight?: number,
};

const UserApplicationsPanel = (props: UserApplicationsPanelProps): ReactElement => {
  // context variables and functions
  const { isLoggedIn } = useAuth();
  const { applications, updateActiveGig } = useUser();
  // local variables and functions
  const [resultsCount, setResultsCount] = useState(0);
  const [isGigDetailsModalOpen, setIsGigDetailsModalOpen] = useState(false);
  // hook variables
  const prevApplications = usePrevious(applications);
  // derived variables
  const listStyling = props.unusableHeight
    ? { maxHeight: `calc(100vh - ${props.unusableHeight - 10}px)`}
    : {};

  useEffect(() => {
    if (!prevApplications && applications?.length) {
      setResultsCount(
        applications.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : applications.length
      );
    }
    // eslint-disable-next-line
  }, [applications, prevApplications]);

  const learnMoreAboutGig = useCallback((gig: Gig): void => {
    updateActiveGig(gig);
    setIsGigDetailsModalOpen(true);
  }, [updateActiveGig]);

  const buildApplications = useCallback((): ReactElement[] => {
    return applications.map(gigApplication => {
      return (
        <GigApplicationItem
          key={`gig-application-item-${gigApplication.id}`}
          item={gigApplication}
          learnMoreAboutGig={learnMoreAboutGig}
        />
      );
    });
  }, [applications, learnMoreAboutGig]);

  const getMoreApplications = useCallback((): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= applications.length
        ? nextResultsCount
        : applications.length
    );
  }, [applications?.length, resultsCount]);

  if (!applications.length) {
    return (
      <div id='gig-applications-panel'>
        {
          isLoggedIn
            ? buildNoPanelContent('You have no active applications', icon, props.isCenterPanel)
            : buildNoPanelContent(
              'Create an account or sign in to easily apply to gigs in seconds',
              icon,
              props.isCenterPanel,
            )
        }
      </div>
    );
  };

  return (
    <div className='panel' id='gig-applications-panel'>
      <GigDetailsModal isOpen={isGigDetailsModalOpen} setIsOpen={setIsGigDetailsModalOpen} />
      <div id='gig-applications-list' style={listStyling}>
        <InfiniteScroll
          dataLength={resultsCount}
          next={getMoreApplications}
          hasMore={resultsCount !== applications.length}
          loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
          scrollableTarget='gig-applications-list'
        >
          {buildApplications()}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default UserApplicationsPanel;
