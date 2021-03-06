import * as React from "react";
import {Button} from "@mui/material";

import Logo from "../logo/logo";
import LoginForm from "../login-form/login-form";

interface LoginState {
  view: "start" | "login"
}

class Login extends React.PureComponent<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      view: "start"
    };

    this.deleteElementInTime = this.deleteElementInTime.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
  }

  deleteElementInTime(element: HTMLButtonElement, time:number): void {
    window.setTimeout(() => {
      element.style.display = "none";
    }, time)
  }

  handleStartButtonClick(evt: React.MouseEvent<HTMLButtonElement>, time: number):void {
    this.setState({
      view: "login"
    });
    this.deleteElementInTime(evt.target as HTMLButtonElement, time);
  }

  render(): JSX.Element {
    const isStart = this.state.view === "start";
    
    return (
        <div className="login">
          <h1 className="visually-hidden">Страница логина</h1>
          <div className={`login__logo login__logo--${isStart ? "big" : "small"}`}>
            <Logo />
          </div>
          
          {isStart
            ? <Button
              className="login__start-button"
              variant="contained"
              size="large"
              onClick={(evt) => this.handleStartButtonClick(evt, 1000)}
              >
                Начать
            </Button>
            : <LoginForm />}
        </div>
    );
  }
};

export default Login;