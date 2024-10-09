import React, { useRef } from 'react';

const FocusInput = () => {
  // Create a ref using useRef
  const inputRef = useRef(null);

  // Function to focus the input
  const focusInput = () => {
    // Access the DOM node through the ref and call focus()
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef} // Attach the ref to the input element
        placeholder="Click the button to focus me"
      />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
};

export default FocusInput;
