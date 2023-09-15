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
            <p key={index} style={textItem.style}>
              {textItem.text}
            </p>
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
