import './index.scss';

import { ReactElement, useCallback, useState } from 'react';

import GigModal from 'components/gig_modal';
import { ReviewFormProvider } from 'providers/review_form';
import { useUser } from 'providers/user';
import Body from 'routes/find/components/gig_details_modal/body';
import Footer from 'routes/find/components/gig_details_modal/footer';
import Header from 'routes/find/components/gig_details_modal/header';

type GigDetailsModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
};

const GigDetailsModal = (props: GigDetailsModalProps): ReactElement => {
  // destructured props
  const { isOpen, setIsOpen } = props;
  // provider variables and functions
  const { activeGig, updateActiveGig } = useUser();
  // local state variables and functions
  const [isDetailPanel, setIsDetailPanel] = useState(true);

  const applyCallback = useCallback((): void => { updateActiveGig(undefined); }, [updateActiveGig]);

  const cancel = useCallback((): void => {
    updateActiveGig(undefined);
    setIsOpen(false);
    setIsDetailPanel(true);
  }, [setIsOpen, updateActiveGig]);

  if (!activeGig) return null;

  return (
    <GigModal
      bodyContent={
        <ReviewFormProvider>
          <Body gig={activeGig} isDetailPanel={isDetailPanel} setIsDetailPanel={setIsDetailPanel} />
        </ReviewFormProvider>
      }
      headerContent={<Header gig={activeGig} />}
      footerContent={<Footer gig={activeGig} applyCallback={applyCallback} cancel={cancel} />}
      id='find-gig-details-modal'
      isOpen={isOpen}
      maxWidth={1000}
    />
  );
};

export default GigDetailsModal;
