import * as jwt from 'jsonwebtoken'

export function generateToken(config:any){

    const token = jwt.sign({ id: config }, 'secret', {
        algorithm: 'HS256',
        expiresIn: '3600000' // 1 hours
        //expiresIn: '2000'
    })
    return token
}