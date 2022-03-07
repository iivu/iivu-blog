import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import { useForm } from '../../hooks/useForm';


const PostNew: NextPage = () => {
  const initFormData = { title: '', content: '' };
  const formField = [
    { label: '标题', type: 'text', key: 'title' },
    { label: '内容', type: 'textarea', key: 'content' },
  ];
  const { form } = useForm(
    {
      initFormData,
      // @ts-ignore
      fields: formField,
      submit: {
        request: fd => axios.post('/api/v1/posts', fd),
        success: () => {
          alert('提交成功');
          window.location.replace('/posts');
        }
      },
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
