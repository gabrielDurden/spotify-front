import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  
  tracksTrending: Array<TrackModel> = [ ]
  tracksRandom: Array<TrackModel> = [ ]

  listObservers$: Array<Subscription> = []
  
  constructor(private _trackService: TrackService) { }

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandam()
  }

  async loadDataAll(): Promise<any>{
    // this._trackService.getAllTracks$()
    // .subscribe((response: TrackModel[]) => {
    //   this.tracksTrending = response
    // })
    this.tracksTrending = await this._trackService.getAllTracks$().toPromise()
    
  }

  loadDataRandam(): void{
    this._trackService.getAllRandom$()
    .subscribe((response: TrackModel[]) => {
      this.tracksRandom = response
    })
    // this.tracksRandom = await this._trackService.getAllRandom$().toPromise()
  }

  ngOnDestroy(): void {
    
  }

}
