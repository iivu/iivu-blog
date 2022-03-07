import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import { useForm } from '../hooks/useForm';

const SignUp: NextPage = () => {
  const initFormData = { username: '', password: '', passwordConfirmation: '', };
  const formField = [
    { label: '用户名', type: 'text', key: 'username', },
    { label: '密码', type: 'password', key: 'password', },
    { label: '确认密码', type: 'passwordConfirmation', key: 'passwordConfirmation', },
  ];
  const { form } = useForm(
    {
      initFormData,
      // @ts-ignore
      fields: formField,
      submit: {
        request: fd => axios.post('/api/v1/users', fd),
        success: () => {
          alert('注册成功');
          window.location.replace('/sign_in');
        }
      },
      buttons: <button type="submit">注册</button>
    }
  );
  return (
    <>
      <h1>注册</h1>
      {form}
    </>
  );
};

export default SignUp;
