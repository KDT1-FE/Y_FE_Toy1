import styled, { keyframes } from 'styled-components';
import { BtnClassic } from '../Timer/style';
import { CommuteModalBox } from './commuteStyle';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { themeType } from '../../../utils/firebase';

export const ModalBtnImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.navBar};
    background-size: contain;
    outline: none;
    border: none;
    cursor: pointer;
`;

export const ModalBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MyPage = styled.div<{ value: boolean }>`
    right: ${(props) => (props.value ? '0' : '-500px')};
    position: absolute;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 72px);
    width: 340px;
    background-color: #fafafa;
    top: 72px;
    border-left: 1px solid #ece7ec;
    box-sizing: border-box;
    z-index: 11;
    transition: 1s;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const MyPageExitBtn = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: #fafafa;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #e2e2e2;
        transition: 0.3s;
    }
`;

export const MyPageCase = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5%;
    min-height: 45px;
    padding: 0 5%;
`;
export const MyPageHeader = styled(MyPageCase)`
    border-bottom: 1px solid #ece7ec;
`;

export const MyPageProfile = styled.div`
    height: 50%;
    max-height: 540px;
    min-height: 400px;
    padding: 5% 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;
export const ProfileImg = styled.img`
    width: 220px;
    min-height: 220px;
    background-color: rgba(15, 15, 15, 0.1);
    border-radius: 20px;
`;
export const ProfileContent = styled(MyPageCase)`
    font-size: 20px;
    font-weight: 700;
    padding: 0;
`;
export const ProfileEdit = styled.span`
    font-size: 18px;
    color: var(--active-item);
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`;

export const MyPageContents = styled(MyPageCase)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    border-top: 1px solid #ece7ec;
    border-bottom: 1px solid #ece7ec;
`;

export const MyPageThemeBox = styled(MyPageCase)`
    border-top: 1px solid #ece7ec;
    font-weight: 700;
    font-size: 20px;
`;

export const ThemeColors = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
`;
export const ThemeColorEl = styled.button<{ thisTheme: themeType; selectTheme: string }>`
    background-color: ${(props) => (props ? props.thisTheme.navBar : '#000')};
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    outline: ${(props) => (props ? props.selectTheme : '1px solid #000')};
    cursor: pointer;
    transition: 1s;
    &:hover {
        transition: 0.2s;
        transform: scale(1.1);
    }
`;

export const MyPageFooter = styled(MyPageContents)`
    justify-content: center;
    position: sticky;
    bottom: 0;
    background-color: #fafafa;
`;

export const MarginLeft = styled.span`
    font-size: 20px;
    font-weight: 700;
    cursor: default;
`;

const Blink = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
`;
export const RedCircle = styled.span<{ value: boolean }>`
    display: ${(value) => (value.value ? 'block' : 'none')};
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #ca1212;
    animation: ${Blink} 1.5s 0s infinite;
    animation-timing-function: linear;
`;
export const TimelogBox = styled(CommuteModalBox)`
    height: 40%;
    min-height: 210px;
`;
export const TimelogBoxScroll = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    width: 100%;
    height: 100%;
    padding: 14% 0;
    background-color: #fafafa;
    border-left: 1px solid #ece7ec;
    overflow: auto;
    transition: 1s;
    &::-webkit-scrollbar {
        display: none;
    }
    &:hover {
        background-color: rgba(15, 15, 15, 0.1);
    }
`;

export const TimelogEl = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    width: 90%;
    border: 1px solid #ece7ec;
    border-radius: 20px;
    background-color: #fafafa;
    box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.3);
    &:hover {
        transform: scale(1.05);
        transition: 0.2s;
    }
`;
export const TimelogText = styled.p`
    height: 90px;
    white-space: pre;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    color: #555555;
    justify-content: center;
    align-items: center;
`;

export const EditBox = styled.div`
    width: 100%;
    padding: 5% 10%;
    display: flex;
    justify-content: space-between;
`;
export const EditInputBox = styled.div`
    display: flex;
    width: 50%;
    gap: 20px;
    flex-direction: column;
    justify-content: space-around;
`;
export const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
`;
export const EditInput = styled.input`
    height: 35px;
    border-radius: 5px;
    font-size: 18px;
    border: 1px solid #7e7e7e;
    &:focus {
        outline: none;
        border: none;
        box-shadow: 0 1px 6px ${(props) => props.theme.activeColor1};
    }
`;
export const InputImg = styled.img`
    width: 13rem;
    height: 13rem;
    border-radius: 20px;
    background-color: gray;
`;
export const SubmitBtn = styled(BtnClassic)`
    width: 150px;
    height: 60px;
    border-radius: 10px;
    color: #fff;
    background-color: ${(props) => props.theme.activeColor2};
`;
export const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
export const FlexAroundBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
`;
export const FlexBoxColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const UploadBtn = styled(CloudUploadOutlinedIcon)`
    display: block;
    width: 70px;
    height: 60px;
    padding: 5px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.activeColor1};
    color: #fafafa;
    box-shadow: 0 3px 3px 1px #ced0d3;
    cursor: pointer;
`;
