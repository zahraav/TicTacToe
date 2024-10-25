import { useState } from "react";
import './Player.css'

export default function Player({ initialName, symbol ,isActive,onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        defaultValue={initialName}
        onChange={handleChange}
      />
    );
  }
  function handleEditclick() {
    setIsEditing((editing) => !editing);
      onChangeName(symbol,playerName);
  }
  return (
    <li className={isActive? 'active' :undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button className="player-button"onClick={handleEditclick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
