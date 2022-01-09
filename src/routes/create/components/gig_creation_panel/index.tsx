import './index.scss';

import { ReactElement } from 'react';

import GigCreationActions from 'routes/create/components/gig_creation_panel/actions';
import BenefitsInput from 'routes/create/components/inputs/benefits';
import DescriptionInput from 'routes/create/components/inputs/description';
import LocationInput from 'routes/create/components/inputs/location';
import RequirementsInput from 'routes/create/components/inputs/requirements';
import SalaryInput from 'routes/create/components/inputs/salary';
import TitleInput from 'routes/create/components/inputs/title';
import TypeInput from 'routes/create/components/inputs/type';

type GigCreationPanelProps = {
  unusableHeight?: number,
};

const GigCreationPanel = (props: GigCreationPanelProps): ReactElement => {
  const listStyling = props.unusableHeight
    ? { maxHeight: `calc(100vh - ${props.unusableHeight}px)`}
    : {};

  return (
    <>
      <div
        id='gig-creation-panel'
        className={`panel ${props.unusableHeight ? 'right-sidebar' : 'center-panel'}`}
        style={listStyling}
      >
        <TitleInput />
        <TypeInput />
        <LocationInput />
        <BenefitsInput />
        <DescriptionInput />
        <RequirementsInput />
        <SalaryInput />
      </div>
      <GigCreationActions />
    </>
  );
};

export default GigCreationPanel;
