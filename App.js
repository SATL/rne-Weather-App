import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Weather from "./components/Weather";
import { API_KEY } from './utils/WeatherAPIKey';

export default class App extends React.Component {

    state = {
        isLoading: true,
        temperature:0,
        weatherCondition: null,
        error: null
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position =>{
                this.fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            err =>{
                this.setState({error:'Error Getting weather conditions'})
            }
        )
    }

    fetchWeather(lat = 25, lon = 25) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        )
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    temperature: json.main.temp,
                    weatherCondition: json.weather[0].main,
                    isLoading: false
                });
            });
    }

    render() {
        const {isLoading, weatherCondition, temperature} = this.state;
        return (
            <View style={styles.container}>
                {
                    isLoading ? (
                        <Text>Fetching the Weather</Text>
                    ) : (
                       <Weather weather={weatherCondition} temperature={temperature} />
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
});
