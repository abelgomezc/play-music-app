import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicSearchService {

  //private apiUrl = 'https://scraptik.p.rapidapi.com/search-sounds';
  private apiUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search?';
  private headers = new HttpHeaders({
    'x-rapidapi-key': 'a24491dd79msha20cb8a5ff5ad6ep1cddcfjsn0dbee06ecfdb',
    // 'x-rapidapi-host': 'scraptik.p.rapidapi.com'
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'

  });

  constructor(private http: HttpClient) {}

  // searchMusic(keyword: string, count: number = 20, cursor: number = 0): Observable<any> {
  //   const params = new HttpParams()
  //     .set('keyword', keyword)
  //     .set('count', count.toString())
  //     .set('cursor', cursor.toString())
  //     .set('use_filters', '0')
  //     .set('filter_by', '0')
  //     .set('sort_type', '0');

  //   return this.http.get(this.apiUrl, { headers: this.headers, params });
  // }
  searchMusic(q: string): Observable<any> {
    const params = new HttpParams()
      .set('q', q)
   

    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }
}
