/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { Request} from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    const token = request.cookies["jwt"];
                    return token;
                }
            ]),
            secretOrKey: '[];.,/;23122',
            ingoreExpiration: false
        })
    }

    async validate(payload: any) {
        
        return {
            id: payload.id,
            role: payload.role
        }
    }
}