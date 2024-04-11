import React,{useEffect,useState} from "react";
import style from "./CountDown.css"
export default function CountDown(){

    return <div className={style.countdown}>
        <h1 className={style.heading}>Countdown <span className={style.headingpink}>Timer</span></h1>
        <form action="" className={style.cdForm}>
            <input type="datetime-local" className={style.inputdate} />
            <button className={style.start}>Start Timer</button>
        </form>
        <div className={style.warning}>selected time is more than 100 Days</div>
        <div className={style.warning}>🎉The countdown is over! What's next on your adventure?🎉</div>
        <div className={style.timeLeftDetails}>
            <div className={style.outputBox}>
                <h2>0</h2>
                <h4>Days</h4>
            </div>
            <div className={style.outputBox}>
                <h2>0</h2>
                <h4>Hours</h4>
            </div>
            <div className={style.outputBox}>
                <h2>0</h2>
                <h4>Minutes</h4>
            </div>
            <div className={style.outputBox}>
                <h2>0</h2>
                <h4>Seconds</h4>
            </div>
        </div>
    </div>
}