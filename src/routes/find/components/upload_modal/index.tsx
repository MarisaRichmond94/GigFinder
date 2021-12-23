import { ReactElement, useCallback, useState } from 'react';

import GigModal from 'components/gig_modal';
import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import Body from 'routes/find/components/upload_modal/body';
import { UploadFile } from 'types';

type UploadModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
};

const UploadModal = (props: UploadModalProps): ReactElement => {
  // destructured props
  const { isOpen, setIsOpen } = props;
  // provider variables and functions
  const { user } = useAuth();
  const userId = user?.id;
  const { uploadResumes } = useUser();
  // local state variables and functions
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const upload = useCallback(async() => {
    if (!isUploadInProgress) {
      setIsUploadInProgress(true);
      let resumes = [];
      for (let index = 0; index < uploadFiles.length; index++) {
        const updatedUploadFile = uploadFiles[index];
        resumes.push({
          id: updatedUploadFile.id,
          name: updatedUploadFile.name,
          userId,
        });
        updatedUploadFile.status = 'Success';
        const uploadFilesCopy = [...uploadFiles];
        uploadFilesCopy.splice(index, 1, updatedUploadFile);
        setUploadFiles(uploadFilesCopy);
      }
      uploadResumes(resumes);
      setUploadFiles([]);
      setIsOpen(false);
    }
  }, [isUploadInProgress, uploadFiles, userId, setIsOpen, uploadResumes]);

  const cancel = useCallback(() => {
    setUploadFiles([]);
    setIsOpen(false);
  }, [setIsOpen]);

  const footerContent = (
    <div>
      <GigButton
        classNames='medium-grey dark-background sub-header-text'
        onClick={cancel}
        text='Cancel'
      />
      <GigButton
        classNames='secondary-blue dark-background sub-header-text'
        onClick={upload}
        text='Upload'
      />
    </div>
  );

  return (
    <GigModal
      classNames='primary-blue'
      headerContent={<div className='thick header-text'>Upload Resume</div>}
      bodyContent={
        <Body
          isUploadInProgress={isUploadInProgress}
          uploadFiles={uploadFiles}
          setUploadFiles={setUploadFiles}
        />
      }
      footerContent={footerContent}
      id='upload-modal'
      isOpen={isOpen}
      maxWidth={1000}
    />
  );
};

export default UploadModal;
