export class Covid19DataClass {
    updated: number;
    country: string;
    countryInfo: {
        _id: number;
        iso2: string;
        iso3: string;
        lat: number;
        long: number;
        flag: string;
    }
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
}

export class HistoricalDataClass {
    country: string;
    province: null | string;
    timeline: TimeLineClass;
}

export class TimeLineClass {
    cases: Object;
    deaths: Object;
    recovered: Object;
}