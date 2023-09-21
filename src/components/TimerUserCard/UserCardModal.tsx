import React from 'react';
import './UserCardModal.scss';
import { Timer } from 'components/TimerUserCard/Timer';

interface IUserCardModalProps {
  showModal: boolean;
  selectedUser: any;
  handleModalClose: () => void;
}

export function UserCardModal({
  showModal,
  selectedUser,
  handleModalClose,
}: IUserCardModalProps): JSX.Element {
  return (
    <div
      className={`modal fade ${
        showModal ? 'user-card-modal__container show d-block' : ''
      }`}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedUser ? selectedUser.nickname + '님의 정보' : '유저 정보'}
            </h5>
          </div>
          <div className="modal-body">
            {selectedUser && (
              <>
                <img
                  src={selectedUser.image}
                  alt={selectedUser.nickname + '님의 사진'}
                />
                <div className="text-container">
                  <h4>{selectedUser.nickname}</h4>
                  <p>{'Name : ' + selectedUser.username}</p>
                  <p>{'Email : ' + selectedUser.email}</p>
                  <Timer id={selectedUser.id} />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
