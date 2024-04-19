import style from "./StatusBox.module.css"
export default function StatusBox({time,heading}){
    return <div className={style.outputBox}>
                <h2>{time}</h2>
                <h4>{heading}</h4>
            </div>
}