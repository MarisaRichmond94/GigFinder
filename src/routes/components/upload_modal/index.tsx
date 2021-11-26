import './index.scss';

import { ReactElement, useState } from 'react';

import GigModal from 'components/gig_modal';
import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import Body from 'routes/components/upload_modal/body';
import { UploadFile } from 'types';

type UploadModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const UploadModal = (props: UploadModalProps): ReactElement => {
  const { user } = useAuth();
  const { uploadUserResumes } = useUser();
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const headerContent = (
    <div className='thick header-text' id='upload-header-container'>
      Upload Resume
    </div>
  );

  const upload = async() => {
    if (!isUploadInProgress) {
      setIsUploadInProgress(true);
      let userResumes = [];
      for (let index = 0; index < uploadFiles.length; index++) {
        const updatedUploadFile = uploadFiles[index];
        userResumes.push({
          id: updatedUploadFile.id,
          name: updatedUploadFile.name,
          userId: user.id,
        });
        updatedUploadFile.status = 'Success';
        const uploadFilesCopy = [...uploadFiles];
        uploadFilesCopy.splice(index, 1, updatedUploadFile);
        setUploadFiles(uploadFilesCopy);
      }
      uploadUserResumes(userResumes);
      setUploadFiles([]);
      props.setIsOpen(false);
    }
  }

  const cancel = () => {
    setUploadFiles([]);
    props.setIsOpen(false);
  }

  const footerContent = (
    <div id='upload-footer-container'>
      <GigButton
        classNames='medium-grey dark-background sub-header-text upload-modal-button'
        id='upload-modal-cancel-button'
        onClick={cancel}
        text='Cancel'
      />
      <GigButton
        classNames='secondary-blue dark-background sub-header-text upload-modal-button'
        id='upload-modal-upload-button'
        onClick={upload}
        text='Upload'
      />
    </div>
  );

  return (
    <div id='upload-modal-container'>
      <GigModal
        bodyContent={
          <Body
            isUploadInProgress={isUploadInProgress}
            uploadFiles={uploadFiles}
            setUploadFiles={setUploadFiles}
          />
        }
        headerContent={headerContent}
        footerContent={footerContent}
        id='upload-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default UploadModal;
