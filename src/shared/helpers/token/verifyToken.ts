import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { userServiceImpl } from '../../../services/user/user.service'

const services = {
    userService: new userServiceImpl()
}

export async function verifyToken(req:Request, res: Response, next: NextFunction) {
    if( req.header('access-token') ) {
        var token: any = req.header('access-token');
    } else {
        res.status(404).send("token does not exist");
        return 0
    }

    try {
        const verifiedToken: any = await jwt.verify(token, "secret");
        const user = await services.userService.getUser(verifiedToken.id)
        if( user === null ) {
            res.status(400).send('this user is not active!')
        } else {
            req.body.userId = verifiedToken.id
            next()
        }
    } catch(err) {
        res.status(400).send("Invalid Token");
    }
}