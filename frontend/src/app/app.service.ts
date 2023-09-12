import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { catchError, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  

  public url = 'http://localhost:3000/';
  // Constructor
  constructor(
    // HttpClient∂
    private httpClient: HttpClient,
  ) {
  }

  // Obtine solo un objeto desde el ID.
  Get(): Observable<any> {
    // Armo el request
    let url: string = this.url+'productos';
    let headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      });
    let options: any = { headers: headers, responseType: 'json' };

    // Mando consulta al API
    return this.httpClient.get(url, options).pipe(
      map(
        (response: any) => {


          console.log(response);

          if (response) {
            return response;
          } else {
            throw response.description || response.error || '';
          }

        }
      ), catchError((err) => {
        console.error('ERROR GET')
        throw 'ERROR GET';
      })
    );  

  }

  Create(producto: any): Observable<any> {
    // Armo el request
    let url: string = this.url+'productos/create';
    let headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      });
    // Parseo el obj para poder enviarlo en el request
    let body: string = JSON.stringify(producto);
    let options: any = { headers: headers, responseType: 'json' };

    // Mando consulta al API
    return this.httpClient.post(url, body, options).pipe(
      map(
        (response: any) => {
          if (response) {
            return response;
          } else {
            throw 'ERROR CREATE';
          }
        }
      ),
      catchError((err) => {
        console.error('ERROR CREATE');
        throw 'ERROR CREATE';
      })
    );
  }

  Update(producto: any): Observable<any> {


    // Armo el request
    let url: string = this.url+'productos/update';
    let headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      });

    // Armo el obj para enviarlo.
    let body: string = JSON.stringify(producto);
    let options: any = { headers: headers, responseType: 'json' };

    // Mando consulta al API
    return this.httpClient.put(url, body, options).pipe(
      map(
        (response: any) => {
          if (response) {
            return response.data;
          } else {
            throw 'ERROR PUT';
          }
        }
      ),
      catchError((err) => {
        console.error('ERROR PUT');
        throw 'ERROR PUT'
      })
    );
  }

  Delete(productoId: number): Observable<any> {
    // Armo el request
    let url: string = this.url+'productos/'+productoId+'/delete';
    let headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      });
    let options: any = { headers: headers, responseType: 'json' };

    // Mando consulta al API
    return this.httpClient.delete(url, options).pipe(
      map(
        (response: any) => {
            return response;
        }
      ),
      catchError((err) => {
        console.error('ERROR DELETE');
        throw 'ERROR DELETE';

      })
    );
  }

}
