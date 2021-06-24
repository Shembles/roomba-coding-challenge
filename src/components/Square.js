import React from 'react'

function Square(props) {

  let classPick = "dirtSquare"
  if (props.hasDirt && props.hadRoomba) {
    classPick = "coverSquare"
  } else if(props.hasDirt && props.hasRoomba) {
    classPick = "generalRoombaSquare roombaSquare"
  } else if(props.hasDirt) {
    classPick = "dirtSquare"
  } else if(props.hasRoomba) {
    classPick = "generalRoombaSquare roombaSquare"
  } else if(props.hadRoomba) {
    classPick = "coverSquare"
  }else {
    classPick = "generalRoombaSquare"
  }
  return (
    <div className={"generalSquare " + classPick}></div>
  )
}
export default Square