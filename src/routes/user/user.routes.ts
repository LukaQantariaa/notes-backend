import express, {Request, Response, NextFunction, Router} from "express"
import { userController } from '../../controllers/user/user.controller'
import { apiSuccessHandler } from '../../shared/success-handler/handler'
import { verifyToken } from '../../shared/helpers/token/verifyToken'

const router: Router = Router();
const controllers = {
    userController: new userController()
}

// Client (User register)
router.post('/register', async (req: Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.userController.registerUser(req.body);
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});

// Admin (All Active users)
router.get('/', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await controllers.userController.getAllUsers()
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err);
    }
});

// Admin (All Deleted users)
router.get('/deletedusers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await controllers.userController.getDeletedUsers();
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
});


router.delete('/delete/:id', verifyToken, async (req:Request, res:Response, next:NextFunction) => {
    try {
        const response = await controllers.userController.deleteUser(req.params.id)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
})

// Client (User login)
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await controllers.userController.loginUser(req.body)
        apiSuccessHandler(response, req, res)
    } catch(err) {
        next(err)
    }
})



export const userRoutes: Router = router;