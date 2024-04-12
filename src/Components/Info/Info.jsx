import style from "./Info.module.css"
export default function Info({msg}){
    return <div className={style.info}>{msg}</div>
}