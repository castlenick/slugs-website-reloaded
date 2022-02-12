import { Routes as RoutesWrapper, Route } from 'react-router-dom';

import { Home } from './Home';

export function Routes() {
    return (
        <RoutesWrapper>
            <Route path='/' element={<Home/>}/>
        </RoutesWrapper>
    );
}
