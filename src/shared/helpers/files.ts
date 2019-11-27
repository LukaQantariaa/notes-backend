
export class Files {
    constructor(){

    }

    public async uploadFile(image:any, folder: string){
        const fileName = image.name
        const fileExtension = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity));
        const fileFullName = Date.now() + fileExtension

        const response = image.mv(`./src/uploads/${folder}/${fileFullName}`).then(()=>{
            console.log('File uploaded')
            return `C:/Users/l.kantaria/Desktop/notes-backend/src/uploads/${folder}/${fileFullName}` //dotENV
        }).catch(()=>{
            console.log('File not uploaded!')
            throw('File not uploaded!');
        })

        return response
    }
}