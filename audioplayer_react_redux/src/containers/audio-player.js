import React, { Component } from 'react';
import {selectTrack, updateElapsedTime, updatePlayStatus, updateVolume} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class AudioPlayer extends Component{

	// Add Event Listeners to the Audio Element
	componentDidMount(){
		var audioElem = this.refs.audioElement;
		audioElem.addEventListener('timeupdate', this.updateElapsedTime.bind(this));
		audioElem.addEventListener('canplay', this.playTrack.bind(this));
	}
	// Check the Play status changes
	componentDidUpdate(prevProps, prevState, snapshot){
		if( !this.props.activeTrack ) return;
		if( !this.props.activeTrack.isPlaying ){
			this.refs.audioElement.pause();
		}else{
			this.refs.audioElement.play();
		}
	}
	// Adjust the Audio Element Volume
	componentWillReceiveProps(nextProps){
		this.refs.audioElement.volume = nextProps.settings.volume;
	}
	// Play the Track: dispatch updatePlayStatus action creator
	playTrack(){
		if( this.refs.audioElement.readyState){
			this.refs.audioElement.play();
			this.props.updatePlayStatus(true);
		}
	}
	// Pause the Track: dispatch updatePlayStatus action creator
	pauseTrack(){
		try {
			if( this.props.activeTrack.isPlaying ){
				this.refs.audioElement.pause();
				this.props.updatePlayStatus(false);
			}
		}catch(e) {}
	}
	// Toggle play and Pause
	playPauseTrack(){
		if(this.refs.audioElement.paused){
			this.playTrack();
		}else{
			this.pauseTrack();
		}
	}
	// Get the Active Track url
	getSrc(){
		if( this.props.activeTrack ) {
			return this.props.activeTrack.url;
		}
	}
	// Set the progress bar: dispatch updateElapsedTime action creator
	setProgress(event){
		if( this.refs.audioElement.readyState){
			var leftOffset = event.clientX - this.refs.progress.getBoundingClientRect().left;
			var leftPercentage = leftOffset / this.refs.progress.clientWidth;
			var totalDuration = this.refs.audioElement.duration;
			var seekTime = leftPercentage * totalDuration;
			this.props.updateElapsedTime(seekTime);
			this.refs.audioElement.currentTime = seekTime;
		}
	}
	// Get the Progress Width Value
	getProgress(){
		if( !this.props.activeTrack ) return '0%';
		return (this.props.activeTrack.elapsedTime * 100 / this.refs.audioElement.duration) + "%";
	}
	// Set Audio Volume: dispatch updateVolume action creator
	setVolume(event){
			var leftOffset = event.clientX - this.refs.volumeElement.getBoundingClientRect().left;
			var leftPercentage = leftOffset / this.refs.volumeElement.clientWidth;
			this.props.updateVolume(leftPercentage);
	}
	// Dispatch the updateElapsedTime action creator
	updateElapsedTime(){
		this.props.updateElapsedTime(this.refs.audioElement.currentTime);
	}
	// Set Next or Previous Track: dispatch selectTrack action creator
	setNextPrevTrack(direction){
		if( this.props.activeTrack ){
			var currentTrackIndex = this.props.tracks.findIndex(x=>x.id == this.props.activeTrack.id);
			if( currentTrackIndex != -1 && this.props.tracks.length > 1){
				this.props.selectTrack( this.getNextPrevTrack(currentTrackIndex, direction) );
			}
		}
	}
	// Get the Next or Previous Track in circular way
	getNextPrevTrack(index, direction){
		var tracks = this.props.tracks;
		switch (direction) {
			case 'next': return tracks[(index + 1) % tracks.length];
			case 'prev': return tracks[(index == 0) && tracks.length - 1 || index - 1];
		 	default: return tracks[index];
		}
	}
	// Set Player Class Attribute
	setClassName(){
		if( !this.props.activeTrack ){
			return '';
		}
		return this.props.activeTrack.isPlaying ? 'playing' : 'paused';
	}
	// Render the Component
	render(){
		return (
			<div className={"player clearfix " + this.setClassName()}>
				<div className="hidden">
					<audio ref="audioElement" src={this.getSrc()}></audio>
				</div>
				<div className="controls">
					<button type="button" onClick={()=>this.setNextPrevTrack('prev')}><i className="fa fa-step-backward" aria-hidden="true"></i></button>
					<button type="button" onClick={this.playPauseTrack.bind(this)} >
						<i className="fa fa-play" aria-hidden="true"></i>
						<i className="fa fa-pause" aria-hidden="true"></i>
					</button>
					<button type="button" onClick={()=>this.setNextPrevTrack('next')}><i className="fa fa-step-forward" aria-hidden="true"></i></button>
				</div>
				<div className="progress-bar" onClick={this.setProgress.bind(this)} ref="progress">
					<div className="timeline" style={{width: this.getProgress() }}></div>
				</div>
				<div className="sound" onClick={this.setVolume.bind(this)} ref="volumeElement">
					<div className="timeline" style={{width: this.props.settings.volume*100 + "%" }}></div>
				</div>
			</div>
		);
	}
}



// Mapping Redux state to Props
function mapStateToProps(state){
	return {
		tracks: state.tracks,
		activeTrack: state.activeTrack,
		settings: state.settings
	}
}
// Mapping Dispatch functions to Props
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		updateElapsedTime: updateElapsedTime, 
		updatePlayStatus: updatePlayStatus, 
		selectTrack: selectTrack,
		updateVolume: updateVolume
	}, dispatch);
}

// Connect Mapping functions with Component
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);