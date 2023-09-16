import React from 'react';

interface SlideText {
  text: string;
  style: React.CSSProperties;
}

interface SlideProps {
  backgroundColor: string;
  text: SlideText[];
  imageSrc: string;
}

const Slide: React.FC<SlideProps> = ({ backgroundColor, text, imageSrc }) => {
  const slideStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className="slide" style={slideStyle}>
      <div className="slide-content">
        <div className="slide-left">
          {text.map((textItem, index) => (
            <div key={index} style={{ display: 'block' }}>
              <p
                style={{
                  ...textItem.style,
                  backgroundColor: textItem.style.backgroundColor,
                  display: 'inline-block', // 텍스트 세로 정렬을 위해 추가
                  marginBottom: '40px', 
                }}
              >
                {textItem.text}
              </p>
            </div>
          ))}
        </div>
        <div className="slide-right">
          <img src={imageSrc} alt="Slide" />
        </div>
      </div>
    </div>
  );
};

export default Slide;
