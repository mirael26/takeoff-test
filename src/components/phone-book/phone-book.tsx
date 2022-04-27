import * as React from "react";
import {connect} from "react-redux";
import {Button} from "@mui/material";
import {AxiosInstance} from "axios";

import {ActionCreator} from "../../store/action";
import {fetchContacts} from "../../store/api-actions";

import Logo from "../logo/logo";
import Contacts from "../contacts/contacts";

interface PhoneBookProps {
  updateAuth: any,
  contacts: any,
  loadUserInfo: any,
  userEmail: string,
  fetchContacts: AxiosInstance,
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
      contacts: [],
    }

    this.addContact = this.addContact.bind(this);
    this.editContact = this.editContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.exitButtonHandle = this.exitButtonHandle.bind(this);
  }

  componentDidMount(): void {
    const {fetchContacts, userEmail, contacts} = this.props;
    fetchContacts(userEmail);
    this.setState({contacts: contacts});
  }

  exitButtonHandle() {
    const {updateAuth, loadUserInfo} = this.props;

    updateAuth(false);
    loadUserInfo({});
  }

  addContact() {}

  editContact() {}

  deleteContact(id) {
    const {contacts} = this.state;
    const deletingIndex = contacts.findIndex((el) => el.id === id);
    const newContacts = contacts.slice();
    newContacts.splice(deletingIndex, 1);
    this.setState({contacts: newContacts})
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
          : <Contacts
              contacts={contacts}
              deleteContact={this.deleteContact}
            />
        }
        
        <Button
          className="phone-book__add-contact"
          variant="contained"
          // onClick={() => {}}
        >
          Добавить контакт
        </Button>

        {/* Попап-форма добавления и редактирования */}
      </div>
    );
  }
};

const mapStateToProps = ({user, data}) => ({
  userEmail: user.userInfo.email,
  contacts: data.contacts,
});

const mapDispatchToProps = (dispatch) => ({
  updateAuth(authStatus) {
    dispatch(ActionCreator.updateAuth(authStatus));
  },
  loadUserInfo(userInfo) {
    dispatch(ActionCreator.loadUserInfo(userInfo));
  },
  fetchContacts(user) {
    dispatch(fetchContacts(user));
  }
});

export {PhoneBook};
export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);
