import * as React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {AxiosInstance} from "axios";
import {TextField, Button} from "@mui/material";

import MessagePopup from "../message-popup/message-popup";

import {register, login} from "../../store/api-actions";
import {Popup, PopupContent} from "../../const";

const Mode = {
  SIGN_IN: "signIn",
  SIGN_UP: "signUp"
} as const;

interface LoginFormProps {
  register({}): AxiosInstance,
  login({}): AxiosInstance,
  loginError: null | string,
  popup: null | string,
}

interface LoginFormState {
  mode: "signIn" | "signUp",
  loginValue: string,
  passwordValue: string,
}

class LoginForm extends React.PureComponent<LoginFormProps, LoginFormState> {

  constructor(props) {
    super(props);
    this.state = {
      mode: Mode.SIGN_IN,
      loginValue: "",
      passwordValue: "",
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(userData) {
    this.state.mode === Mode.SIGN_IN
      ? this.signIn(userData)
      : this.signUp(userData)
  }

  signIn(userData) {
    const {login} = this.props;
    login(userData);
  }

  signUp(userData) {
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
          this.handleSubmit({email: loginValue, password: passwordValue})
        }}
        
      >
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
          ? <MessagePopup text={PopupContent[popup].text} buttonText={PopupContent[popup].buttonText} path="/"/>
          : ""
        }
      </form>
    );
}};

const mapStateToProps = ({state}) => ({
  loginError: state.loginError,
  popup: state.popup,
});

const mapDispatchToProps = (dispatch) => ({
  register(userData) {
    dispatch(register(userData));
  },
  login(userData) {
    dispatch(login(userData));
  },  
});

export {LoginForm};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);