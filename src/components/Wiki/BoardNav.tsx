import * as React from 'react'
import './BoardNav.scss'

// export interface IAppProps {
//     type:number,
// }

type BoardState = 'QA' | 'Free' | 'Best';

export function BoardNav (props: any) {
    const [isBoardState,setBoardState] = React.useState('QA')
    
    const handleBoardClick = (event : any) : void =>{
        const selectBoard : string = event.target.innerHTML;
        console.log(selectBoard);
        
        if (selectBoard === 'Q&amp;A'){
            setBoardState('QA')
        }
        else if (selectBoard === '자유게시판'){
            setBoardState('Free')
        }
        else if (selectBoard === '주간인기글'){
            setBoardState('Best')
        }

        
    }
    
    
  return (
    <nav>
        <ul className='boardList'>
            <li onClick={handleBoardClick}>Q&A</li>
            <li onClick={handleBoardClick}>자유게시판</li>
            <li onClick={handleBoardClick}>주간인기글</li>
        </ul>
    </nav>
      
    
  );
}
