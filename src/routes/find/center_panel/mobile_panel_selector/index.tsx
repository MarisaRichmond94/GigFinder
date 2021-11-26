import './index.scss'

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';

interface MobilePanelSelectorProps {
  isShowingSearchResults: boolean,
  setIsShowingSearchResults: (isShowingSearchResults: boolean) => void,
}

const MobilePanelSelector = (props: MobilePanelSelectorProps): ReactElement => {
  return (
    <div id='mobile-panel-selector'>
      <GigButton
        classNames={
          `${props.isShowingSearchResults ? 'active ' : ''}underline-text off-black header-text`
        }
        id='results-panel-selector-button'
        onClick={() => props.setIsShowingSearchResults(true)}
        text='Results'
      />
      <GigButton
        classNames={
          `${!props.isShowingSearchResults ? 'active ' : ''}underline-text off-black header-text`
        }
        id='favorites-panel-selector-button'
        onClick={() => props.setIsShowingSearchResults(false)}
        text='Favorites'
      />
    </div>
  );
}

export default MobilePanelSelector;
