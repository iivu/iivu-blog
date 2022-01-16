import React, { FormEvent, ReactChild, useCallback, useState } from 'react';

type OnSubmit<T> = (fd: T) => void
type Field<T> = {
  label: string;
  type: string;
  key: keyof T;
}
type UseFomOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  onSubmit: OnSubmit<T>;
  buttons: ReactChild;
}

export function userForm<T>(options: UseFomOptions<T>) {
  const { initFormData, fields, onSubmit, buttons } = options;
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
    onSubmit && onSubmit(formData);
  }, [onSubmit, formData]);
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
