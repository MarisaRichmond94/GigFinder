import './index.scss';

import { ReactElement } from 'react';
import { AiOutlineDelete, AiOutlineFileDone, AiOutlineFileText } from 'react-icons/ai';

import GigButton from 'components/gig_button';

interface FileListProps {
  isUploadInProgress: boolean,
  setUploadFiles: (uploadFiles: any[]) => void,
  uploadFiles: any[],
}

const FileList = (props: FileListProps): ReactElement => {
  const deleteUploadFile = (event: any, index: number): void => {
    event.preventDefault();
    event.stopPropagation();
    if (!props.isUploadInProgress) {
      const uploadFiles = [...props.uploadFiles];
      uploadFiles.splice(index, 1);
      props.setUploadFiles(uploadFiles);
    }
  };

  const buildUploadFilesList = (): ReactElement[] => {
    return props.uploadFiles.map((uploadFile, index) => {
      return (
        <div className='upload-file sub-header-text' key={`upload-file-${uploadFile.name}`}>
          {uploadFile.status ? <AiOutlineFileDone /> : <AiOutlineFileText />}
          <div className='upload-file-name sub-header-text'>
            {uploadFile.name}
          </div>
          <GigButton
            classNames='upload-file-delete-button icon-button off-black'
            id={`${uploadFile.name}-delete-button`}
            onClick={event => deleteUploadFile(event, index)}
            textBlock={<AiOutlineDelete />}
          />
        </div>
      );
    })
  }

  return (
    <div id='upload-files-list'>
      {buildUploadFilesList()}
    </div>
  );
};

export default FileList;
