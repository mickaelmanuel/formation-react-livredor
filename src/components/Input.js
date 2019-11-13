import React from "react";

export const Input = ({ placeholder, name, onTextChange, value }) => (
  <div>
    <input name={name} type="text" placeholder={placeholder} onChange={onTextChange} value={value} />
  </div>
);
