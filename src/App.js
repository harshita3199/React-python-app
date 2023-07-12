import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [empAge, setEmpAge] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      // console.log("empid:",empId);
      // console.log("empName:",empName);
      // console.log("empAge:",empAge);
      await axios.post('http://localhost:5000/api/users', { emp_id: empId, emp_name: empName, emp_age: empAge });
      fetchData();
      setEmpId('');
      setEmpName('');
      setEmpAge('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put('http://localhost:5000/api/users', { emp_id: empId, emp_name: empName, emp_age: empAge });
      fetchData();
      setEmpId('');
      setEmpName('');
      setEmpAge('');
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async () => {
      
      
        await createUser()
      
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const editUser = async(user) => {
    try{
      setEmpId(user.emp_id);
      setEmpName(user.emp_name);
      setEmpAge(user.emp_age);
      await axios.put(`http://localhost:5000/api/users${user.emp_id}`,{ emp_id: empId, emp_name: empName, emp_age: empAge });
      
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-details">
              <span className="user-id">ID: {user.emp_id}</span>
              <span className="user-name">Name: {user.emp_name}</span>
              <span className="user-age">Age: {user.emp_age}</span>
            </div>
            <div>
              <button className="edit-button" onClick={() => {
                editUser(user);
                console.log(user.emp_id);
              }}>
                Edit
              </button>
              <button className="delete-button" onClick={() => deleteUser(user.emp_id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>{empId ? 'Edit User' : 'Add User'}</h2>
      <form className="add-user-form" onSubmit={onSubmit}>
        <input
          type="text"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          placeholder="Employee ID"
          required
        />
        <input
          type="text"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
          placeholder="Employee Name"
          required
        />
        <input
          type="number"
          value={empAge}
          onChange={(e) => setEmpAge(e.target.value)}
          placeholder="Employee Age"
          required
        />
        {/* <button type="submit">{empId ? 'Update User' : 'Add User'}</button> */}
        <button type="submit">Add User</button>
        
      </form>
    </div>
  );
};

export default App;
