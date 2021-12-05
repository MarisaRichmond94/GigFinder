import './index.scss';

import { ReactElement } from 'react';

import EditPanel from 'routes/create/components/gig_details_modal/body/edit_panel';
import ViewPanel from 'routes/create/components/gig_details_modal/body/view_panel';
import { Gig } from 'types';

type BodyProps = {
  gig: Gig,
  isInEditMode: boolean,
}

const Body = (props: BodyProps): ReactElement => {
  return (
    <div id='gig-details-modal-body'>
      {props.isInEditMode ? <EditPanel gig={props.gig} /> : <ViewPanel gig={props.gig} />}
    </div>
  );
}

export default Body;
