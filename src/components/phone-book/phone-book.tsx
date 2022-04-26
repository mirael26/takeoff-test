import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../store/action";

import Logo from "../logo/logo";
import Contacts from "../contacts/contacts";

const PhoneBook = ({userEmail, updateAuth, loadUserInfo}) => {
  const exitButtonHandle = () => {
    updateAuth(false);
    loadUserInfo({});
  }

  return (
    <div className="phone-book">
      <h1 className="visually-hidden">ТЕЛЕФОННАЯ КНИГА</h1>
      <div className="phone-book__user-panel">
        <span className="phone-book__userEmail">{userEmail}</span>
        <button className="phone-book__exitButton" onClick={exitButtonHandle}>Выйти</button>
      </div>
      <div className="phone-book__logo">
        <Logo />
      </div>
      <span>Добавьте ваш первый контакт</span>
      <Contacts />
    </div>
  );
};

const mapStateToProps = ({user}) => ({
  userEmail: user.userInfo.email,
});

const mapDispatchToProps = (dispatch) => ({
  updateAuth(authStatus) {
    dispatch(ActionCreator.updateAuth(authStatus));
  },
  loadUserInfo(userInfo) {
    dispatch(ActionCreator.loadUserInfo(userInfo))
  }
});

export {PhoneBook};
export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);
