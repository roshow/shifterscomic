import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class PagesButton extends React.Component {

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
    const { chapterId, pages } = this.props 
    return (
      <div>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label="Pages"
          style={{color:"yellow", backgroundColor: "black", fontFamily: "'Trade Winds', sans-serif"}}
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
              pages.map( (url, i) => (
                <MenuItem
                  key={ url }
                  primaryText={ i === 0 ? `Cover` : `Page ${ i }` }
                  containerElement={<Link to={`/chapter/${ chapterId}/page/${ i }`} />}
                />
              ))
            }
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default PagesButton