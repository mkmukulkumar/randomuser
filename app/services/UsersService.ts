import axios from "axios"
export class UsersService{
    private static URL: string = 'https://randomuser.me/'
    public static getAllUsers(){
        let UserURL:string =`${this.URL}/api/?results=1000`
        return axios.get(UserURL)
    }
}

