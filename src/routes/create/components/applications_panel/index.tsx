import './index.scss';

import { ReactElement, useEffect } from 'react';

import GigDropdown from 'components/gig_input/dropdown';
import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useApplications } from 'providers/applications';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import Actions from 'routes/create/components/applications_panel/actions';
import ApplicationsList from 'routes/create/components/applications_panel/list';

const ApplicationsPanel = (): ReactElement => {
  // context provider variables and functions
  const { employer } = useAuth();
  const { applications, filteredApplications } = useApplications();
  const { filterApplicationsByGigId, initializeApplications } = useApplications();
  const { activeGig, gigs, setActiveGig } = useEmployer();
  // hook variables
  const prevActiveGigId = usePrevious(activeGig?.id);
  // derived variables
  const displayApplications = activeGig ? filteredApplications : applications;

  useEffect(() => {
    initializeApplications(employer.name);
    setActiveGig(undefined);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeGig && activeGig.id !== prevActiveGigId) {
      filterApplicationsByGigId(activeGig.id);
    }
  }, [activeGig, prevActiveGigId, filterApplicationsByGigId]);

  if (displayApplications === undefined) {
    return (
      <div id='applications-panel'>
        <GigLoader color='#5BA1C5' type='cylon'/>
      </div>
    );
  };

  return (
    <div id='applications-panel'>
      <GigDropdown
        classNames='off-white'
        id='applications-panel-gig-filter'
        options={
          gigs?.map(gig => {
            return {
              id: gig.id,
              displayName: gig.title,
              onClick: () => setActiveGig(gig),
            }
          }) || []
        }
        placeholder='Select an active posting to filter candidates by...'
        selectedOption={activeGig ? { displayName: activeGig.title } : undefined}
      />
      <hr className='applications-panel-divider' />
      <ApplicationsList applications={displayApplications} />
      <hr className='applications-panel-divider' />
      <Actions />
    </div>
  );
};

export default ApplicationsPanel;
