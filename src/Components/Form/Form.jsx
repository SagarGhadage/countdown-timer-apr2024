import style from "./Form.module.css"
export default function Form({status,TimerStatus,inputDate,handleChange,handleSubmit,reset}){
    return  <form action="" className={style.cdForm} onSubmit={(e) => e.preventDefault()}>
    {/* Input type Date to pick date */}
    <input
        required
        disabled={status == TimerStatus.RUNNING}
        type="datetime-local" className={style.inputdate}
        value={inputDate} onChange={handleChange}
    />
    {/* Buttons style.start is css applied not for logic*/}
    {status == TimerStatus.RUNNING && <button className={style.start} onClick={reset} >Cancel Timer</button>}
    {status == TimerStatus.INVALID && <button className={style.start} type="reset"onClick={reset} >Reset Timer</button>}
    {(status == TimerStatus.IDLE || status == TimerStatus.TIMEUP) && <button type="submit" className={style.start} onClick={handleSubmit}>Start Timer</button>}

</form>
}