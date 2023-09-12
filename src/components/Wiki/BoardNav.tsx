import * as React from 'react'
import './BoardNav.scss'
import { useDispatch,useSelector } from 'react-redux';
import { boardStateSlice } from 'redux/store';
// export interface IAppProps {
//     type:number,
// }

type BoardState = 'QA' | 'Free' | 'Best';

export function BoardNav (props: any) {
    const dispatch = useDispatch();
    const boardState = useSelector((state:any)=>state.boardState.value)
    
    const handleBoardClick = (event : any) : void =>{
        const selectBoard : string = event.target.innerHTML;
        if (selectBoard === 'Q&amp;A'){
            dispatch(boardStateSlice.actions.qa('QA'))
        }
        else if (selectBoard === '자유게시판'){

            dispatch(boardStateSlice.actions.qa('Free'))
        }
        else if (selectBoard === '주간인기글'){
            dispatch(boardStateSlice.actions.qa('Best'))
        }

        
    }
    
    
  return (
    <nav>
        <ul className='boardList'>
            <li onClick={handleBoardClick}>Q&A</li>
            <li onClick={handleBoardClick}>자유게시판</li>
            <li onClick={handleBoardClick}>주간인기글</li>
        </ul>
        <p>상태 : {boardState}</p>
    </nav>
      
    
  );
}
