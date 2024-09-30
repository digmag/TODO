import React,{ DragEventHandler, MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { editActionCreator } from "../reducers/reduser.ts";

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id">{
    id:string;
    title:string;
    isDone:boolean;
    className?:string;
    onClick?:MouseEventHandler;
    onDelete?: MouseEventHandler;
}
interface CardStateItem {
    id:string;
    title:string;
    isDone:boolean;
}

const Card = (props:CardProps) => {
    const [editMode, setMode] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(props.title);
    const dispatch = useDispatch();
    const saveChanges = () => {
        const newObj: CardStateItem = {
            id: props.id,
            title:newName,
            isDone: props.isDone
        }
        dispatch(editActionCreator(newObj));
    }
    return (
        <div className={`card ${props.className} ${props.isDone?"done":""}`} onClick={props.onClick}>
            <div style={{display:"flex", flexDirection:"column"}}>
                {editMode?
                (
                    <>
                        <input defaultValue={props.title} onInput={(e) => setNewName(e.target.value)}/>
                    </>
                ):
                (
                    <>
                    <h3 className={"title"}>{props.title}</h3>
                    </>
                )}
            </div>
            <div>
                <button className={`button-orange mr-1 ${editMode?"d-none":""}`} onClick={()=>{setMode(true)}}>Редактировать</button>
                <button className={`button-green mr-1 ${editMode?"":"d-none"}`} onClick={()=>{setMode(false); saveChanges()}}>Сохранить</button>
                <button className="button-red" onClick={props.onDelete}>Удалить</button>
            </div>
        </div>
    )
}

export default Card;