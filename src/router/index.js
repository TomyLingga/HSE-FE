import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue'),
    redirect:'signin',
    children:[
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta:{
          guestOnly:true,
        }
      },
      {
        path: '/signin',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta:{
          guestOnly:true,
        }
      },
      {
        path: '/dash',
        name: 'Dash',
        component: () => import(/* webpackChunkName: "about" */ '../views/dash/index.vue'),
        meta:{
          guestOnly:true,
        }
      },
    ]
  },

  {
    path:'/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main_View.vue'),
    redirect:'signin',
    children:[

      // Super Admin Role
      {
        path: '/accesshome',
        name: 'AccessHome',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
        meta: {
          requireAuth: true,
          admin: true
				}
      },

      // Admin Role
      {
        path: '/homeuser',
        name: 'HomeUser',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
        meta: {
          requireAuth: true,
          user: true
				}
      },

      // User Role
      {
        path: '/beranda',
        name: 'Beranda',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
        meta: {
          requireAuth: true,
          dst: true
				}
      },

      {
        path: '/',
        name: 'WorkProgram',
        component: () => import(/* webpackChunkName: "about" */ '../views/rekap/index.vue'),
        children:[

          // Super Admin Role ===========================================================================
          {
            path: '/activity',
            name: 'Activity',
            component: () => import(/* webpackChunkName: "about" */ '../views/rekap/activity.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },
          {
            path: '/schedule',
            name: 'Schedulle',
            component: () => import(/* webpackChunkName: "about" */ '../views/rekap/jadwal.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },
          {
            path: '/present',
            name: 'Presentation',
            component: () => import(/* webpackChunkName: "about" */ '../views/gambar/index.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },
          {
            path: '/card',
            name: 'Card',
            component: () => import(/* webpackChunkName: "about" */ '../views/kartu/index.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },
          {
            path: '/user',
            name: 'UserAdministrator',
            component: () => import(/* webpackChunkName: "about" */ '../views/user/index.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },

          // Admin Role ==================================================================================
          {
            path: '/activities',
            name: 'Activities',
            component: () => import(/* webpackChunkName: "about" */ '../views/rekap/activity.vue'),
            meta: {
              requireAuth: true,
              user: true
            }
          },
          {
            path: '/schedules',
            name: 'Schedules',
            component: () => import(/* webpackChunkName: "about" */ '../views/rekap/jadwal.vue'),
            meta: {
              requireAuth: true,
              user: true
            }
          },
          {
            path: '/cards',
            name: 'Cards',
            component: () => import(/* webpackChunkName: "about" */ '../views/kartu/index.vue'),
            meta: {
              requireAuth: true,
              user: true
            }
          },
          {
            path: '/presents',
            name: 'Presentations',
            component: () => import(/* webpackChunkName: "about" */ '../views/gambar/index.vue'),
            meta: {
              requireAuth: true,
              user: true
            }
          },
        ]
      },
      {
        path: '/',
        name: 'Observation',
        component: () => import(/* webpackChunkName: "about" */ '../views/observasi/index.vue'),
        children:[

          // Super Admin Role
          {
            path: '/m_observation',
            name: 'MasterObservation',
            component: () => import(/* webpackChunkName: "about" */ '../views/observasi/master.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },
          {
            path: '/my_observation',
            name: 'MyObservation',
            component: () => import(/* webpackChunkName: "about" */ '../views/observasi/observasi.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },
          {
            path: '/report_observation',
            name: 'ReportObservation',
            component: () => import(/* webpackChunkName: "about" */ '../views/observasi/report.vue'),
            meta: {
              requireAuth: true,
              admin: true
            }
          },

          // Admin Role
          {
            path: '/m_observations',
            name: 'MasterObservations',
            component: () => import(/* webpackChunkName: "about" */ '../views/observasi/master.vue'),
            meta: {
              requireAuth: true,
              user: true
            }
          },
          {
            path: '/my_observations',
            name: 'MyObservations',
            component: () => import(/* webpackChunkName: "about" */ '../views/observasi/observasi.vue'),
            meta: {
              requireAuth: true,
              user: true
            }
          },
          {
            path: '/report_observations',
            name: 'ReportObservations',
            component: () => import(/* webpackChunkName: "about" */ '../views/observasi/report.vue'),
            meta: {
              requireAuth: true,
              user: true
            }
          },

          // User Role
          {
            path: '/temuan',
            name: 'TemuanKu',
            component: () => import(/* webpackChunkName: "about" */ '../views/observasi/observasi.vue'),
            meta: {
              requireAuth: true,
              dst: true
            }
          },
        ]
      },
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.matched.some((record) => record.meta.requireAuth)) {
  //   const token = localStorage.getItem('usertoken') != null;
  //   if (!token) {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('usertoken');
  //     localStorage.removeItem('roles');
  //     next({path: '/signin', query: {redirect: to.fullPath}});
  //   } else {
  //     const user = JSON.parse(localStorage.user);
  //     const roles = user.role;

  //     if (to.matched.some((record) => record.meta.admin)) {
  //       if (roles != 'admin' && roles == '') {
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('user');
  //         localStorage.removeItem('usertoken');
  //         localStorage.removeItem('roles');
  //         next({path: '/signin', query: {redirect: to.fullPath}});
  //       } else {
  //         next();
  //       }
  //     } else if (to.matched.some((record) => record.meta.user)) {
  //       if (roles != 'user' && roles == '') {
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('user');
  //         localStorage.removeItem('usertoken');
  //         localStorage.removeItem('roles');
  //         next({path: '/signin', query: {redirect: to.fullPath}});
  //       } else {
  //         next();
  //       }
  //     } else {
  //       if (roles != 'dst' && roles == '') {
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('user');
  //         localStorage.removeItem('usertoken');
  //         localStorage.removeItem('roles');
  //         next({path: '/signin', query: {redirect: to.fullPath}});
  //       } else {
  //         next();
  //       }
  //     }
  //   }
  // } else {
  //   const token = localStorage.getItem('usertoken');
  //   if (token == null) {
  //     next();
  //   } else {
  //     next({path: '/signin', query: {redirect: to.fullPath}});
  //   }
  // }


  const token = localStorage.getItem('usertoken') != null;
  const user = JSON.parse(localStorage.getItem('user'));
  let roles;
  if (token) {
    roles = user.role;
  } else {
    roles = null;
  }
  if (to.matched.some((record) => record.meta.requireAuth)) {
    console.log(user)
    console.log(localStorage.getItem('usertoken'))
    if (token) {
      if (roles == 'admin') {
        if (to.matched.some((record) => record.meta.admin)) {
          next();
        } else {
          next('/accesshome');
        }
      } else if (roles == 'user') {
        if (to.matched.some((record) => record.meta.user)) {
          next();
        } else {
          next('/homeuser');
        }
      } else {
        if (to.matched.some((record) => record.meta.dst)) {
          next();
        } else {
          next('/beranda');
        }
      }
    } else {
      next('/signin');
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    if (token) {
      if (roles == 'admin') {
        next('/accesshome');
      } else if (roles == 'user') {
        next('/homeuser');
      } else {
        next('/beranda');
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
