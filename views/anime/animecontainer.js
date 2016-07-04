'use strict';
import objectAssign from 'object-assign';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps){
  return {
    anime: objectAssign({}, state.animeList[state.selectedAnime])
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    onSubmit: ()=>{
      console.log('Updating anime details');
    }
  };
}

const Anime = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeView);

export Anime;
