import { UserRepositoryImplPostgress } from '../../repository/user/user.repository'
export interface userService {
    //getAddresses(): Promise<Array<Address>>;
    //createAddress(address: Address): Promise<Address>;
}

const repositoryes = {
    userRepository: new UserRepositoryImplPostgress()
}

export class userServiceImpl {

    public async registerUser(user: any) {
        const email = await repositoryes.userRepository.findOne({email: user.email});
        if( email != null ) {
            throw({type: "USER_SERVICE_ERROR", value: "Email already exists", statusCode: 400})
        }
        const username = await repositoryes.userRepository.findOne({username: user.username});
        if( username != null ) {
            throw({type: "USER_SERVICE_ERROR", value: "Username already exists", statusCode: 400})
        }
        const createUser = await repositoryes.userRepository.create(user);
        return createUser
    }

    public async getAllUsers(){
        const response = await repositoryes.userRepository.AllUser();
        return response
    }

    public async getDeletedUsers() {
        console.log('shemovida')
        const response = await repositoryes.userRepository.AllDeletedUsers()
        console.log(response)
        return response
    }

    public async deleteUser(id: any){
        const response = await repositoryes.userRepository.DeleteUser(id)
        return response
    }

}