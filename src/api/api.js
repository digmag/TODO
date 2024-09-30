import { actionAdd2, actionCreator, CardStateItem, deleteActionCreator } from "../reducers/reduser.ts"

export  const getAllinList = () => {
     return dispatch => fetch(`http://localhost:8081/api`,{
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
        console.log(data)
        data.forEach(el => {
            data1.push({id: el.id, title: el.title, isDone: el.done})
        })
        dispatch(actionCreator(data1))
    }).catch(err => console.log(err))
}

export const createTask = (body) => {
    return dispatch => fetch(`http://localhost:8081/api`, {
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
    return dispatch => fetch(`http://localhost:8081/api/${id}`,{
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