import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');
const fs = require('fs');

export type User = any;

@Injectable()
export class AuthService {

    public users: User[];

    constructor() {
        this.users = [
            {
                id: 1,
                username: 'makh',
                password: '123'
            },

            {
                id: 2,
                username: 'jhon',
                password: 'somepass'
            },
        ];
    }

    async find(username: string) {
        return this.users.find(item => item.username == username);
    }

    async checkUser(username: string, password: string): Promise<User> | null {
        const user = await this.find(username);
        if (user){
            
            if (user.password === password) {
                return user;
            } else {
                return null;
            }
        }
        return null;
    }

    async login(username: string, password: string) {
        let user: any = await this.checkUser(username, password)
        if (user) {
            const token = await jwt.sign({ username: username, password: password }, 'secretAsISuppose');
            console.log(token);
            console.log('test ---');
            const filename = token + ".txt";
            fs.writeFile(filename, user.id, () => {
                console.log("file was saved")
            })

            return {access_token: token}
        }
        return {message: "user not exist"}
    }

}
