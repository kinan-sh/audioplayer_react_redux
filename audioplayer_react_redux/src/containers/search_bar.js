import React, { Component } from 'react';
import {searchTracks} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SearchBar extends Component{
	render(){
		return (
			<input 
			type="text" 
			placeholder="Search for artist or tracks" 
			className="search"
			onChange={(event)=>this.props.searchTracks(event.target.value)}
			/>
		);
	}
}

// Mapping Redux state to Props
function mapStateToProps(state){
	return {
		tracks: state.tracks
	}
}
// Mapping Dispatch functions to Props
function mapDispatchToProps(dispatch){
	return bindActionCreators({searchTracks: searchTracks}, dispatch);
}
// Connect Mapping functions with Component
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);