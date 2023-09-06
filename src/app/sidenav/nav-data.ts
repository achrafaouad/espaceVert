import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [

    {
        routeLink: 'administration',
        icon: `fa fa-user`,
        label: 'Administration'
        ,items:[
          {
            routeLink: 'typography',
            label: 'les utilisateurs'
          },
          {
            routeLink: 'notifications',
            label: 'les notifications'
          },
          {
            routeLink: 'newEspace',
            label: 'Mes espaces'
          }
      
      ]
    },
    {
        routeLink: 'dashboard',
        icon: 'fa fa-map',
        label: 'La carte'
    },
    

];
