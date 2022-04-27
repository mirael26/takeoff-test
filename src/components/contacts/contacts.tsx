import * as React from "react";
import {IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ContactsProps {
  contacts: any[],
};

const Contacts = ({contacts}: ContactsProps) => {
  return (
    <table className="contacts">
      {contacts.map((contact, i) => {
        return <tr key={`contact-${i}`} className="contacts__row">
          <td className="contacts__name">{contact.name}</td>
          <td className="contacts__context">{contact.context}</td>
          <td className="contacts__phone">{contact.phone}</td>
          <td className="contacts__control">
            <IconButton className="contacts__edit-button" size="small" aria-label="edit">
              <EditIcon className="contacts__edit-icon" />
            </IconButton>
            <IconButton className="contacts__delete-button" aria-label="delete">
              <DeleteIcon className="contacts__delete-icon" />
            </IconButton>
          </td>
        </tr>
      })}
      </table>
  );
};

export default Contacts;