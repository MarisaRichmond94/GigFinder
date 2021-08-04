import { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './home';
import CreatePage from './create';
import SearchPage from './search';

const GigRouter = (): ReactElement => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/gig-create' component={CreatePage} />
      <Route path='/gig-search' component={SearchPage} />
    </Switch>
  );
}

export default GigRouter;
