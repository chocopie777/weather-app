import axios from "axios";

export default async function useGetWeather(data) {
  try {
    const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coordinates.value.lat}&lon=${data.coordinates.value.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
    const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coordinates.value.lat}&lon=${data.coordinates.value.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);

    data.emit('updateWeather', {
      currentWeather,
      forecast,
    });
  } catch (e) {
    console.log(e);
  }
}
