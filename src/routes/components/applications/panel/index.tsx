import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import GigApplicationItem from 'routes/components/applications/item';
import GigDetailsModal from 'routes/components/gig_details_modal';
import settings from 'settings';
import { Gig } from 'types';

const UserApplicationsPanel = (): ReactElement => {
  // context variables and functions
  const { isLoggedIn } = useAuth();
  const { gigApplications, updateActiveGig } = useUser();
  // local variables and functions
  const [resultsCount, setResultsCount] = useState(0);
  const [isGigDetailsModalOpen, setIsGigDetailsModalOpen] = useState(false);
  // hook variables
  const prevGigApplications = usePrevious(gigApplications);

  useEffect(() => {
    if (!prevGigApplications && gigApplications?.length) {
      setResultsCount(
        gigApplications.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : gigApplications.length
      );
    }
    // eslint-disable-next-line
  }, [gigApplications, prevGigApplications]);

  const buildGigApplications = (): ReactElement[] => {
    return gigApplications.map(gigApplication => {
      return (
        <GigApplicationItem
          key={`gig-application-item-${gigApplication.id}`}
          item={gigApplication}
          learnMoreAboutGig={learnMoreAboutGig}
        />
      )
    });
  }

  const getMoreGigApplications = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= gigApplications.length
        ? nextResultsCount
        : gigApplications.length
    );
  };

  const learnMoreAboutGig = (gig: Gig): void => {
    if (gig) {
      updateActiveGig(gig);
      setIsGigDetailsModalOpen(true);
    }
  }

  return (
    <div id='gig-applications-panel'>
      <GigDetailsModal isOpen={isGigDetailsModalOpen} setIsOpen={setIsGigDetailsModalOpen} />
      {
        gigApplications?.length
          ? (
            <div id='gig-applications-list'>
              <InfiniteScroll
                dataLength={resultsCount}
                next={getMoreGigApplications}
                hasMore={resultsCount !== gigApplications.length}
                loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
                scrollableTarget='gig-applications-list'
              >
                {buildGigApplications()}
              </InfiniteScroll>
            </div>
          )
          : (
            <div className='sub-header-text' id='no-gig-applications-message'>
              {
                isLoggedIn
                  ? 'You have no active gig applications'
                  : 'Log in or create an account to easily apply to gigs in seconds'
              }
            </div>
          )
      }
    </div>
  );
}

export default UserApplicationsPanel;
