import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import history from './../history'
import makePageUrl from './../utils/makePageUrl'

export default class PagesDropDown extends Component {

  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this)

    this.state = {value: props.currentPage || 0 };

  }

  componentWillReceiveProps (newProps) {
    this.setState({
      value: newProps.currentPage
    })
  }

  handleChange (event, index, value) {
    history.push(makePageUrl(this.props.chapterId, value))
  }

  render () {
    const { chapterId, pages, currentPage, ...props } = this.props 
    return (
      <DropDownMenu value={this.state.value} onChange={this.handleChange} { ...props }>
        {
          pages.map( (url, i) => (
            <MenuItem
              key={ i }
              value={ i } 
              primaryText={ i === 0 ? `Cover` : i } 
              label={ i === 0 ? `Cover` : `Page ${ i }` }
            />
          ))
        }
      </DropDownMenu>
    )
  }

}