import React from 'react';
import Main from './components/MainPage';
import { AppContext } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

function App() {
    const [appState, setAppState] = React.useState({
        id: 40748,
        season: 'fall',
        year: 2020,
        page: <Main/>
    });
    
    const setId = (id: number) => {
        setAppState({...appState, id: id});
    }

    const setSeason = (season: string) => {
        setAppState({...appState, season: season});
    }

    const setYear = (year: number) => {
        setAppState({...appState, year: year});
    }

    const setPage = (page: JSX.Element) => {
        setAppState({...appState, page: page});
    }

    return (
        <AppContext.Provider value={{
            appState: appState,
            setId: setId,
            setSeason: setSeason,
            setYear: setYear,
            setPage: setPage
        }}>
            {appState.page}
        </AppContext.Provider>
    );
}

export default App;
