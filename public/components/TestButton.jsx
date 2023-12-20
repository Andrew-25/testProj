import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LeaderBoard from './LeaderBoard';

const TestButton = () => {
    const [clicks, setClicks] = useState(0)
    const [gameOn, setGameOn] = useState('no')
    const [records, setRecords] = useState([])
    const [gameStarted, setGameStarted] = useState(null)
    const [timeLeft, setTimeLeft] = useState(10000)

    useEffect(() => {
        if (gameOn === 'yes') {
            const timeNow = new Date
            const difference = timeNow - gameStarted
            setTimeLeft(timeLeft - difference)
        }
    }, [clicks])

    useEffect(() => {
        if (timeLeft <= 0) {
            gameOver()
            setTimeLeft(10000)
        }
    }, [timeLeft])

    const counter = () => setClicks(clicks + 1)

    const starter = () => {
        setTimeLeft(10000)
        setGameStarted(new Date)
        setGameOn('yes')
    }

    const gameOver = () => {
        const playedAt = timeStamper(new Date)
        setRecords([...records, {score: clicks, time: playedAt}])
        setGameOn('over')
    }

    const backToMain = () => {
        setGameOn('no')
        setClicks(0)
    }

    const timeStamper = (timeStamp) => {
        const dayOfMonth = timeStamp.getDate()
        const month = timeStamp.getMonth() + 1
        const year = String(timeStamp.getFullYear()).slice(2)
        const hours = timeStamp.getHours()
        const minutes = `0${timeStamp.getMinutes()}`.slice(-2)

        return `${year}/${month}/${dayOfMonth} - ${hours}:${minutes}`
    }

    if (gameOn === 'yes') {
        return (
            <>
                <Button onPress={counter} title='Click' />
                <Text>{clicks}</Text>
                <Text>{timeLeft}</Text>
            </>
        )
    } else if (gameOn === 'no') {
        return (
            <>
                <Text>Leaderboard</Text>
                <LeaderBoard records={records}/>
                <Button onPress={starter} title='Start'/>
            </>
        )
    } else if (gameOn === 'over') {
        return (
            <>
                <Text>Game Over!</Text>
                <Text>Score - {clicks}</Text>
                <Button onPress={backToMain} title='OK'/>
            </>
        )
    }

}

export default TestButton