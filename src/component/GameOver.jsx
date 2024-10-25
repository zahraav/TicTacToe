import "./GameOver.css"
export default function GameOver({winner, onRematch}){
    return (<div id="game-over">
        <h2>Game Over</h2>
        {winner && <p>You won, {winner}</p>}
        {!winner && <p>It&apos;s Draw </p>}
        <p><button onClick={onRematch}>rematch</button></p>
    </div>);
}