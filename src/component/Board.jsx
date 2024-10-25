import './Board.css'


export default function Board({onSelectSquere,board}){
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