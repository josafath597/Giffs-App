
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey     : string = 'wUuOqDqYhaY2T0k6E9nBm5RotSG2ZcV9';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private limite     : string =  '1000';
  private lang       : string = 'es'
  public _historial : string[] = [];
  public auxiliar: Gif[] = [];
  public resultados :Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  buscarGifs ( query: string ) {
    
    query= query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', this.limite )
            .set('q', query)
            .set('lang', this.lang);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) =>{
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify(resp.data));
        this.auxiliar = resp.data.splice(0,9);
      })    
      
  }
}
