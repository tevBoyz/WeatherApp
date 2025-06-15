import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
})
export class HomeComponent {
  city = '';
  weatherData: any = null;
  error: string | null = null;

  addisData: any = null;
  ontarioData: any = null;


  currentLocationData: any = null;
locationError: string | null = null;

  private intervalId: any;

  constructor(private weatherService: WeatherService) {}

    ngOnInit(): void {
    this.fetchUserLocation();
    this.fetchStaticLocations();
    this.intervalId = setInterval(() => {
    this.fetchStaticLocations();
    this.fetchUserLocation();
    }, 30 * 60 * 1000); // every 30 mins
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  search() {
    this.weatherData = null;
    this.error = null;

    this.weatherService.getWeather(this.city).subscribe({
      next: data => this.weatherData = data,
      error: () => this.error = 'City not found or API error.'
    });


  }

  fetchUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
  position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    this.weatherService.getWeatherByCoords(lat, lon).subscribe({
      next: data => this.currentLocationData = data,
      error: () => this.locationError = 'Failed to fetch location weather.'
    });
  },
  error => {
    this.locationError = 'Location permission denied.';
  }
);
  } else {
    this.locationError = 'Geolocation not supported.';
  }
}

  fetchStaticLocations() {
    this.weatherService.getWeather('Addis Ababa').subscribe({
      next: data => this.addisData = data
    });

    this.weatherService.getWeather('Ontario').subscribe({
      next: data => this.ontarioData = data
    });
  }

  
}
