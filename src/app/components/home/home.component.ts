import { MoreProjectsComponent } from "./more-projects/more-projects.component";
import { ProjectsComponent } from "./projects/projects.component";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./banner/banner.component";
import { AboutComponent } from "./about/about.component";
import { JobsComponent } from "./jobs/jobs.component";
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    AboutComponent,
    JobsComponent,
    ProjectsComponent,
    MoreProjectsComponent,
    ContactComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor(public analyticsService: AnalyticsService) {}

  ngOnInit(): void {}
}
