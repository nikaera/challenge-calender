import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

function PageHeader() {
    return (
        <Header className='mplus' as='h1'>
            <Icon name='calendar alternate' />
            <Header.Content>チャレンジカレンダー ジェネレーター
            <Header.Subheader>〜作ってシェアしてみんなの好きを広め合おう！〜</Header.Subheader>
            </Header.Content>
        </Header>
    )
}

export default PageHeader