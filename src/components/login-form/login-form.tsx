import * as React from "react";
import {TextField, Button} from "@mui/material";


const Mode = {
  SIGN_IN: "signIn",
  SIGN_UP: "signUp"
} as const;

interface LoginFormState {
  mode: "signIn" | "signUp";
  loginValue: string;
  passwordValue: string;
}

class LoginForm extends React.PureComponent<{}, LoginFormState> {

  constructor(props) {
    super(props);
    this.state = {
      mode: Mode.SIGN_IN,
      loginValue: "",
      passwordValue: "",
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  clearInputs() {
    this.setState({
      loginValue: "",
      passwordValue: "",
    });
  };

  handleLoginChange(evt) {
    this.setState({
      loginValue: evt.target.value
    });
  };

  handlePasswordChange(evt) {
    this.setState({
      passwordValue: evt.target.value
    });
  };

  render(): JSX.Element {
    const isSignIn = this.state.mode === Mode.SIGN_IN;
    return (
      <form className="login-form" /* onSubmit={isSignIn ? call1 : call2}*/>
        <TextField
          className="login-form__login"
          id="email" label="E-mail"
          variant="outlined"
          type="email"
          required
          margin="normal"
          value={this.state.loginValue}
          onChange={(evt) => this.handleLoginChange(evt)} />

        <TextField
          className="login-form__password"
          id="password"
          label="Пароль"
          variant="outlined"
          type="password"
          required
          value={this.state.passwordValue}
          onChange={(evt) => this.handlePasswordChange(evt)} />

        <div className="login-form__buttons">
        {isSignIn
          ? <React.Fragment>
              <Button className="login-form__enter-button" variant="contained" type="submit">Войти</Button>
              <Button
                className="login-form__signup-button"
                variant="outlined"
                onClick={() => {
                  this.clearInputs();
                  this.setState({
                    mode: Mode.SIGN_UP
                  })
                }}
                >Зарегистрироваться</Button>
            </React.Fragment>
          : <Button className="login-form__signup-input-button" variant="contained" type="submit">Регистрация</Button>
          }
        </div>
        
      </form>
    );
}};

export default LoginForm;