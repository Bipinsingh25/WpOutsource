import { SidebarMenu } from './../../models/sidebarMenu';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'SidebarMenu' })
export class SidebarMenuPipe implements PipeTransform {
    transform(allMenu: SidebarMenu[]) {
        return allMenu.filter(menu => menu.ParentModuleID === 0);
    }
}
