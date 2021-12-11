import './index.scss';

import { ReactElement } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaPenNib } from 'react-icons/fa';

import CollapsableSection from 'components/collapsable_section';
import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import ActiveMessageTemplate from 'routes/create/components/active_message_template';
import GigCreationPanel from 'routes/create/components/gig_creation_panel';
import MessageTemplatePanel from 'routes/create/components/message_template_panel';

const RightPanel = (): ReactElement => {
  // context variables and functions
  const { isLoggedIn, logout } = useAuth();

  return (
    <div id='right-panel'>
      {
        isLoggedIn &&
        <GigButton
          classNames='secondary-blue dark-background sub-header-text'
          id='employer-sign-out-button'
          onClick={logout}
          text='Sign Out'
        />
      }
      <ActiveMessageTemplate />
      <CollapsableSection
        classNames='off-white'
        icon={<FaPenNib />}
        id='message-template-section'
        sectionTitle='Message Templates'
      >
        <MessageTemplatePanel />
      </CollapsableSection>
      <CollapsableSection
        classNames='off-white'
        icon={<AiOutlineFileSearch />}
        id='gig-creation-section'
        sectionTitle='Post A New Gig'
      >
        <GigCreationPanel />
      </CollapsableSection>
    </div>
  );
}

export default RightPanel;
