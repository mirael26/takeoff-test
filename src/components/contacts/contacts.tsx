import * as React from "react";
import {IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Contacts = () => {
  return (
    <table className="contacts">
        <tr className="contacts__row">
          <td className="contacts__name">Иван Иванов</td>
          <td className="contacts__context">Работа</td>
          <td className="contacts__phone">89231234569</td>
          <td className="contacts__control">
            <IconButton className="contacts__edit-button" size="small" aria-label="edit">
              <EditIcon className="contacts__edit-icon" />
            </IconButton>
            <IconButton className="contacts__delete-button" aria-label="delete">
              <DeleteIcon className="contacts__delete-icon" />
            </IconButton>
          </td>
        </tr>
        <tr className="contacts__row">
          <td className="contacts__name">Петр Петров</td>
          <td className="contacts__context">Работа</td>
          <td className="contacts__phone">89231234569</td>
          <td className="contacts__control">
            <IconButton className="contacts__edit-button" size="small" aria-label="edit">
              <EditIcon className="contacts__edit-icon" />
            </IconButton>
            <IconButton className="contacts__delete-button" aria-label="delete">
              <DeleteIcon className="contacts__delete-icon" />
            </IconButton>
          </td>
        </tr>
        <tr className="contacts__row">
          <td className="contacts__name">Константин Cидоров</td>
          <td className="contacts__context">Работа</td>
          <td className="contacts__phone">89231234569</td>
          <td className="contacts__control">
            <IconButton className="contacts__edit-button" size="small" aria-label="edit">
              <EditIcon className="contacts__edit-icon" />
            </IconButton>
            <IconButton className="contacts__delete-button" aria-label="delete">
              <DeleteIcon className="contacts__delete-icon" />
            </IconButton>
          </td>
        </tr>
        <tr className="contacts__row">
          <td className="contacts__name">Касым Семенович</td>
          <td className="contacts__context">Работа</td>
          <td className="contacts__phone">89231234569</td>
          <td className="contacts__control">
            <IconButton className="contacts__edit-button" size="small" aria-label="edit">
              <EditIcon className="contacts__edit-icon" />
            </IconButton>
            <IconButton className="contacts__delete-button" aria-label="delete">
              <DeleteIcon className="contacts__delete-icon" />
            </IconButton>
          </td>
        </tr>
      </table>
  );
};

export default Contacts;