import { ReactElement, useState } from 'react';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import GigTextInput from 'components/gig_input/text';
import { useAuthForm } from 'providers/auth_form';
import { AuthFieldType } from 'types';

const PasswordInput = (): ReactElement => {
  const { password, getIsValidInput, updateInput, validateInput } = useAuthForm();
  const [isHidden, setIsHidden] = useState(true);
  const isValidPassword = getIsValidInput(AuthFieldType.password);

  return (
    <div className='auth-modal-input-container'>
      <div className={`password input-icon ${isValidPassword ? 'valid-icon' : 'invalid-icon'}`}>
        {isValidPassword ? <AiOutlineLock /> : <AiOutlineUnlock />}
      </div>
      <div className='auth-input'>
        <GigTextInput
          classNames='auth-modal-input'
          formValue={password}
          id='auth-password-input'
          placeholder='10 minimum password, including 1 capital, 1 lowercase, a #, and a symbol'
          setFormValue={
            updatedPassword => updateInput(AuthFieldType.password, updatedPassword)
          }
          type={(isHidden) ? AuthFieldType.password : 'text'}
          validateFormValue={
            updatedPassword => validateInput(AuthFieldType.password, updatedPassword)
          }
        />
      </div>
      <div id='password-hide-button' onClick={() => setIsHidden(!isHidden)}>
        {(isHidden) ? <FaEye /> : <FaEyeSlash />}
      </div>
    </div>
  );
}

export default PasswordInput;
