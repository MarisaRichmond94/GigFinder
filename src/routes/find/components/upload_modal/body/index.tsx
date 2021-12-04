import './index.scss';

import { ReactElement, SyntheticEvent, useState } from 'react';
import { BiArrowToBottom } from 'react-icons/bi';

import GigButton from 'components/gig_button';
import FileList from 'routes/find/components/upload_modal/body/files_list';
import { UploadFile } from 'types';
import generateUUID from 'utils/generateGUID';

interface BodyProps {
  isUploadInProgress: boolean,
  uploadFiles: UploadFile[],
  setUploadFiles: (uploadFiles: UploadFile[]) => void,
}

const Body = (props: BodyProps): ReactElement => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const getIsAllowedDocumentType = (type: string): boolean => {
    return (
      type === 'application/pdf' ||
      type === 'application/msword' ||
      type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  };

  const addUploadFileToList = (selectedFiles: FileList): void => {
    if (selectedFiles && selectedFiles.length > 0) {
      // @ts-ignore
      delete selectedFiles.length;
      const files = Object.values(selectedFiles)
        // @ts-ignore
        .filter(file => getIsAllowedDocumentType(file.type))
        // @ts-ignore
        .map(file => { return { id: generateUUID(), name: file.name, status: undefined } });
      props.setUploadFiles([...props.uploadFiles, ...files]);
    }
  }

  const handleDocumentsDrop = (event): void => {
    if (!props.isUploadInProgress) {
      event.preventDefault();
      event.stopPropagation();
      addUploadFileToList(event.dataTransfer.files);
      setIsDraggingOver(false);
    }
  }

  const onDragEnter = (event: SyntheticEvent): void => {
    event.preventDefault();
    setIsDraggingOver(true);
  }

  const onDragLeave = (event: SyntheticEvent): void => {
    event.preventDefault();
    setIsDraggingOver(false);
  }

  const handleClick = (event: SyntheticEvent): void => {
    if (!props.isUploadInProgress) {
      event.preventDefault();
      event.stopPropagation();
      // @ts-ignore
      document.querySelector('#document-drop-zone-input').click();
    }
  }

  const dragOverDisplay = (
    <div id='drag-over-display' className='header-text'>
      Drop files here
      <BiArrowToBottom id='drag-over-icon'/>
    </div>
  );

  const noUploadFilesText = (
    <div id='no-files-text' className='text-center'>
      <h5 className='upload-instructions'>Drag files here</h5>
      <h5 className='upload-instructions'>or</h5>
      <GigButton
        classNames='secondary-blue dark-background'
        id='browse-files-button'
        text='Click To Browse'
        onClick={() => { }}
      />
    </div>
  );

  return (
    <div id='upload-body-container'>
      <div
        id={isDraggingOver ? 'drop-zone-dragging-hover' : 'file-upload-drop-zone'}
        onDragOver={onDragEnter}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={e => handleDocumentsDrop(e)}
        onClick={e => handleClick(e)}
      >
        {
          isDraggingOver
            ? dragOverDisplay
            : props.uploadFiles.length
              ? (
                <FileList
                  isUploadInProgress={props.isUploadInProgress}
                  uploadFiles={props.uploadFiles}
                  setUploadFiles={props.setUploadFiles}
                />
              )
              : noUploadFilesText
        }
      </div>
      <input
        id='document-drop-zone-input'
        type='file'
        multiple
        accept='application/pdf'
        onChange={e => addUploadFileToList(e.target.files)}
      />
    </div>
  );
}

export default Body;
