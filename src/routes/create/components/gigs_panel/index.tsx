import './index.scss';

import { ReactElement, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import icon from 'assets/icons/gigs.svg';
import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import buildNoPanelContent from 'libs/no_panel_content';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import { GigFormProvider } from 'providers/gig_form';
import GigDetailsModal from 'routes/create/components/gig_details_modal';
import GigItem from 'routes/create/components/gigs_panel/item';
import settings from 'settings';

const GigsPanel = (): ReactElement => {
  // provider variables and functions
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

  const viewGigDetails = useCallback((gigId: string): void => {
    const matchingGig = gigs?.find(gig => gig.id === gigId);
    if (matchingGig) {
      setActiveGig(matchingGig);
      setIsGigDetailsModalOpen(true);
    };
  }, [gigs, setActiveGig]);

  const buildGigsList = useCallback((): ReactElement[] => {
    const visibleGigs = gigs.slice(0, resultsCount + 1);
    return visibleGigs?.map(
      gig => <GigItem key={`gig-item-${gig.id}`} item={gig} viewGigDetails={viewGigDetails} />,
    );
  }, [gigs, resultsCount, viewGigDetails]);

  const getMoreGigs = useCallback((): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(nextResultsCount <= gigs.length ? nextResultsCount : gigs.length);
  }, [gigs?.length, resultsCount]);

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
          : buildNoPanelContent(`${employer.name} has no active gigs`, icon, true)
      }
    </div>
  );
};

export default GigsPanel;
