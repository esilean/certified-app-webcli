import React from 'react';
import { useTimer } from 'react-timer-hook';

export default ({ onExpire, expiryTimestamp, textColor }) => {

    const {
        seconds,
        minutes,
        hours,
    } = useTimer({ expiryTimestamp, onExpire: () => onExpire() });

    return (
        <span style={{ color: textColor }}>
            {(hours.toString().length === 1) ? `0${hours}` : `${hours}`}:
            {(minutes.toString().length === 1) ? `0${minutes}` : `${minutes}`}:
            {(seconds.toString().length === 1) ? `0${seconds}` : `${seconds}`}
        </span>
    );
}