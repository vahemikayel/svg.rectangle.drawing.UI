import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SvgService } from './svg-service.service';
import { SvgModel } from './models/svg.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseAddress = 'http://localhost:31933/api/v1.0/Data/';

  constructor(private http: HttpClient, private svgService: SvgService) { }

  getSVG(): Observable<SvgModel> {
    return this.http.get<SvgModel>(this.baseAddress + 'GetFileData');
  }

  saveDimensions(svgData: SvgModel): Observable<any> {
    return this.http.post(this.baseAddress + 'SaveFileData', svgData);
  }
}