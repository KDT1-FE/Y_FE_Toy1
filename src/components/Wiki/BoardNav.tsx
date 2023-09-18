import * as React from 'react'
import './BoardNav.scss'
import { useDispatch,useSelector } from 'react-redux';
import { boardStateSlice } from 'redux/store';
import { useNavigate } from 'react-router-dom';


type BoardState = 'QA' | 'Free' | 'Best';

export function BoardNav (props: any) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const boardState = useSelector((state:any)=>state.boardState.value)
    
    const handleBoardClick = (event : any) : void =>{
        const selectBoard : string = event.target.innerHTML;
        if (selectBoard === 'Q &amp; A'){
            dispatch(boardStateSlice.actions.qa('QA'))
            navigate(`/wiki`)
        }
        else if (selectBoard === '커뮤니티'){

            dispatch(boardStateSlice.actions.qa('Free'))
            navigate(`/wiki`)
        }
        else if (selectBoard === '지식 공유'){
            dispatch(boardStateSlice.actions.qa('Best'))
            navigate(`/wiki`)
        }

        
    }
    
    
  return (
    <nav>
        <ul className='boardList'>
            <li onClick={handleBoardClick}>Q & A</li>
            <li onClick={handleBoardClick}>커뮤니티</li>
            <li onClick={handleBoardClick}>지식 공유</li>
        </ul>
        {/* <p>상태 : {boardState}</p> */}
    </nav>
      
    
  );
}
