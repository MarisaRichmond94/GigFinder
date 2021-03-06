import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AuthFormContext from 'providers/auth_form/context';
import settings from 'settings';
import { AuthFieldType } from 'types';

const AuthFormProvider = (props: object) => {
  const { pathname } = useLocation();

  const [isUserAuth, setIsApplicationSignUp] = useState(pathname === settings.FIND_ROUTE);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [isValidName, setIsValidName] = useState(false);
  const [email, setEmail] = useState<string | undefined>();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState<string | undefined>();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [authError, setAuthError] = useState<string | undefined>();

  useEffect(() => {
    setIsApplicationSignUp(pathname === settings.FIND_ROUTE);
  }, [pathname]);

  const resetForm = useCallback((): void => {
    setName(undefined);
    setEmail(undefined);
    setPassword(undefined);
    setIsValidName(false);
    setIsValidEmail(false);
    setIsValidPassword(false);
    setAuthError(undefined);
  }, []);

  const getIsValidInput = useCallback((type: AuthFieldType): boolean => {
    switch (type) {
      case AuthFieldType.email:
        return isValidEmail;
      case AuthFieldType.name:
        return isValidName;
      case AuthFieldType.password:
        return isValidPassword;
      case AuthFieldType.all:
        return isSignUp
          ? isValidName && isValidEmail && isValidPassword
          : isValidEmail && isValidPassword;
      default:
        return false;
    }
  }, [isValidName, isValidEmail, isValidPassword, isSignUp]);

  const updateInput = useCallback((type: string, value: string): void => {
    switch (type) {
      case AuthFieldType.email:
        setEmail(value);
        break;
      case AuthFieldType.name:
        setName(value);
        break;
      case AuthFieldType.password:
        setPassword(value);
        break;
      default:
        break;
    }
  }, []);

  const validateEmail = useCallback((email: string): void => {
    const validEndings = ['.com', '.org', '.edu', '.gov'];
    const hasOnlyValidCharacters = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    );
    const hasAtSymbol = email.includes('@');
    const hasValidEnding = validEndings.includes(email.slice(-4));
    setIsValidEmail(hasOnlyValidCharacters && hasAtSymbol && hasValidEnding);
  }, []);

  const validateName = useCallback((name: string): void => {
    if (isUserAuth) {
      const names = name.split(' ');
      const validNames = names.filter(n => n.length > 1);
      setIsValidName(names.length === 2 && validNames.length === 2);
    } else {
      setIsValidName(name.length > 2);
    }
  }, [isUserAuth]);

  const validatePassword = useCallback((password: string): void => {
    setIsValidPassword(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password),
    );
  }, []);

  const validateInput = useCallback((type: string, value: string): void => {
    switch (type) {
      case AuthFieldType.email:
        validateEmail(value);
        break;
      case AuthFieldType.name:
        validateName(value);
        break;
      case AuthFieldType.password:
        validatePassword(value);
        break;
      default:
        break;
    }
  }, [validateEmail, validateName, validatePassword]);

  const value = {
    authError,
    email,
    isSignUp,
    isUserAuth,
    name,
    password,
    getIsValidInput,
    resetForm,
    setAuthError,
    setIsApplicationSignUp,
    setIsSignUp,
    updateInput,
    validateInput,
  };

  return <AuthFormContext.Provider value={value} {...props} />;
};

export default AuthFormProvider;
