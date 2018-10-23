import React, { Component } from "react";

export class EditableCell extends Component {
  state = { inputValue: this.props.children };

  onBlur = () => {
    this.props.onCellBlur(this.state.inputValue);
  };

  onChangeInputValue = event => {
    this.setState({ inputValue: event.target.value });
  };

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.setState({ inputValue: this.props.children });
    }
  }

  render() {
    const {
      cellValue,
      onCellBlur,
      className,
      style,
      inputClass,
      ...props
    } = this.props;

    return (
      <div className={className} style={style} {...props}>
        <input
          type="text"
          style={{
            border: "none",
            height: "100%",
            width: "100%"
          }}
          className={`c-editable-cell--input ${inputClass}`}
          value={this.state.inputValue}
          onChange={this.onChangeInputValue}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}
