import { CovidCase } from './CovidCase'

export const COVIDCASES: CovidCase[] = [
    { 
        id: 1,
        location: 'Vancouver',
        lat: 49.2827291,
        lng: -123.1207375,
        phoneNum: '1111111',
        personReported: 'John',
        date: '2021-04-15 (3:17am)',
        extra: 'alive'
    }, 
    {
        id: 2,
        location: 'Burnaby',
        lat: 49.2488091,
        lng: -122.9805104,
        phoneNum: '1111111',
        personReported: 'Peter',
        date: '2021-04-15 (3:17am)',
        extra: 'alive'
    },
    {
        id: 3,
        location: 'Kelowna',
        lat: 49.8879519,
        lng: -119.4960106,
        phoneNum: '1111111',
        personReported: 'Alex',
        date: '2021-04-15 (3:17am)',
        extra: 'alive'
    }
]