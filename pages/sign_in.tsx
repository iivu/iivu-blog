import React, { useState, useCallback, FormEvent } from 'react';
import { NextPage } from 'next';
import axios, { AxiosResponse } from 'axios';

type FormData = { username: string, password: string }
type FormError = { username: string[], password: string[] }

const SignIn: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState<FormError>({
    username: [], password: []
  });
  const updateFormData = (k: keyof FormData, v: string) => setFormData({ ...formData, [k]: v });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios.post('/api/v1/sessions', formData)
      .then(() => {
      }, err => {
        if (err.response) {
          const res: AxiosResponse = err.response;
          if (res.status === 422) {
            setFormError({ username: [], password: [], ...res.data });
          }
        }
      });
  };
  return (
    <>
      <h1>登录</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <span>用户名</span>
            <input type="text" value={formData.username} onChange={e => updateFormData('username', e.target.value)}/>
          </label>
          {
            formError.username?.length > 0 && <span>{formError.username.join('')}</span>
          }
        </div>
        <div>
          <label>
            <span>密码</span>
            <input type="password" value={formData.password}
                   onChange={e => updateFormData('password', e.target.value)}/>
          </label>
          {
            formError.password?.length > 0 && <span>{formError.password.join('')}</span>
          }
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
