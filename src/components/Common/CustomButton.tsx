import React from "react";
import { Button, ButtonProps as ReactstrapButtonProps } from "reactstrap";

interface ButtonProps extends ReactstrapButtonProps {
  name: string;
  padding?: any;
  bgColor?: string;
  width?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ color, width, bgColor, name, padding, ...rest }) => {
  return (
    <Button
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor ? bgColor : "black",
        color: color ? color : "#fff",
        width: width ? width : "auto",
        height: "40px",
        borderRadius: "10px",
        gap: "5px",
        fontSize: "13px",
        border: "none",
        ...(padding ? { padding } : {}),
      }}
      {...rest}
    >
      {name}
    </Button>
  );
};

export default CustomButton;
