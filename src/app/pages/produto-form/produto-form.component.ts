import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  public produtoForm = new FormGroup({
    marcaProduto: new FormControl('', [Validators.required]),
    categoria: new FormControl(''),
    valor: new FormControl(''),
  });

  public submitted = false;
  public showMessageCategoria = false;
  public isUpdating = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private produtosService: ProdutosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const categoria: any = this.route.snapshot.paramMap.get('categoria');

    const result = this.produtosService.getProdutoByCategoria(categoria);

    if (result.length > 0) {

      const categoria = (result[0]).categoria;

      this.isUpdating = true;

      this.fillForm(categoria);
    }
  }

  public save() {

    this.submitted = true;

    if (this.produtoForm.valid && !this.showMessageCategoria) {

      const produto = {
        marcaProduto: this.produtoForm.value.marcaProduto,
        categoria: this.produtoForm.value.categoria,
        valor: this.produtoForm.value.valor,
      };

      const categoria = produto.categoria;

      const novoProduto = {
        categoria: categoria,
        produto: produto
      };

      let navigationExtras: NavigationExtras;

      if (this.isUpdating) {

        this.produtosService.deleteProdutoByCategoria(categoria);

        navigationExtras = {
          queryParams: { 'updated': true }
        };

      } else {

        navigationExtras = {
          queryParams: { 'saved': true }
        };
      }

      this.produtosService.setProduto(novoProduto);

      this.router.navigate(['/admin'], navigationExtras);
    }
  }

  private fillForm(produto: any): void {

    this.produtoForm.get('marcaProduto')?.setValue(produto.marcaProduto);
    this.produtoForm.get('categoria')?.setValue(produto.categoria);
    this.produtoForm.get('valor')?.setValue(produto.valor);
  }

}
