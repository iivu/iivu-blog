import React from 'react';
import { NextPage } from 'next';
import axios, { AxiosResponse } from 'axios';

import { userForm } from '../../hooks/userForm';


const PostNew: NextPage = () => {
  const initFormData = { title: '', content: '' };
  const formField = [
    { label: '标题', type: 'text', key: 'title' },
    { label: '内容', type: 'textarea', key: 'content' },
  ];
  const onSubmit = (formData: typeof initFormData) => {
    axios.post('/api/v1/posts', formData)
      .then(() => {
        alert('提交成功');
      }, err => {
        if (err.response) {
          const res: AxiosResponse = err.response;
          if (res.status === 422) {
            setErrors({ title: [], content: [], ...res.data });
          }
        }
      });
  };
  const { form, setErrors } = userForm(
    {
      initFormData,
      // @ts-ignore
      fields:formField,
      onSubmit,
      buttons: <button type="submit">提交</button>
    }
  );
  return (
    <div>
      {form}
    </div>
  );
};

export default PostNew;
