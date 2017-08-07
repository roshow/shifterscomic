import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import "./Nav.css"

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class ChaptersButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { chapters } = this.props 
    return (
      <div>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label="Chapters"
          style={{color:"yellow"}}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {
              Object.keys(chapters).map( (key,i) => (
                <MenuItem
                  key={ i }
                  primaryText={ `${ chapters[key].number }: ${ chapters[key].title}` }
                  containerElement={<Link to={`/chapter/${ chapters[key].number }/page/0`} />}
                />
              ))
            }
          </Menu>
        </Popover>
      </div>
    );
  }
}


const muiStyles = {
  paper: {
    backgroundColor: "#00000",
    marginBottom: "5px"
  },
  flatButton: {
    color: "yellow",
    // fontFamily: "'Trade Winds', sans-serif"
  }
}

const LinkToFacebook = props => <a { ...props } href="https://www.facebook.com/Brunos-Comics-1845105012368969/">{ props.children }</a>

const Nav = props => (
  <Paper
    zDepth={2}
    className="Nav"
    style={ muiStyles.paper }
  >
    <section>
      <ChaptersButton chapters={ props.chapters } />
      <FlatButton
        label="Beginning"
        style={ muiStyles.flatButton }
        containerElement={<Link to="/chapter/1/page/1" />}
      />
      <FlatButton
        label="Latest Update"
        style={ muiStyles.flatButton }
        containerElement={<Link to={`/chapter/${ props.lastChapter }/page/lastpage`} />}
      />  
      <FlatButton
        label="Follow on Facebook"
        style={ muiStyles.flatButton }
        containerElement={ <LinkToFacebook /> }
      />
    </section>
  </Paper>
)

const mapStateToProps = (state) => {
  return {
    chapters: state.chapters,
    lastChapter: state.lastChapter
  }
}

export default connect(mapStateToProps)(Nav)