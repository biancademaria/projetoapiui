import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    }
    else if (errorResponse instanceof HttpErrorResponse && 
      errorResponse.status >= 400 && errorResponse.status <= 499) {
          msg = 'Desculpa, ocorreu um erro ao processar a sua solicitação :(';

          if (errorResponse.status === 403) {
            msg = 'Eita, você não tem permissão para executar essa ação!';
          }

          try {
            msg = errorResponse.error[0].mensagemUsuario;
          }
          catch (e) {} // e = abreviatura de 'erro'

          console.error('Ocorreu um erro inesperado', errorResponse);
    }
    else {
      msg = 'Aconteceu um erro ao processar o serviço remoto. Que tal tentar novamente?';
      console.error('Ocorreu um erro inesperado', errorResponse);

    }

    this.messageService.add({severity: 'error', summary: 'Atenção', detail: msg });
  }
}
