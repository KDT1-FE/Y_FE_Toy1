import React, { useState } from 'react';
import { userObjects } from 'data/getUser';
import { Timer } from 'components/TimerUserCard/Timer';
import './UserCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserCardModal } from './UserCardModal';
import { IsLoggedIn } from './IsLoggedIn';

export function UserCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUserCardClick = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <>
      <div className="user-card__container">
        {userObjects.map((user) => (
          <div
            className={`user-card ${user.id}`}
            onClick={() => handleUserCardClick(user)}
            key={user.id}
          >
            <div>
              <img src={user.image} alt={user.nickname + '님의 사진'}></img>
              <IsLoggedIn userId={user.id} />
              <div className="name">{user.nickname}</div>
            </div>
            <Timer id={user.id} />
          </div>
        ))}
      </div>

      <UserCardModal
        showModal={showModal}
        selectedUser={selectedUser}
        handleModalClose={handleModalClose}
      />
    </>
  );
}
