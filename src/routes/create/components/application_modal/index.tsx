import { ReactElement } from 'react';

import GigModal from 'components/gig_modal';
import { useApplications } from 'providers/applications';
import Body from 'routes/create/components/application_modal/body';
import Footer from 'routes/create/components/application_modal/footer';
import Header from 'routes/create/components/application_modal/header';

type ApplicationModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const ApplicationModal = (props: ApplicationModalProps): ReactElement => {
  // context provider variables and functions
  const { activeApplication } = useApplications();

  if (!activeApplication) return null;

  return (
    <div id='application-modal'>
      <GigModal
        bodyContent={<Body application={activeApplication} />}
        classNames='white'
        headerContent={<Header application={activeApplication} />}
        footerContent={<Footer close={() => props.setIsOpen(false)} />}
        id='application-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default ApplicationModal;
