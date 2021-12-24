import { ReactElement } from 'react';

import SelectorButton from 'routes/components/panel_selector/selector_button';

interface PanelSelectorProps {
  activePanel: any,
  buttonClasses?: string,
  hiddenPanels?: any[],
  id: string,
  panels: string[],
  setActivePanel: (activePanel: any) => void,
};

const PanelSelector = (props: PanelSelectorProps): ReactElement => {
  return (
    <div id={props.id}>
      {
        props.panels.map(panel => {
          return (
            !props.hiddenPanels || !props.hiddenPanels.includes(panel)
              ? (
                <SelectorButton
                  buttonClasses={props.buttonClasses}
                  isActive={props.activePanel === panel}
                  key={`panel-selector-${panel}`}
                  panelType={panel.charAt(0).toUpperCase() + panel.slice(1)}
                  setActivePanel={props.setActivePanel}
                />
              )
            : null
          )
        })
      }
    </div>
  );
};

export default PanelSelector;
