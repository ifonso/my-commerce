import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// TODO: create users table
const users = [
    {
        id: 1,
        username: "john",
        password: "pass",
    },
    {
        id: 2,
        username: "chris",
        password: "pass",
    },
    {
        id: 3,
        username: "maria",
        password: "pass",
    },
];

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login(username: string, password: string) {
        const user = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (!user) throw new UnauthorizedException();

        const payload = { sub: user.id, usernamer: user.username };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
