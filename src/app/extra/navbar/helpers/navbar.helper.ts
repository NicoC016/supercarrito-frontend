import { IMenuItems, ParamsVisible } from "../models/menu-items.model";
import { IUserInfo } from "../models/user-info.model";

export const createNavbarMenuItems = (userInfo: IUserInfo, isLoggedUser:boolean): IMenuItems[] => {
    return baseMenuItems
    .map((item, index) => ({
        ...item,
        id:index,
        visible: item.visible({userInfo: userInfo, loggedUser: isLoggedUser})
    }));
};

const baseMenuItems = [
    { label: 'Inicio', icon: 'home', routerLink:'home', visible: () => true, active:true},
    { label: 'Iniciar sesión', icon: 'login',routerLink:'login', visible: (paramsVisible:ParamsVisible) => !paramsVisible.loggedUser,  active:false},
    { label: 'Empleados', icon: 'employeed', routerLink:'employeed',visible: (paramsVisible:ParamsVisible) => paramsVisible.userInfo?.role === 'admin' && paramsVisible.loggedUser, active:false},
    { label: 'Facturar', icon: 'bill', routerLink:'bill', visible: (paramsVisible:ParamsVisible) => paramsVisible.loggedUser, active:false},
    { label: 'Clientes', icon: 'clients',routerLink:'client', visible: (paramsVisible:ParamsVisible) => paramsVisible.userInfo?.role === 'admin' && paramsVisible.loggedUser, active:false},
    { label: 'Proveedores', icon: 'suppliers',routerLink:'suppliers', visible: (paramsVisible:ParamsVisible) => paramsVisible.userInfo?.role === 'admin' && paramsVisible.loggedUser, active:false},
    { label: 'Productos', icon: 'products',routerLink:'listProducts', visible: (paramsVisible:ParamsVisible) => paramsVisible.loggedUser, active:false},
    { label: 'Salir', icon: 'logout',routerLink:'logout', visible: (paramsVisible:ParamsVisible) => paramsVisible.loggedUser, active:false},
];

export const isDarkMode = (): boolean => {
	return document.body.classList.contains('dark');
}

export const getColorSchemaDefautl = () => {
	const browserDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const theme = localStorage.getItem('theme');
	if (theme !== null) {
		if (theme === 'dark') {
			return changeDarkMode(true);
		}
	} else if (browserDark) {
		changeDarkMode(true);
	}
}

export const changeDarkMode = (enableDark: boolean = false) => {
    const body = document.body;
	if (enableDark) {
  		return body.classList.add('dark');
	}
  	return body.classList.remove('dark');
}