import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { inputNormalize, requiredRule } from 'core/helpers';
import { useSubmit } from 'core/hooks';
import { GalleriesServices } from 'core/services/galleries';
import { UsersServices } from 'core/services/users';
import styles from './index.module.scss';

type Props = {
  id: number;
  onOk: () => void;
  loadData: () => void;
  form: any;
};

type TInitialValues = {
  amount: number;
  walletAddress: string;
};

const ModalUserInvite: FC<Props> = props => {
  const initialValues: TInitialValues = { amount: 1, walletAddress: '' };
  const { isSubmitting, submit, errorCode, errorMessage, clearError } = useSubmit();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  useEffect(() => {
    clearError();
    setError(false);
  }, [props.onOk]);

  const handleSubmit = (values: TInitialValues): void => {
    setError(false);
    UsersServices.search({ walletAddress: values.walletAddress })
      .then(rs => {
        submit(
          GalleriesServices.usersAdd,
          { galleryID: props.id, productAmountLimit: values.amount, userID: rs[0].id },
          () => {
            props.onOk();
            props.loadData();
          },
          (error: any) => {console.log(error); setErrorMsg(true)},
        );
      })
      .catch(() => setError(true));
  };

  return (
    <div className={styles.modal}>
      <p className={styles.title}>Invite artist</p>
      <Form
        form={props.form}
        initialValues={initialValues}
        onFieldsChange={() => {setError(false); setErrorMsg(false)}}
        layout={'vertical'}
        onFinish={handleSubmit}
      >
        <Form.Item
          name={'walletAddress'}
          label={'Wallet address'}
          normalize={inputNormalize}
          rules={[requiredRule('Enter wallet address')]}
          className={styles.item}
        >
          <Input size="large" maxLength={100} placeholder={'Enter wallet address'} />
        </Form.Item>
        {error && <p className={styles.error}>We couldn't find any user with such wallet</p>}
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ type: 'number', min: 1, max: 100, required: true, message: 'Please enter correct amount' }]}
          className={styles.item}
        >
          <InputNumber
            formatter={(value: any) => value.replace(/[^0-9]/g, '')}
            className={`input-number ${styles.input}`}
            type={'number'}
            placeholder={'Enter maximum number of works'}
          />
        </Form.Item>
        {errorMessage && errorCode == 'NOT_EXIST_CREDENTIAL' ? (
          <p className={styles.error}>Credential doesn't exist</p>
        ) : (
          <>
            {errorMsg && (
              <p className={styles.error}>{errorMessage}</p>
            )}
          </>
        )}
        <Button disabled={isSubmitting} htmlType="submit" className={styles.inviteBtn}>
          Invite
        </Button>
      </Form>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return {
    props: { id },
  };
}

export default ModalUserInvite;
