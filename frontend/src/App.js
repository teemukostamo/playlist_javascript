import React, { useState } from 'react';

const App = props => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log('clicked');
    setCounter(counter + 1);
  };
  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button>
    </div>
  );
};

export default App;
