import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  constructor(private gifsService: GifsService){

  }

  get historial( ) {
    let valor = this.gifsService.historial;
    return valor;
  }

  buscar ( termino: string) {
    this.gifsService.buscarGifs(termino);
  }


}
