import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadesService } from '../cidades.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cidades-cadastro',
  templateUrl: './cidades-cadastro.component.html',
  styleUrls: ['./cidades-cadastro.component.css']
})
export class CidadesCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cidadesService: CidadesService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router

    ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      estado: [null, [Validators.required, Validators.maxLength(2)]]
    });
  }

  salvar() {
    this.cidadesService.adicionar(this.formulario.value)
    .then(cidadeAdicionada => {
      this.messageService.add({
        severity: 'success', detail: "A cidade foi adicionada com sucesso!"
      });
      this.router.navigate(['/cidades']);
    }).catch(erro => this.errorHandler.handle(erro));
  }

}
