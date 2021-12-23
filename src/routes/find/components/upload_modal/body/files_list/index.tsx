import './index.scss';

import { ReactElement, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineFileDone, AiOutlineFileText } from 'react-icons/ai';

import GigButton from 'components/gig_button';

interface FileListProps {
  isUploadInProgress: boolean,
  uploadFiles: any[],
  setUploadFiles: (uploadFiles: any[]) => void,
};

const FileList = (props: FileListProps): ReactElement => {
  const { isUploadInProgress, uploadFiles, setUploadFiles } = props;

  const deleteUploadFile = useCallback((event: any, index: number): void => {
    event.preventDefault();
    event.stopPropagation();
    if (!isUploadInProgress) {
      const uploadedFiles = [...uploadFiles];
      uploadedFiles.splice(index, 1);
      setUploadFiles(uploadedFiles);
    }
  }, [isUploadInProgress, uploadFiles, setUploadFiles]);

  const buildUploadFilesList = useCallback((): ReactElement[] => {
    return uploadFiles.map((uploadFile, index) => {
      return (
        <div className='upload-file sub-header-text' key={`upload-file-${uploadFile.name}`}>
          {uploadFile.status ? <AiOutlineFileDone /> : <AiOutlineFileText />}
          <div className='upload-file-name sub-header-text'>{uploadFile.name}</div>
          <GigButton
            classNames='upload-file-delete-button icon-button off-black'
            onClick={event => deleteUploadFile(event, index)}
            textBlock={<AiOutlineDelete />}
          />
        </div>
      );
    })
  }, [deleteUploadFile, uploadFiles]);

  return (
    <div id='upload-files-list'>
      {buildUploadFilesList()}
    </div>
  );
};

export default FileList;
