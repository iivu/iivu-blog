import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios, { AxiosResponse } from 'axios';

import Form from '../components/Form';

import { withSession } from '../lib/withSession';
import { User } from '../src/entity/User';

type FormData = { username: string, password: string }
type FormError = { username: string[], password: string[] }
type Props = { user: User }

const SignIn: NextPage<Props> = (props) => {
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
        alert('登录成功');
        window.location.reload();
      }, err => {
        if (err.response) {
          const res: AxiosResponse = err.response;
          if (res.status === 422) {
            setFormError({ username: [], password: [], ...res.data });
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
  ];
  return (
    <React.Fragment>
      {
        props.user && <div>当前登录用户：{props.user.username}</div>
      }
      <h1>登录</h1>
      {/*// @ts-ignore*/}
      <Form fields={formField} buttons={<button type="submit">登录</button>} onSubmit={onSubmit}/>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async (ctx: GetServerSidePropsContext) => {
    return {
      // @ts-ignore
      props: { user: ctx.req.session.get('currentUser') || null }
    };
  }
);

export default SignIn;
