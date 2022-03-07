import React, { FormEvent, ReactChild, useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';

type OnSubmit<T> = (fd: T) => Promise<void>
type Field<T> = {
  label: string;
  type: string;
  key: keyof T;
}
type UseFomOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  submit: {
    request:OnSubmit<T>,
    success: () => void
  },
  buttons: ReactChild;
}

export function useForm<T>(options: UseFomOptions<T>) {
  const { initFormData, fields, submit, buttons } = options;
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [key in keyof T]?: string[] } = {};
    for (const key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  });
  const onChange = useCallback((k: keyof T, v: any) => {
    setFormData({ ...formData, [k]: v });
  }, [formData]);
  const _onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    submit.request(formData)
      .then(submit.success,error => {
        if(error.response) {
          const response :AxiosResponse = error.response;
          if(response.status === 422) {
            setErrors(response.data)
          } else if(response.status === 401) {
            window.alert('请先登录');
            window.location.replace(`/sign_in?return_to=${encodeURIComponent(window.location.pathname)}`);
          }
        }
      })
  }, [submit, formData]);
  const form = (
    <form onSubmit={_onSubmit}>
      {
        fields.map(field => (
          <div key={field.label}>
            <label>
              <span>{field.label}</span>
              {
                field.type === 'textarea' ?
                  <textarea onChange={e => onChange(field.key, e.target.value)}>{formData[field.key]}</textarea> :
                  <input type={field.type} onChange={e => onChange(field.key, e.target.value)}/>
              }
            </label>
            {
              errors[field.key]?.length > 0 && <span>{errors[field.key].join('')}</span>
            }
          </div>
        ))
      }
      {buttons}
    </form>
  );

  return { form, setErrors };
}
