import { NoteRepositoryImplPostgress } from '../../repository/notes/notes.repository'

const repositoryes = {
   noteRepository: new NoteRepositoryImplPostgress
}

export class notesServiceImpl {

    public async getAllNotes() {
        const response = repositoryes.noteRepository.getAllNotes();
        return response
    }



}