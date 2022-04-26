import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import useBus from "use-bus";

import { ActionType } from "../../store/action";

import PhoneBook from "../phone-book/phone-book";
import Login from "../login/login";


const App = () => {
  const navigate = useNavigate();
  useBus(ActionType.REDIRECT_TO_ROUTE, (action) => navigate(action.payload), []);

  return (
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/phonebook' element={<PhoneBook />} />
      </Routes>
  );
};

export default App;