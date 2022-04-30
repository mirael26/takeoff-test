import * as React from "react";

const Logo = (): JSX.Element => {
  return (
    <div className="logo">
      <img src={require("./../../img/logo.png")} alt="Логотип TakeOff Phone Book"/>
    </div>
  );
};

export default Logo;