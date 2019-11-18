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
            return err
        });
        return response
    }

    public async findOne(where: any): Promise<any> {
        const response = User.findOne({ where: where })
        .then((u) => { return u})
        .catch((err) => { return err })
        return response
    }

    public async AllUser() {
        const response = User.findAll().then((u) => {
            return u
        }).catch(err => { return err })
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