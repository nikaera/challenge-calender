import '../Font.css'
import './Calender.css'

import React from 'react'
import { Grid, Icon, Button } from 'semantic-ui-react'

import { CalenderProps } from "../types"
import Constants from '../Constants'

function Calender(props: CalenderProps) {
    const kMaxCalenderColumn = Constants.CALENDER_COLUMN_NUMBER
    const { currentDay, challenges, onClickDeleteButton, onClickCalenderItem } = props

    function createCalenderRow(
        challenges: Array<string>, startPos: number, endPos: number
    ) {
        const calenderColumns = []
        for (var i = startPos; i < endPos; i++) {
            const c = challenges[i]
            const day = i + 1
            const isShowDeleteButton = props.editable && props.challenges.length > 1
            const deleteButton = isShowDeleteButton && currentDay === day ?
                <Button icon size='mini' color='red' onClick={(e, d) => {
                    if (onClickDeleteButton)
                        onClickDeleteButton(day)
                    e.preventDefault()
                }}>
                    <Icon name='delete' />
                </Button> : null
            const calenderTheme = <Grid.Column className='mplus' key={`Day${day}`}>
                {deleteButton}
                <span className={props.editable ? 'pointer' : ''} onClick={() => {
                    if (onClickCalenderItem)
                        onClickCalenderItem(day)
                }}>Day{day}<br /><br />{c}</span>
            </Grid.Column>
            calenderColumns.push(calenderTheme);
        }
        return <Grid.Row key={startPos} columns={kMaxCalenderColumn}>
            {calenderColumns}
        </Grid.Row>
    }

    const calenderRow = Math.floor(challenges.length / kMaxCalenderColumn)
    const calenderRows = []

    var startPos = 0
    for (var i = 0; i < calenderRow; i++) {
        var endPos = kMaxCalenderColumn
        if (i > 0) {
            startPos = i * kMaxCalenderColumn
            endPos = startPos + kMaxCalenderColumn
        }
        calenderRows.push(createCalenderRow(challenges, startPos, endPos))
    }

    const calenderRemain = challenges.length % kMaxCalenderColumn
    if (calenderRemain > 0) {
        startPos = 0
        if (calenderRow > 0)
            startPos = calenderRow * kMaxCalenderColumn
        const endPos = startPos + calenderRemain

        calenderRows.push(createCalenderRow(challenges, startPos, endPos))
    }

    return (
        <div className='calender'>
            <Grid>
                {calenderRows}
            </Grid>
        </div>
    );
}

export default Calender;