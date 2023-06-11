import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerlimit: 25,
      timerStatus: 'Paused',
      timerMincount: 0, // Initialize with a default value
      timerSeccount: 0,
      isRest: true,
    }
    const {timerlimit} = this.state // Destructure timerlimit from state
    this.state.timerMincount = timerlimit // Use destructured timerlimit
  }

  //   {timerlimit}=this.state

  //   state.timerMincount = state.timerlimit

  IncreaseTimer = () => {
    const {isRest} = this.state
    if (isRest)
      this.setState(prev => ({
        timerlimit: prev.timerlimit + 1,
        timerMincount: prev.timerMincount + 1,
      }))
  }

  DecreaseTimer = () => {
    const {isRest} = this.state
    if (isRest)
      this.setState(prev => ({
        timerlimit: prev.timerlimit - 1,
        timerMincount: prev.timerMincount - 1,
      }))
  }

  startorstop = () => {
    const {timerStatus} = this.state
    if (timerStatus === 'Paused') this.startTimer()
    else this.stopTimer()
  }

  startTimer = () => {
    const {timerMincount, timerSeccount, isRest, timerlimit} = this.state
    if (timerMincount === 0 && timerSeccount === 0) {
      this.setState({
        timerMincount: timerlimit,
        timerSeccount: 0,
        timerStatus: 'Running',
        isRest: false,
      })
    }
    if (isRest) this.setState(prev => ({timerMincount: prev.timerlimit}))
    this.id = setInterval(this.tick, 1000)
    this.setState({timerStatus: 'Running', isRest: false})
  }

  stopTimer = () => {
    clearInterval(this.id)
    this.setState({timerStatus: 'Paused', isRest: false})
  }

  resetTimer = () => {
    clearInterval(this.id)
    //   const
    this.setState(prevState => ({
      isRest: !prevState.isRest,
      timerStatus: 'Paused',
      timerMincount: 25,
      timerSeccount: 0,
      timerlimit: 25,
    }))
  }

  tick = () => {
    const {timerMincount, timerSeccount, timerStatus} = this.state

    if (timerMincount === 0 && timerSeccount === 0) {
      clearInterval(this.id)
      this.setState({timerStatus: 'Paused'})
    } else if (timerSeccount === 0) {
      this.setState(prevState => ({
        timerMincount: prevState.timerMincount - 1,
        timerSeccount: 59,
      }))
    } else {
      console.log('fuck2')
      this.setState(prevState => ({
        timerSeccount: prevState.timerSeccount - 1,
      }))
    }
  }

  render() {
    const {timerlimit, timerStatus, timerMincount, timerSeccount} = this.state
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="timer">
            <div className="timer2">
              <h3>
                {timerSeccount < 10
                  ? `${timerMincount}:0${timerSeccount}`
                  : `${timerMincount}:${timerSeccount}`}
              </h3>
              <p>{timerStatus}</p>
            </div>
          </div>
          <div className="timer-controls">
            <div className="playreset">
              <button type="button" onClick={this.startorstop}>
                <img
                  src={
                    timerStatus === 'Running'
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={timerStatus === 'Running' ? 'pause icon' : 'play icon'}
                  className="control-icon"
                />
                {timerStatus === 'Running' ? 'Pause' : 'Start'}
              </button>

              {/* <p>{timerStatus === 'Running' ? 'Pause' : 'Start'}</p> */}
            </div>
            <div className="playreset">
              <button type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="control-icon"
                  onClick={this.resetTimer}
                />
              </button>

              <p>Reset</p>
            </div>
            <div className="timerlimit">
              <p>Set Timer Limit</p>
              <div className="adjusttimerlimit">
                <button type="button" onClick={this.DecreaseTimer}>
                  -
                </button>
                <p>{timerlimit}</p>
                <button type="button" onClick={this.IncreaseTimer}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
