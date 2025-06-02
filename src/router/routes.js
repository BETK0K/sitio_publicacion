const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/inicio' },
      {
        path: '/inicio',
        name: 'inicio',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/Tribunal_Superior/:eleccion_Id',
        name: 'MSJ',
        props: true,
        component: () => import('../modulos/MSJ/pages/IndexPage.vue'),
      },
      {
        path: '/Tribunal_SuperiorCards/:eleccion_Id',
        name: 'MSJcards',
        props: true,
        component: () => import('../modulos/MSJ/pages/CardsMSJPage.vue'),
      },
      {
        path: '/Tribunal_Disciplina/:eleccion_Id',
        name: 'MDJ',
        props: true,
        component: () => import('../modulos/MDJ/pages/IndexPage.vue'),
      },
      {
        path: '/Tribunal_DisciplinaCards/:eleccion_Id',
        name: 'MDJcards',
        props: true,
        component: () => import('../modulos/MDJ/pages/CardsMDJPage.vue'),
      },
      {
        path: '/Juezas_Jueces/:eleccion_Id',
        name: 'JUE',
        props: true,
        component: () => import('../modulos/JUE/pages/IndexPage.vue'),
      },
      {
        path: '/Juezas_JuecesCards/:eleccion_Id',
        name: 'JUEcards',
        props: true,
        component: () => import('../modulos/JUE/pages/CardsJUEPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
