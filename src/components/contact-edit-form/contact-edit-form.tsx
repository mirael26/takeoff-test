import * as React from "react";
import {Button, TextField} from "@mui/material";
import { nanoid } from 'nanoid';

interface ContactEditFormProps {
  contact: any,
  editContact: any,
  changeEditingMode():void,
}

interface ContactEditFormState {
  id: number,
  nameValue: string,
  contextValue: string,
  phoneValue: string,
}

class ContactEditForm extends React.PureComponent<ContactEditFormProps, ContactEditFormState> {
  isContactNew: boolean;

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      nameValue: "",
      contextValue: "",
      phoneValue: "",
    };

    this.isContactNew = true;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  componentDidMount(): void {
    const {contact} = this.props;
    if(contact) {
      this.isContactNew = false;
      this.setState({
        id: contact.id,
        nameValue: contact.name,
        contextValue: contact.context,
        phoneValue: contact.phone,
      })
    }
  }

  handleInputChange(evt) {
    const property = `${evt.target.id}Value`;
    const inputValue = evt.target.value;
    const newState = {};
    newState[property] = inputValue;
    this.setState(newState);
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    const {editContact} = this.props;
    const {id, nameValue, contextValue, phoneValue} = this.state;
    const contactId = id ? id : nanoid();
    const newContact = {
      id: contactId,
      name: nameValue,
      context: contextValue,
      phone: phoneValue,
    }
    editContact(newContact, this.isContactNew);
  }

  render() {
    const {changeEditingMode} = this.props;
    const {nameValue, contextValue, phoneValue} = this.state;
    return (
      <form className="contact-edit-form" onSubmit={(evt) => this.handleFormSubmit(evt)}>
        <TextField
          className="contact-edit-form__text-field"
          id="name"
          label="Имя"
          variant="outlined"
          type="text"
          required
          margin="dense"
          inputProps={{pattern:"^[a-zA-Zа-яА-Я0-9 ]*$"}}
          value={nameValue}
          onChange={(evt) => this.handleInputChange(evt)} />

        <TextField
          className="contact-edit-form__text-field"
          id="context"
          label="Компания / Повод знакомства"
          variant="outlined"
          type="text"
          margin="dense"
          inputProps={{pattern:"^[a-zA-Zа-яА-Я0-9 ]*$"}}
          value={contextValue}
          onChange={(evt) => this.handleInputChange(evt)} />

        <TextField
          className="contact-edit-form__text-field"
          id="phone"
          label="Телефон"
          variant="outlined"
          type="tel"
          required
          margin="dense"
          inputProps={{pattern:"^(((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10})$"}}
          value={phoneValue}
          onChange={(evt) => this.handleInputChange(evt)} />

        <div className="contact-edit-form__buttons">
          <Button
            className="contact-edit-form__save-button"
            variant="contained"
            type="submit">
              Сохранить
          </Button>
          <Button
            className="contact-edit-form__cancel-button"
            variant="outlined"
            onClick={() => {changeEditingMode()}}>
              Отмена
          </Button>
        </div>
      </form>
    );
  };
};

export default ContactEditForm;