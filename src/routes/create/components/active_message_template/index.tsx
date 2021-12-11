import './index.scss';

import { ReactElement } from 'react';
import { FaFileAlt } from 'react-icons/fa';

import GigDropdown from 'components/gig_input/dropdown';
import { useEmployer } from 'providers/employer';

interface ActiveMessageTemplateProps {
  isDisplayHeader?: boolean,
  isMobileView?: boolean,
}

const ActiveMessageTemplate = (props: ActiveMessageTemplateProps): ReactElement => {
  // context variables and functions
  const {
    activeMessageTemplateId,
    messageTemplates,
    updateActiveMessageTemplateId,
  } = useEmployer();
  // derived variables
  const doesEmployerHaveMessageTemplates = !!messageTemplates?.length;
  const activeMessageTemplate = messageTemplates?.find(
    template => template.id === activeMessageTemplateId,
  );
  const isDisplayHeader = props.isDisplayHeader || true;

  return (
    <div
      id='active-message-template-section'
      className={props.isMobileView ? 'mobile-view' : 'desktop-view'}
    >
      {
        isDisplayHeader &&
        <div id='active-message-template-header' className='header-text'>
          <FaFileAlt id='active-message-template-header-icon' />&nbsp;
          Active Message Template
        </div>
      }
      <GigDropdown
        classNames='off-white-gig-dropdown'
        id='active-message-template-dropdown'
        isDisabled={!doesEmployerHaveMessageTemplates}
        options={
          messageTemplates?.map(messageTemplate => {
            return {
              id: messageTemplate.id,
              displayName: messageTemplate.name,
              onClick: () => updateActiveMessageTemplateId(messageTemplate.id),
            };
          }) || []
        }
        placeholder={
          doesEmployerHaveMessageTemplates ? 'Select A Message Template' : 'No Message Templates'
        }
        selectedOption={
          activeMessageTemplateId ? { displayName: activeMessageTemplate.name } : undefined
        }
      />
    </div>
  );
};

export default ActiveMessageTemplate;
