import { useState } from 'react';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    reset: () => setValue(''),
    attributes: {
      value,
      type,
      onChange
    }
  };
};

export default useField;
