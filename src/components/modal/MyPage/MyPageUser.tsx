import { MyPageProfile, ProfileContent, ProfileImg } from './style';
import { useRecoilState } from 'recoil';
import { UserId, UserName, UserEmail, UserInfo, UserImg } from '../../../utils/recoil';
import UserEditBtn from './UserEditBtn';
import Textarea from '@mui/joy/Textarea';
import { updateUserInfo } from '../../../utils/firebase';

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
            <ProfileContent style={{ marginTop: '-10px' }}>{userEmail}</ProfileContent>
            <Textarea
                minRows={3}
                maxRows={3}
                defaultValue={userInfo}
                sx={{ width: '100%', '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)' }}
                onBlur={async (info) => {
                    await updateUserInfo('user', userId, info.target.value);
                    setUserInfo(info.target.value);
                }}
                spellCheck={false}
            />
        </MyPageProfile>
    );
}
