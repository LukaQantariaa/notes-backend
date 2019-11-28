import { Note } from '../../models/notes/notes.model'


export class NoteRepositoryImplPostgress {

    public async getNotes(where:any){
        const response = Note.findAll({where: where}).then((u) => {
            return u
        }).catch((err) => { throw({type: "NOTES_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async getNote(where:any){
        where['is_active'] = true
        const response = Note.findOne({where: where}).then((u) => {
            return u
        }).catch((err) => { throw({type: "NOTES_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async createNote(note:Note) {
        console.log(note)
        const response = Note.create(note).then((u)=>{
            return u
        }).catch((err)=>{
            throw({type: "NOTES_REPOSITORY_ERROR", value: err, statusCode: 404})
        })
        return response
    }

    public async deleteNote(id: number) {
        const response = Note.update(
            {is_active: false},
            {where: {id: id}}
        ).then(u => {
            if(u[0] === 1) {
                return "Note deleted!"
            } else {
                throw(`Note not found with id ${id}`)
            }
        }) 
        .catch(err => { throw({type: "USER_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async updateNote(note:any, id:any) {
        const response = await Note.update(
            note,
            {
                where: {id: id},
                returning: true,
            }
        )
        .then(u => {
            if(u[0] === 1) {
                return "Note updated!"
            } else {
                throw(`Note not found with id ${id}`)
            }
        })
        .catch(err => { throw({type: "USER_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }
    
}