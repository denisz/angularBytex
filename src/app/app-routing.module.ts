import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule',
    },
    {
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule',
    },
    {
        path: 'book',
        loadChildren: './modules/book-detail/book-detail.module#BookDetailModule',
    },
    {
        path: 'favorites',
        loadChildren: './modules/favorites/favorites.module#FavoritesModule',
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
