//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import Tooltip from './tooltip'

import type { State } from 'src/reducers'
import type { TooltipItemState } from 'src/reducers/tooltips'
import type { DefaultProps } from 'src/index'

type StateProps = {
    items: Array<TooltipItemState>
}

type Props = StateProps & DefaultProps;

class TooltipsList extends Component<Props> {

    render() {

        const { items } = this.props;

        return (
            <div>
                {items.map((item, i) => {
                    return (
                        <Tooltip key={item.hash} tooltip={item} keys={item.keys}>
                        </Tooltip>
                    )}
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    const {
        items
    } = state.tooltips

    return {
        items,
    }
}

export default connect(mapStateToProps)(TooltipsList);