import '../Font.css';
import './Home.css';

import React, { SyntheticEvent, ChangeEvent, useState, useEffect } from 'react';
import { Button, Input } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom'
import { InputValues, HomeState } from '../types'

import PageHeader from '../components/PageHeader'

function Home() {
    const history = useHistory();
    const location = useLocation();

    const [favoriteName, setFavoriteName] = useState("");

    useEffect(() => {
        if (location.state) {
            const { favoriteName } = location.state as HomeState
            if (favoriteName)
                setFavoriteName(favoriteName)
        }
    }, [])

    function onChangeFavoriteName(event: ChangeEvent, data: InputValues) {
        setFavoriteName(data.value)
    }

    function onClickEditButton(event: SyntheticEvent, data: object) {
        history.replace("/", { favoriteName: favoriteName })
        history.push("/edit", { favoriteName: favoriteName })
    }

    function isDisableGenerateButton() {
        return favoriteName.length === 0
    }

    return (
        <div className="App">
            <div className="App-content">
                <PageHeader />
                <Input className="challenge-name" fluid value={favoriteName} onChange={onChangeFavoriteName}
                    placeholder='あなたの好きなモノは何？... (例: ゲーム、漫画、映画、技術、etc.）' />
                <div className="edit-button">
                    <Button className='mplus' disabled={isDisableGenerateButton()} color='green'
                        onClick={onClickEditButton}>カレンダーを作成する</Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
