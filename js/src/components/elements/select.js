import React, { Component } from 'react';
import { arrayOf, string, func, shape } from 'prop-types';

export default class Select extends Component {
  static propTypes = {
    data: arrayOf(shape({
      item: string,
      value: string,
    })).isRequired,
    label: string,
    onClick: func.isRequired,
  }
  static defaultProps = {
    label: '',
  }
  constructor({ onClick }) {
    super();
    // @fixme State should be stored in this.state
    this.onClick = onClick;
  }
  changeHandler = (e) => {
    const selected = new Set(
      Array.from(e.target.options)
        .filter(option => option.selected)
        .map(option => option.value)
    );
    this.onClick(selected);
  }
  render() {
    const { label, data, selected } = this.props;
    return [
      label !== '' ? <label key={`select-label-${label}`} htmlFor={`select-${label}`}>{label}</label> : '',
      <select key={`select-${label || 'select'}`} multiple size="7" onClick={this.changeHandler} value={Array.from(selected)}>
        {data.map(({ value, item }) => (
          <option key={`${item}-${value}`} value={value}>{item}</option>
        ))}
      </select>,
    ];
  }
}
