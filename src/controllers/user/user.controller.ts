import * as express from 'express';
import { userSchema } from '../../validators/user/user'
import { userServiceImpl } from '../../services/user/user.service'

const services = {
    userService: new userServiceImpl()
}

export class userController {
    

    constructor() {
        
    }

    public async getAllUsers(){
        const response = await services.userService.getAllUsers()
        return response
    }

    public async registerUser(body: any) {
        // request params
        const user = {
            username: body.username,
            email: body.email,
            password: body.password,
            is_active: true
        }
        // validate 
        const validate = userSchema.validate(user);
        if(validate.error) {
            const err = validate.error.details[0].message; 
            throw({type: "USER_CONTROLLER_ERROR", value: err, statusCode: 400})
        } else {
            //console.log(validate.value)
            const response = await services.userService.registerUser(validate.value);
            return response
        }
    }

    public async deleteUser(id: any) {
        const response = services.userService.deleteUser(parseInt(id));
        return response
    }
}