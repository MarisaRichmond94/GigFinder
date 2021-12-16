import { ReactElement } from 'react';

const buildNoPanelContent = (text: string, icon: any, isCenterPanel: boolean): ReactElement => {
  return (
    <div
      className={
        `header-text no-contents-message ${isCenterPanel ? 'center-panel' : 'right-panel'}`
      }
    >
      <img alt='empty-results-icon' src={icon} />
      <div className='header-text text-center'>
        {text}
      </div>
    </div>
  );
};

export default buildNoPanelContent;
