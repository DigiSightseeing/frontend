// src/GeoLocationTracker.tsx
import React, { useEffect, useState } from 'react';

const GeoLocationTracker: React.FC = () => {
    const defaultCenter: GeolocationPosition = {
        coords: {
            latitude: 0, // Initial latitude
            longitude: 0, // Initial longitude
            accuracy: 0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        },
        timestamp: 0,
    };
    const [position, setPosition] = useState<GeolocationPosition | null>(
        defaultCenter,
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setPosition((prevState: GeolocationPosition | null) => ({
                    ...prevState!,
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                    },
                    timestamp: position.timestamp,
                }));
                setError(null);
            },
            (error) => {
                setError(error.message);
            },
            {
                enableHighAccuracy: true, // Request high accuracy
                timeout: 1000,
            },
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return (
        <div>
            {position && (
                <div className="text-white">
                    Latitude: {position.coords.latitude}, Longitude:{' '}
                    {position.coords.longitude}
                </div>
            )}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default GeoLocationTracker;
