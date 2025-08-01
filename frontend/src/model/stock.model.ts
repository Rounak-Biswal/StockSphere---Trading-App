export interface IHistory {
    datetime: string,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
}

export interface IMeta {
    interval: string,
    currency: string,
    exchange_timezone: string,
    exchange: string,
    mic_code: string,
    type: string
}

export interface IStock {
    _id?: string,
    symbol: string,
    stockName: string,
    sector: string,
    marketCap: number,
    trend: string,
    meta: IMeta,
    history: IHistory[]
}