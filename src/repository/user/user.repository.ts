import { User } from '../../models/user/user.model'


export class UserRepositoryImplPostgress {

    public async create(user: any) {
        console.log(user);
        const response = User.create({
            username: user.username,
            password: user.password,
            email: user.email,
            is_active: user.is_active
        }).then((u) => {
            return u
        }).catch((err) => {
            throw({type: "USER_REPOSITORY_ERROR", value: err, statusCode: 404})
        });
        return response
    }

    public async findOne(where: any) {
        console.log(where)
        const response = User.findOne({ where: where })
        .then((u) => { return u})
        .catch((err) => { throw({type: "USER_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async AllUser() {
        const response = User.findAll({where: {is_active: true}}).then((u) => {
            return u
        }).catch(err => { throw({type: "USER_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async AllDeletedUsers() {
        const response = User.findAll({where: {is_active: false}}).then((u) => {
            return u
        }).catch(err => { throw({type: "USER_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }

    public async DeleteUser(id: any) {
        const response = User.update(
            {is_active: false},
            {where: {id: id}}
        )
        .then(u => {
            if(u[0] === 1) {
                return "User deleted!"
            } else {
                throw(`User not found with id ${id}`)
            }
        })
        .catch(err => { throw({type: "USER_REPOSITORY_ERROR", value: err, statusCode: 404}) })
        return response
    }
    
}