import React, { Component } from 'react'

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.settings
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (event) => {

        var setting = event.target.name;
        var value;
        
        if (parseInt(event.target.value)) {
            value = parseInt(event.target.value);
        } else {
            value = event.target.value;
        }

        this.setState({
            [setting]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.updateSettings(this.state);
    }

    restoreDefaults = () => {
        this.setState({
            ...this.props.defaultSettings
        }, () => {
            this.props.clearSettingsCookie();
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} id="settings" >
                    <p><strong>Custom Timer Times</strong></p>
                    <div>
                        <p>Pomodoro Time:</p>
                        <input type="number" name="pomodoroTimeLengthMinutes" value={this.state.pomodoroTimeLengthMinutes} onChange={this.onChange} />
                        <p>Short Break Time:</p>
                        <input type="number" name="shortBreakTimeLengthMinutes" value={this.state.shortBreakTimeLengthMinutes} onChange={this.onChange}/>
                        <p>Long Break Time:</p>
                        <input type="number" name="longBreakTimeLengthMinutes" value={this.state.longBreakTimeLengthMinutes} onChange={this.onChange}/>
                    </div>
                    <p>---</p>
                    <p><strong>Sound Picker</strong></p>
                    <p>---</p>
                    <p><strong>Adjust Volume</strong></p>
                    <p>---</p>
                    <p><strong>Browser Notification</strong></p>
                    <p>---</p>
                    <p><strong>Auto Start Pomodoros and Breaks</strong></p>
                    <p>---</p>
                    <p><strong>Log View Pomodoros Only</strong></p>
                    <button type="submit" value="submit">Save Settings</button>
                    <p>---</p>
                </form>
                <button onClick={this.restoreDefaults}>Restore Defaults</button>
            </div>
        )
    }
}