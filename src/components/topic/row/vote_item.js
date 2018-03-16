import React from 'react'

const VoteItem = (props) => {

    const { topicId, data, total, n, colors } = props;
    
    const img = `https://www.forum.mista.ru/css/voting${n}.png`;

    let percent = 0;
    let width = 0;

    if (total) {
        percent = Math.round(100 * data.result / total); 
        width = 400 * percent / 100;
    }    
    
    const imgStyle = {maxWwidth: "500px", width:`${width}px`, height: "15px"};

    return (
        <tr>
            <td>
                <a rel="nofollow" style={{textDecoration:"none"}} href={`topic.php?id=${topicId}&sel=${n}`}>
                    <b><span style={{color:colors[n]}}>{`${n}. ${data.select}`}</span></b>
                </a>
            </td>
            <td style={{width:"100px"}} className="ta-left va-middle">
                <b><span style={{color: colors[n]}}>{`${percent}% (${data.result})`}</span></b>
            </td>
            <td style={{width:"400px"}}>
                <a href={img}>
                    <img src={img} style={imgStyle} alt={`п${n}`}/>
                </a>
            </td>
        </tr>
    )
}

export default VoteItem;