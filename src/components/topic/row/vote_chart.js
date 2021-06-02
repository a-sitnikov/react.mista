//@flow
import React from 'react'
import VoteItem from './vote_item'
import type { ResponseVoteItem } from 'src/api'

type Props = {
  items: Array<ResponseVoteItem>,
  topicId: string,
  colors: Array<string>
}

const VoteChart = (props: Props) => {

  const { items, topicId, colors } = props;

  let total = items.reduce((sum, e) => sum + e.result, 0);

  return (
    <div style={{ marginBottom: "10px" }}>
      {items.filter(val => val.select).map((data, i) => <VoteItem key={i} data={data} total={total} n={i + 1} topicId={topicId} colors={colors} />)}
    </div>
  )
}

export default (VoteChart: any);