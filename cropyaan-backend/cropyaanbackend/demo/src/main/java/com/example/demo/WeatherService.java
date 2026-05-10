package com.example.demo;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {

    public Map<String, Object> getWeather(double lat, double lon) {

        String url = "https://api.open-meteo.com/v1/forecast"
                + "?latitude=" + lat
                + "&longitude=" + lon
                + "&current=temperature_2m,relative_humidity_2m,precipitation,precipitation_probability,wind_speed_10m,weather_code"
                + "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code"
                + "&timezone=Asia/Kolkata"
                + "&forecast_days=7";

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        Map<String, Object> current = (Map<String, Object>) response.get("current");
        Map<String, Object> daily   = (Map<String, Object>) response.get("daily");

        Map<String, Object> currentClean = new HashMap<>();
        currentClean.put("temperature",               current.get("temperature_2m"));
        currentClean.put("humidity",                  current.get("relative_humidity_2m"));
        currentClean.put("precipitation",             current.get("precipitation"));
        currentClean.put("windSpeed",                 current.get("wind_speed_10m"));
        currentClean.put("weatherCode",               current.get("weather_code"));
        currentClean.put("precipitation_probability", current.get("precipitation_probability"));

        Map<String, Object> result = new HashMap<>();
        result.put("current", currentClean);
        result.put("daily",   daily != null ? daily : new HashMap<>());

        return result;
    }
}