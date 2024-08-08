import React from "react";
import "./Btn.css";

const Btn = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="button font-lora italic ">
      {text}
    </button>
  );
};

export default Btn;
