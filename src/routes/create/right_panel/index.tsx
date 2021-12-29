import './index.scss';

import { ReactElement, useEffect } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaPenNib } from 'react-icons/fa';

import CollapsableSection from 'components/collapsable_section';
import GigButton from 'components/gig_button';
import { useApp } from 'providers/app';
import { useAuth } from 'providers/auth';
import GigCreationPanel from 'routes/create/components/gig_creation_panel';
import MessageTemplatePanel from 'routes/create/components/message_template_panel';

const RightPanel = (): ReactElement => {
  // provider variables and functions
  const { unusableRightPanelHeight, calculateTotalHeight } = useApp();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    setTimeout(() => { calculateTotalHeight(); }, 500);
    // eslint-disable-next-line
  }, []);

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
      <CollapsableSection
        classNames='off-white'
        icon={<FaPenNib />}
        id='message-template-section'
        onToggleCallback={calculateTotalHeight}
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
        <GigCreationPanel unusableHeight={unusableRightPanelHeight} />
      </CollapsableSection>
    </div>
  );
};

export default RightPanel;
