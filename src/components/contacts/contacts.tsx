import * as React from "react";
import {IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {Contact, Contacts} from "../../types";

interface ContactsProps {
  contacts: Contacts,
  editButtonHandle(contact: Contact): void,
  deleteContact(id: string): void,
};

const Contacts = ({contacts, editButtonHandle, deleteContact}: ContactsProps): JSX.Element => {
  return (    
    <table className="contacts">
    <tbody>
      {contacts.length === 0
        ? null
        : contacts.map((contact, i) => {
          return <tr key={`contact-${i}`} className="contacts__row">
            <td className="contacts__name">{contact.name}</td>
            <td className="contacts__context">{contact.context}</td>
            <td className="contacts__phone">{contact.phone}</td>
            <td className="contacts__control">
              <IconButton className="contacts__edit-button" size="small" aria-label="edit" onClick={() => editButtonHandle(contact)}>
                <EditIcon className="contacts__edit-icon" />
              </IconButton>
              <IconButton className="contacts__delete-button" aria-label="delete" onClick={() => deleteContact(contact.id)}>
                <DeleteIcon className="contacts__delete-icon" />
              </IconButton>
            </td>
          </tr>
        })
      }
    </tbody>
    </table>   
  );
};

export default Contacts;