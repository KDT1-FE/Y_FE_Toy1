import React from 'react';

interface ISlideText {
  text: string;
  style: React.CSSProperties;
}

interface ISlideProps {
  backgroundColor: string;
  text: ISlideText[];
  imageSrc: string;
  link?: string; // 새로운 link 프로퍼티 추가
}

const Slide: React.FC<ISlideProps> = ({
  backgroundColor,
  text,
  imageSrc,
  link,
}) => {
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
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={imageSrc} alt="Slide" />
            </a>
          ) : (
            <img src={imageSrc} alt="Slide" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Slide;
