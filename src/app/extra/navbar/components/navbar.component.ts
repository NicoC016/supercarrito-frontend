import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItems } from '../models/menu-items.model';
import { changeDarkMode, createNavbarMenuItems, getColorSchemaDefautl, isDarkMode } from '../helpers/navbar.helper';
import { IUserInfo } from '../models/user-info.model';
import { SharedModule } from '@shared/shared.module';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})
export class NavbarComponent {
  	public menuItems: IMenuItems[] = [];
  	public isLoggedUser = false;
  	public user:string = '';
  	public isLogin = false;
  	public userInfo:IUserInfo = {role: '', email: ''};
  	public isOpen = false;
	public isDark = isDarkMode();
  	constructor(public router:Router){
 	}

 	ngOnInit() {
		getColorSchemaDefautl();
		const dataUser = localStorage.getItem('userData');
		this.isLoggedUser = dataUser !== null &&  dataUser !== '';
    	if( this.isLoggedUser && dataUser ){this.setDataLocalStorageLoggedUser(dataUser)};
		this.menuItems = createNavbarMenuItems(this.userInfo, this.isLoggedUser);
		const path = window.location.pathname.split('/')[1];
    	this.menuItems.forEach(item => item.active = item.routerLink === path);
  	}

	setDataLocalStorageLoggedUser(userInfo: string) {
      	this.userInfo = JSON.parse(userInfo !!);
      	this.user = this.userInfo?.email.split('@')[0];
	}

 	openMenuBurger(){
    	this.isOpen = !this.isOpen;
  	}

  	changeMenu(id:number, tab:string) {
    	this.menuItems.forEach(item => item.active = item.id === id);
		this.isOpen = false;
    	this.goTo(tab);
  	}

  	goTo(route:string){
		if(route === 'logout') {
			this.logout();
			this.router.navigate(['home']);
		}
      	this.router.navigate([route]);
  	}

  	logout(){
    	localStorage.removeItem('userData');
  	}

	toggleDark() {
    	this.isDark = isDarkMode();
		localStorage.setItem('theme', this.isDark ? 'light' : 'dark');
    	changeDarkMode(!this.isDark);
  	}
}
