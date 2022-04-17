import * as React from "react";
import {Button} from "@mui/material";

import Logo from "../logo/logo";
import LoginForm from "../login-form/login-form";

interface LoginState {
  view: "start" | "login"
}

class Login extends React.PureComponent<{}, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      view: "start"
    };
    this.deleteElementInTime = this.deleteElementInTime.bind(this);
  }

  deleteElementInTime(element, time) {
    window.setTimeout(() => {
      element.style.display = "none";
    }, time)
  }

  render(): JSX.Element {
    // const {view} = this.state;
    const isStart = this.state.view === "start";
    return (
        <div className="login">
          <h1 className="visually-hidden">Страница логина</h1>
          <div className={`login__logo login__logo--${isStart ? "big" : "small"}`}>
            <Logo />
          </div>
          <Button
            className={`login__start-button${isStart ? "" : " login__start-button--hiding"}`}
            variant="contained"
            size="large"
            onClick={(evt) => {
              this.setState({
                view: "login"
              });
              this.deleteElementInTime(evt.target, 1000);
            }}
            >
              Начать
          </Button>
          {isStart
            ? ""
            : <LoginForm />}
        </div>
    );
  }
};

export default Login;