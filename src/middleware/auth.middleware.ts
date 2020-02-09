
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const fs = require('fs')

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        try{

            const token = req.rawHeaders[1].split(' ')[1]
    
            const data = fs.readFileSync(token + '.txt', "utf8")
            req["userId"] = data;
        } catch (err) {
            console.log('user is not auth')
        }
        console.log('Request...');
        next();
    }
}