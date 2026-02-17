import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [TranslateModule, NgbModule, CommonModule]
})
export class JobsComponent implements OnInit {
  
  active = 0;
  jobs: any[] = [];
  
  constructor(
    public analyticsService: AnalyticsService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.get('Experience.Jobs').subscribe(
      (jobs: any[]) => {
        this.jobs = jobs;
      }
    );
  }

}
