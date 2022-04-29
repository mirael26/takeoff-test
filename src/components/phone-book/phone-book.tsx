import * as React from "react";
import {connect} from "react-redux";
import {Button} from "@mui/material";
import {AxiosInstance} from "axios";

import {ActionCreator} from "../../store/action";
import {fetchContacts, postContacts} from "../../store/api-actions";

import Logo from "../logo/logo";
import Contacts from "../contacts/contacts";
import ContactEditForm from "../contact-edit-form/contact-edit-form";

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
  isEditingMode: boolean
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
  changingContact: any;

  constructor(props) {
    super(props)

    this.state = {
      contacts: [],
      isEditingMode: false,
    }
    this.changingContact = null;

    this.editContact = this.editContact.bind(this);
    this.editButtonHandle = this.editButtonHandle.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.exitButtonHandle = this.exitButtonHandle.bind(this);
    this.changeEditingMode = this.changeEditingMode.bind(this);
    this.addContactButtonHandle = this.addContactButtonHandle.bind(this);
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

  editContact(newContact, isContactNew) {
    const {user, contacts, postContacts} = this.props;
    let newContacts: any = [];
    if (isContactNew) {
      newContacts = contacts;
      newContacts.push(newContact)
    } else {
      newContacts = contacts.map((contact) => {
        if (contact.id === newContact.id) {
          return newContact;
        }
        return contact;
      });
    };
    this.changeEditingMode();
    postContacts(user.id, newContacts);
  }

  editButtonHandle(contact) {
    this.changingContact = contact;
    this.changeEditingMode();
  }

  deleteContact(id) {
    const {user, postContacts, contacts} = this.props;
    const deletingIndex = contacts.findIndex((el) => el.id === id);
    const newContacts = contacts.slice();
    newContacts.splice(deletingIndex, 1);
    postContacts(user.id, newContacts);
  }

  changeEditingMode() {
    this.setState({isEditingMode: !this.state.isEditingMode});
  }

  addContactButtonHandle() {
    this.changingContact = null;
    this.changeEditingMode();
  }

  render() {
    const {user, contacts} = this.props;
    const {isEditingMode} = this.state;
    
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
        
        {isEditingMode
          ? <ContactEditForm
              contact={this.changingContact}
              editContact={this.editContact}
              changeEditingMode={this.changeEditingMode} />
          : <div>
            {contacts.length === 0
              ? <span className="phone-book__add-caption">Добавьте ваш первый контакт</span>
              : <Contacts
                  contacts={contacts}
                  editButtonHandle={this.editButtonHandle}
                  deleteContact={this.deleteContact}
                />
            }
            
            <Button
              className="phone-book__add-contact"
              variant="contained"
              onClick={() => this.addContactButtonHandle()}>
                Добавить контакт
            </Button>
          </div>
        }
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
