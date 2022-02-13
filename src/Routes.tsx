import { Routes as RoutesWrapper, Route } from 'react-router-dom';

import { Home } from './Home';
import { Partners } from './Partners';

export function Routes() {
    return (
        <RoutesWrapper>
            <Route path='/' element={<Home/>}/>
            <Route path='/partners' element={<Partners/>}/>
        </RoutesWrapper>
    );
}
