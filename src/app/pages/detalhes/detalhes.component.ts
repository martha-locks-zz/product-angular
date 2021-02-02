import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';
declare var $: any;
@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  public produto: any;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const key: any = this.route.snapshot.paramMap.get('key');

    const result = this.produtosService.getProdutoByKey(key);

    if (result.length > 0) {

      this.produto.key = (result[0]).produto.key;
    }
  }

}
