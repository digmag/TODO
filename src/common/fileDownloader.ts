class FileDownloader {
    constructor(){
        
    }
    public toFile(data: object,name:string):void {
        let text = JSON.stringify(data);
        let a = document.createElement("a");
        let file = new Blob([text], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }
}

export default FileDownloader;