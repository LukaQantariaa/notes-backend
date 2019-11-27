
import * as fs from 'fs'

export class Files {
    constructor(){

    }

    public async uploadFile(image:any, folder: string){
        const fileName = image.name
        const fileExtension = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity));
        const fileFullName = Date.now() + fileExtension

        const response = image.mv(`./src/uploads/${folder}/${fileFullName}`).then(()=>{
            console.log('File uploaded')
            return `C:/Users/Luka/Desktop/notes-backend/src/uploads/${folder}/${fileFullName}` //dotENV
        }).catch(()=>{
            console.log('File not uploaded!')
            throw('File not uploaded!');
        })

        return response
    }

    public async deleteFile(path:string, folder: string) {
        const imageName =  path.slice(Math.max(0, path.lastIndexOf("/")))
        const response = fs.unlink(`C:/Users/Luka/Desktop/notes-backend/src/uploads/${folder}${imageName}`, function (err) {
            if (err) { 
                return "ERROR"
            } else { 
                return "OK"
            }
        }); 
        return response
    }
}