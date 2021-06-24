import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map'
import StatsBox from './components/StatsBox'

const App = () => {
  
  const [state, setState] = useState(
    {
    initialRoombaLocation: [1,1],
    travelLog: [],
    points: 0,
    batteryPower: 1000,
    dimentionX: 8,
    dimentionY: 8,
    dirtLocations: [
      [Math.floor(Math.random() * (4 - 2 + 1) + 2), 1],
      [Math.floor(Math.random() * (8 - 5 + 1) + 5), 1],
      [Math.floor(Math.random() * (4 - 1 + 1) + 1), 2],
      [Math.floor(Math.random() * (6 - 5 + 1) + 5), 2],
      [Math.floor(Math.random() * (8 - 7 + 1) + 7), 2],
      [Math.floor(Math.random() * (4 - 1 + 1) + 1), 3],
      [Math.floor(Math.random() * (8 - 5 + 1) + 5), 3],
      [Math.floor(Math.random() * (4 - 1 + 1) + 1), 4],
      [Math.floor(Math.random() * (8 - 5 + 1) + 5), 4],
      [Math.floor(Math.random() * (2 - 1 + 1) + 1), 5],
      [Math.floor(Math.random() * (4 - 3 + 1) + 3), 5],
      [Math.floor(Math.random() * (8 - 5 + 1) + 5), 5],
      [Math.floor(Math.random() * (4 - 1 + 1) + 1), 6],
      [Math.floor(Math.random() * (8 - 5 + 1) + 5), 6],
      [Math.floor(Math.random() * (4 - 1 + 1) + 1), 7],
      [Math.floor(Math.random() * (8 - 5 + 1) + 5), 7],
      [Math.floor(Math.random() * (4 - 1 + 1) + 1), 8],
      [Math.floor(Math.random() * (8 - 5 + 1) + 5), 8],
    ],
    foundDirtLocations: [],
    movementCounter: 0,
    dirtCollected: 0
  })

  useEffect(() => {
    const roombaStart = [1,1];
    setState({
      ...state,
      travelLog: [roombaStart.join(",")]
    })
    console.log("effect", state.dirtCollected, state.batteryPower)
    if (state.dirtCollected === 18 || state.batteryPower === 0) {
      backToStation();
    } else {
      autoPilot()
    }
    console.log("travel >>", state.travelLog)
  },[])

  const waitForPromise = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ms)
      }, ms);
    })
  }
  const waitForPromiseToStation = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ms)
      }, ms);
    })
  }

  const autoPilot = async () => {

    setTimeout( async () => {
      for(let i = 0; i < 999 ; i++) {
        
        let commands = Math.floor(Math.random() * 4) + 1
        console.log("xy >>", state.initialRoombaLocation[0], state.initialRoombaLocation[1])
        console.log("dirt", state.dirtCollected)
        console.log("battery", state.batteryPower)
        if (state.dirtCollected === 18 || state.batteryPower === 0) {
          console.log("dirt", state.dirtCollected)
          backToStation();
        }
        
        if(commands === 1) {
          goSouth()
          await waitForPromise(1000)
        }

        if(commands === 2 ) {
          goWest()
          await waitForPromise(1000)
        }

        if(commands === 3) {
          goEast()
          await waitForPromise(1000)
        }

        if(commands === 4) {
          goNorth()
          await waitForPromise(1000)
        }

      }
    }, 4000) 
  }

  const backToStation = async () => {
    if (state.dirtCollected === 18 && state.batteryPower === 0) {
      gameOver();
    }

    setTimeout( async () => {
      for(let i = 0; i < 999 ; i++) {
    
        let commands = Math.floor(Math.random() * 2) + 1
        console.log("log2 >>", commands)
        
        if(commands === 1) {
          goSouthToStation()
          await waitForPromiseToStation(1000)
        }

        if(commands === 2 ) {
          goWestToStation()
          await waitForPromiseToStation(1000)
        }

      }
    }, 2000) 
  }


  const increaseMovementCounter = () => {
    
    setState({
      ...state,
      movementCounter: state.movementCounter += 1,
      batteryPower: state.batteryPower--,
      points: state.points -= 10,
    })
  
    updateTravelLog()
    checkForDirt()
    
  }
  const increaseMovementCounterToStation = () => {
    
    if (state.batteryPower === 0) {
      setState({
        ...state,
        initialRoombaLocation: [1, 1],
      })
      gameOver();
    } else if (state.dirtCollected === 18) {
      setState({
        ...state,
        movementCounter: state.movementCounter += 1,
        batteryPower: state.batteryPower -= 1,
      })
      if (state.initialRoombaLocation[0] === 1 && state.initialRoombaLocation[1] === 1) {
        setState({
          ...state,
          initialRoombaLocation: [1, 1]
        })
        gameOver();
      }
      backToStation();
    } 
    
  }

  const checkForDirt = () => {
    let foundDirtLocArray = state.foundDirtLocations
    state.dirtLocations.forEach(dirt => {
      if(state.initialRoombaLocation[0] === dirt[0] &&
        state.initialRoombaLocation[1] === dirt[1] &&
        !foundDirtLocArray.includes(dirt)) {
          foundDirtLocArray.push(dirt)
          setState({
            ...state,
            foundDirtLocations: foundDirtLocArray,
            dirtCollected: state.dirtCollected += 1,
            points: state.points += 250
          })
        }
    })
  }

  const updateTravelLog = () => {
    let arr = state.travelLog
    arr.push(state.initialRoombaLocation.join(","))
    setState({
      ...state,
      travelLog: arr
    })
  }

  const goNorth = () => {
    let currentLocation = state.initialRoombaLocation
    if(currentLocation[1] !== state.dimentionY) {
      currentLocation[1]++
      setState({
        ...state,
        initialRoombaLocation: currentLocation
      })
      increaseMovementCounter()
    }
  }
 

  const goSouth = () => {
    let currentLocation = state.initialRoombaLocation
    if(currentLocation[1] !== 1) {
      currentLocation[1]--
      setState({
        ...state,
        initialRoombaLocation: currentLocation
      })
      increaseMovementCounter()
    }
  }
  const goSouthToStation = () => {
    let currentLocation = state.initialRoombaLocation
    if(currentLocation[1] !== 1) {
      currentLocation[1]--
      setState({
        ...state,
        initialRoombaLocation: currentLocation
      })
      increaseMovementCounterToStation()
    }
  }

  const goEast = () => {
    let currentLocation = state.initialRoombaLocation
    if(currentLocation[0] !== state.dimentionX) {
      currentLocation[0]++
      setState({
        ...state,
        initialRoombaLocation: currentLocation
      })
      increaseMovementCounter()
    }
  }

  const goWest = () => {
    let currentLocation = state.initialRoombaLocation
    if(currentLocation[0] !== 1) {
      currentLocation[0]--
      setState({
        ...state,
        initialRoombaLocation: currentLocation
      })
      increaseMovementCounter()
    }
  }
  const goWestToStation = () => {
    let currentLocation = state.initialRoombaLocation
    if(currentLocation[0] !== 1) {
      currentLocation[0]--
      setState({
        ...state,
        initialRoombaLocation: currentLocation
      })
      increaseMovementCounterToStation()
    }
  }

  const gameOver = () => {
    if (state.batteryPower === 0) {
      alert("Sorry, my battery is flat. Please refresh page to start again.")
    } else if (state.dirtCollected === 18) {
      alert("Hello, I am done cleaning your floor. Please refresh page to start again.")
    } else {
      alert("Your cleaning got terminated. Please refresh page to start again.")
    }
  }

  return (
    <div className="App">
      <h3>Roomba Coding Challenge</h3>
        <div id="mapAndStatsBoxDiv" className="nes-container is-rounded is-dark">
          <Map 
            initialRoombaLocation={state.initialRoombaLocation}
            dimentionX={state.dimentionX} 
            dimentionY={state.dimentionY}
            dirtLocations={state.dirtLocations}
            travelLog={state.travelLog}
            // checkForDirt={checkForDirt}
          />
          <StatsBox
            batteryPower = {state.batteryPower}
            points = {state.points}
            movementCounter={state.movementCounter}
            dirtCollected={state.dirtCollected}
          />
        </div>
    </div>
  );
}

export default App;
