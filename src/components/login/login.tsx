import * as React from "react";
import {Button} from "@mui/material";

import Logo from "../logo/logo";
import LoginForm from "../login-form/login-form";

interface LoginState {
  view: "enter" | "login"
}

class Login extends React.PureComponent<{}, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      view: "enter"
    };
  }

  render(): JSX.Element {
    const {view} = this.state;
    return (
        <div className="login">
          <h1 className="visually-hidden">Страница логина</h1>
          <div className="login__logo">
            <Logo size={view == "enter" ? "big" : "small"} />
          </div>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#177c91",
              "&:hover": {
                backgroundColor: "#177c91"
              }
            }}
            onClick={() => {
              this.setState({
                view: "login"
              });
            }}>
              Войти
          </Button>
          <LoginForm />
        </div>
    );
  }
};

export default Login;