import { MyPageProfile, ProfileContent, ProfileImg, ProfileIntroduce } from './style';
import { useRecoilState } from 'recoil';
import { UserId, UserName, UserEmail, UserInfo, UserImg } from '../../../utils/recoil';
import UserEditBtn from './UserEditBtn';

export default function MyPageUser() {
    const [userId, setUserId] = useRecoilState(UserId);
    const [userName, setUserName] = useRecoilState(UserName);
    const [userEmail, setUserEmail] = useRecoilState(UserEmail);
    const [userInfo, setUserInfo] = useRecoilState(UserInfo);
    const [userImg, setUserImg] = useRecoilState(UserImg);

    return (
        <MyPageProfile>
            <ProfileImg src={userImg}></ProfileImg>
            <ProfileContent>
                <span>{userName}</span>
                <UserEditBtn />
            </ProfileContent>
            <ProfileContent>{userEmail}</ProfileContent>
            <ProfileIntroduce>
                <p>{userInfo}</p>
            </ProfileIntroduce>
        </MyPageProfile>
    );
}
