import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute />}
          errorElement={<ErrorPage />}
        >
          <Route index component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/error" component={ErrorPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
