import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { NextPage } from 'next';
import axios, { AxiosResponse } from 'axios';

import Form from '../components/Form'

type FormData = { username: string, password: string, passwordConfirmation: string }
type FormError = { username: string[], password: string[], passwordConfirmation: string[] }

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [formError, setFormError] = useState<FormError>({
    username: [], password: [], passwordConfirmation: []
  });
  const updateFormData = (k: keyof FormData, v: string) => setFormData({ ...formData, [k]: v });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios.post('/api/v1/users', formData)
      .then(() => {
        alert('注册成功');
        window.location.replace('/sign_in');
      }, err => {
        if (err.response) {
          const res: AxiosResponse = err.response;
          if (res.status === 422) {
            setFormError({ username: [], password: [], passwordConfirmation: [], ...res.data });
          }
        }
      });
  };
  const formField = [
    {
      label: '用户名',
      type: 'text',
      value: formData.username,
      errors: formError.username,
      onChange: (e: ChangeEvent<HTMLInputElement>) => updateFormData('username', e.target.value),
    },
    {
      label: '密码',
      type: 'password',
      value: formData.password,
      errors: formError.password,
      onChange: (e: ChangeEvent<HTMLInputElement>) => updateFormData('password', e.target.value),
    },
    {
      label: '确认密码',
      type: 'passwordConfirmation',
      value: formData.passwordConfirmation,
      errors: formError.passwordConfirmation,
      onChange: (e: ChangeEvent<HTMLInputElement>) => updateFormData('passwordConfirmation', e.target.value),
    },
  ]
  return (
    <>
      <h1>注册</h1>
      {/*// @ts-ignore*/}
      <Form fields={formField} buttons={<button type="submit">注册</button>} onSubmit={onSubmit}/>
    </>
  );
};

export default SignUp;
