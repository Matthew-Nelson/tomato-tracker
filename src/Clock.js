import React, { Component } from 'react';
import ClockChanger from './ClockChanger.js';

export default class Clock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRunning: false,
            secondsElapsed: 0
        };
    }

    changeClock = (newLength, newTimerType) => {

        this.props.passVarsUp(newLength, newTimerType);
        
        this.updateClockState(false);
        
        this.resetClock();

    }

    updateClockState = (clockState) => {
        this.setState({
            isRunning: clockState
        })
    }
        
    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    startClock = () => {
        
        if (!this.state.isRunning) {
            if (this.props.startSeconds === this.state.secondsElapsed) {
                this.resetClock();
            }
            this.updateClockState(true);
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }

    }

    stopClock = () => {
        this.updateClockState(false);
        clearInterval(this.timerID);
    }

    resetClock = () => {
        this.stopClock();
        this.changeTitle(false);
        this.setState({
            secondsElapsed: 0
        });
    }

    tick = () => {
        this.setState({
            secondsElapsed: (this.state.secondsElapsed + 1)
        })

        this.changeTitle(true);

        if (this.state.secondsElapsed === this.props.startSeconds) {
            this.stopClock();
            this.props.finishTimer(this.props.timerType, this.props.startSeconds);
        }
    }

    changeTitle = (showTimeInTitle) => {
        var title = 'Pomodoro';

        if (showTimeInTitle === false) {
            document.title = title;
        } else {
            var fomattedTime = this.formatSeconds(this.props.startSeconds - this.state.secondsElapsed);
            document.title = `${title} (${fomattedTime})`;
        }
    }

    skipToEnd = () => {
        this.setState({
            secondsElapsed: (this.props.startSeconds - 2)
        }, () => {
            if (!this.state.isRunning)
                this.startClock()
        })
    }

    formatSeconds = (origSec) => {
        var hours   = Math.floor(origSec / 3600);
        var minutes = Math.floor((origSec - (hours * 3600)) / 60);
        var seconds = origSec - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = `0${hours}:`
            if (hours === '00:') {
                hours = '';
            }
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${hours}${minutes}:${seconds}`;
    }
    

    render() {


        return (
            <div>
                <ClockChanger changeClock={this.changeClock} pomodoroTimeLengthSeconds={this.props.pomodoroTimeLengthSeconds} shortBreakTimeLengthSeconds={this.props.shortBreakTimeLengthSeconds} longBreakTimeLengthSeconds={this.props.longBreakTimeLengthSeconds}/>
                
                <h2>{this.props.timerType === 'pomodoro' ? 'Pomodoro' : 'Break'} timer</h2>
                
                <h2 style={clockStyle}>{this.formatSeconds(this.props.startSeconds - this.state.secondsElapsed)}</h2>
                
                <div>
                    <button onClick={this.startClock}>Start</button>
                    <button onClick={this.stopClock}>Stop</button>
                    <button onClick={this.resetClock}>Reset</button>
                </div>

                <button onClick={this.skipToEnd}>Skip to end of Timer</button>

            </div>
        )
    }
}

const clockStyle = {
    display: 'inline-block',
    padding: '1rem',
    border: '1px solid red'
}