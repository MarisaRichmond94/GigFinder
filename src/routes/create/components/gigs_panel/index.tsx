import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import { GigFormProvider } from 'providers/gig_form';
import GigDetailsModal from 'routes/create/components/gig_details_modal';
import GigItem from 'routes/create/components/gigs_panel/item';
import settings from 'settings';

const GigsPanel = (): ReactElement => {
  // context variables and functions
  const { employer } = useAuth();
  const { gigs, setActiveGig } = useEmployer();
  // local variables and functions
  const [isGigDetailsModalOpen, setIsGigDetailsModalOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  // hook variables
  const prevGigs = usePrevious(gigs);

  useEffect(() => {
    if (!prevGigs && gigs?.length) {
      setResultsCount(
        gigs.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : gigs.length
      );
    };
  }, [gigs, prevGigs]);

  const viewGigDetails = (gigId: string): void => {
    const matchingGig = gigs?.find(gig => gig.id === gigId);
    if (matchingGig) {
      setActiveGig(matchingGig);
      setIsGigDetailsModalOpen(true);
    }
  }

  const buildGigsList = (): ReactElement[] => {
    const visibleGigs = gigs.slice(0, resultsCount + 1);
    return visibleGigs?.map(
      gig => (
        <GigItem
          key={`gig-item-${gig.id}`}
          item={gig}
          viewGigDetails={viewGigDetails}
        />
      )
    );
  };

  const getMoreGigs = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(nextResultsCount <= gigs.length ? nextResultsCount : gigs.length);
  };

  if (gigs === undefined) {
    return (
      <div id='gigs-panel'>
        <GigLoader color='#5BA1C5' type='cylon'/>
      </div>
    );
  };

  return (
    <div id='gigs-panel'>
      <GigFormProvider>
        <GigDetailsModal isOpen={isGigDetailsModalOpen} setIsOpen={setIsGigDetailsModalOpen} />
      </GigFormProvider>
      {
        gigs.length
          ? (
            <InfiniteScroll
              dataLength={resultsCount}
              next={getMoreGigs}
              hasMore={resultsCount !== gigs.length}
              loader={<GigLoader color='#5BA1C5' height='5%' type='cylon' />}
              scrollableTarget='gigs-panel'
            >
              {buildGigsList()}
            </InfiniteScroll>
          )
          : (
            <div id='no-gigs' className='header-text'>
              {employer.name} has no active gigs
            </div>
          )
      }
    </div>
  );
}

export default GigsPanel;
