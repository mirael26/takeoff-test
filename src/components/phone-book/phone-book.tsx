import * as React from "react";
import {connect} from "react-redux";
import {Button} from "@mui/material";

import {ActionCreator} from "../../store/action";
import {fetchContacts, postContacts} from "../../store/api-actions";
import {Contact, Contacts as ContactsType, Dispatch, UserInfoFromServer} from "../../types";
import {Reducer} from "../../store/store";

import Logo from "../logo/logo";
import Contacts from "../contacts/contacts";
import ContactEditForm from "../contact-edit-form/contact-edit-form";
import Search from "../search/search";

interface PhoneBookProps {
  user: UserInfoFromServer,
  contacts: ContactsType,
  updateAuth (authStatus: boolean): void ,
  loadUserInfo (userInfo: {}): void,
  fetchContacts (userId: number): void,
  postContacts (userId: number, contacts: ContactsType): void,
};

interface PhoneBookState {
  contacts: ContactsType,
  isEditingMode: boolean,
  searchedContacts: null | ContactsType,
};

class PhoneBook extends React.PureComponent<PhoneBookProps, PhoneBookState> {
  changingContact: null | Contact;

  constructor(props: PhoneBookProps) {
    super(props)

    this.state = {
      contacts: [],
      isEditingMode: false,
      searchedContacts: null,
    }
    this.changingContact = null;

    this.editContact = this.editContact.bind(this);
    this.editButtonHandle = this.editButtonHandle.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.exitButtonHandle = this.exitButtonHandle.bind(this);
    this.changeEditingMode = this.changeEditingMode.bind(this);
    this.addContactButtonHandle = this.addContactButtonHandle.bind(this);
    this.displaySearched = this.displaySearched.bind(this);
  }

  componentDidMount(): void {
    const {fetchContacts, user, contacts} = this.props;
    fetchContacts(user.id);
    this.setState({contacts: contacts});
  }

  exitButtonHandle(): void {
    const {updateAuth, loadUserInfo} = this.props;
    updateAuth(false);
    loadUserInfo({});
  }

  editContact(newContact: Contact, isContactNew: boolean): void {
    const {user, contacts, postContacts} = this.props;
    let newContacts: Contact[];
    if (isContactNew) {
      newContacts = contacts;
      newContacts.push(newContact);
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

  editButtonHandle(contact: Contact): void {
    this.changingContact = contact;
    this.changeEditingMode();
  }

  deleteContact(id: string): void {
    const {user, postContacts, contacts} = this.props;
    const deletingIndex = contacts.findIndex((el: Contact) => el.id === id);
    const newContacts = contacts.slice();
    newContacts.splice(deletingIndex, 1);
    postContacts(user.id, newContacts);
  }

  changeEditingMode() {
    if (this.state.isEditingMode) {
      this.displaySearched(null);
    }
    this.setState({isEditingMode: !this.state.isEditingMode});
  }

  addContactButtonHandle(): void {
    this.changingContact = null;
    this.changeEditingMode();
  }

  displaySearched(searchedContacts: ContactsType) {
    this.setState({searchedContacts: searchedContacts});
  }

  render(): JSX.Element {
    const {user, contacts} = this.props;
    const {isEditingMode, searchedContacts} = this.state;
    
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
          : <div className="phone-book__wrapper">
            {contacts.length === 0
              ? <span className="phone-book__add-caption">Добавьте ваш первый контакт</span>
              : <div>
                <Search contacts={contacts} displaySearched={this.displaySearched} />
                <Contacts
                    contacts={searchedContacts === null ? contacts : searchedContacts}
                    editButtonHandle={this.editButtonHandle}
                    deleteContact={this.deleteContact}
                  />
                </div>
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

const mapStateToProps = ({user, data}: Reducer) => ({
  user: user.userInfo,
  contacts: data.contacts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateAuth(authStatus: boolean): void {
    dispatch(ActionCreator.updateAuth(authStatus));
  },
  loadUserInfo(userInfo: {}): void {
    dispatch(ActionCreator.loadUserInfo(userInfo));
  },
  fetchContacts(userId: number): void {
    dispatch(fetchContacts(userId));
  },
  postContacts(userId: number, contacts: ContactsType): void {
    dispatch(postContacts(userId, contacts));
  }
});

export {PhoneBook};
export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);