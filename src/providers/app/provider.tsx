import AppContext from './context';

const AppProvider = (props: object) => {
  const value = {

  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
