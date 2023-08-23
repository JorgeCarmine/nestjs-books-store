import { Controller, Get, Render, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index(@Req() request) {
    console.log(request.session);
    return {
      title: "Carmine's book store",
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['description'] = 'Best tech books store';
    viewData['author'] = 'Developed by Jorge Carmine';
    viewData['title'] = 'Tech books';
    viewData['subtitle'] = 'About us';

    return {
      viewData,
    };
  }
}
