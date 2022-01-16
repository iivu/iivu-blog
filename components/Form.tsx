import React, { ChangeEventHandler, FormEventHandler, ReactChild, FC } from 'react';

type Field = {
  label: string,
  type: string,
  value: string | number,
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  errors: string[],
}
type Props = {
  fields: Field[],
  buttons: ReactChild,
  onSubmit: FormEventHandler,
}

const Form: FC<Props> = props => {
  const { fields, onSubmit, buttons } = props;
  return (
    <form onSubmit={onSubmit}>
      {
        fields.map(field => (
          <div key={field.label}>
            <label>
              <span>{field.label}</span>
              {
                field.type === 'textarea' ?
                  <textarea onChange={field.onChange}/> :
                  <input type={field.type} onChange={field.onChange}/>
              }
            </label>
            {
              field.errors?.length > 0 && <span>{field.errors.join('')}</span>
            }
          </div>
        ))
      }
      {buttons}
    </form>
  );
};

export default Form;
