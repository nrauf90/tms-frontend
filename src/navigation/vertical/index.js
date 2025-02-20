const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/SuperAdminHome',
      action: 'read',
      subject: 'home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Second Page',
      path: '/second-page',
      action: 'read',
      subject: 'user',
      icon: 'tabler:mail',
    },
    {
      path: '/acl',
      title: 'Access Control',
      action: 'read',
      subject: 'home',
      icon: 'tabler:shield',
    },
    {
      title: 'Users',
      icon: 'tabler:user',
      children: [
        {
          title: 'User List',
          action: 'read',
          subject: 'user',
          path: '/apps/user/list',
        },
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: 'tabler:settings',
      children: [
      {
        title: 'Roles',
        action: 'read',
        subject: 'role',
        path: '/apps/roles',
      },
      {
        title: 'Permissions',
        action: 'read',
        subject: 'permission',
        path: '/apps/permissions',
      }      
      ]
    },
    {
      title: 'Permission Groups',
      icon: 'fluent-mdl2:permissions-solid',
      action: 'read',
      subject: 'group',
      path: '/apps/groups',
    },
    {
      title : 'Settings',
      path: '/settings',
      action: 'read',
      subject: 'setting',
      icon : 'tabler:settings',
    },
    {
      title : 'Packages',
      path : '/apps/package',
      action: 'read',
      subject: 'package',
      icon : 'fluent-mdl2:packages',
    },
    {
      title : 'Companies',
      path: '/apps/companies',
      action: 'read',
      subject: 'company',
      icon : 'mdi:company',
    },
    {
      title: 'Company Settings',
      path: '/apps/companies/settings',
      action: 'write',
      subject: 'company',
      icon: 'ic:twotone-settings'
    },
    {
      title: 'Company Users',
      icon: 'ph:users-thin',
      action: 'read',
      subject: 'companyuser',
      path: '/apps/companyUsers'
    }
  ]
}

export default navigation
