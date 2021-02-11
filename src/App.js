import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import AllEmployeesPage from './pages/AllEmployeesPage';
import EmployeePage from './pages/EmployeePage';
import DepartmentsPage from './pages/DepartmentsPage';
import RolesPage from './pages/RolesPage';

const App = () => {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" exact component={AllEmployeesPage}/>
          <Route path="/employee/:id" exact component={EmployeePage} />
          <Route path="/departments" exact component={DepartmentsPage} />
          <Route path="/roles" exact component={RolesPage} />
        </BrowserRouter>
      </div>
    )
}

export default App;