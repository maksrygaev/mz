import { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { emailRule, inputNormalize, requiredRule, hash } from 'core/helpers';
import { useSubmit } from 'core/hooks';
import { CredentialsServices } from 'core/services/credentials';
import { UsersServices } from 'core/services/users';
import { AuthenticationServices } from 'core/services';
import { loginSuccess } from 'core/actions';
import { errors } from 'core/constants/errors';
import styles from './styles.module.scss';

interface IProps {
  onSignIn: () => void;
  onClose: () => void;
}
type TFormValues = { value: string; password: string; confirmationCode: '' };

const SignUpForm: FC<IProps> = ({ onSignIn, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { clearError, isSubmitting, submit, errorCode } = useSubmit();
  const initialValues: TFormValues = { value: '', password: '', confirmationCode: '' };
  const [credentialID, setCredentialID] = useState<number>(0);

  const getErrorMessage = (errorCode: string): string => {
    return errors.find(error => error.code === errorCode)?.message || '';
  }

  const handleSubmit = (values: TFormValues): void => {
    const passwordHash = hash(values.password);
    if (credentialID) {
      submit(
        CredentialsServices.confirm,
        { confirmationCode: values.confirmationCode, credentialID, passwordHash },
        () => {
          submit(
            AuthenticationServices.signIn,
            { username: values.value, passwordHash },
            (response: string) => {
              dispatch(loginSuccess(response));
              onClose();
            },
          );
        },
      );
    } else {
      submit(UsersServices.create, { value: values.value, passwordHash }, response =>
        setCredentialID(Number(response)),
      );
    }
  };

  return (
    <Form
      layout="vertical"
      name="signUp"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onFieldsChange={clearError}
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="value"
        normalize={inputNormalize}
        rules={[requiredRule('Enter email'), emailRule('Enter correct email')]}
      >
        <Input
          size="large"
          maxLength={100}
          readOnly={Boolean(credentialID)}
          style={{
            borderRadius: '5px',
            borderColor: 'black',
            fontFamily: 'Arial',
          }}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        normalize={inputNormalize}
        rules={[requiredRule('Enter password')]}
      >
        <Input.Password
          type="password"
          size="large"
          maxLength={50}
          readOnly={Boolean(credentialID)}
          style={{ borderRadius: '5px', borderColor: 'black', fontFamily: 'Arial' }}
        />
      </Form.Item>
      {credentialID ? (
        <Form.Item
          label="Confirmation code"
          name="confirmationCode"
          normalize={inputNormalize}
          rules={[requiredRule('Enter confirmation code')]}
        >
          <Input size="large" maxLength={100} prefix={<KeyOutlined />} />
        </Form.Item>
      ) : null}
      <div className={styles.block}>
        <div className={styles.buttonsWrapper}>
          <Button
            className={`btn-rounded-black ${styles.btn}`}
            style={{ marginRight: '10px' }}
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
          >
            {credentialID ? 'Confirm' : 'Sign Up'}
          </Button>
          <Button
            className={`${styles.btn} btn-rounded-white-black-border`}
            type="default"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
        <Button
          className={`btn-rounded-gray ${styles.btn}`}
          type="link"
          onClick={onSignIn}
        >
          Sign In
        </Button>
      </div>
      {errorCode ? <div className="error_message">{getErrorMessage(errorCode)}</div> : null}
    </Form>
  );
};

export default SignUpForm;
