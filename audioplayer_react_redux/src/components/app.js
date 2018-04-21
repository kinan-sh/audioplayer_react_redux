import React, { Component } from 'react';
import AudioPlayer from '../containers/audio-player';
import SearchBar from '../containers/search_bar';
import PlayList from '../containers/play-list';

export default class App extends Component {
  render() {
    return (
      <div>
      	<AudioPlayer />
      	<SearchBar />
      	<PlayList />
      </div>
    );
  }
}
