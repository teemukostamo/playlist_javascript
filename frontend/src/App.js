import React, { useState } from 'react';
import Button from './components/Button';

const App = props => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => {
    console.log('klik');
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(1000)} text="thoustn" />
      <Button handleClick={() => setToValue(0)} text="zero" />
      <Button handleClick={() => setToValue(value + 1)} text="inc" />
    </div>
  );
};

export default App;
