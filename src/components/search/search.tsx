import * as React from "react";
import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = ({contacts, displaySearched}) => {
  const search = (evt) => {
    const searchingText = evt.target.value;
    if (searchingText === "") {
      displaySearched(null);
      return;
    }

    const searchedContacts = contacts.filter((contact) => {
      const searchRegexp = new RegExp(`^${searchingText}| ${searchingText}`, 'i');
      return searchRegexp.test(contact.name);
    });
    console.log(searchedContacts);
    displaySearched(searchedContacts);
  }

  return (
    <div className="search">
      <FormControl className="search__input" variant="standard">
          <InputLabel htmlFor="contact-search">Поиск</InputLabel>
          <Input
            id="contact-search"
            type="text"
            onChange={(evt) => search(evt)}
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