/* @refresh reload */
import {render} from 'solid-js/web'
import {Route, Router, Routes} from '@solidjs/router'
import {MainContextProvider} from "./ContextManagers/ContextMain";
import Index from "./Components";

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error('Root element not found. Did you forget ' +
        'to add it to your index.html? Or maybe the id attribute got misspelled?')
}

render(() => (
        <Router>
            <Routes>
                <Route path="" component={MainContextProvider}>

                    <Route path="/" component={Index}/>

                </Route>
            </Routes>
        </Router>
    ),
    root
)
