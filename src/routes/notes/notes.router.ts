import express, {Request, Response, NextFunction, Router} from "express"
import { notesController } from '../../controllers/notes/notes.controller'
import { apiSuccessHandler } from '../../shared/success-handler/handler'
import { verifyToken } from '../../shared/helpers/token/verifyToken'

const router: Router = Router();
const controllers = {
    notesController: new notesController()
}

//admin (all active notes)
router.get('/', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.getAllNotes();
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});

//admin (all deleted notes)
router.get('/deletedNotes', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.getAllDeletedNotes();
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});

//client (create note by user)
router.post('/create', verifyToken, async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.createNote(req.body, req.files)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});

//client (delete note by user)
router.delete('/delete/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.deleteNote(req.params.id, req.body.userId)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
})

//client (update note by user)
router.put('/update/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.updateNote(req.params.id, req.body, req.files)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
})

//client (archive note by user)
router.get('/archived', verifyToken, async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.archivedNotes(req.body.userId);
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});

//client (user's notes)
router.get('/userNotes', verifyToken, async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.myNotes(req.body.userId);
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});

//client (user's completed notes)
router.get('/done', verifyToken, async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.doneNotes(req.body.userId);
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});

//client (user's not comleted notes)
router.get('/notDone', verifyToken, async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.notDoneNotes(req.body.userId);
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});





export const notesRoutes: Router = router;