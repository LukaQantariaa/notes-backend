import { Label } from '../../models/label/label.model'


export class labelRepositoryImplPostgress {

    public async getAllLabels(where:any){
        const response = Label.findAll({where: where}).then((u) => {
            return u
        }).catch((err) => { throw({type: "LABEL_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async createLabel(label: any) {
        const response = Label.create(label).then((u)=>{
            return u
        }).catch((err)=>{
            throw({type: "LABEL_REPOSITORY_ERROR", value: err, statusCode: 404})
        })
        return response
    }

    public async updateLabel(label: any, id: any) {
        const response = await Label.update(
            label,
            {
                where: {id: id},
                returning: true,
            }
        )
        .then(u => {
            if(u[0] === 1) {
                return "Label updated!"
            } else {
                throw(`Label not found with id ${id}`)
            }
        })
        .catch(err => { throw({type: "Label_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }
    
}