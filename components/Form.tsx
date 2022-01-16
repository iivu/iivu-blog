import React, { ChangeEventHandler, FormEventHandler, ReactChild, FC } from 'react';

type Field = {
  label: string,
  type: 'text' | 'password',
  value: string | number,
  onChange: ChangeEventHandler<HTMLInputElement>,
  onSubmit: FormEventHandler,
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
              <input type={field.type} onChange={e => field.onChange(e)}/>
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
