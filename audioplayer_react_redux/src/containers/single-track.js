import React, { Component } from 'react';
import {selectTrack} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Track extends Component{
	// Track Item class attribute: check if this current track is the active one
	setClassName(){
		if( !this.props.activeTrack ){
			return '';
		}
		return this.props.track.id == this.props.activeTrack.id ? "selected "+this.props.activeTrack.isPlaying:"";
	}
	// Beautify the elapsed time format
	timeFormat(seconds){
			var pair = function(seconds) {return seconds < 10 ? "0" + seconds : seconds;};
			return [
			pair(Math.floor(seconds / 3600)),
			pair(Math.floor(seconds % 3600 / 60)),
			pair(Math.floor(seconds % 60)),
			].join(':');
	}
	
	render(){
		return (
			<li 
			className={"clearfix " + this.setClassName()}
			onClick={() => this.props.selectTrack(this.props.track)} >
				<div className="icon">
					<i className="fa fa-play" aria-hidden="true"></i>
					<i className="fa fa-pause" aria-hidden="true"></i>
				</div>
				<div className="title">{this.props.track.title}</div>
				<div className="duration">
					<span className="total">{this.props.track.duration}</span>
					<span className="elapsed">{!this.props.activeTrack ? '': this.timeFormat(this.props.activeTrack.elapsedTime)}</span>
				</div>
			</li>
		);
	}
}


// Mapping Redux state to Props
function mapStateToProps(state){
	return {
		activeTrack: state.activeTrack
	}
}
// Mapping Dispatch functions to Props
function mapDispatchToProps(dispatch){
	return bindActionCreators({selectTrack: selectTrack}, dispatch);
}
// Connect Mapping functions with Component
export default connect(mapStateToProps, mapDispatchToProps)(Track);