import styled from 'styled-components';
export const HeaderComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme.navBar};

    position: fixed;
    z-index: 2;

    top: 0;
    left: 0;
    height: 72px;
    width: 100%;
`;

export const TitleAnchor = styled.a`
    font-size: 32px;
    font-weight: bold;
    color: ${(props) => props.theme.text};
    margin-left: 30px;
`;

export const AnchorContainer = styled.div`
    float: right;
`;

export const RightAnchorContainer = styled.div`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
`;

export const ListAnchor = styled.a`
    font-weight: 700;
    font-size: 24px;
    font-family:
        GmarketSansTTFMedium,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        sans-serif;
    color: ${(props) => props.theme.text};
`;

export const LogoutButton = styled.a`
    display: flex;
    align-items: center;
    height: 72px;
    border-radius: 10%;
    font-weight: 700;
    font-size: 24px;
    color: ${(props) => props.theme.text};
    background-color: rgba(0, 0, 0, 0);
    font-family:
        GmarketSansTTFMedium,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        sans-serif;
    border: 0;
    &:hover {
        cursor: pointer;
    }
`;

export const LoginButton = styled.a`
    display: flex;
    align-items: center;
    height: 72px;
    border-radius: 10%;
    font-weight: 700;
    font-size: 24px;
    color: ${(props) => props.theme.text};
    background-color: rgba(0, 0, 0, 0);
    font-family:
        GmarketSansTTFMedium,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        sans-serif;
    border: 0;
    &:hover {
        cursor: pointer;
    }
`;
