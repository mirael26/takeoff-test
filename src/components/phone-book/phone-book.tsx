import * as React from "react";
import {connect} from "react-redux";
import {Button} from "@mui/material";
import {AxiosInstance} from "axios";

import {ActionCreator} from "../../store/action";
import {fetchContacts, postContacts} from "../../store/api-actions";

import Logo from "../logo/logo";
import Contacts from "../contacts/contacts";

interface PhoneBookProps {
  updateAuth: any,
  contacts: any,
  loadUserInfo: any,
  user: any,
  fetchContacts: AxiosInstance,
  postContacts: AxiosInstance,
};

interface PhoneBookState {
  contacts: any,
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
    const {fetchContacts, user, contacts} = this.props;
    fetchContacts(user.id);
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
    const {user, postContacts, contacts} = this.props;
    const deletingIndex = contacts.findIndex((el) => el.id === id);
    const newContacts = contacts.slice();
    newContacts.splice(deletingIndex, 1);
    postContacts(user.id, newContacts);
  }

  render() {
    const {user, contacts} = this.props;
    

    return (
      <div className="phone-book">
        <h1 className="visually-hidden">ТЕЛЕФОННАЯ КНИГА</h1>
        <div className="phone-book__user-panel">
          <span className="phone-book__userEmail">{user.email}</span>
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
  user: user.userInfo,
  contacts: data.contacts,
});

const mapDispatchToProps = (dispatch) => ({
  updateAuth(authStatus) {
    dispatch(ActionCreator.updateAuth(authStatus));
  },
  loadUserInfo(userInfo) {
    dispatch(ActionCreator.loadUserInfo(userInfo));
  },
  fetchContacts(userId) {
    dispatch(fetchContacts(userId));
  },
  postContacts(userId, contacts) {
    dispatch(postContacts(userId, contacts));
  }
});

export {PhoneBook};
export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);
