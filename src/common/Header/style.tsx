import styled from '@emotion/styled';
export const HeaderComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--navigation-background);

    position: fixed;
    z-index: 2;

    top: 0;
    left: 0;
    height: 72px;
    width: 100%;
`;

export const TitleAnchor = styled.a`
    margin-left: 30px;
    font-size: 32px;
    font-weight: bold;
    color: var(--text);
`;

export const AnchorContainer = styled.div`
    float: right;
`;

export const RightAnchorContainer = styled.div`
    display: flex;
`;

export const ListAnchor = styled.a`
    margin-right: 20px;
    font-weight: 500;
    font-size: 24px;
    color: var(--text);
`;

export const ModalButton = styled.button`
    background-color: var(--active-item);
    border: none;
    border-radius: 10px;
    margin-right: 30px;
    margin-left: 10px;
    padding: 5px;
    font-weight: 500;
    font-size: 24px;
    color: var(--text);

    &:hover {
        background-color: skyblue;
    }
`;
