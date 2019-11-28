import express, {Request, Response, NextFunction, Router} from "express"
import { apiSuccessHandler } from '../../shared/success-handler/handler'
import { labelController } from '../../controllers/labels/labels.controller'
import { verifyToken } from '../../shared/helpers/token/verifyToken'

const router: Router = Router();
const controllers = {
    labelController: new labelController()
}

// client (create label)
router.post('/create', verifyToken, async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.labelController.createLabel(req.body);
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});

// Admin (get all active labels)
router.get('/', async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.labelController.getAllActiveLabels()
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});

// Admin (get all labels)
router.get('/all', async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.labelController.getAllLabels()
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});

// client (get current user's labels)
router.get('/usersLabels', verifyToken, async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.labelController.getUsersLabels(req.body.userId)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});

// client (update label)
router.put('/update/:id', verifyToken, async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.labelController.updateLabel(req.params.id, req.body, req.body.userId)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});

// client (delete label)
router.delete('/delete/:id', verifyToken, async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.labelController.deleteLabel(req.params.id, req.body.userId)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});


export const labelRoutes: Router = router;