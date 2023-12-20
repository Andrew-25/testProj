import { Button, StyleSheet, Text, View } from 'react-native';

const LeaderBoard = ({records}) => {
    const numberTh = (num) => {
        if (num === 1) return `${num}st`
        else if (num === 2) return `${num}nd`
        else if (num === 3) return `${num}rd`
        else return `${num}th` 
    }

    return records.sort((b, a) => a.score - b.score).slice(0, 5).map((record, index) => {
        return (
            <Text key={index}>{numberTh(index + 1)} - {record.score} - {record.time}</Text>
        )
    })
}

export default LeaderBoard