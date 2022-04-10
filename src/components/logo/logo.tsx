import * as React from "react";

interface LogoProps {
  size: "small" | "big"
}

const Logo = ({size="small"}: LogoProps) => {
  return (
    <div className={`logo logo--${size}`}>
      <img src={require("./../../img/logo.png")} alt="Логотип TakeOff Phone Book"/>
    </div>
  );
};

export default Logo;