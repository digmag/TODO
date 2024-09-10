import React, { useState, useReducer } from "react"
import Card from "../Card/Card.tsx";
import reducer, { actionAdd, actionAdd2, deleteActionCreator, doneActionCreator } from "../reducers/reduser.ts";
import { useDispatch, useSelector } from "react-redux";
interface CardStateItem {
    id:number;
    title:string;
    description:string;
    isDone: boolean;
}
const Main = () => {
    const [draggedItem, setDraggedItem] = useState<number|null>(null);
    const state = useSelector((state: CardStateItem[]) => state);
    const [idstate,setid] = useState<number>(0);
    const [nameState, setName] = useState<string>("");
    const [descriptionState, setDescription] = useState<string>("");
    const dispatch = useDispatch();
    const handleDragStart = (e, index) => {
        setDraggedItem(index);
    };
    const handleDrop = (e, index) => {
        let draggedItem1 = state?.filter(el => el.id == draggedItem)[0];
        let draggedItem1i = state?.indexOf(draggedItem1)
        let draggedItem2 = state?.filter(el => el.id == index)[0];
        let draggedItem2i = state?.indexOf(draggedItem2);
        const newItems = [...state];
        let tmp = draggedItem1;
        newItems[draggedItem1i] = draggedItem2;
        newItems[draggedItem2i] = tmp;    
        dispatch(actionAdd(newItems));
        setDraggedItem(null);
    };
    const addDiv = () => {
        if(nameState ==="" || descriptionState===""){
            return;
        }
        dispatch(actionAdd2({
            id:idstate,
            title:nameState,
            description:descriptionState,
            isDone:false
        }))
        setid(idstate+1);
    }
    
    return (
        <>
        <div style={{display:"flex", alignItems:"center"}}>
            <button className="button-green mr-1" style={{marginBottom:"1%"}} onClick={addDiv}>Добавить</button>
            <input placeholder="Название" className="mr-1" onInput={(e) => setName(e.target.value)}/>
            <input placeholder="Описание" className="mr-1"  onInput={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="field mt-1">
            {state&&state.map(el => (
                <Card
                id={el.id}
                className="mb-1"
                key={el.id}
                title={el.title}
                description={el.description}
                onDrag={(e) => handleDragStart(e, el.id)}
                onDrop={(e) => handleDrop(e, el.id)}
                onDelete={()=>dispatch(deleteActionCreator(el.id))}
                onClick={()=>dispatch(doneActionCreator(el.id))}
                isDone={el.isDone}/>
            ))}
        </div>
        </>
    )
}
export default Main;