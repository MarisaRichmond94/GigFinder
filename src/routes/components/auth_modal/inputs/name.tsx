import { ReactElement } from 'react';
import { FiUserCheck, FiUserX } from 'react-icons/fi';

import GigTextInput from 'components/gig_input/text';
import { useAuthForm } from 'providers/auth_form';

const NameInput = (): ReactElement => {
  const { name, isUserAuth, getIsValidInput, updateInput, validateInput } = useAuthForm();
  const isValidName = getIsValidInput('name');

  return (
    <div className='auth-modal-input-container'>
      <div className={`input-icon ${isValidName ? 'valid-icon' : 'invalid-icon'}`}>
        {isValidName ? <FiUserCheck /> : <FiUserX />}
      </div>
      <div className='auth-input'>
        <GigTextInput
          classNames='auth-modal-input'
          formValue={name}
          id='auth-name-input'
          placeholder={isUserAuth ? 'First and Last Name' : 'Company Name'}
          setFormValue={updatedName => updateInput('name', updatedName)}
          validateFormValue={updatedName => validateInput('name', updatedName)}
        />
      </div>
    </div>
  );
}

export default NameInput;
