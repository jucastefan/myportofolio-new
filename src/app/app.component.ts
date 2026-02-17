import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import * as AOS from "aos";
import { Title, Meta } from "@angular/platform-browser";
import { LanguageService } from "src/app/services/language/language.service";
import { CommonModule } from "@angular/common";
import { RouterModule, NavigationEnd, Router } from "@angular/router";
import { HeaderComponent } from "./components/general/header/header.component";
import { FooterComponent } from "./components/general/footer/footer.component";
import { TranslateModule } from "@ngx-translate/core";
import { filter } from "rxjs/operators";

declare global {
  var particlesJS: any;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "juca-stefan-portofolio";

  constructor(
    private languageService: LanguageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.languageService.initLanguage();

    // Initialize AOS on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.initializeAOS();
      });
  }

  ngAfterViewInit(): void {
    // Load particles.js with a slight delay to ensure DOM is ready
    setTimeout(() => {
      if (typeof particlesJS !== "undefined") {
        particlesJS.load("particles-js", "assets/particles.json", () => {
          console.log("Particles loaded successfully");
        });
      } else {
        console.warn("particlesJS library not loaded");
      }
    }, 500);

    // Initialize AOS after view is rendered
    this.initializeAOS();
  }

  private initializeAOS(): void {
    setTimeout(() => {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: false,
        offset: 120,
      });
      AOS.refresh();
      console.log("AOS initialized and refreshed");
    }, 100);
  }
}
