import React, { useState } from 'react';
import { ProfileEdit } from './style';
import UserEditMdoal from './UserEditModal';

const UserEditBtn: React.FC = () => {
    const [userEditOn, setUserEditOn] = useState(false);
    function handleEdit() {
        if (userEditOn) {
            setUserEditOn(false);
        } else {
            setUserEditOn(true);
        }
    }
    return (
        <div>
            <ProfileEdit onClick={handleEdit}>편집</ProfileEdit>
            {userEditOn && <UserEditMdoal handleEdit={handleEdit} />}
        </div>
    );
};
export default UserEditBtn;
