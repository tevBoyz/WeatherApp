import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const params = {
      q: city,
      appid: environment.openWeatherApiKey,
      units: 'metric',
      lang: 'en' // You can change this to any supported language code
    };
    return this.http.get(this.apiUrl, { params });
  }

  getWeatherByCoords(lat: number, lon: number): Observable<any> {
  const params = {
    lat: lat.toString(),
    lon: lon.toString(),
    appid: environment.openWeatherApiKey,
    units: 'metric',
    lang: 'en' // You can change this to any supported language code
  };
  return this.http.get(this.apiUrl, { params });
} 
}
