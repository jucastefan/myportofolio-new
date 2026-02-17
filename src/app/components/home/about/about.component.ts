import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule]
})
export class AboutComponent implements OnInit {
  paragraphs: string[] = [];

  constructor(
    public analyticsService: AnalyticsService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.get('AboutMe.Paragraphs').subscribe(
      (paragraphs: string[]) => {
        this.paragraphs = paragraphs;
      }
    );
  }

}
