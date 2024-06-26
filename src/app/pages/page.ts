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
        type: 'report',
        theme: 'outline',
        path: 'report-one',
        class: '',
        children: [],
    },
    {
        id: 3,
        title: 'Thiết lập',
        code: 'setting',
        icon: '',
        type: 'setting',
        theme: 'outline',
        path: 'setting',
        class: '',
        children: [
            {
                id: 31,
                title: 'Nhân viên',
                code: 'member_setting',
                icon: '',
                type: 'usergroup-add',
                theme: 'outline',
                path: 'member',
                class: '',
                children: [],
            },
            {
                id: 32,
                title: 'Nhóm',
                code: 'team_setting',
                icon: '',
                type: 'usergroup-add',
                theme: 'outline',
                path: 'team',
                class: '',
                children: [],
            },
            {
                id: 33,
                title: 'Nhóm quyền',
                code: 'role_setting',
                icon: '',
                type: 'key',
                theme: 'outline',
                path: 'roles-app',
                class: '',
                children: [],
            },
            {
                id: 34,
                title: 'Quyền',
                code: 'permission_setting',
                icon: '',
                type: 'key',
                theme: 'outline',
                path: 'permission',
                class: '',
                children: [],
            }

        ],
    },


]