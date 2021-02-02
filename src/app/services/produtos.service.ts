/*
 * The MIT License
 *
 * Copyright 2021 Martha Ribeiro Locks.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {

    private readonly LIST_CATEGORY = 'listProdutos';

    constructor() {

        let listProdutos: any = localStorage.getItem(this.LIST_CATEGORY);

        if (!listProdutos) {

            listProdutos = [];

            localStorage.setItem(this.LIST_CATEGORY, JSON.stringify(listProdutos));
        }
    }

    public getListProdutos(): any {

        const listProdutos: any = localStorage.getItem(this.LIST_CATEGORY);

        return JSON.parse(listProdutos);
    }

    public setProduto(novoProduto: any): void {

        const listProdutos: any = this.getListProdutos();

        listProdutos.push(novoProduto);

        localStorage.setItem(this.LIST_CATEGORY, JSON.stringify(listProdutos));
    }

    public getProdutoByKey(key: number): any {

        const result = this.getListProdutos().filter((produto: any) => produto.key == key);

        return result;
    }

    public deleteProdutoByKey(key: number): void {

        const result = this.getListProdutos().filter((produto: any) => produto.key != key);

        localStorage.setItem(this.LIST_CATEGORY, JSON.stringify(result));
    }
}
