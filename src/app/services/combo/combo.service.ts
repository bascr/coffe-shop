import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from 'src/app/models/combo.model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(private http: HttpClient) { }

  public getCombos(): Observable<Combo[]> {
    return this.http.get<Combo[]>('../../../assets/db/combos.json');
  }
}
