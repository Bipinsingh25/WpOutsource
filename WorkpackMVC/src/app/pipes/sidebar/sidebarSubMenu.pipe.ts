import { SidebarMenu } from './../../models/sidebarMenu';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'SidebarSubMenu' })
export class SidebarSubMenuPipe implements PipeTransform {
    transform(allMenu: SidebarMenu[], mainMenu: SidebarMenu) {
        return allMenu.filter(menu => menu.ParentModuleID === mainMenu.ModuleID);
    }
}
