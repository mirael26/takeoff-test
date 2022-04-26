import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import Logo from "../logo/logo";
import Contacts from "../contacts/contacts";

const PhoneBook = ({userEmail}) => {
  return (
    <div className="phone-book">
      <h1 className="visually-hidden">ТЕЛЕФОННАЯ КНИГА</h1>
      <div className="phone-book__user-panel">
        <span className="phone-book__login">{userEmail}</span>
        <Link to="/" >Выйти</Link>
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

export {PhoneBook};
export default connect(mapStateToProps)(PhoneBook);
