import { actionAdd2, actionCreator, deleteActionCreator, doneActionCreator, editActionCreator } from "../reducers/reduser.ts"
const server = `http://88.204.57.38:8081/api`;
export  const getAllinList = () => {
     return dispatch => fetch(server,{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }

    }).then(response => {
        if(!response.ok){
            throw new Error("ошибка")
        }
        return response.json()
    }).then((data) => {
        let data1 = []
        data.forEach(el => {
            data1.push({id: el.id, title: el.title, isDone: el.done})
        })
        dispatch(actionCreator(data1))
    }).catch(err => console.log(err))
}

export const createTask = (body) => {
    return dispatch => fetch(server, {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => {
        if(!response.ok){
            throw new Error("Ошибка создания таски");
        }
        return response.json();
    }).then(data => {
        let data2 = {
            id: data.id,
            title: data.title,
            isDone: data.done
        }
        dispatch(actionAdd2(data2))
    }).catch(err => console.log(err))
}

export const deleteTask = (id) => {
    return dispatch => fetch(`${server}/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            throw new Error('Ошибка удаления')
        }
        return;
    }).then(
        dispatch(deleteActionCreator(id))
    ).catch(err => console.log(err))
}

export const changeStatus = (id) => {
    return dispatch => fetch(`${server}/change/${id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            throw new Error('Ошибка удаления')
        }
        return;
    }).then(
        dispatch(doneActionCreator(id))
    ).catch(err => console.log(err))
}
export const changeName = (newObj) => {
    return dispatch => fetch(`${server}/${newObj.id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title: newObj.title})
    }).then(response => {
        if(!response.ok){
            throw new Error('Ошибка удаления')
        }
        return response.json();
    }).then( data=>{
        let data1 = {
            id: data.id,
            title: data.title,
            isDone: data.done
        }
        dispatch(editActionCreator(data1))
    }
    ).catch(err => console.log(err))
}

export const loadOnServer = (objects) =>{
    return dispatch => fetch(`${server}/api/upload`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objects)
    }).then(response => {
        if(!response.ok){
            throw new Error('Ошибка удаления')
        }
        return response.json();
    }).then( data=>{
        let data1 = []
        data.forEach(el => {
            data1.push({id: el.id, title: el.title, isDone: el.done})
        })
        dispatch(actionCreator(data1))
    }
    ).catch(err => console.log(err))
}