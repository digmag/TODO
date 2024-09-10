import React,{ DragEventHandler, MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { editActionCreator } from "../reducers/reduser.ts";

interface CardProps{
    id:number;
    title:string;
    description:string;
    isDone:boolean;
    className?:string;
    onClick?:MouseEventHandler;
    onDrag?: DragEventHandler;
    onDrop?:DragEventHandler;
    onDelete?: MouseEventHandler;
}
interface CardStateItem {
    id:number;
    title:string;
    description:string;
    isDone:boolean;
}
const Card = (props:CardProps) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    const [editMode, setMode] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(props.title);
    const [newDesc, setnewDesc] = useState<string>(props.description);
    const dispatch = useDispatch();
    const saveChanges = () => {
        const newObj: CardStateItem = {
            id: props.id,
            title:newName,
            description: newDesc,
            isDone: props.isDone
        }
        dispatch(editActionCreator(newObj));
    }
    return (
        <div className={`card ${props.className} ${props.isDone?"done":""}`} onClick={props.onClick} draggable onDragStart={props.onDrag} onDrop={props.onDrop} onDragOver={handleDragOver}>
            <div style={{display:"flex", flexDirection:"column"}}>
                {editMode?
                (
                    <>
                        <input defaultValue={props.title} onInput={(e) => setNewName(e.target.value)}/>
                        <input defaultValue={props.description} onInput={(e) => setnewDesc(e.target.value)}/>
                    </>
                ):
                (
                    <>
                    <h3 className={"title"}>{props.title}</h3>
                    <span className={"description"}>{props.description}</span>
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