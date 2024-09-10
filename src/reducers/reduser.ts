import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

interface CardStateItem {
    id:number,
    title:string,
    description:string;
    isDone:boolean
}

const initialState:CardStateItem[] = [];

// Определяем редьюсер (функция для обработки действий)
const reducer = (state:CardStateItem[] = initialState, action) => {

    let newState: CardStateItem[] = [...state];
    switch (action.type) {
        case 'FROM_FILE':
            newState = [...action.payload]
            return newState;
        case 'ADD':
            newState = [...action.payload]
            return newState;
        case 'ADD2':
            newState = [...state, action.payload];
            return newState;
        case "DELETE":
            newState = newState.filter(obj=> obj.id != action.id);
            newState = [...newState];
            return newState;
        case "EDIT":
            for(let i: number = 0; i<newState.length; i++){
                if(newState[i].id === action.payload.id){
                    newState[i] = action.payload;
                }
            }
            newState = [...newState];
            return newState;
        case "DONE":
            for(let i: number = 0; i<newState.length; i++){
                if(newState[i].id === action.id){
                    newState[i].isDone = !newState[i].isDone;
                }
            }
            newState = [...newState];
            return newState;
        default:
            return newState;
    }
};

export default reducer;

export function actionCreator(payload: Array<CardStateItem>){
    return {type: "FROM_FILE", payload:[...payload]};
}

export function actionAdd(payload: CardStateItem[]){
    return {type: "ADD", payload:[...payload]};
}

export function actionAdd2(payload: CardStateItem){
    console.log(payload);
    return {type: "ADD2", payload:payload};
}

export function deleteActionCreator(id: number){
    return {type:"DELETE", id:id}
}

export function editActionCreator(payload: CardStateItem){
    return {type:"EDIT", payload:payload}
}

export function doneActionCreator(id: number){
    return {type:"DONE", id:id}
}