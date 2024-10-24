import './Board.css'


export default function Board({onSelectSquere,board}){

   
    // const [gameBoard,setGameBoard]=useState(initalBoard);
    // function handleSelectsquer(rowindex,colindex,player){
    //     setGameBoard((prevboard)=>{
    //         const updatedBoard=[...prevboard.map(innerArray=>[...innerArray])];
    //         updatedBoard[rowindex][colindex]=activePlayerSymbol
    //         return updatedBoard
    //     });
    //     onSelectSquere();
    // }

    return(
        <ol className="board">
        {board.map((row,rowindex)=><li key={rowindex}>
            <ol>
                {row.map((playerSymbol,colindex)=><li key={colindex}>
                    <button onClick={()=>{
                        onSelectSquere(rowindex,colindex)}} disabled={playerSymbol!=null}>{playerSymbol}
                    </button>
                    </li>)}
            </ol>
        </li>)}       
        </ol>
    );
}