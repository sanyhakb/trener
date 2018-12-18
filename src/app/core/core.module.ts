import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetcherService } from './fetcher.service';
import { CanActivateDashboard } from './guards/login';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FetcherService,
    CanActivateDashboard
  ]
})
export class CoreModule { }
