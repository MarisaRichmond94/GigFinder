import './index.scss';

import { ReactElement } from 'react';

import GigModal from 'components/gig_modal';
import { useSearch } from 'providers/search';
import Body from 'routes/components/gig_details_modal/body';
import Footer from 'routes/components/gig_details_modal/footer';
import Header from 'routes/components/gig_details_modal/header';
import { Gig } from 'types';

type GigDetailsModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const GigDetailsModal = (props: GigDetailsModalProps): ReactElement => {
  const { activeGig, updateActiveGig } = useSearch();
  if (!activeGig) return null;

  const apply = (activeResumeId: string): void => {
    if (activeResumeId) {
      console.log('You did it!');
    }
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
        footerContent={<Footer gig={activeGig} apply={apply} cancel={cancel} />}
        id='gig-details-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default GigDetailsModal;
