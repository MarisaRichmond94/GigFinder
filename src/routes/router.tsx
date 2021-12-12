import { ReactElement, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { useAuth } from 'providers/auth';
import { EmployerProvider } from 'providers/employer';
import { UserProvider } from 'providers/user';
import HomePage from 'routes/home';
import CreatePage from 'routes/create';
import FindPage from 'routes/find';
import settings from 'settings';

const GigRouter = (): ReactElement => {
  return (
    <Switch>
      <Route exact path={settings.HOME_ROUTE} component={HomeRoute} />
      <Route path={settings.CREATE_ROUTE} component={CreateRoute} />
      <Route path={settings.FIND_ROUTE} component={FindRoute} />
    </Switch>
  );
}

const HomeRoute = (): ReactElement => {
  useEffect(() => {
    const localUserId = window.localStorage.getItem('userId');
    const localEmployerId = window.localStorage.getItem('employerId');
    if (localUserId || localEmployerId) window.localStorage.clear();
  }, []);

  return (
    <HomePage />
  );
}

const CreateRoute = (): ReactElement => {
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user) history.replace(settings.FIND_ROUTE);
  }, [user, history]);

  return (
    <EmployerProvider>
      <CreatePage />
    </EmployerProvider>
  );
};

const FindRoute = (): ReactElement => {
  const history = useHistory();
  const { employer } = useAuth();

  useEffect(() => {
    if (employer) history.replace(settings.CREATE_ROUTE);
  }, [employer, history]);

  return (
    <UserProvider>
      <FindPage />
    </UserProvider>
  );
};

export default GigRouter;
