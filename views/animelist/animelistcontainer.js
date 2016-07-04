'use strict';
import objectAssign from 'object-assign';
import { connect } from 'react-redux';
import AnimeListView from './animelistview.jsx';

function mapStateToProps(state, ownProps){
  return {
    animeList: objectAssign({}, state.animeList)
  };
}

const AnimeList = connect(mapStateToProps)(AnimeListView);

export default AnimeList;
