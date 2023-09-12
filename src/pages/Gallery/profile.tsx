import React, { useState } from 'react';

const Profile: React.FC = () => {
    const [userImg, setUserImg] = useState([1, 2, 3]);

    return (
        <div>
            {userImg.map(function (a, i) {
                return (
                    <div className="list" key={i}>
                        <img width="96" height="96" src="https://img.icons8.com/color/96/karl-lagerfeld.png" alt="" />
                    </div>
                );
            })}
        </div>
    );
};

export default Profile;
