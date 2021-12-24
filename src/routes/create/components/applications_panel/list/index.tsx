import { ReactElement, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import noResultsIcon from 'assets/icons/candidates.svg';
import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import buildNoPanelContent from 'libs/no_panel_content';
import { useApplications } from 'providers/applications';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import ApplicationModal from 'routes/create/components/application_modal';
import ApplicationItem from 'routes/create/components/applications_panel/item';
import settings from 'settings';
import { Application } from 'types';

type ApplicationsListProps = {
  applications?: Application[],
};

const ApplicationsList = (props: ApplicationsListProps): ReactElement => {
  // context provider variables and functions
  const { employer } = useAuth();
  const { selectedApplicationIds } = useApplications();
  const { setActiveApplication, toggleApplicationIsSelected } = useApplications();
  const { activeGig } = useEmployer();
  // local variables and functions
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  // destructured props
  const applications = props?.applications;
  // hook variables
  const prevApplications = usePrevious(applications);

  useEffect(() => {
    if (!prevApplications && applications?.length) {
      setResultsCount(
        applications.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : applications.length
      );
    };
  }, [applications, prevApplications]);

  const viewApplicationDetails = useCallback((application: Application): void => {
    setActiveApplication(application);
    setIsApplicationModalOpen(true);
  }, [setActiveApplication]);

  const buildApplicationsList = useCallback((): ReactElement[] => {
    const visibleApplications = applications.slice(0, resultsCount + 1);
    return visibleApplications?.map(
      application => (
        <ApplicationItem
          key={`application-item-${application.id}`}
          item={application}
          isSelected={!!selectedApplicationIds.find(x => x === application.id)}
          toggleApplicationSelect={toggleApplicationIsSelected}
          viewApplicationDetails={viewApplicationDetails}
        />
      )
    );
  }, [
    applications, resultsCount, selectedApplicationIds,
    toggleApplicationIsSelected, viewApplicationDetails,
  ]);

  const getMoreApplications = useCallback((): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= applications.length
        ? nextResultsCount
        : applications.length
    );
  }, [applications?.length, resultsCount]);

  if (applications === undefined) {
    return (
      <div id='applications-panel'>
        <GigLoader color='#5BA1C5' type='cylon'/>
      </div>
    );
  };

  return (
    <div id='applications-list'>
      <ApplicationModal isOpen={isApplicationModalOpen} setIsOpen={setIsApplicationModalOpen} />
      {
        applications.length
          ? (
            <InfiniteScroll
              dataLength={resultsCount}
              next={getMoreApplications}
              hasMore={resultsCount !== applications.length}
              loader={<GigLoader color='#5BA1C5' height='5%' type='cylon' />}
              scrollableTarget='applications-list'
            >
              {buildApplicationsList()}
            </InfiniteScroll>
          )
          : buildNoPanelContent(
            !!activeGig
              ? `There are no open applications for the ${activeGig.title} role`
              : `${employer.name} has no active applications`,
            noResultsIcon,
            true,
          )
      }
    </div>
  );
};

export default ApplicationsList;
