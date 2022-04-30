import * as React from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import useBus from "use-bus";

import {ActionType} from "../../store/action";

import RequireAuth from "../require-auth/require-auth";
import PhoneBook from "../phone-book/phone-book";
import Login from "../login/login";


const App = (): JSX.Element => {
  const navigate = useNavigate();
  useBus(ActionType.REDIRECT_TO_ROUTE, (action) => navigate(action.payload), []);

  return (
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route
          path={'/contacts'}
          element={
            <RequireAuth redirectTo="/login">
              <PhoneBook />
            </RequireAuth>
          }
        />
      </Routes>
  );
};

export default App;