import React, { useEffect, useState } from "react";
import style from "./CountDown.module.css"
import StatusBox from "../StatusBox/StatusBox";
import Info from "../Info/Info";
import Form from "../Form/Form";
import { useRef } from "react";
export default function CountDown() {
    const idx=useRef({c:0,ids:new Set()})
    const [inputDate, setInputDate] = useState("")
    const [intervalId, setIntervalId] = useState("")
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hrs: 0, minutes: 0, sec: 0
    })
    const [status, setStatus] = useState(TimerStatus.IDLE);
    console.log(inputDate, status, timeLeft,intervalId)
    // debugger
    const handleChange = (e) => {
        reset()
        setInputDate(e.target.value);
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
        for(let ele of idx.current.ids){
            clearInterval(ele)
        }
        clearInterval(intervalId)
        localStorage.clear()
        setStatus(TimerStatus.IDLE)
        // setInputDate("")
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
            setInputDate("")
        } else {
            setStatus(TimerStatus.RUNNING);
            startCountDown(inputDate)
            localStorage.setItem("inputDate", inputDate);
        }
    }
    const startCountDown = (inputDate) => {
        console.log(inputDate,status)
        clearInterval(intervalId)
        setStatus(TimerStatus.RUNNING)
        // if (status == TimerStatus.RUNNING) {
            let id = setInterval(() => {setIntervalId(id)
                idx.current.ids.add(id)
                if(status===TimerStatus.IDLE){
                    console.log(intervalId,id)
                    clearInterval(intervalId)
                    // reset()
                }
                const remainingTime = calcTimeRem(inputDate)
                if (remainingTime.days + remainingTime.hrs + remainingTime.minutes + remainingTime.sec > 0) {
                    setTimeLeft({ ...remainingTime })
                    console.log(remainingTime,status)
                } else {
                    clearInterval(intervalId);
                    setStatus(TimerStatus.TIMEUP)
                    localStorage.clear()
                    for(let ele of idx.current.ids){
                        clearInterval(ele)
                    }
                }
            }, 1000)
            setIntervalId(id)
        // }
    }
    useEffect(() => {
        // debugger
        if (localStorage.getItem("inputDate")) {
            const date = localStorage.getItem('inputDate')
            setInputDate(date)
            let remaingingTime = calcTimeRem(date)
            if ((remaingingTime.days > 0 || remaingingTime.hrs > 0 || remaingingTime.minutes > 0 || remaingingTime.sec > 0)) {
                setStatus(TimerStatus.RUNNING)
                startCountDown(date)
            } else {
                localStorage.removeItem('inputDate')
                setInputDate("")
            }
        }
        return ()=>clearInterval(intervalId)
    }, [])
    useEffect(()=>{
        idx.current.ids.add(intervalId)
        idx.current.c++
        console.log(idx)
        return ()=>clearInterval(intervalId)
    },[intervalId])


    return <div className={style.countdown}>
        <h1 className={style.heading}>Countdown <span className={style.headingpink}>Timer</span></h1>
        <Form status={status} TimerStatus={TimerStatus} inputDate={inputDate} handleChange={handleChange} handleSubmit={handleSubmit}  reset={reset}></Form>
        {/* conditionaly renderd warnig or time up msg */}
        <Info msg={status == TimerStatus.INVALID ? "selected time is more than 100 Days"
            : status === TimerStatus.TIMEUP ?
                "🎉The countdown is over! What's next on your adventure?🎉" : ""}
            status={status} timeLeft={timeLeft}>
        </Info>
    </div>
}

const TimerStatus = Object.freeze({ IDLE: "IDLE", RUNNING: "RUNNING", TIMEUP: "TIMEUP", INVALID: "INVALID" })