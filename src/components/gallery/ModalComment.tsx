import React from 'react';

export function Comment() {
  return (
    <div>
      <h3>자유롭게 대화해 보세요!</h3>

      <div className="imageView">
        <img src="{image.image}" alt="{image.image}" />
      </div>
      <div className="commentContainer">
        <div className="commentInputBox">
          <input type="text" name="" id="" />
        </div>
        <ul className="commentList">
          <li className="comment"></li>
        </ul>
      </div>
    </div>
  );
}
