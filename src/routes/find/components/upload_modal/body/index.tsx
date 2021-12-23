import './index.scss';

import { ReactElement, SyntheticEvent, useCallback, useState } from 'react';
import { BiArrowToBottom } from 'react-icons/bi';

import GigButton from 'components/gig_button';
import FileList from 'routes/find/components/upload_modal/body/files_list';
import { UploadFile } from 'types';
import generateGUID from 'utils/generateGUID';

interface BodyProps {
  isUploadInProgress: boolean,
  uploadFiles: UploadFile[],
  setUploadFiles: (uploadFiles: UploadFile[]) => void,
};

const Body = (props: BodyProps): ReactElement => {
  // destructured props
  const { isUploadInProgress, uploadFiles, setUploadFiles } = props;
  // local state variables and functions
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const getIsAllowedDocumentType = useCallback((type: string): boolean => {
    return (
      type === 'application/pdf' ||
      type === 'application/msword' ||
      type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  }, []);

  const addUploadFileToList = useCallback((selectedFiles: FileList): void => {
    if (selectedFiles && selectedFiles.length > 0) {
      // @ts-ignore
      delete selectedFiles.length;
      const files = Object.values(selectedFiles)
        // @ts-ignore
        .filter(file => getIsAllowedDocumentType(file.type))
        // @ts-ignore
        .map(file => { return { id: generateGUID(), name: file.name, status: undefined } });
      setUploadFiles(uploadFiles ? [...uploadFiles, ...files] : files);
    }
  }, [uploadFiles, getIsAllowedDocumentType, setUploadFiles]);

  const handleDocumentsDrop = useCallback((event): void => {
    if (!isUploadInProgress) {
      event.preventDefault();
      event.stopPropagation();
      addUploadFileToList(event.dataTransfer.files);
      setIsDraggingOver(false);
    }
  }, [addUploadFileToList, isUploadInProgress]);

  const onDragEnter = useCallback((event: SyntheticEvent): void => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const onDragLeave = useCallback((event: SyntheticEvent): void => {
    event.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleClick = useCallback((event: SyntheticEvent): void => {
    if (!isUploadInProgress) {
      event.preventDefault();
      event.stopPropagation();
      // @ts-ignore
      document.querySelector('#document-drop-zone-input').click();
    }
  }, [isUploadInProgress]);

  const dragOverDisplay = (
    <div id='drag-over-display' className='header-text'>
      Drop files here
      <BiArrowToBottom />
    </div>
  );

  const noUploadFilesText = (
    <div id='no-files-text' className='text-center'>
      <h5>Drag files here</h5>
      <h5>or</h5>
      <GigButton
        classNames='secondary-blue dark-background'
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
            : !!uploadFiles.length
              ? (
                <FileList
                  isUploadInProgress={isUploadInProgress}
                  uploadFiles={uploadFiles}
                  setUploadFiles={setUploadFiles}
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
};

export default Body;
