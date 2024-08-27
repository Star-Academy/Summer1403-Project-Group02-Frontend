// import angular
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

// import tui
import {
    TuiButton,
    TuiIcon,
    TuiScrollbar,
} from '@taiga-ui/core';
import {
    TuiBadgeNotification,
    TuiFade,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiNavigation } from '@taiga-ui/layout';

@Component({
    imports: [
        TuiNavigation,
        TuiScrollbar,
        TuiButton,
        TuiIcon,
        TuiFade,
        TuiBadgeNotification,
        TitleCasePipe,
        TuiCardLarge,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    protected title = "FrontEnd App";
    protected full_name = "name family";
    protected expanded = true;


    isPcMode(): boolean {
        const pcModeThreshold = 768;
        return window.innerWidth >= pcModeThreshold;
    }

    buttonSize(): TuiButton["size"] {
        return this.isPcMode() ? 'm' : 's';
    }
}
