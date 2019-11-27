import express, {Request, Response, NextFunction, Router} from "express"
import { notesController } from '../../controllers/notes/notes.controller'
import { apiSuccessHandler } from '../../shared/success-handler/handler'

const router: Router = Router();
const controllers = {
    notesController: new notesController()
}

router.get('/', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const resposnse = await controllers.notesController.getAllNotes();
        res.send(apiSuccessHandler(resposnse));
    } catch(err) {
        next(err);
    }
});

router.post('/create', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const resposnse = await controllers.notesController.createNote(req.body, req.files)
        res.send(apiSuccessHandler(resposnse))
    } catch(err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await controllers.notesController.deleteNote(req.params.id)
        res.send(apiSuccessHandler(response))
    } catch(err) {
        next(err)
    }
})




export const notesRoutes: Router = router;