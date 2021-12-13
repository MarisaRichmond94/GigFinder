import './index.scss';

import { ReactElement } from 'react';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

import GigButton from 'components/gig_button';
import Body from 'routes/create/components/applications_panel/item/body';
import Header from 'routes/create/components/applications_panel/item/header';
import { Application } from 'types';

type ApplicationItemProps = {
  item: Application,
  isSelected: boolean,
  toggleApplicationSelect: (applicationId: string) => void,
  viewApplicationDetails: (application: Application) => void,
};

const ApplicationItem = (props: ApplicationItemProps): ReactElement => {
  const { id } = props.item;

  return (
    <div className='application-container'>
      {
        <GigButton
          classNames='icon-button off-black'
          id={`application-checkbox-${id}`}
          onClick={() => props.toggleApplicationSelect(id)}
          textBlock={props.isSelected ? <BsCheckSquare /> : <BsSquare />}
        />
      }
      <div className='application'>
        <Header item={props.item} />
        <Body item={props.item} />
        <div className='application-footer'>
          <GigButton
            classNames='primary-blue'
            id={`application-details-button-${id}`}
            onClick={() => props.viewApplicationDetails(props.item)}
            text='View Details'
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
