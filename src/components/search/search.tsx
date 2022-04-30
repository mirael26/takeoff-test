import * as React from "react";
import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Contact, Contacts } from "../../types";

interface SearchProps {
  contacts: Contacts,
  displaySearched (searchedContacts: Contacts): void,
}

const Search = ({contacts, displaySearched}: SearchProps) => {
  const search = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const searchingText = evt.target.value;
    if (searchingText === "") {
      displaySearched(null);
      return;
    }

    const searchedContacts = contacts.filter((contact: Contact) => {
      const searchRegexp = new RegExp(`^${searchingText}| ${searchingText}`, 'i');
      return searchRegexp.test(contact.name);
    });
    displaySearched(searchedContacts);
  }

  return (
    <div className="search">
      <FormControl className="search__input" variant="standard">
          <InputLabel htmlFor="contact-search">Поиск</InputLabel>
          <Input
            id="contact-search"
            type="text"
            onChange={search}
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled>
                  <SearchIcon></SearchIcon>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
  );
};

export default Search;