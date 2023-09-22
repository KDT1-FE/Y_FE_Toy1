import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import swal from 'sweetalert';
import getLoginAuth from '../../../../hooks/getLoginAuth';
import { updateDataByNumber } from '../../../../utils/util';
import {
  isCountSelector,
  countState,
  countIdState,
} from '../../../../recoil/countRecoil';
import { emailState } from '../../../../recoil/authRecoil';

type Props = {
  id: string;
  joined: number;
  people: number;
};

const WithBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem 1.5rem;

  font-size: 1.5rem;
  background-color: #ffd337;
  border: none;
  border-radius: 3rem;
  cursor: ${props => {
    return props.disabled ? 'not-allowed' : 'pointer';
  }};
  color: ${props => {
    return props.disabled ? '#888' : '#fff';
  }};

  &:hover {
    background-color: ${props => {
      return props.disabled ? '#393939' : '#ffda4f';
    }};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  gap: 1rem;

  font-size: 1rem;
  font-weight: 700;

  em {
    color: #525252;
  }
`;

const WithButton: React.FC<Props> = ({ id, joined, people }) => {
  const isLogin = getLoginAuth();
  const isCount = useRecoilValue(isCountSelector);
  const email = useRecoilValue(emailState);
  const setValue = useSetRecoilState(countState);
  const setValueId = useSetRecoilState(countIdState);

  const checkDoubleJoin = () => {
    if (id.includes(email)) {
      return true;
    }
    return false;
  };

  const onClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isLogin) {
      swal({
        title: '로그인이 필요합니다.',
        text: '로그인 좋은 말로 할 때 하세요~! 🤬',
        icon: 'warning',
      });
      return;
    }
    if (isCount) {
      swal({
        title: '이미 선택하셨습니다.',
        text: '당신을 기다리고 있는 밥약속이 있어요!! 🍚',
        icon: 'warning',
      });
      return;
    }
    if (checkDoubleJoin()) {
      swal({
        title: '이미 선택하셨습니다.',
        text: '당신이 만든 밥약속이 꽉 채워지기를 기다리고 있어요!! 🤸‍♂️',
        icon: 'warning',
      });
      return;
    }
    swal({
      title: '밥약속에 참여하시겠습니까?',
      text: '참여하시면 취소할 수 없습니다. 🤔',
      icon: 'warning',
      buttons: ['아니요', '네'],
    }).then(async value => {
      if (value) {
        swal({
          title: '참여가 완료되었습니다.',
          text: '당신을 기다리고 있는 밥약속이 곧 성사됩니다 😘',
          icon: 'success',
        });
        setValue((prev: number) => {
          return prev + 1;
        });
        setValueId(id);
        await updateDataByNumber('with-collection', id, 'joined');
      } else {
        swal({
          title: '취소되었습니다.',
          text: '다음에는 꼭 참여해주세요 🥺',
          icon: 'error',
        });
      }
    });
  };

  const isFull = joined === people;

  return (
    <ButtonContainer>
      <em>같이 먹을래요?</em>
      <WithBtn
        type="button"
        onClick={onClick}
        disabled={isFull}
      >
        {joined} / {people}
      </WithBtn>
    </ButtonContainer>
  );
};

export default WithButton;
