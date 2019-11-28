import { labelRepositoryImplPostgress } from '../../repository/labels/label.repository'

const repositoryes = {
   labelRepository: new labelRepositoryImplPostgress()
}

export class labelServiceImpl {

    public async createLabel(label: any, userId: any) {
        // check if label with this name isn't created by this user!
        const labelExists = await repositoryes.labelRepository.getAllLabels({userId: userId, title: label.title, is_active: true})
        if (!Array.isArray(labelExists) || !labelExists.length) { 
            const response = repositoryes.labelRepository.createLabel(label)
            return response
        } else {
            throw({type: "LABEL_CONTROLLER_ERROR", value: `Label: ${label.title} already exists!`, statusCode: 400})
        }
    }   

    public async getAllActiveLabels() {
        const response = await repositoryes.labelRepository.getAllLabels({is_active: true})
        return response
    }

    public async getAllLabels() {
        const response = await repositoryes.labelRepository.getAllLabels({})
        return response
    }

    public async getUsersLabels(userId: any) {
        const response = await repositoryes.labelRepository.getAllLabels({userId: userId, is_active: true})
        return response
    }

    public async updateLabel(id: any, title: any, userId: any) {
        // check if label with this name is created by this user!
        const labelExists = await repositoryes.labelRepository.getAllLabels({userId: userId, id: id, is_active: true})
        if (!Array.isArray(labelExists) || !labelExists.length) { 
            throw({type: "LABEL_CONTROLLER_ERROR", value: `Label ID: ${id} dosn't exists!`, statusCode: 404})
        } else {
            const response = await repositoryes.labelRepository.updateLabel({title: title}, id)
            return response
        }
    } 


    public async deleteLabel(id: any, userId: any) {
        // check if label with this name is created by this user!
        const labelExists = await repositoryes.labelRepository.getAllLabels({userId: userId, id: id, is_active: true})
        if (!Array.isArray(labelExists) || !labelExists.length) { 
            throw({type: "LABEL_CONTROLLER_ERROR", value: `Label ID: ${id} dosn't exists!`, statusCode: 404})
        } else {
            const response = await repositoryes.labelRepository.updateLabel({is_active: false}, id)
            return response
        }
    } 

}