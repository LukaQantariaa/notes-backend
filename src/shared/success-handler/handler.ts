import { Request, Response } from 'express'

export function apiSuccessHandler(value: any, req: Request, res: Response, ) {

    if(value.token) {
        res.setHeader('access-token', value.token)
    }

    res.status(200).send({
        status: "SUCCESS",
        value: value,
        code: 200
    })
    
}