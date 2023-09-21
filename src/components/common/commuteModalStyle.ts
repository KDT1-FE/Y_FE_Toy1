import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 1002;

  background: #0000007f;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  width: 40%;

  border-radius: 15px;
  background: var(--color-white);

  padding: 2.4375rem 3.375rem;

  display: flex;
  flex-direction: column;

  position: relative;
`;

export const Xicon = styled.img`
  position: absolute;
  width: 0.8125rem;
  height: 0.8125rem;

  top: 1.875rem;
  right: 1.875rem;

  cursor: pointer;
`;

export const Title = styled.span`
  color: var(--color-gray);
  font-weight: 700;
  font-size: 1.125rem;
  line-height: normal;
  text-align: center;

  margin-bottom: 2.1875rem;
`;

export const TimeBox = styled.div`
  border-radius: 15px;
  background: var(--color-white);
  border: 1px solid var(--color-light-gray);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2.5625rem;

  margin-bottom: 2.375rem;
`;

export const Date = styled.span`
  color: var(--color-gray);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: normal;
`;

export const NowTime = styled.time`
  color: var(--color-gray);
  font-weight: 500;
  font-size: 2.375rem;
  line-height: normal;
`;

export const CommuteTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;

  margin-bottom: 2.5rem;
`;

export const CommuteTime = styled.span`
  color: var(--color-gray);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: normal;
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: 0.3125rem;
  justify-content: center;
`;
