import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss']
})
export class ProdutosFormComponent implements OnInit {

  public produtosForm = new FormGroup({
    marcaProduto: new FormControl('', [Validators.required]),
    categoria: new FormControl(''),
    valor: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
