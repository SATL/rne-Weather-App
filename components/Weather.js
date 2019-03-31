import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {weatherConditions} from "../utils/WeatherConditions";
import PropTypes from 'prop-types';

const Weather = ({ weather, temperature }) => {
    return (
        <View
            style={[
                styles.weatherContainer,
                { backgroundColor: weatherConditions[weather].color }
            ]}
        >
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons
                    size={72}
                    name={weatherConditions[weather].icon}
                    color={'#fff'}
                />
                <Text style={styles.tempText}>{temperature}˚</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{weatherConditions[weather].title}</Text>
                <Text style={styles.subtitle}>
                    {weatherConditions[weather].subtitle}
                </Text>
            </View>
        </View>
    );
};

Weather.propTypes = {
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.string
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f7b733'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tempText: {
        fontSize: 48,
        color: '#ffffff'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#ffffff'
    },
    subtitle: {
        fontSize: 24,
        color: '#ffffff'
    }
});

export default Weather;