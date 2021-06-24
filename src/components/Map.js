import React from 'react'
import Square from './Square'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      length: null,
      height: null,
      dirtLocations: [],
      initialRoombaLocation: [], 
      travelLog: [],
      travelLogRunning: false,
    }
  }


  componentDidMount = () => {
    this.convertTravelLogEntries(this.props.travelLog)
    this.setState({
      length: this.props.dimentionX,
      height: this.props.dimentionY,
      dirtLocations: this.props.dirtLocations,
      travelLog: this.props.travelLog,
      initialRoombaLocation: this.props.initialRoombaLocation
    })
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.travelLog.length !== this.state.travelLog.length && !this.state.travelLogRunning) {
      this.setState({travelLogRunning: true})
      this.convertTravelLogEntries(this.props.travelLog)
    }

    if(prevProps !== this.props) {
      this.setState({
        length: this.props.dimentionX,
        height: this.props.dimentionY,
        dirtLocations: this.props.dirtLocations,
        initialRoombaLocation: this.props.initialRoombaLocation
  
      })
    }
  }


  convertTravelLogEntries = (arr) => {
    let newArr = []
    let a = arr
    let b = Array.from(a)
    newArr = b.map(el => {
      return el.split`,`.map(x => +x)
    })
    this.setState({
      travelLog: newArr,
      travelLogRunning: false
    })
  }

  printGrid = (arr) => {
    return arr.map((row, idx) => {
      return <tr key={idx}>{row}</tr>
    })
  }

  hasDirt = (x, y) => {
    let bool = false
    this.state.dirtLocations.forEach(el => {
      if(el[0] === x + 1 &&
        el[1] === y + 1 &&
        bool === false) {
          bool = true
        }
    })
    return bool
  }

  previouslyHadRoomba = (x, y) => {
    let bool = false

    let array = this.state.travelLog.slice(0, this.state.travelLog.length - 1)
    array.forEach(el => {
      if(el[0] === x + 1 &&
        el[1] === y + 1 &&
        bool === false ) {
          bool = true
        } 
    })
    return bool
  }

  hasRoomba = (x, y) => {
    if(this.state.initialRoombaLocation[0] === x + 1 &&
      this.state.initialRoombaLocation[1] === y + 1) {
        return true
      } else {
        return false
      }
  }

  render() {
    const length = this.state.length
    const height = this.state.height
    let randomKeyGen = Math.floor((Math.random() * 100000) + 1)
    let arrayOfMapSquares = []

    for(let i = height - 1; i >= 0; i--) {
      let row = []

      for(let c = 0; c < length; c++) {
        row.push(
          <td          
            key={randomKeyGen}
          >
            <Square 
              x={c}
              y={i}
              initialRoombaLocation={this.props.initialRoombaLocation}
              hasRoomba={this.hasRoomba(c, i)}
              hadRoomba={this.previouslyHadRoomba(c, i)}
              hasDirt={this.hasDirt(c, i)}
              foundDirt={this.props.checkForDirt}
            />
          </td>
        )
        randomKeyGen++
      }
      arrayOfMapSquares.push(row)
    }

    return (
      <div>
        <table id="mapTable">
          <tbody>
            {this.printGrid(arrayOfMapSquares)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Map