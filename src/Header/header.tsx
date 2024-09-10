import React, { useState } from "react";
import FileDownloader from "../common/fileDownloader.ts";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../reducers/reduser.ts";

const Header = () => {
    const dispatch = useDispatch();
    const state = useSelector((state:any) => state);
    const [file,setFile] = useState<string | ArrayBuffer | null | undefined>(null);
    const [i, seti] = useState<string>("");
    const saveClick = () => {
        const fileDownloader = new FileDownloader();
        fileDownloader.toFile(state, i);
    }
    const openClick = (e) => {
        let files = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target?.result;
            setFile(fileContent);
        };
        reader.readAsText(files);
    }
    
    const inp = (e) => {
        seti(e.target.value);
    }
    const load = () => {
        dispatch(actionCreator(JSON.parse(String(file))));
    }
    
    return(
        <header className="header" style={{alignItems:"center"}}>
            <input className="mr-1" placeholder="Имя файла" onInput={inp}/>
            <button className="button-orange mr-1" onClick={saveClick}>Сохранить</button>
            <button className="button-green mr-1" onClick={load}>Открыть</button>
            <input type='file' onChange={openClick}/>
        </header>
    )
}

export default Header;