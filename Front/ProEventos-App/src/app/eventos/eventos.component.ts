import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
public eventos: any = [];
public eventosFiltrados: any = [];
marginImg = 2;
widthImg = 150;
mostrarImagem = true;
// tslint:disable-next-line:variable-name
private _filtroLista = '';

public get filtroLista(): string {
  return this._filtroLista;
}

public set filtroLista(value: string) {
  this._filtroLista = value;
  this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
}

filtrarEventos(filtrarPor: string): any{
  filtrarPor = filtrarPor.toLocaleLowerCase();
  return this.eventos.filter(
    evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
    evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
  );
}
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => console.log(error)
    );
  }

  // tslint:disable-next-line:typedef
  public alterarImagem(){
    // tslint:disable-next-line:no-unused-expression
    this.mostrarImagem = !this.mostrarImagem;
  }

}
