import Vue from 'vue'
import VueRouter from 'vue-router'
import usersIndex from '../views/users/Index.vue'
import adminsIndex from '../views/admin/Index.vue'
import Home from '../views/Home.vue';
import Login from '../views/users/auth/Login.vue'
import Signup from '../views/users/auth/Signup.vue'
import CoursesIndex from '../views/users/courses/Index.vue'
import Dashboard from '../views/users/courses/Dashboard.vue'
import AdminCourses from '../views/admin/courses/Index.vue'
import AdminCategories from '../views/admin/categories/Index.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'usersIndex',  
    components: {
      default: usersIndex,
      'users-view': usersIndex
    },
    children:[
        {
            path: '',
            component: CoursesIndex,
            name: 'coursesIndex'  
        },
        {
            path: 'dashboard',
            component: Dashboard,
            name: 'dashboard',
            beforeEnter: (to, from, next) => {
                if(store.getters.isAuth){
                    return next();
                }
                next('/login');
            }  
        },
        {
            path: "login",
            component: Login,
            name: 'login',
            beforeEnter: (to, from, next) => {
                if(!store.getters.isAuth){
                    return next();
                }
                next('/');
            }
        },
        {
            path: "signup",
            component: Signup,
            name: 'signup',
            beforeEnter: (to, from, next) => {
                if(!store.getters.isAuth){
                    return next();
                }
                next('/');
            } 
        }
    ]
  },
  {
    path: '/admin',
    name:'adminIndex',
    beforeEnter: (to, from, next) => {
        if(store.getters.isAuth && store.getters.isAdmin){
            return next();
        }
        next('/');
    },
    components: {
      default: adminsIndex,
      'admins-view': adminsIndex,
    },
    children:[
        {
            path:'courses',
            component: AdminCourses,
            name: 'AdminCourses'
        },
        {
            path:'categories',
            component: AdminCategories,
            name: 'AdminCategories'
        }

    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
