import style from "./Info.css"
export default function Info({msg}){
    return <div className={style.info}>{msg}</div>
}