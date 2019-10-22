import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { BrowseByDateComponent } from './browse-by-date/browse-by-date.component';
import { BrowseByHandComponent } from './browse-by-hand/browse-by-hand.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LetterLinksComponent } from './letter-links/letter-links.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageViewComponent } from './page-view/page-view.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DiaryLinksComponent } from './diary-links/diary-links.component';
import { TempLetterComponent } from './temp-letter/temp-letter.component';

import { PagerService } from './_shared/_services/pager.service';
import { SearchService } from './_shared/_services/search.service';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatExpansionModule } from '@angular/material';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'browse-by-date', component: BrowseByDateComponent},
  { path: 'browse-by-hand', component: BrowseByHandComponent},
  { path: 'about', component: AboutComponent},
  { path: 'page-view/:id/:pageNum', component: PageViewComponent},
  { path: 'search-results/:search', component: SearchResultsComponent},
];

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    BrowseByDateComponent,
    BrowseByHandComponent,
    HeaderComponent,
    HomeComponent,
    LetterLinksComponent,
    NavBarComponent,
    PageViewComponent,
    SearchBarComponent,
    SearchResultsComponent,
    DiaryLinksComponent,
    TempLetterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    OrderModule,
    NoopAnimationsModule,
    MatExpansionModule
  ],
  providers: [
    NgbActiveModal,
    PagerService,
    SearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
