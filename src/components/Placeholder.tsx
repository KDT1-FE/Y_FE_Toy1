import React from 'react';

interface PlaceholderProps {
  type?: 'attendance' | '';
  // type?: 'attendance' | '';
  // 사용하는 곳에서 특정 스타일을 추가하고싶을 경우 type으로 넘겨서 props값 추가해주기
}

const Placeholder = ({ type }: PlaceholderProps): JSX.Element => {
  return (
    <div className={`placeholder ${type ? type : ''}`}>
      <div className="placeholder-box"></div>
    </div>
  );
};

export default Placeholder;
