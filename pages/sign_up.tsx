import React from 'react';
import { NextPage } from 'next';
import axios, { AxiosResponse } from 'axios';

import { userForm } from '../hooks/userForm';

const SignUp: NextPage = () => {
  const initFormData = { username: '', password: '', passwordConfirmation: '', };
  const formField = [
    { label: '用户名', type: 'text', key: 'username', },
    { label: '密码', type: 'password', key: 'password', },
    { label: '确认密码', type: 'passwordConfirmation', key: 'passwordConfirmation', },
  ];
  const onSubmit = (formData: typeof initFormData) => {
    axios.post('/api/v1/users', formData)
      .then(() => {
        alert('注册成功');
        window.location.replace('/sign_in');
      }, err => {
        if (err.response) {
          const res: AxiosResponse = err.response;
          if (res.status === 422) {
            setErrors({ username: [], password: [], passwordConfirmation: [], ...res.data });
          }
        }
      });
  };
  const { form, setErrors } = userForm(
    {
      initFormData,
      // @ts-ignore
      fields: formField,
      onSubmit,
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
