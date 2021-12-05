import { ReactElement } from 'react';
import { HiOutlineMail, HiOutlineMailOpen } from 'react-icons/hi';

import GigTextInput from 'components/gig_input/text';
import { useAuthForm } from 'providers/auth_form';
import { AuthFieldType } from 'types';

const EmailInput = (): ReactElement => {
  const { email, isUserAuth, getIsValidInput, updateInput, validateInput } = useAuthForm();
  const isValidEmail = getIsValidInput(AuthFieldType.email);

  return (
    <div className='auth-modal-input-container'>
      <div className={`input-icon ${isValidEmail ? 'valid-icon' : 'invalid-icon'}`}>
        {isValidEmail ? <HiOutlineMail /> : <HiOutlineMailOpen />}
      </div>
      <div className='auth-input'>
        <GigTextInput
          classNames='auth-modal-input'
          formValue={email}
          id='auth-email-input'
          placeholder={isUserAuth ? 'Email Address' : 'Employer Email Address'}
          setFormValue={updatedEmail => updateInput(AuthFieldType.email, updatedEmail)}
          validateFormValue={
            updatedEmail => validateInput(AuthFieldType.email, updatedEmail)
          }
        />
      </div>
    </div>
  );
}

export default EmailInput;
