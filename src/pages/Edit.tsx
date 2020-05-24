import '../Font.css';
import './Edit.css';

import React, { useEffect, useState, ChangeEvent } from 'react'
import { Header, Modal, Icon, Label, Grid, Input, Button } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom'
import { EditState, InputValues } from '../types'
import Constants from '../Constants'
import RandomThemeGenerator from '../utils/RandomThemeGenerator'

import PageHeader from '../components/PageHeader'
import Calender from '../components/Calender';

function Edit() {
    interface PageState {
        favoriteName: string
        challengeName: string
        currentTheme: string
        currentDay: number
        challenges: Array<string>
    }

    const location = useLocation();
    const editState = location.state as EditState

    const [pageState, setPageState] = useState({
        currentTheme: '',
        currentDay: 1,
        challenges: new Array<string>()
    } as PageState);
    const [isCompleted, setIsCompleted] = useState(false);
    const [editable, setEditable] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const { favoriteName, challengeName, currentTheme, currentDay, challenges } = pageState

    const history = useHistory()
    useEffect(() => {
        const { favoriteName } = editState

        if (editState.calenderState) {
            const { challengeName, currentDay, challenges } = editState.calenderState
            const currentIndex = currentDay - 1

            changePageState({
                favoriteName: favoriteName,
                challengeName: challengeName,
                currentTheme: challenges[currentIndex],
                currentDay: currentDay,
                challenges: challenges
            })
        } else {
            changePageState({
                favoriteName: favoriteName
            })
        }
    }, []);

    function changePageState(data: object) {
        const pageStateParams = data as PageState
        const newPageState = { ...pageState, ...data } as PageState
        if (pageStateParams.challenges)
            newPageState.challenges = pageStateParams.challenges

        const isUncompleted = newPageState.challenges.findIndex((e) => e.length === 0) > 0
        setIsCompleted(!isUncompleted)

        setPageState(newPageState)
        history.replace('/edit', {
            favoriteName: newPageState.favoriteName,
            calenderState: newPageState
        })
    }

    function onChangeCurrentTheme(event: ChangeEvent, data: InputValues) {
        const { currentDay, challenges } = pageState
        challenges[currentDay - 1] = data.value

        changePageState({ currentTheme: data.value })
    }

    function onChangeChallengeName(event: ChangeEvent, data: InputValues) {
        const newChallengeName = data.value
        changePageState({ challengeName: newChallengeName })
    }

    function onClickAddButton() {
        const { currentDay, challenges } = pageState
        const newChallenges = challenges.concat()
        newChallenges.splice(currentDay, 0, '');

        const newCurrentDay = currentDay + 1
        changePageState({
            currentDay: newCurrentDay,
            challenges: newChallenges,
            currentTheme: ''
        })
    }

    function onClickDeleteButton(day: number) {
        const { challenges } = pageState

        var index = day - 1
        var newChallenges = challenges.concat()
        newChallenges.splice(index, 1)

        if (index === newChallenges.length)
            index = newChallenges.length - 1

        changePageState({
            currentTheme: newChallenges[index],
            currentDay: index + 1,
            challenges: newChallenges
        })
    }

    function onClickCalenderItem(day: number) {
        const { challenges } = pageState
        const lastIndex = day - 1

        changePageState({
            currentTheme: challenges[lastIndex],
            currentDay: day,
        })
    }

    function onClickConfirmButton() {
        setEditable(false)
    }

    function onClickEditButton() {
        setEditable(true)
    }

    async function onClickGenerateButton() {
        history.push('/show', { currentDay, challengeName, challenges })
    }

    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)
    const generateRandomTheme = () => {
        const { favoriteName } = pageState
        const randomThemeGenerator = new RandomThemeGenerator(favoriteName)
        var newChallenges = randomThemeGenerator.createRandomWords()
        newChallenges = newChallenges.slice(0, Constants.CALENDER_COLUMN_NUMBER * 5)

        changePageState({
            challengeName: challengeName,
            currentTheme: newChallenges[0],
            currentDay: 1,
            challenges: newChallenges
        })

        handleClose()
    }

    const actionButtons = editable ?
        <div>
            <Button className='mplus confirm-button' disabled={!isCompleted}
                color='green' onClick={onClickConfirmButton}>
                カレンダーを確認する
            </Button><br />
            <Label className={isCompleted ? 'hidden' : ''} basic color='red' pointing>お題が入力されていない日が存在します</Label>
        </div>
        :
        <div>
            <Button className='mplus confirm-button' color='green' onClick={onClickGenerateButton}>カレンダーを保存する</Button>
            <Button className='mplus confirm-button' color='grey' onClick={onClickEditButton}>カレンダーの編集を続ける</Button>
        </div>

    return (
        <div className="App">
            <PageHeader />
            <Header as='h2'>
                <Icon name='favorite' />
                <Header.Content>{favoriteName}</Header.Content>
            </Header>
            <Grid className={editable ? '' : 'hidden'}>
                <Grid.Row columns={3}>
                    <Grid.Column width={9}>
                        <Input fluid icon='calendar plus' iconPosition="left" size="big"
                            placeholder={`Day${currentDay} のお題`} onChange={onChangeCurrentTheme} value={currentTheme} />
                    </Grid.Column>
                    <Grid.Column width={3} verticalAlign="middle">
                        <Button color='olive' className='mplus' onClick={onClickAddButton}>お題を追加する</Button>
                    </Grid.Column>
                    <Grid.Column width={4} verticalAlign="middle">
                        <Modal open={modalOpen} onClose={handleClose}
                            trigger={<Button color='teal' className='mplus' onClick={handleOpen}>
                                ランダムなお題で作り直す</Button>
                            } basic size='small'>
                            <Header className='mplus-bold' icon='refresh' content='カレンダーのお題を作り直しますか？' />
                            <Modal.Content>
                                <p className='mplus'>
                                    今まで編集した内容は失われますがよろしいですか？？
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button className='mplus' onClick={handleClose} basic color='red' inverted>
                                    <Icon name='remove' /> いいえ
                            </Button>
                                <Button className='mplus' onClick={generateRandomTheme} color='green' inverted>
                                    <Icon name='checkmark' /> はい
                            </Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <div id='calender'>
                <Header className='calender-title' as='h2' dividing>
                    <Header.Content>
                        <Input className='mplus-bold' transparent value={challengeName} onChange={onChangeChallengeName} placeholder='カレンダーのテーマ...' />
                    </Header.Content>
                </Header>
                <Calender editable={editable} currentDay={currentDay} challengeName={challengeName} challenges={challenges}
                    onClickCalenderItem={onClickCalenderItem} onClickDeleteButton={onClickDeleteButton} />
            </div>

            {actionButtons}
        </div>
    )
}

export default Edit