import React from 'react';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios, { AxiosResponse } from 'axios';
import qs from 'query-string'


import { withSession } from '../lib/withSession';
import { User } from '../src/entity/User';
import { useForm } from '../hooks/userForm';

type Props = { user: User }

const SignIn: NextPage<Props> = (props) => {
  const initFormData = { username: '', password: '', };
  const formField = [
    { label: '用户名', type: 'text', key: 'username', },
    { label: '密码', type: 'password', key: 'password', },
  ];
  const onSubmit = (formData: typeof initFormData) => {
    axios.post('/api/v1/sessions', formData)
      .then(() => {
        alert('登录成功');
        const query = qs.parse(window.location.search)
        window.location.replace(query.return_to as string)
      }, err => {
        if (err.response) {
          const res: AxiosResponse = err.response;
          if (res.status === 422) {
            setErrors({ username: [], password: [], ...res.data });
          }
        }
      });
  };
  const { form, setErrors } = useForm(
    {
      initFormData,
      // @ts-ignore
      fields: formField,
      onSubmit,
      buttons: <button type="submit">登录</button>
    }
  );
  return (
    <React.Fragment>
      {
        props.user && <div>当前登录用户：{props.user.username}</div>
      }
      {form}
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
