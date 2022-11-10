import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { map, mergeMap, catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) { 
    
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      map((dataRaw: any) => {
        return dataRaw.data
      })
    )
  }

  getAllRandom$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      mergeMap((dataRaw: any) => this.skipById(dataRaw.data, 2)),
      // map((dataRevertida) => {
      //   return dataRevertida.filter((track: TrackModel) => track._id !== 1) //TODO: aplicar un filter comun de array
      // })
      catchError((err) => {
        const { status, statusText } = err
        console.log('Algo paso revisame', err)
        return of([])
      })
    )
  }

}
