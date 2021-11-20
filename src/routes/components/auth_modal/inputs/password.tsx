import { ReactElement, useState } from 'react';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import GigTextInput from 'components/gig_input/text';
import { useAuthForm } from 'providers/auth_form';

const PasswordInput = (): ReactElement => {
  const { password, getIsValidInput, updateInput, validateInput } = useAuthForm();
  const [isHidden, setIsHidden] = useState(true);
  const isValidPassword = getIsValidInput('password');

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
          placeholder='Password'
          setFormValue={updatedPassword => updateInput('password', updatedPassword)}
          type={(isHidden) ? 'password' : 'text'}
          validateFormValue={updatedPassword => validateInput('password', updatedPassword)}
        />
      </div>
      <div id='password-hide-button' onClick={() => setIsHidden(!isHidden)}>
        {(isHidden) ? <FaEye /> : <FaEyeSlash />}
      </div>
    </div>
  );
}

export default PasswordInput;
