import React from 'react';

interface ISlideText {
  text: string;
  style: React.CSSProperties;
}

interface ISlideProps {
  backgroundColor: string;
  text: ISlideText[];
  imageSrc: string;
  link: string | null; // 링크 타입을 string 또는 null로 지정
}

const Slide: React.FC<ISlideProps> = ({ backgroundColor, text, imageSrc, link }) => {
  const slideStyle = {
    backgroundColor: backgroundColor,
  };

  const handleSlideContentClick = () => {
    if (link) {
      // 클릭한 슬라이드의 링크로 이동
      window.open(link, '_blank');
    }
  };

  return (
    <div className="slide" style={slideStyle}>
      <div className="slide-content" onClick={handleSlideContentClick}>
        <div className="slide-left">
          {text.map((textItem, index) => (
            <div key={index} style={{ display: 'block' }}>
              <p
                style={{
                  ...textItem.style,
                  backgroundColor: textItem.style.backgroundColor,
                  display: 'inline-block',
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
