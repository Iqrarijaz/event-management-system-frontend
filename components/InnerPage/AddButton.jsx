import { Button } from "antd";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";

function AddButton({ title, onClick = () => {} }) {
  return (
    <Button className="add-button" onClick={onClick}>
      {/* <IoMdAddCircle size={20} /> */}
      {title}
    </Button>
  );
}

export default AddButton;
