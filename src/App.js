import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import AllEmployeesPage from './pages/AllEmployeesPage';
import EmployeePage from './pages/EmployeePage';
import DepartmentsPage from './pages/DepartmentsPage';
import RolesPage from './pages/RolesPage';
import Header from './components/Header';
import CreateEmployeePage from './pages/CreateEmployeePage';
import CreateRolePage from './pages/CreateRolePage';
import CreateDepartmentPage from './pages/CreateDepartmentPage';
import EditEmployeePage from './pages/EditEmployeePage';

const App = () => {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={Header} />
          <Route path="/" exact component={AllEmployeesPage}/>
          <Route path="/employee/:id" exact component={EmployeePage} />
          <Route path="/employees/new" exact component={CreateEmployeePage} />
          <Route path="/employee/:id/edit" exact component={EditEmployeePage} />
          <Route path="/departments" exact component={DepartmentsPage} />
          <Route path="/departments/new" exact component={CreateDepartmentPage} />
          <Route path="/roles" exact component={RolesPage} />
          <Route path="/roles/new" exact component={CreateRolePage} />
        </BrowserRouter>
      </div>
    )
}

export default App;