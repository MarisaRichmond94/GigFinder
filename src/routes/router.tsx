import { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'routes/home';
import CreatePage from 'routes/create';
import FindPage from 'routes/find';
import settings from 'settings';

const GigRouter = (): ReactElement => {
  return (
    <Switch>
      <Route exact path={settings.HOME_ROUTE} component={HomePage} />
      <Route path={settings.CREATE_ROUTE} component={CreatePage} />
      <Route path={settings.FIND_ROUTE} component={FindPage} />
    </Switch>
  );
}

export default GigRouter;
