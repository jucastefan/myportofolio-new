import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: "app-more-projects",
  templateUrl: "./more-projects.component.html",
  styleUrls: ["./more-projects.component.scss"],
  standalone: true,
  imports: [CommonModule, TranslateModule, CarouselModule]
})
export class MoreProjectsComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000
  };

  projects: any[] = [];

  constructor(
    public analyticsService: AnalyticsService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.get('OtherProjects.Projects').subscribe(
      (projects: any[]) => {
        this.projects = projects;
      }
    );
  }

  redirect(link: string, event: Event): void {
    if (link) {
      window.open(link, '_blank');
    }
  }

}
