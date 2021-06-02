import React, { Component } from 'react'

class Vote extends Component {

  render() {
    const { colors, info, vote } = this.props;

    const voteOption = info[vote - 1];
    return (
      <div style={{ marginTop: "5px" }}>
        <b><span style={{ color: colors[vote - 1] }}>{`${vote}. ${voteOption.select}`}</span></b>
      </div>
    )
  }
}

export default Vote;