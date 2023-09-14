import React from 'react';

interface SlideProps {
  backgroundColor: string;
  text: string;
  imageSrc: string;
}

const Slide: React.FC<SlideProps> = ({ backgroundColor, text, imageSrc }) => {
  const slideStyle = {
    backgroundColor: backgroundColor, // 배경색 스타일 추가
  };

  return (
    <div className="slide" style={slideStyle}>
      <div className="slide-content" >
        <div className="slide-left">
          <p>{text}</p>
        </div>
        <div className="slide-right">
          <img src={imageSrc} alt="Slide" />
        </div>
      </div>
    </div>
  );
};

export default Slide;


