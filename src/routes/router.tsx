import { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './home';
import CreatePage from './create';
import FindPage from './find';

const GigRouter = (): ReactElement => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/create' component={CreatePage} />
      <Route path='/find' component={FindPage} />
    </Switch>
  );
}

export default GigRouter;
