import React, { useEffect, useState } from 'react';
import { collection, getDocs, Firestore, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase'; // Firebase firestore 객체 가져오기

const Profile: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            // 1. 모든 문서 ID 가져오기
            const querySnapshot = await getDocs(collection(firestore, 'user'));
            const documentIds: string[] = [];

            querySnapshot.forEach((doc) => {
                documentIds.push(doc.id);
            });

            // 2. 각 문서의 필드에서 name과 imageURL 가져오기
            const updatedUsers: any[] = [];

            for (const documentId of documentIds) {
                const userDoc = doc(firestore, 'user', documentId);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    const user = {
                        id: documentId,
                        name: userData.name,
                        imgURL: userData.imageURL,
                    };
                    updatedUsers.push(user);
                }
            }

            setUsers(updatedUsers);
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {users.map((user: any) => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <img src={user.imgURL} alt={`Profile of ${user.name}`} />
                </div>
            ))}
        </div>
    );
};

export default Profile;
