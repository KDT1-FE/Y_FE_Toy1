import React, { useState, useEffect } from 'react';
import { userObjects } from 'data/getUser';
import { Timer } from 'components/TimerUserCard/Timer';
import './UserCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserCardModal } from './UserCardModal';
import { IsLoggedIn } from './IsLoggedIn';

export function UserCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [userList, setUserList] = useState(userObjects);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUserCardClick = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    setUserList(userObjects);
  }, [userObjects]);

  return (
    <>
      <div className="user-card__container">
        <h3>
          Study <br />
          With
        </h3>
        {/* 접속 사용자들을 앞쪽에 */}
        {userObjects
          .filter((user) => user.isLoggedIn === true)
          .map((user) => (
            <div
              className={`user-card ${user.id}`}
              onClick={() => handleUserCardClick(user)}
              key={user.id}
            >
              <div>
                <img src={user.image} alt={`${user.nickname}님의 사진`} />
                <IsLoggedIn userId={user.id} />
                <div className="name">{user.nickname}</div>
              </div>
              <Timer id={user.id} />
            </div>
          ))}
        {/* 비접속 사용자들을 뒤쪽에 */}
        {userObjects
          .filter((user) => user.isLoggedIn === false)
          .map((user) => (
            <div
              className={`user-card ${user.id}`}
              onClick={() => handleUserCardClick(user)}
              key={user.id}
            >
              <div>
                <img src={user.image} alt={`${user.nickname}님의 사진`} />
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
