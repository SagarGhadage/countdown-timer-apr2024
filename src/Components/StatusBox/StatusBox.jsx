import style from "./StatusBox.module.css"
export default function StatusBox({status,heading}){
    return <div className={style.outputBox}>
                <h2>{status}</h2>
                <h4>{heading}</h4>
            </div>
}