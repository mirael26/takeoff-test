import * as React from "react";
import {connect} from "react-redux";
import {Button} from "@mui/material";

import {ActionCreator} from "../../store/action";

import Logo from "../logo/logo";
import Contacts from "../contacts/contacts";

interface PhoneBookProps {
  updateAuth: any,
  loadUserInfo: any,
  userEmail: string,
};

interface PhoneBookState {
  contacts: any[],
};

const ContactsMock = [
  {
    id: 123,
    name: "Иван Иванов",
    context: "Работа",
    phone: "89231234569"
  },
  {
    id: 1234,
    name: "Петр Петров",
    context: "Семья",
    phone: "86543534569"
  },
];

class PhoneBook extends React.PureComponent<PhoneBookProps, PhoneBookState> {
  constructor(props) {
    super(props)

    this.state = {
      contacts: ContactsMock,
    }

    this.exitButtonHandle = this.exitButtonHandle.bind(this);
  }

  exitButtonHandle() {
    const {updateAuth, loadUserInfo} = this.props;

    updateAuth(false);
    loadUserInfo({});
  }

  render() {
    const {userEmail} = this.props;
    const {contacts} = this.state;

    return (
      <div className="phone-book">
        <h1 className="visually-hidden">ТЕЛЕФОННАЯ КНИГА</h1>
        <div className="phone-book__user-panel">
          <span className="phone-book__userEmail">{userEmail}</span>
          <button className="phone-book__exitButton" onClick={this.exitButtonHandle}>Выйти</button>
        </div>
        <div className="phone-book__logo">
          <Logo />
        </div>
        
        {contacts.length === 0
          ? <span className="phone-book__add-caption">Добавьте ваш первый контакт</span>
          : <Contacts contacts={contacts} />
        }
        
        <Button
          className="phone-book__add-contact"
          variant="contained"
          // onClick={() => {}}
        >
          Добавить контакт
        </Button>
      </div>
    );
  }
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
