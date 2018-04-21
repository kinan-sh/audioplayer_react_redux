import { combineReducers } from 'redux';
import TracksReducer from './reducer_tracks';
import ActiveTrack from './reducer_active_song';
import Settings from './reducer_settings';

// Wiring Reducers with the Application
const rootReducer = combineReducers({
  tracks: TracksReducer,
  activeTrack: ActiveTrack,
  settings: Settings
});

export default rootReducer;
