import React, { PropTypes } from 'react'

class CurrencyInput extends React.Component {
  constructor (props) {
   super(props);

   let initialValue = this.props.value || '';
   if (initialValue.length > 0) {
     initialValue =  initialValue.substr(1);
   }

   this.state = {
     value : initialValue
    };
   }

  _onChange(e) {
    let [ , val ] = /\$\s*([\d\,]*)/.exec(e.target.value) || [];

    if (!val) {
      this.setState({ value: ''});
      return;
    }

    // format to digital
    val = val.replace(/,/g, '');

    // format from digital
    const digitalGroup = /(\d)((\d{3}?)+)$/;
    var s = val;
    while (digitalGroup.test(s)) {
       s = s.replace(digitalGroup, '$1' + ',' + '$2');
   }

    this.setState({ value: s ? s : ''}, () => {
      if (this.props.onChange) {
        this.props.onChange(e, s);
      }
    });

  }
  render () {
    return (
      <input
        className={this.props.className}
        type='text'
        value={'$ ' + this.state.value}
        onChange={::this._onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    )
  }
}

export default CurrencyInput;
