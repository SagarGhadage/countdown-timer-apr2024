import StatusBox from "../StatusBox/StatusBox"
import style from "./Info.module.css"
export default function Info({msg,timeLeft,status}){
    return msg?<div className={style.info}>{msg}</div>:
    <div className={style.timeLeftDetails}>
            <StatusBox time={timeLeft.days} heading={"Days"}></StatusBox>
            <StatusBox time={timeLeft.hrs} heading={"Hours"}></StatusBox>
            <StatusBox time={timeLeft.minutes} heading={"Minutes"}></StatusBox>
            <StatusBox time={timeLeft.sec} heading={"Seconds"}></StatusBox>
        </div>
}