export interface CovidCase {
    id?: number,
    location: string,
    lat: number,
    lng: number,
    phoneNum: string,
    personReported: string,
    date: string,
    extra: string,
}

export interface CaseInLocation {
    location: string,
    lat: number,
    lng: number,
    caseNum: number,
}