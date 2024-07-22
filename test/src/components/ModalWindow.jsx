import React from 'react';

const ModalWindow = ({ user, onClose }) => {
  const removeNumbers = (str) => {
    return str.replace(/\d+/g, '');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <p><strong>Возраст:</strong> {user.age}</p>
        <p><strong>Адрес:</strong> {`${user.address.city}, ${removeNumbers(user.address.address)}`}</p>
        <p><strong>Рост:</strong> {user.height} см</p>
        <p><strong>Вес:</strong> {user.weight} кг</p>
        <p><strong>Телефон:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default ModalWindow;
