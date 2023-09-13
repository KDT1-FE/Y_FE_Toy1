import React, { useState, useEffect } from 'react';
import { ProfileContainer } from './style';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';

const Profile: React.FC = () => {
    const [userImgURLs, setUserImgURLs] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUserImages = async () => {
            try {
                const userImgFolderRef = ref(storage, 'userImg');
                const userImgRefs = await listAll(userImgFolderRef);

                const urls = await Promise.all(
                    userImgRefs.items.map(async (item) => {
                        return getDownloadURL(item);
                    }),
                );

                setUserImgURLs(urls);
            } catch (error) {
                console.error(error);
                setError('Sorry! failed to load user image');
            }
        };
        getUserImages();
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : userImgURLs.length > 0 ? (
                <ProfileContainer>
                    {userImgURLs.map((url, index) => (
                        <img key={index} src={url} alt={`User Image ${index}`} />
                    ))}
                </ProfileContainer>
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
};

export default Profile;
