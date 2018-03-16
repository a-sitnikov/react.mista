import React from 'react'
import VoteItem from './vote_item'

const VoteChart = (props) => {

    const { items, topicId, colors } = props;

    let total = items.reduce((sum, e) => sum + e.result, 0);    

    return (
        <table style={{ width: "700px" }}>
            <tbody>
                {items.filter(val => val.result).map((data, i) => <VoteItem key={i} data={data} total={total} n={i+1} topicId={topicId} colors={colors}/>)}
            </tbody>
        </table>
    )
}

export default VoteChart;