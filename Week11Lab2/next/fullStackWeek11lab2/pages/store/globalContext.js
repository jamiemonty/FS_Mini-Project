// All database stuff here, shared via global context for the Book Club app

import { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
    const [globals, setGlobals] = useState({
        aString: 'init val',
        count: 0,
        hideHamMenu: true,
        books: [],
        dataLoaded: false
    });

    useEffect(() => {
        getAllBooks();
    }, []);

    async function getAllBooks() {
        const response = await fetch('/api/get-books', {
            method: 'POST',
            body: JSON.stringify({ books: 'all' }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        setGlobals((previousGlobals) => {
            const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
            newGlobals.books = data.books || [];
            newGlobals.dataLoaded = true;
            console.log('Books fetched:', newGlobals.books);
            return newGlobals;
        });
    }

    async function editGlobalData(command) {
        if (command.cmd === 'hideHamMenu') {
            setGlobals((previousGlobals) => {
                const newGlobals = { ...previousGlobals };
                newGlobals.hideHamMenu = command.newVal;
                return newGlobals;
            });
        }
        if (command.cmd === 'addBook') {
            const response = await fetch('/api/new-book', {
                method: 'POST',
                body: JSON.stringify(command.newVal),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setGlobals((previousGlobals) => {
                const newGlobals = { ...previousGlobals };
                newGlobals.books = [...newGlobals.books, command.newVal];
                return newGlobals;
            });
        }
    }

    const context = {
        updateGlobals: editGlobalData,
        theGlobalObject: globals
    };

    return (
        <GlobalContext.Provider value={context}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;