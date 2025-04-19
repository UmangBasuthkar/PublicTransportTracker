import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'search',
        component: SearchComponent
    }
];
