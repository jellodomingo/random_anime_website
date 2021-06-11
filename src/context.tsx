import { createContext } from "react";

interface AppState {
    id: number,
    season: string,
    year: number,
    page: JSX.Element
}

type ContextType = {
    appState: AppState
    setId: (id: number) => void
    setSeason: (season: string) => void
    setYear: (year: number) => void
    setPage: (page: JSX.Element) => void
}

const initialState: AppState = {
    id: 40858,
    season: 'fall',
    year: 2020,
    page: <></>
}

export const AppContext = createContext<ContextType>({
    appState: initialState,
    setId: () => console.warn('no id set'),
    setSeason: () => console.warn('no season set'),
    setYear: () => console.warn('no year set'),
    setPage: () => console.warn('no page set')
});