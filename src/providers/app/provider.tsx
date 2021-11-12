import AppContext from 'providers/app/context';

const AppProvider = (props: object) => {
  const value = {

  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
