import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Elado } from './Elado.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  #Elado: Elado[]= [];

  @Get()
  @Render('index')
  getData() {
    return {
      data:{},
      errors:[]
    };
  }

  @Post("data")
  data(@Body() Elado:Elado, @Res() response: Response){
    let errors = [];

    if(!Elado.nev || !Elado.bankSz){
      errors.push("Minden mezőt ki kell tölteni!");
    }
    else if(!Elado.szerzFel){
      errors.push("Fogadja el a feltételeket!");
    }
    else if(!/^\d{8}-\d{8}$/.test(Elado.bankSz) || !/^\d{8}-\d{8}-\d{8}$/.test(Elado.bankSz)){
      errors.push("Nem megfelelő a bankszámlaszám formátuma!");
    }

    if(errors.length>0){
      response.render('index',{
        data: Elado,
        errors
      })
      return{
        errors
      }
    }

    const Adatok: Elado = {
      nev = Elado.nev,
      bankSz = Elado.bankSz,
      szerzFel = Elado.szerzFel? true:false
    }
  }
}
