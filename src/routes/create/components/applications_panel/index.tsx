import './index.scss';

import { ReactElement, useEffect } from 'react';

import GigDropdown from 'components/gig_input/dropdown';
import GigLoader from 'components/gig_loader';
import { useEmployer } from 'providers/employer';
import Actions from 'routes/create/components/applications_panel/actions';
import ApplicationsList from 'routes/create/components/applications_panel/list';

const ApplicationsPanel = (): ReactElement => {
  // context provider variables and functions
  const { activeGig, gigs, setActiveGig } = useEmployer();
  const { applications, filteredApplications } = useEmployer();
  // derived variables
  const displayApplications = activeGig ? filteredApplications : applications;

  useEffect(() => {
    setActiveGig(undefined);
    // eslint-disable-next-line
  }, []);

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
