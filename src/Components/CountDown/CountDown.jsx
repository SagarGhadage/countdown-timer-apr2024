import React, { useEffect, useState } from "react";
import style from "./CountDown.module.css"
import StatusBox from "../StatusBox/StatusBox";
import Info from "../Info/Info";
export default function CountDown() {
    const [inputDate, setInputDate] = useState(localStorage.getItem("inputDate") == null ?"": localStorage.getItem('inputDate') )
    const [days, setDays] = useState(0);
    const [hrs, setHrs] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [sec, setSec] = useState(0)
    const [timeUp, setTimeUp] = useState(false)
    const [warning, setWarning] = useState(false)
    const [isRunning, setRuning] = useState(false)
    console.log(inputDate)

    const timeRemain = () => {
        setTimeUp(false)
        const date = new Date(inputDate)
        const temp = new Date(date.getTime() - Date.now())
        let tempDay = Math.floor(temp.getTime() / (1000 * 60 * 60 * 24));
        setDays(tempDay)
        let remaining = temp.getTime() - (tempDay * 24 * 60 * 60 * 1000)
        let tempHr = Math.floor(remaining / (1000 * 60 * 60))
        setHrs(tempHr)
        remaining = remaining - (tempHr * 60 * 60 * 1000);
        let tempMin = Math.floor(remaining / (1000 * 60))
        setMinutes(tempMin)
        remaining = remaining - (tempMin * 60 * 1000)
        let tempSec = Math.floor(remaining / 1000)
        setSec(tempSec)
        localStorage.setItem("temp", temp);
        console.log(temp.getTime())
        console.log(tempDay, tempHr, tempMin, tempSec)
    }

    const reset = () => {
        setRuning(false)
        setInputDate(0)
        setDays(0)
        setHrs(0)
        setMinutes(0)
        setSec(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeUp(false)
        const date = new Date(inputDate)
        const temp = new Date(date.getTime() - Date.now())
        // console.log(temp / (1000 * 60 * 60 * 24))
        // debugger
        if (temp < 0) { reset(); }
        else if (temp > 99 * 1000 * 60 * 60 * 24) {
            localStorage.removeItem('inputDate')
            localStorage.removeItem('temp')
            setTimeUp(false)
            setWarning(true);
            reset();
        } else {
            if (inputDate != "" || inputDate != 0) {
                timeRemain()
                localStorage.setItem("inputDate", inputDate);
                localStorage.setItem("temp", temp);
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem("inputDate")) {
            const date = new Date(localStorage.getItem('inputDate'))
            const temp = new Date(date.getTime() - Date.now())
            // debugger
            if (temp <= 0 ) {
                localStorage.removeItem('inputDate')
                setInputDate(0)
            }
        }
    }, [])

    useEffect(() => {
        let id = setInterval(() => {
            const date = new Date(inputDate)
            const temp = new Date(date.getTime() - Date.now())
            if (temp > 0) {
                timeRemain()
                setRuning(true)
                console.log(days, timeUp)
            }
            else {
                if (sec == 0 && minutes == 0 && hrs == 0 && days == 0 && inputDate != "") {
                    setTimeUp(true)
                    setRuning(false)
                }
            }
        }, 1000)

        return () => clearInterval(id)

    }, [days, minutes, hrs, sec])

    return <div className={style.countdown}>

        <h1 className={style.heading}>Countdown <span className={style.headingpink}>Timer</span></h1>

        <form action="" className={style.cdForm} onSubmit={(e) => e.preventDefault()}>
            <input type="datetime-local" disabled={isRunning} className={style.inputdate} value={inputDate} onChange={(e) => {
                setInputDate(e.target.value);
                console.log(inputDate)
            }} />
            {isRunning ? <button className={style.start} onClick={reset} >Cancel Timer</button> : <button type="submit" className={style.start} onClick={handleSubmit}>Start Timer</button>}
        </form>

        {warning && <Info msg={"selected time is more than 100 Days"}></Info>}
        {timeUp && <Info msg={"🎉The countdown is over! What's next on your adventure?🎉"}></Info>}

        {!timeUp&&<div className={style.timeLeftDetails}>
            <StatusBox status={days} heading={"Days"}></StatusBox>
            <StatusBox status={hrs} heading={"Hours"}></StatusBox>
            <StatusBox status={minutes} heading={"Minutes"}></StatusBox>
            <StatusBox status={sec} heading={"Seconds"}></StatusBox>
        </div>}
    </div>
}