import '../Font.css'
import './Show.css'

import html2canvas from 'html2canvas';
import { unparse } from 'papaparse';

import React from 'react'
import { Grid, Header, Icon, Button } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import { CalenderState } from "../types"
import Constants from '../Constants'

import PageHeader from '../components/PageHeader'
import Calender from '../components/Calender';

function Confirm() {
    enum DownloadType {
        Jpeg = 'jpeg',
        Png = 'png',
        Csv = 'csv'
    }

    const location = useLocation();
    const { currentDay, challengeName, challenges } = location.state as CalenderState

    async function onClickDownloadCalenderButton(downloadType: DownloadType) {
        switch (downloadType) {
            case DownloadType.Jpeg:
            case DownloadType.Png:
                const calenderDom = document.getElementById('calender')
                if (calenderDom) {
                    const marginWidth = 50
                    const canvas = await html2canvas(calenderDom, {
                        x: calenderDom.offsetLeft - marginWidth / 2,
                        y: calenderDom.offsetTop,
                        width: calenderDom.clientWidth + marginWidth,
                        height: calenderDom.clientHeight
                    })

                    const a = document.createElement('a')
                    const ext: string = downloadType
                    a.href = canvas.toDataURL(`image/${ext}`).replace(`image/${ext}`, 'image/octet-stream')
                    a.download = `${challengeName}.${ext}`
                    a.click()
                }
                break;
            case DownloadType.Csv:
                const columnNum = Constants.CALENDER_COLUMN_NUMBER
                const rowNum = Math.ceil(challenges.length / columnNum)
                const rows = []
                for (var i = 0; i < rowNum; i++) {
                    const tempChallenges = challenges.concat()
                    rows.push(tempChallenges.splice(columnNum * i, columnNum))
                }
                const csvContent = `data:text/csv;charset=utf-8,${unparse(rows)}`;

                const encodedUri = encodeURI(csvContent)
                const a = document.createElement('a')
                a.href = encodedUri
                a.download = `${challengeName}.csv`
                a.click();
                break;
        }
    }
    function onClickShareTwitterButton() {
    }

    return (
        <div className="App">
            <PageHeader />
            <div id='calender'>
                <Header as='h2' className='calender-title' dividing>
                    <Header.Content className='mplus-bold'>
                        {challengeName}
                    </Header.Content>
                </Header>
                <Calender editable={false} currentDay={currentDay} challengeName={challengeName} challenges={challenges} />
            </div>
            <Grid verticalAlign='middle' centered columns={3}>
                <Grid.Column>
                    <Header className='mplus' as='h4'>カレンダーをダウンロードする</Header>
                    <Button.Group>
                        <Button className='mplus' color='red' onClick={() => onClickDownloadCalenderButton(DownloadType.Jpeg)}>JPG</Button>
                        <Button.Or />
                        <Button className='mplus' color='orange' onClick={() => onClickDownloadCalenderButton(DownloadType.Png)}>PNG</Button>
                        <Button.Or />
                        <Button className='mplus' color='green' onClick={() => onClickDownloadCalenderButton(DownloadType.Csv)}>CSV</Button>
                    </Button.Group>
                </Grid.Column>
                <Grid.Column>
                    <Button className='mplus' color='twitter' onClick={onClickShareTwitterButton}><Icon name='twitter' /> カレンダーをシェアする</Button>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default Confirm;