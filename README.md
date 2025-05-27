# 🌤️ Weather Dashboard

A modern and responsive weather dashboard built with **React**, **Tailwind CSS**, and **Lucide Icons**, powered by the [WeatherAPI](https://www.weatherapi.com/).

This project was bootstrapped with [Create React App](https://create-react-app.dev/).

---

## 🚀 Features

- 🔍 Search weather by city
- 📍 Current temperature, humidity, condition & more
- 🕒 Local time and weather icon support
- 📱 Fully responsive UI with **Tailwind CSS**
- 🎨 Elegant and lightweight icons via **Lucide React**
- ⚡ Powered by the free [WeatherAPI](https://www.weatherapi.com/my/)

---

## 📸 Preview

![image](https://github.com/user-attachments/assets/a0b5983d-4df7-4d68-9715-93431160bbfb)


---

## 🛠️ Tech Stack

- **React** – Front-end library
- **Tailwind CSS** – Utility-first CSS framework
- **Lucide React** – Beautiful, consistent icon library
- **WeatherAPI** – Reliable weather data provider

---

## ✅ Features Implemented

### 🏗️ Project Structure & Setup

- **Functional Components**: All components use React hooks
- **Clean Architecture**: Modular component structure with clear separation of concerns
- **Modern Styling**: Beautiful glassmorphism design with responsive layout

### 🌤️ Core Weather Features

- **City Search**: Search for any city and display current weather
- **Weather Details**: Temperature, humidity, wind speed, pressure, visibility
- **Weather Icons**: Dynamic icons based on weather conditions
- **5-Day Forecast**: Extended weather forecast display

### 🔄 API Integration & Polling

- **Real-time Updates**: Auto-refreshes every 30 seconds
- **Demo API**: Uses simulated weather data (in production, you'd use WeatherAPI)
- **Error Handling**: Graceful handling of API failures and invalid cities

### 💾 State Management

- **React Context API**: Global state management for weather data
- **In-Memory Storage**: Saves last searched city (can be enhanced with `localStorage`)
- **Unit Conversion**: Toggle between Celsius and Fahrenheit

### 🎨 UI/UX Features

- **Responsive Design**: Works on all screen sizes
- **Loading States**: Smooth loading animations
- **Error States**: User-friendly error messages with retry functionality
- **Modern Design**: Gradient backgrounds, glassmorphism effects, smooth animations

### 🧩 Component Structure

- **WeatherProvider**: Context provider for global state
- **SearchInput**: Reusable search component
- **WeatherDisplay**: Current weather information
- **ForecastDisplay**: 5-day forecast component
- **ErrorDisplay**: Error handling component
- **UnitToggle**: Temperature unit switcher

### 🚀 Advanced Features

- **Automatic Polling**: Updates weather data every 30 seconds
- **Unit Conversion**: Switch between metric and imperial units
- **Weather Icons**: Dynamic icons based on weather conditions
- **Responsive Grid**: Adaptive layout for different screen sizes

---

## 🙋‍♂️ How to Use

- **Search**: Type a city name and press Enter or click the search button
- **Auto-refresh**: Weather data updates automatically every 30 seconds
- **Unit Toggle**: Switch between Celsius and Fahrenheit using the toggle
- **Error Handling**: Try searching for an invalid city to see graceful error handling

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

```bash
git clone https://github.com/kaushik7749/Weather-Dashboard.git
cd Weather-Dashboard
npm install
