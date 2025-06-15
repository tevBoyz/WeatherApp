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

  isDarkMode = false;

  data: any = [];

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

    const savedMode = localStorage.getItem('darkMode');
  this.isDarkMode = savedMode === 'true';
  document.body.classList.toggle('dark-mode', this.isDarkMode);
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
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Ontario').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Cairo').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Johannesburg').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Delhi').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Istanbul').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Buenos Aires').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('New York').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('London').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Paris').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Dubai').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Sydney').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Sao Paulo').subscribe({
      next: data => this.data.push(data)
    }); 
    this.weatherService.getWeather('Moscow').subscribe({
      next: data => this.data.push(data)
    });
    this.weatherService.getWeather('Beijing').subscribe({
      next: data => this.data.push(data)
    });

  }
  
getCardColor(weather: any): string {
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const condition = weather.weather[0].main;

  let baseColor = '#ffffff';

  // Temperature-based
  if (temp <= 0) baseColor = '#a3d8f4'; // Light Blue
  else if (temp <= 15) baseColor = '#76c7c0'; // Teal
  else if (temp <= 25) baseColor = '#ffe066'; // Yellow
  else if (temp <= 35) baseColor = '#ffa94d'; // Orange
  else baseColor = '#ff6b6b'; // Red

  // Weather condition overrides (simplified)
  if (condition === 'Rain') baseColor = '#74c0fc'; // Blue-gray
  else if (condition === 'Clouds') baseColor = '#ced4da'; // Gray
  else if (condition === 'Thunderstorm') baseColor = '#9c36b5'; // Purple
  else if (condition === 'Snow') baseColor = '#f1f3f5'; // Light Gray

  return baseColor;
}

toggleDarkMode(event: Event): void {
  this.isDarkMode = (event.target as HTMLInputElement).checked;
  document.body.classList.toggle('dark-mode', this.isDarkMode);
  localStorage.setItem('darkMode', this.isDarkMode.toString());
}

}
