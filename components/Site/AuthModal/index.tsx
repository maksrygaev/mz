import React, { useState } from 'react';
import { Modal } from 'antd';
import SignInForm from 'components/Site/Forms/SignIn';
import SignUpForm from 'components/Site/Forms/SignUp';
import RecoveryForm from 'components/Site/Forms/Recovery';
import ConfirmForm from 'components/Site/Forms/Confirm';

type TFormType = 'Sign In' | 'Sign Up' | 'Recovery' | 'Set new password';

interface IProps {
  onClose: () => void;
  onConfirmSuccess: () => void;
  isConfirm?: boolean;
}

const AuthModal: React.FC<IProps> = ({ onClose, isConfirm, onConfirmSuccess }) => {
  const [formType, setFormType] = useState<TFormType>(isConfirm ? 'Set new password' : 'Sign In');
  return (
    <Modal
      title={formType}
      visible
      footer={null}
      onCancel={onClose}
      maskClosable={false}
      width={620}
    >
      {formType === 'Sign In' && (
        <SignInForm
          onSignUp={() => setFormType('Sign Up')}
          onRecovery={() => setFormType('Recovery')}
          onClose={onClose}
        />
      )}
      {formType === 'Sign Up' && (
        <SignUpForm onSignIn={() => setFormType('Sign In')} onClose={onClose} />
      )}
      {formType === 'Recovery' && (
        <RecoveryForm onSignIn={() => setFormType('Sign In')} onClose={onClose} />
      )}
      {formType === 'Set new password' && (
        <ConfirmForm onClose={onClose} onConfirmSuccess={onConfirmSuccess} />
      )}
    </Modal>
  );
};

export default AuthModal;
