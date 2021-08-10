import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  private valor: string[] = [];
  constructor(private gifsService: GifsService){

  }

  get historial( ) {
    this.valor = this.gifsService.historial;
    return this.valor;
  }

  buscar ( termino: string) {
    this.gifsService.buscarGifs(termino);
  }

  borrar(){
    this.gifsService._historial=[];
    this.gifsService.auxiliar=[];
    localStorage.clear();
  }


}
