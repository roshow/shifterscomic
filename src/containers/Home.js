import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {GridList, GridTile} from 'material-ui/GridList'
import IconContentForward from 'material-ui/svg-icons/content/forward'
import { yellow500 } from 'material-ui/styles/colors'


const muiStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    maxWidth: 500,
    width: "100%",
    fontFamily: '"Trade Winds", sans-serif'
  },
};

const Home = ({ chapters }) => (
  <section className="Home">
    <div style={muiStyles.root}>
      
      <GridList
        cellHeight={316}
        style={muiStyles.gridList}
      >
        {
          Object.keys(chapters).map( key => (
            <GridTile
              key={chapters[key].number}
              title={` `}
              actionIcon={<Link to={`/chapter/${ chapters[key].number }`}><IconContentForward color={ yellow500 }/>&nbsp;&nbsp;</Link>}
            >
              <img src={ chapters[key].img } alt="" />
            </GridTile>
          ))
        }
      </GridList>
    </div>
  </section>
)

const mapStateToProps = (state) => {
  return {
    chapters: state.chapters
  }
}

export default connect(mapStateToProps)(Home)