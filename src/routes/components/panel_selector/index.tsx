import { ReactElement } from 'react';

import SelectorButton from 'routes/components/panel_selector/selector_button';
import { PanelTypes } from 'types';

interface PanelSelectorProps {
  activePanel: PanelTypes,
  buttonClasses?: string,
  id: string,
  panels: string[],
  setActivePanel: (activePanel: PanelTypes) => void,
}

const PanelSelector = (props: PanelSelectorProps): ReactElement => {
  return (
    <div id={props.id}>
      {
        props.panels.map(panel => {
          return (
            <SelectorButton
              buttonClasses={props.buttonClasses}
              isActive={props.activePanel === panel}
              key={`panel-selector-${panel}`}
              panelType={panel.charAt(0).toUpperCase() + panel.slice(1)}
              setActivePanel={props.setActivePanel}
            />
          )
        })
      }
    </div>
  );
}

export default PanelSelector;
