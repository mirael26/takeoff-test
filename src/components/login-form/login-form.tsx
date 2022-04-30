import * as React from "react";
import {connect} from "react-redux";
import {Axios, AxiosInstance} from "axios";
import {TextField, Button} from "@mui/material";

import {register, login} from "../../store/api-actions";
import {Popup, PopupContent} from "../../const";
import {Dispatch, UserInfo} from "../../types";
import {Reducer} from "../../store/store";

import MessagePopup from "../message-popup/message-popup";

const Mode = {
  SIGN_IN: "signIn",
  SIGN_UP: "signUp"
} as const;

interface LoginFormProps {
  register(userData: UserInfo): AxiosInstance,
  login(userData: UserInfo): AxiosInstance,
  loginError: null | string,
  popup: null | string,
};

interface LoginFormState {
  mode: "signIn" | "signUp",
  loginValue: string,
  passwordValue: string,
};

class LoginForm extends React.PureComponent<LoginFormProps, LoginFormState> {

  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      mode: Mode.SIGN_IN,
      loginValue: "",
      passwordValue: "",
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  clearInputs(): void {
    this.setState({
      loginValue: "",
      passwordValue: "",
    });
  };

  handleLoginChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      loginValue: evt.target.value
    });
  };

  handlePasswordChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      passwordValue: evt.target.value
    });
  };

  handleFormSubmit(userData: UserInfo): void {
    this.state.mode === Mode.SIGN_IN
      ? this.signIn(userData)
      : this.signUp(userData)
  }

  signIn(userData: UserInfo): void {
    const {login} = this.props;
    login(userData);
  }

  signUp(userData: UserInfo): void {
    const {register} = this.props;
    register(userData);
  }

  render(): JSX.Element {
    const isSignIn = this.state.mode === Mode.SIGN_IN;
    const {loginValue, passwordValue} = this.state;
    const {loginError, popup} = this.props;
    return (
      <form
        className="login-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          this.handleFormSubmit({email: loginValue, password: passwordValue})
        }}
        
      >
        <TextField
          className="login-form__login"
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          required
          margin="normal"
          value={loginValue}
          onChange={this.handleLoginChange} />

        <TextField
          className="login-form__password"
          id="password"
          label="Пароль"
          variant="outlined"
          type="password"
          required
          value={passwordValue}
          onChange={this.handlePasswordChange} />
          
        {loginError
          ? <span className="login-form__error-text">{loginError}</span>
          : ""}

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

        {popup === Popup.REGISTRATION_SUCCESSFUL
          ? <MessagePopup popup={PopupContent.REGISTRATION_SUCCESSFUL} path="/"/>
          : null
        }
      </form>
    );
}};

const mapStateToProps = ({state}: Reducer) => ({
  loginError: state.loginError,
  popup: state.popup,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  register(userData: UserInfo): void {
    dispatch(register(userData));
  },
  login(userData: UserInfo): void {
    dispatch(login(userData));
  },  
});

export {LoginForm};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);