import React, { Component } from 'react';
import CommentSection from './CommentSection';
import Arrow from './Arrow';
import Button from '@material-ui/core/Button';
import tomatoImg from './assets/tomato.png';
import coffeeImg from './assets/coffee.png';

export default class TomatoCounter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isInteractedWith: false,
        };
    }

    removeArrow = () => {

        var arrow = document.getElementsByClassName('arrow')[0];

        if (arrow) {

            arrow.style.opacity = '0';
            
            var computedStyleRight = parseInt(window.getComputedStyle(arrow).right.replace('px', ''));
            arrow.style.right = `${computedStyleRight - 10}px`;
        }

        setTimeout( () => {
            this.setState({
                isInteractedWith: true,
            });
        }, 1000);

    }

    editLogComment = (dayId, elementId, comment) => {
        this.props.editLogComment(dayId, elementId, comment);
    }

    render() {


        var filterDays = this.props.daysWithWork.filter( (day) => {
            return day.timeElements.length > 0;
        })
        
        var daysArray = filterDays.map( (day) => {

            var elementsArray = []

            day.timeElements.forEach( (element) => {

                var arrow;

                if (!this.state.isInteractedWith && this.props.daysWithWork.length === 1 && this.props.daysWithWork[0].timeElements.length === 1) {
                    arrow = <Arrow />
                }

                if ((!this.props.showBreaksInLog && element.isTomato) || this.props.showBreaksInLog) {
                    elementsArray.push(
                        <div className={`single-element-wrapper ${element.isTomato ? 'tomato' : 'break'} ${!element.isTomato && !this.props.showBreaksInLog ? 'hide-element' : 'show-element'}`} key={element.id}>
                            <div className={`time-element ${element.isTomato ? 'tomato' : 'break'}`}>
                                <img src={tomatoImg} className={'tomato-image'} onMouseEnter={this.removeArrow} alt="Tomato Icon"/>
                                <img src={coffeeImg} className={'coffee-image'} onMouseEnter={this.removeArrow} alt="Coffee Icon"/>
                                <div className={"element-pop-up"}>
                                    <CommentSection comment={element.comment} editingComment={element.editingComment} editLogComment={this.editLogComment.bind(this, day.id, element.id)}/>
                                    <hr style={{marginTop: '15px'}}/>
                                    <div className="log-info">
                                        <p><strong>Details:</strong></p>
                                        <p>{element.minutes} minute timer</p>
                                        <p>Time Started: {element.timeStarted}</p>
                                        <p>Time Completed: {element.timeStarted}</p>
                                        <p>Date Completed: {element.dateCompleted}</p>
                                    </div>
                                    <hr style={{margin: '12px 0'}}/>
                                    <Button onClick={this.props.deleteElement.bind(this, day.id, element.id)} className="rm-button clear" variant="outlined" style={{width: '100%'}} >Delete Element</Button>
                                </div>
                                {arrow}
                            </div>
                        </div>
                    )
                }
            })

            return (
                <div className={`day ${(day.timeElements.some( (element) => element.isTomato) ) ? 'has-tomatoes' : 'no-tomatoes'} ${( this.props.showBreaksInLog ) ? 'show-breaks' : 'hide-breaks'}`} key={day.id}>
                    <h3 className={'date'}>{day.date}</h3>
                    <div className={'time-elements-container'}>
                        {elementsArray}
                    </div>
                </div>
            )
        })

        var emptyMessage;
        if (this.props.daysWithWork.length === 0) {
            emptyMessage = <p>(Complete a pomodoro and a log of your finished time segments will be stored here)</p>
        }

        return (

            <div className="pomodoro-log" >
                <h2>Pomodoro Log</h2>
                {emptyMessage}
                <div>
                    {daysArray}
                </div>
            </div>
        )
    }
}
