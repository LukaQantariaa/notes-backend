import express, {Request, Response, NextFunction, Router} from "express"
import { userController } from '../../controllers/user/user.controller'
import { apiSuccessHandler } from '../../shared/success-handler/handler'

const router: Router = Router();
const controllers = {
    userController: new userController()
}

router.post('/register', async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.userController.registerUser(req.body);
        res.status(200).send(apiSuccessHandler(response))
    } catch(err) {
        next(err)
    }
});

router.get('/', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.userController.getAllUsers()
        res.status(200).send(apiSuccessHandler(response))
    } catch(err) {
        next(err);
    }
});

router.get('/deletedusers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await controllers.userController.getDeletedUsers();
        res.status(200).send(apiSuccessHandler(response))
    } catch(err) {
        next(err)
    }
});

router.get('/delete/:id', async (req:Request, res:Response, next:NextFunction) => {
    try {
        const response = await controllers.userController.deleteUser(req.params.id)
        res.status(200).send(apiSuccessHandler(response))
    } catch(err) {
        next(err)
    }
})



export const userRoutes: Router = router;