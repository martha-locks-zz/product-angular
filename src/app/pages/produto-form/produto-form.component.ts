import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  public produtoForm = new FormGroup({
    marca: new FormControl(''),
    categoria: new FormControl(''),
    descricao: new FormControl(''),
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

      const detalhes = {
        marca: this.produtoForm.value.marca,
        descricao: this.produtoForm.value.descricao,
        valor: this.produtoForm.value.valor,
      };

      const categoria = this.produtoForm.value.categoria;

      const novoProduto = {
        categoria: categoria,
        detalhes: detalhes
      };

      console.log(novoProduto);

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

    this.produtoForm.get('marca')?.setValue(produto.marca);
    this.produtoForm.get('categoria')?.setValue(produto.categoria);
    this.produtoForm.get('descricao')?.setValue(produto.descricao);
    this.produtoForm.get('valor')?.setValue(produto.valor);
  }

}
