import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import UsersList from "./components/UsersList";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/task_list" element={ <TaskList />}/>
      <Route path="/create_task" element={ <CreateTask /> }/>
      <Route path="/edit_task/:id" element={ <EditTask /> }/>

      <Route path="/users_list" element={ <UsersList /> }/>
      <Route path="/create_user" element={ <CreateUser /> } />
      <Route path="/edit_user/:id" element={ <EditUser /> } />

    </Routes>
  );
}

export default App;
