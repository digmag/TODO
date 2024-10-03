import React, { useState, useEffect } from "react"
import Card from "../Card/Card.tsx";
import { CardStateItem } from "../reducers/reduser.ts";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, createTask, deleteTask, getAllinList } from "../api/api.js";

const Main = () => {
    const state = useSelector((state: CardStateItem[]) => state);
    const [nameState, setName] = useState<string>("");
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getAllinList());
    },[])
    return (
        <>
        <div style={{display:"flex", alignItems:"center"}}>
            <button className="button-green mr-1" style={{marginBottom:"1%"}} onClick={() => {dispatch(createTask(nameState))}}>Добавить</button>
            <input placeholder="Название" className="mr-1" onInput={(e) => setName(e.target.value)}/>
        </div>
        <div className="field mt-1">
            {state&&state.map(el => (
                <Card
                id={el.id}
                className="mb-1"
                key={el.id}
                title={el.title}
                onDelete={()=>dispatch(deleteTask(el.id))}
                onClick={()=>dispatch(changeStatus(el.id))}
                isDone={el.isDone}
                />
            ))}
        </div>
        </>
    )
}
export default Main;