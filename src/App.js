import React, { useState, useEffect } from 'react';

const useStorage = (key, initialValue) => {
  const getStorage = (isSession) => isSession ? sessionStorage : localStorage;

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key) || sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const updateStorage = (isSession) => {
    const storage = getStorage(isSession);
    storage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    updateStorage(false);
    updateStorage(true);  
  }, [key, value]);

  return [value, setValue];
};

const InputComponent = () => {
  const [inputValue, setInputValue] = useStorage('inputValue', '');

  return (
    <div>
      <label htmlFor="input">Input:</label>
      <input
        type="text"
        id="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default InputComponent;
