import React, { useState, useMemo } from 'react';

const Table = ({ users, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const handleSortKeyChange = (e) => {
    const key = e.target.value;
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortDirectionChange = (e) => {
    setSortConfig(prevConfig => ({
      ...prevConfig,
      direction: e.target.value
    }));
  };

  //Удаление номера дома из адреса
  const removeNumbers = (str) => {
    return str.replace(/\d+/g, '');
  };


  const sortedUsers = useMemo(() => {
    if (sortConfig.key === null || sortConfig.direction === 'none') {
      return users;
    }

    const sortableUsers = [...users];
    sortableUsers.sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.key === 'address') {
        aValue = removeNumbers(`${a.address.city}, ${a.address.address}`);
        bValue = removeNumbers(`${b.address.city}, ${b.address.address}`);
      } else if (sortConfig.key === 'fullName') {
        aValue = `${a.firstName} ${a.lastName}`;
        bValue = `${b.firstName} ${b.lastName}`;
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
      return 0;
    });

    return sortableUsers;
  }, [users, sortConfig]);

  if (!users || users.length === 0) {
    return <p>Пользователи не найдены</p>;
  }

  return (
    <div className="user-table">
      <div className="controls">
        <select onChange={handleSortKeyChange} value={sortConfig.key || ''}>
          <option value="">Выберите поле</option>
          <option value="fullName">ФИО</option>
          <option value="age">Возраст</option>
          <option value="gender">Пол</option>
          <option value="address">Адрес</option>
        </select>

        <select onChange={handleSortDirectionChange} value={sortConfig.direction}>
          <option value="none">Без сортировки</option>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id} onClick={() => onRowClick(user)}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{`${user.address.city}, ${removeNumbers(user.address.address)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
