import React, { useEffect, useState } from 'react'

const TimeToCountDown = ({ targetTime }) => {

    const [timeLeft, setTimeLeft] = useState(() => targetTime - Date.now())
    
    useEffect(() => {
        if (!targetTime) return
        const interval = setInterval(() => {
            const newTimeLeft = targetTime - Date.now()
            setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0)
        }, 1000)
        return () => clearInterval(interval)
    }, [targetTime])

    const format = (ms) => {
        const sec = Math.floor(ms / 1000)
        const min = Math.floor(sec / 60)
        const hour = Math.floor(min / 60)
        return `${hour}H ${min % 60}M ${sec % 60}S`
    }

    return (
        <div className="de_countdown">
            {timeLeft > 0 ? format(timeLeft) : 'expired'}
        </div>
    )
}

export default TimeToCountDown
