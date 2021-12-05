import './index.scss';

import { ReactElement, useState } from 'react';

import GigModal from 'components/gig_modal';
import { useEmployer } from 'providers/employer';
import { useGigForm } from 'providers/gig_form';
import Body from 'routes/create/components/gig_details_modal/body';
import Footer from 'routes/create/components/gig_details_modal/footer';
import Header from 'routes/create/components/gig_details_modal/header';

type GigDetailsModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const GigDetailsModal = (props: GigDetailsModalProps): ReactElement => {
  // context provider variables and functions
  const { activeGig, setActiveGig, updateGig } = useEmployer();
  const { resetForm, submitForm } = useGigForm();
  // local state variables and functions
  const [isInEditMode, setIsInEditMode] = useState(false);

  if (!activeGig) return null;

  const toggleIsInEditMode = () => {
    const currIsInEditMode = !isInEditMode;
    if (!currIsInEditMode) {
      const updatedGig = submitForm(activeGig);
      updateGig(updatedGig);
    }
    setIsInEditMode(currIsInEditMode);
  }

  const cancel = (): void => {
    if (isInEditMode) {
      setIsInEditMode(false);
      resetForm(activeGig);
    } else {
      setActiveGig(undefined);
      setIsInEditMode(false);
      props.setIsOpen(false);
    }
  }

  return (
    <div id='gig-details-modal'>
      <GigModal
        bodyContent={<Body gig={activeGig} isInEditMode={isInEditMode} />}
        headerContent={<Header gig={activeGig} />}
        footerContent={
          <Footer
            cancel={cancel}
            isInEditMode={isInEditMode}
            toggleIsInEditMode={toggleIsInEditMode}
          />
        }
        id='gig-details-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default GigDetailsModal;
