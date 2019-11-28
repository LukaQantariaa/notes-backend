import * as express from 'express';
import { labelSchema } from '../../validators/labels/label'
import { labelServiceImpl } from '../../services/labels/label.service'

const services = {
    labelService: new labelServiceImpl()
}

export class labelController {
    

    constructor() {
        
    }


    public async createLabel(body: any) {
        // request params
        const label = {
            title: body.title,
            userId: body.userId,
            is_active: true
        }

        // validate
        const validate = labelSchema.validate(label)
        if(validate.error) {
            const err = validate.error.details[0].message; 
            throw({type: "LABEL_CONTROLLER_ERROR", value: err, statusCode: 400})
        }

        //service
        const response = await services.labelService.createLabel(label, body.userId)
        return response
        
    }

    public async getAllActiveLabels() {
        const response = await services.labelService.getAllActiveLabels()
        return response
    }

    public async getAllLabels() {
        const response = await services.labelService.getAllLabels()
        return response
    }

    public async getUsersLabels(userId: any) {
        const response = await services.labelService.getUsersLabels(userId)
        return response
    }

    public async updateLabel(id: any, body: any, userId: any) {
        // request
        // Only title can be updated
        if(body.title) {
            const response = await services.labelService.updateLabel(id, body.title, userId)
            return response
        }
        throw({type: "LABEL_CONTROLLER_ERROR", value: 'title is empty', statusCode: 400})
    }

    public async deleteLabel(id: any, userId: any) {
        const response = await services.labelService.deleteLabel(id, userId)
        return response
    }

}