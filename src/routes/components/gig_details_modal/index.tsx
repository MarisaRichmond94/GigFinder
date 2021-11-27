import './index.scss';

import { ReactElement } from 'react';

import GigModal from 'components/gig_modal';
import { useUser } from 'providers/user';
import Body from 'routes/components/gig_details_modal/body';
import Footer from 'routes/components/gig_details_modal/footer';
import Header from 'routes/components/gig_details_modal/header';
import { Gig } from 'types';

type GigDetailsModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const GigDetailsModal = (props: GigDetailsModalProps): ReactElement => {
  const { activeGig, updateActiveGig } = useUser();
  if (!activeGig) return null;

  const applyCallback = (activeResumeId: string): void => {
    updateActiveGig(undefined);
  }

  const cancel = (): void => {
    updateActiveGig(undefined);
    props.setIsOpen(false);
  }

  return (
    <div id='gig-details-modal'>
      <GigModal
        bodyContent={<Body gig={activeGig} />}
        headerContent={<Header gig={activeGig} />}
        footerContent={<Footer gig={activeGig} applyCallback={applyCallback} cancel={cancel} />}
        id='gig-details-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default GigDetailsModal;
