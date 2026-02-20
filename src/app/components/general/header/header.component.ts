import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import {
  trigger,
  style,
  query,
  transition,
  stagger,
  animate,
} from "@angular/animations";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { LanguageService } from "src/app/services/language/language.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  animations: [
    trigger("animateMenu", [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateY(-50%)" }),
          stagger(10, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" }),
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  responsiveMenuVisible: Boolean = false;
  pageYPosition: number;
  languageFormControl: FormControl = new FormControl();
  cvName: string = "";

  constructor(
    private router: Router,
    @Inject(AnalyticsService) public analyticsService: AnalyticsService,
    @Inject(LanguageService) public languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.languageFormControl.valueChanges.subscribe((val) =>
      this.languageService.changeLanguage(val),
    );

    this.languageFormControl.setValue(this.languageService.language);
  }

  scroll(el) {
    if (document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({ behavior: "smooth" });
    } else {
      this.router
        .navigate(["/home"])
        .then(() =>
          document.getElementById(el).scrollIntoView({ behavior: "smooth" }),
        );
    }
    this.responsiveMenuVisible = false;
  }

  downloadCV() {
    this.languageService.translateService
      .get("Header.cvName")
      .subscribe((val) => {
        this.cvName = val;
        // app url
        let url = window.location.href;

        // Open a new window with the CV
        window.open(url + "/../assets/cv/" + this.cvName, "_blank");
      });
  }

  @HostListener("window:scroll", ["getScrollPosition($event)"])
  getScrollPosition(event) {
    this.pageYPosition = window.pageYOffset;
  }

  changeLanguage(language: string) {
    this.languageFormControl.setValue(language);
  }
}
