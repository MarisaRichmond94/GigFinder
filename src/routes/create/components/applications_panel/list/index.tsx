import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useApplications } from 'providers/applications';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import ApplicationModal from 'routes/create/components/application_modal';
import ApplicationItem from 'routes/create/components/applications_panel/item';
import settings from 'settings';
import { Application } from 'types';

type ApplicationsListProps = {
  applications?: Application[],
}

const ApplicationsList = (props: ApplicationsListProps): ReactElement => {
  // context provider variables and functions
  const { employer } = useAuth();
  const {
    selectedApplicationIds,
    setActiveApplication,
    toggleApplicationIsSelected,
  } = useApplications();
  const { activeGig } = useEmployer();
  // local variables and functions
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  // hook variables
  const prevApplications = usePrevious(props.applications);

  useEffect(() => {
    if (!prevApplications && props.applications?.length) {
      setResultsCount(
        props.applications.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : props.applications.length
      );
    };
  }, [props.applications, prevApplications]);

  const buildApplicationsList = (): ReactElement[] => {
    const visibleApplications = props.applications.slice(0, resultsCount + 1);
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
  };

  const getMoreApplications = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= props.applications.length
        ? nextResultsCount
        : props.applications.length
    );
  };

  const viewApplicationDetails = (application: Application): void => {
    setActiveApplication(application);
    setIsApplicationModalOpen(true);
  };

  if (props.applications === undefined) {
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
        props.applications.length
          ? (
            <InfiniteScroll
              dataLength={resultsCount}
              next={getMoreApplications}
              hasMore={resultsCount !== props.applications.length}
              loader={<GigLoader color='#5BA1C5' height='5%' type='cylon' />}
              scrollableTarget='applications-list'
            >
              {buildApplicationsList()}
            </InfiniteScroll>
          )
          : (
            <div id='no-applications' className='header-text'>
              {
                !!activeGig
                  ? `There are no open applications for the ${activeGig.title} role`
                  : `${employer.name} has no active applications`
              }
            </div>
          )
      }
    </div>
  );
};

export default ApplicationsList;
