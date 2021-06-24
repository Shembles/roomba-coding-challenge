import React from 'react'

function StatsBox(props) {

    return (
      <div id="statsBoxDiv">
        <h2>Roomba Performance</h2>
        <p>Points Acquired: {props.points} points.</p>
        <p>Battery Power: {props.batteryPower} volts.</p>
        <p>Total Movements: {props.movementCounter} moves.</p>
        <p>Dirt Collected: {props.dirtCollected} tiles.</p>
      </div>
    )
}

export default StatsBox