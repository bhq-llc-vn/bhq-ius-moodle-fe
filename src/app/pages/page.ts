export interface MenuItem {
    id:number;
    title: string;
    icon: string;
    code: string;
    type: string;
    theme: string;
    path: string;
    class: string;
    children: MenuItem[];
}

export const menuCode = ['reportOne', 'user']

export const menuItem: MenuItem[] = [
    {
        id: 1,
        title: 'Trang chủ',
        code: 'home',
        icon: '',
        type: 'home',
        theme: 'outline',
        path: 'home',
        class: '',
        children: [],
    },
    {
        id: 2,
        title: 'Báo cáo 1',
        code: 'reportOne',
        icon: '',
        type: 'file',
        theme: 'outline',
        path: 'report-one',
        class: '',
        children: [],
    },
    {
        id: 3,
        title: 'Quản lý người dùng',
        code: 'user',
        icon: '',
        type: 'usergroup-add',
        theme: 'outline',
        path: 'user',
        class: '',
        children: [

        ],
    },


]