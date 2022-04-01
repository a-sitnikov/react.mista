import React, { FC, ReactElement } from 'react'
import { IVotingItem } from 'src/data/topic';

type IProps = {
  colors: string[],
  n: number,
  text: string
}

const Vote: FC<IProps> = ({ colors, n, text }): ReactElement => {

  return (
    <div style={{ marginTop: "5px" }}>
      <b><span style={{ color: colors[n - 1] }}>{`${n}. ${text}`}</span></b>
    </div>
  )
}

export default Vote;