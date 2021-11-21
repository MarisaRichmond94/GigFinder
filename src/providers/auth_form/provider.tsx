import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import AuthFormContext from 'providers/auth_form/context';
import settings from 'settings';
import { AuthFieldType } from 'types';

const AuthFormProvider = (props: object) => {
  const { pathname } = useLocation();

  const [isUserAuth, setIsApplicationSignUp] = useState(pathname === settings.SEARCH_ROUTE);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [isValidName, setIsValidName] = useState(false);
  const [email, setEmail] = useState<string | undefined>();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState<string | undefined>();
  const [isValidPassword, setIsValidPassword] = useState(false);

  const resetForm = (): void => {
    setName(undefined);
    setEmail(undefined);
    setPassword(undefined);
    setIsValidName(false);
    setIsValidEmail(false);
    setIsValidPassword(false);
  }

  const getIsValidInput = (type: AuthFieldType): boolean => {
    switch (type) {
      case settings.AUTH_FIELD_TYPES.email:
        return isValidEmail;
      case settings.AUTH_FIELD_TYPES.name:
        return isValidName;
      case settings.AUTH_FIELD_TYPES.password:
        return isValidPassword;
      case settings.AUTH_FIELD_TYPES.all:
        return isSignUp
          ? isValidName && isValidEmail && isValidPassword
          : isValidEmail && isValidPassword;
      default:
        return false;
    }
  };

  const updateInput = (type: string, value: string): void => {
    switch (type) {
      case settings.AUTH_FIELD_TYPES.email:
        setEmail(value);
        break;
      case settings.AUTH_FIELD_TYPES.name:
        setName(value);
        break;
      case settings.AUTH_FIELD_TYPES.password:
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const validateInput = (type: string, value: string): void => {
    switch (type) {
      case settings.AUTH_FIELD_TYPES.email:
        validateEmail(value);
        break;
      case settings.AUTH_FIELD_TYPES.name:
        validateName(value);
        break;
      case settings.AUTH_FIELD_TYPES.password:
        validatePassword(value);
        break;
      default:
        break;
    }
  };

  const validateEmail = (email: string): void => {
    const validEndings = ['.com', '.org', '.edu', '.gov'];
    const hasOnlyValidCharacters = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    );
    const hasAtSymbol = email.includes('@');
    const hasValidEnding = validEndings.includes(email.slice(-4));
    setIsValidEmail(hasOnlyValidCharacters && hasAtSymbol && hasValidEnding);
  };

  const validateName = (name: string): void => {
    if (isUserAuth) {
      const names = name.split(' ');
      const validNames = names.filter(n => n.length > 1);
      setIsValidName(names.length === 2 && validNames.length === 2);
    } else {
      setIsValidName(name.length > 2);
    }
  };

  const validatePassword = (password: string): void => {
    setIsValidPassword(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(password),
    );
  };

  const value = {
    email,
    isSignUp,
    isUserAuth,
    name,
    password,
    getIsValidInput,
    resetForm,
    setIsApplicationSignUp,
    setIsSignUp,
    updateInput,
    validateInput,
  };

  return <AuthFormContext.Provider value={value} {...props} />;
};

export default AuthFormProvider;