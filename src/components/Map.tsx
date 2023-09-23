/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

type OfficeNode = {
    id: string;
    field_address: {
        locality: string;
        postal_code: string;
        address_line1: string;
        address_line2?: string | null;
        latitude: number;
        longitude: number;
    };
};

export default function Map() {
    const offices = [
        // {
        //     id: '1',
        //     field_address: {
        //         locality: 'Gent',
        //         postal_code: '9000',
        //         address_line1: 'Veldstraat 1',
        //         latitude: 56.9442,
        //         longitude: 24.17014,
        //     },
        // },
        // {
        //     id: '2',
        //     field_address: {
        //         locality: 'Brussel',
        //         postal_code: '1000',
        //         address_line1: 'Nieuwstraat 1',
        //         address_line2: 'a',
        //         latitude: 56.95372,
        //         longitude: 24.15731,
        //     },
        // },
        {
            id: '3',
            field_address: {
                locality: 'Antwerpen',
                postal_code: '2000',
                address_line1: 'Meir 1',
                address_line2: 'a',
                latitude: 56.95111,
                longitude: 24.1148,
            },
        },
    ];
    const defaultCenter: GeolocationPosition = {
        coords: {
            latitude: 56.946285, // Initial latitude
            longitude: 24.105078, // Initial longitude
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
                enableHighAccuracy: true,
                timeout: 12000,
                maximumAge: 30000,
            },
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);
    const mapRef = React.useRef<any>(null);
    const [selectedOffice, setSelectedOffice] = React.useState<
        OfficeNode | undefined | null
    >(null);
    const { isLoaded } = useJsApiLoader({
        id: 'dd79ffada6ff9eae',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });
    const onLoad = React.useCallback(
        (mapInstance: {
            fitBounds: (arg0: google.maps.LatLngBounds) => void;
        }) => {
            const bounds = new google.maps.LatLngBounds();
            offices.forEach((office) => {
                bounds.extend(
                    new google.maps.LatLng(
                        office.field_address.latitude,
                        office.field_address.longitude,
                    ),
                );
            });
            mapRef.current = mapInstance;
            mapInstance.fitBounds(bounds);
        },
        [offices],
    );
    const onClickMarker = (officeId: string) => {
        setSelectedOffice(offices.find((office) => office.id === officeId));
    };
    let counter = 0;
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setPosition(position);
                setError(null);
            },
            (error) => {
                setError(error.message);
            },
            {
                enableHighAccuracy: true, // Request high accuracy
                timeout: 0,
            },
        );
        const intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition(position);
                    setError(null);
                },
                (error) => {
                    setError(error.message);
                },
                {
                    enableHighAccuracy: true, // Request high accuracy
                    timeout: 0,
                },
            );
        }, 1000);
        return () => {
            navigator.geolocation.clearWatch(watchId);
            clearInterval(intervalId);
            counter++;
            console.log('clear', counter);
        };
    }, []);
    return (
        <div className="h-full w-full">
            <h1 className="text-white">Google maps + React</h1>
            {isLoaded ? (
                <>
                    <GoogleMap
                        options={{
                            mapTypeControl: false,
                            streetViewControl: false,
                        }}
                        zoom={18}
                        center={
                            position
                                ? {
                                      lat: position.coords.latitude,
                                      lng: position.coords.longitude,
                                  }
                                : undefined
                        }
                        mapContainerClassName="maptest"
                        onLoad={onLoad}
                        clickableIcons={false}>
                        {offices.map((office) => (
                            <Marker
                                key={office.id}
                                onClick={() => onClickMarker(office.id)}
                                position={{
                                    lat: office.field_address.latitude,
                                    lng: office.field_address.longitude,
                                }}
                            />
                        ))}
                        {selectedOffice ? (
                            <InfoWindow
                                position={{
                                    lat: selectedOffice.field_address.latitude,
                                    lng: selectedOffice.field_address.longitude,
                                }}
                                onCloseClick={() => setSelectedOffice(null)}>
                                <p>
                                    {selectedOffice.field_address.address_line1}{' '}
                                    {selectedOffice.field_address.address_line2}{' '}
                                    - {selectedOffice.field_address.postal_code}{' '}
                                    {selectedOffice.field_address.locality}
                                </p>
                            </InfoWindow>
                        ) : null}
                        <Marker
                            position={
                                position
                                    ? {
                                          lat: position.coords.latitude,
                                          lng: position.coords.longitude,
                                      }
                                    : { lat: 56.95372, lng: 24.15731 }
                            }
                            icon={{
                                url: 'https://static.thenounproject.com/png/3652534-200.png', // URL to your custom icon
                                scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
                            }}
                        />
                    </GoogleMap>
                    {error && (
                        <p className="text-white">Error: {error + counter}</p>
                    )}
                </>
            ) : null}
        </div>
    );
}
