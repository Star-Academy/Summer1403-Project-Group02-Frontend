import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiRepeatTimes } from '@taiga-ui/cdk';
import {
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiIcon,
    TuiSurface,
    TuiTitle,
    TuiScrollbar,
} from '@taiga-ui/core';
import {
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiChevron,
    TuiDataListDropdownManager,
    TuiFade,
    TuiTabs,
    TuiBreadcrumbs,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiHeader, TuiNavigation } from '@taiga-ui/layout';
import { TuiItem } from '@taiga-ui/cdk';
import { TitleCasePipe } from '@angular/common';
@Component({
    exportAs: "Example1",
    imports: [
        TuiNavigation,
        TuiScrollbar,
        TuiButton,
        TuiIcon,
        TuiChevron,
        TuiDropdown,
        TuiFade,
        TuiDataList,
        TuiBadgeNotification,
        TuiAvatar,
        RouterLink,
        RouterLinkActive,
        TuiAppearance,
        TitleCasePipe,
        TuiBadge,
        TuiTabs,
        TuiItem,
        TuiBreadcrumbs,
        TuiRepeatTimes,
        TuiCardLarge,
        TuiHeader,
        TuiSurface,
        TuiTitle,
        TuiDataListDropdownManager,
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
    protected expanded = false;
}
