import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Weather from "./components/Weather";
import {API_KEY, PLACE_KEY} from './utils/WeatherAPIKey';

export default class App extends React.Component {

    state = {
        isLoading: true,
        temperature: 0,
        weatherCondition: null,
        error: null,
        address: null
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude);

            },
            err => {
                this.setState({error: 'Error Getting weather conditions'})
            }
        )
    }

    fetchWeather(lat = 25, lon = 25) {
        this.fetchCity(lat, lon);
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    temperature: json.main.temp,
                    weatherCondition: json.weather[0].main,
                    isLoading: false
                });
            });
    }

    fetchCity(lat = 25, lng = 25) {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${PLACE_KEY}`
        )
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {address: json.results[0].formatted_address}
                )
            });

    }

    loader() {
        return (

                <ActivityIndicator size="large" color="#0000ff"/>
        )
    }

    render() {
        const {isLoading, weatherCondition, temperature, address} = this.state;
        return (
            <View style={styles.container}>
                {
                    isLoading ? (
                        this.loader()
                    ) : (
                        <Weather weather={weatherCondition} temperature={temperature} address={address}/>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: "center"
    }
});
