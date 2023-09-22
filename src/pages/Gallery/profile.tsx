import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { firestore } from '../../utils/firebase'; // Firebase firestore 객체 가져오기
import { ProfileContainer, ProfileIMG, ProfileName, ProfileWrapper, StyleProfile } from './style';

// Firebase Firestore에서 반환되는 사용자 데이터의 타입 정의
interface UserData {
    id: string;
    name: string;
    imgURL: string;
}

const Profile: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'user'));
            const documentIds: string[] = [];

            querySnapshot.forEach((doc) => {
                documentIds.push(doc.id);
            });

            // 각 문서에 대한 실시간 변경 사항을 추적
            const unsubscribes = documentIds.map((documentId) => {
                const userDoc = doc(firestore, 'user', documentId);
                return onSnapshot(userDoc, (userSnapshot: DocumentData) => {
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        const user: UserData = {
                            id: documentId,
                            name: userData.name,
                            imgURL: userData.imageURL,
                        };
                        // 기존 사용자 데이터를 업데이트하거나 추가
                        setUsers((prevUsers) => {
                            const updatedUsers = [...prevUsers];
                            const userIndex = updatedUsers.findIndex((u) => u.id === documentId);
                            if (userIndex !== -1) {
                                updatedUsers[userIndex] = user;
                            } else {
                                updatedUsers.push(user);
                            }
                            return updatedUsers;
                        });
                    }
                });
            });

            // 컴포넌트가 언마운트될 때 모든 구독을 정리
            return () => {
                unsubscribes.forEach((unsubscribe) => unsubscribe());
            };
        };

        fetchUserData();
    }, []);

    return (
        <ProfileContainer>
            {/* <ContentFirstLine style={{ font: '16px', fontWeight: 'bold' }}>레퍼런스 공유 {'>'} 취업</ContentFirstLine> */}
            <StyleProfile>
                {users.map((user: UserData) => (
                    <ProfileWrapper key={user.id}>
                        <ProfileIMG src={user.imgURL} alt={`Profile of ${user.name}`} />
                        <ProfileName>{user.name}</ProfileName>
                    </ProfileWrapper>
                ))}
            </StyleProfile>
        </ProfileContainer>
    );
};

export default Profile;
