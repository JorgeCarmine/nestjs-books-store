import { Body, Controller, Get, Post, Redirect, Render, Req, Res } from "@nestjs/common";
import { User } from "src/models/user.entity";
import { UsersService } from "src/services/users.service";

@Controller('/auth')
export class AuthController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get('/register')
    @Render('auth/register')
    register() {
        const viewData = [];
        viewData['title'] = 'User Register';
        viewData['subtitle'] = 'User Register';

        return { viewData };
    }
    
    @Post('/store')
    @Redirect('/')
    async store(@Body() body) {
        const newUser = new User();
        newUser.setName(body.name);
        newUser.setEmail(body.email);
        newUser.setPassword(body.password);
        newUser.setRole('client');
        newUser.setBalance(1000);

        this.usersService.createOrUpdateUser(newUser);
    }

    @Get('login')
    @Render('auth/login')
    login() {
        let viewData = [];
        viewData['title'] = 'User Login';
        viewData['subtitle'] = 'User Login';

        return { viewData }
    }

    @Post('connect')
    async connect(@Body() body, @Req() request, @Res() response) {
        const { email, password} = body;
        let user = await this.usersService.login(email, password);

        if(user) {
            request.session.user = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            }
            console.log("user", user);
            return response.redirect('/');
        } else {
            console.log("Bad password");
            return response.redirect('/auth/login');
        }
    }

    @Get('/logout')
    @Redirect('/')
    logout(@Req() request) {
        request.session.user = null;
    }
}