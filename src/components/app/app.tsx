import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PhoneBook from "../phone-book/phone-book";
import Login from "../login/login";
// import SearchInput from "../search-input/search-input";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/phonebook' element={<PhoneBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;