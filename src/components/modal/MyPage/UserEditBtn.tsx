import React, { useState } from 'react';
import { ProfileEdit } from './style';
import UserEdit from './UserEdit';

export default function UserEditBtn() {
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
            {userEditOn && <UserEdit handleEdit={handleEdit} />}
        </div>
    );
}
