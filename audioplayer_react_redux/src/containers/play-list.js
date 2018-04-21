import React, { Component } from 'react';
import Track from './single-track';
import {connect} from 'react-redux';

class PlayList extends Component{
	// Build the List of Tracks
	renderList(){
		return this.props.tracks.map((track) => {
			return(
				<Track key={track.id} track={track} />
			);
		})
	}

	render(){
		return(
			<ul className="playlist">
				{this.renderList()}
			</ul>
		);
	}
}

// Mapping Redux state to Props
function mapStateToProps(state){
	return {
		tracks: state.tracks
	}
}

// Connect Mapping function with Component
export default connect(mapStateToProps)(PlayList);