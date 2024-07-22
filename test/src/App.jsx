import React, { useEffect, useState } from 'react';
import { getUsers } from './services/user';
import Table from './components/Table';
import Input from './components/Input';
import ModalWindow from './components/ModalWindow';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error('Не удалось получить информацию о пользователях:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    const queryParts = query.split(' ').filter(part => part.trim() !== '');

    const result = users.filter(user => {
      const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
      const address = `${user.address.city.toLowerCase()}, ${removeNumbers(user.address.address.toLowerCase())}`;

      return queryParts.every(part =>
        fullName.includes(part) ||
        user.age.toString().includes(part) ||
        user.gender.toLowerCase().includes(part) ||
        user.phone.includes(part) ||
        address.includes(part)
      );
    });

    setFilteredUsers(result);
  }, [searchQuery, users]);

  const removeNumbers = (str) => {
    return str.replace(/\d+/g, '');
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <Input onSearch={setSearchQuery} />
      <Table users={filteredUsers} onRowClick={handleRowClick} />
      {selectedUser && <ModalWindow user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
