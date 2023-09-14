import styled from "styled-components";

export const Container = styled.section`
    overflow: hidden;
    display: flex;
    background-color: var(--color-main);
    justify-content:center;
`;


export const Content = styled.div`
    width: 22.88em;
    height: 31.25rem;
    background-color: var(--color-white);
    border-radius: 0 0.94rem 0.94rem 0;
    margin: 15rem 19.06rem 15rem 0;

`;


export const Info = styled.div`
    width: 29rem;
    height: 31.25rem;
    background-color: rgba( 255, 255, 255, 0.05 );
    border: 0.06rem solid #42537E;
    border-radius: 0.94rem 0 0 0.94rem;
    margin: 15rem 0 15rem 19.06rem;
`;

export const Logo = styled.div`

`;

export const CompanyName = styled.div`
    color: var(--color-white);
    font-size: 1.88rem;
    line-height: normal;
    text-align: left;
    letter-spacing: -0.1rem;
    margin: 11.69rem 0 0 5.38rem;
`;


export const ServiceName = styled.div`
    color: var(--color-white); 
    font-weight: bold;
    font-size: 3.13rem;
    line-height: normal;
    text-align: left;
    letter-spacing: -0.1rem;
    margin: 0 17rem 11.75rem 5.38rem
`;

