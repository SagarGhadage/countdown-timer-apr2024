import React, { useEffect, useState } from "react";
import style from "./CountDown.module.css"
import StatusBox from "../StatusBox/StatusBox";
import Info from "../Info/Info";
export default function CountDown() {

    const [inputDate, setInputDate] = useState("")
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hrs: 0, minutes: 0, sec: 0
    })
    const [status, setStatus] = useState(TimerStatus.IDLE);
    console.log(inputDate, status, timeLeft)
    // debugger
    const handleChange = (e) => {
        reset()
        setInputDate(e.target.value);
        // setStatus(TimerStatus.IDLE)
        console.log(inputDate)
    }
    const calcTimeRem = (input) => {
        // debugger
        if (input == "") {
            return {
                days: 0, hrs: 0, minutes: 0, sec: 0
            }
        }
        const date = new Date(input)
        const remainingTime = new Date(date.getTime() - Date.now())
        if (remainingTime < 0) {
            return {
                days: 0, hrs: 0, minutes: 0, sec: 0
            }
        }

        let tempDay = Math.floor(remainingTime.getTime() / (1000 * 60 * 60 * 24));
        let remaining = remainingTime.getTime() - (tempDay * 24 * 60 * 60 * 1000)

        let tempHr = Math.floor(remaining / (1000 * 60 * 60))
        remaining = remaining - (tempHr * 60 * 60 * 1000);

        let tempMin = Math.floor(remaining / (1000 * 60))
        remaining = remaining - (tempMin * 60 * 1000)

        let tempSec = Math.floor(remaining / 1000)
        return { days: tempDay, hrs: tempHr, minutes: tempMin, sec: tempSec }
    }

    const reset = () => {
        // debugger
        localStorage.clear()
        setStatus(TimerStatus.IDLE)
        setInputDate("")
        setTimeLeft({
            days: 0, hrs: 0, minutes: 0, sec: 0
        })
    }

    const handleSubmit = (e) => {
        // debugger
        e.preventDefault();
        setStatus(TimerStatus.IDLE)
        let timeRemaining = calcTimeRem(inputDate)

        if (timeRemaining.days == 0 && timeRemaining.hrs == 0, timeRemaining.minutes == 0, timeRemaining.sec == 0) {
            reset();
            console.log("ERROR TIME SHUD BE IN FUTURE")
        }
        else if (timeRemaining.days > 99) {
            reset()
            setStatus(TimerStatus.INVALID)

        } else {
            setTimeLeft({ ...calcTimeRem(inputDate) })
            localStorage.setItem("inputDate", inputDate);
            setStatus(TimerStatus.RUNNING);
        }
    }

    useEffect(() => {
        // debugger
        if (localStorage.getItem("inputDate")) {
            const date = localStorage.getItem('inputDate')
            setInputDate(date)
            let remaingingTime = calcTimeRem(date)
            if ((remaingingTime.days > 0 || remaingingTime.hrs > 0 || remaingingTime.minutes > 0 || remaingingTime.sec > 0)) {
                setStatus(TimerStatus.RUNNING)
                setTimeLeft({ ...calcTimeRem(remaingingTime) })
            } else {
                localStorage.removeItem('inputDate')
                setInputDate("")
            }
        }
    }, [])

    useEffect(()=>{
        if(status==TimerStatus.RUNNING){
        let id=setInterval(()=>{
            const remainingTime = calcTimeRem(inputDate)
            if(remainingTime.days+remainingTime.hrs+remainingTime.minutes+remainingTime.sec>0){
                setTimeLeft({...remainingTime})
            }else{setStatus(TimerStatus.TIMEUP)}
        },1000)
        return ()=>{clearInterval(id)}
    }
    },[timeLeft,status])

    return <div className={style.countdown}>

        <h1 className={style.heading}>Countdown <span className={style.headingpink}>Timer</span></h1>

        <form action="" className={style.cdForm} onSubmit={(e) => e.preventDefault()}>
            <input
                required
                disabled={status == TimerStatus.RUNNING}
                type="datetime-local" className={style.inputdate}
                value={inputDate} onChange={handleChange}
            />

            {status == TimerStatus.RUNNING && <button className={style.start} onClick={reset} >Cancel Timer</button>}
            {status == TimerStatus.INVALID && <button className={style.start} onClick={reset} >Reset Timer</button>}
            {(status == TimerStatus.IDLE || status == TimerStatus.TIMEUP) && <button type="submit" className={style.start} onClick={handleSubmit}>Start Timer</button>}
        </form>

        {status == TimerStatus.INVALID && <Info msg={"selected time is more than 100 Days"}></Info>}
        {status == TimerStatus.TIMEUP && <Info msg={"🎉The countdown is over! What's next on your adventure?🎉"}></Info>}

        {(status == TimerStatus.RUNNING || status == TimerStatus.IDLE) && <div className={style.timeLeftDetails}>
            <StatusBox status={timeLeft.days} heading={"Days"}></StatusBox>
            <StatusBox status={timeLeft.hrs} heading={"Hours"}></StatusBox>
            <StatusBox status={timeLeft.minutes} heading={"Minutes"}></StatusBox>
            <StatusBox status={timeLeft.sec} heading={"Seconds"}></StatusBox>
        </div>}
    </div>
}

const TimerStatus = Object.freeze({ IDLE: "IDLE", RUNNING: "RUNNING", TIMEUP: "TIMEUP", INVALID: "INVALID" })
