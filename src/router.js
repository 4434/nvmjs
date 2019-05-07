import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Index from '@/views/home/Index';
import Login from '@/views/home/Login';
import Register from '@/views/home/Register';
import admin from '@/components/admin';

import articleWrite from '@/components/articleWrite';
import articleList from '@/components/articleList';
import ArticleDetail from '@/views/home/ArticleDetail';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [{
        path: '/',
        name: 'Index',
        component: Index
      },{
        path: '/admin',
        component: admin,
        children: [{
          path: '/articleWrite',
          name: 'articleWrite',
          component: articleWrite
        },{
          path: '/articleList',
          name: 'articleList',
          component: articleList
        }]
      },{
        path: '/ArticleDetail',
        name: 'ArticleDetail',                
        component: ArticleDetail
      }]
    },{
      path: '/Login',
      name: 'Login',
      component: Login,
    },{
      path: '/Register',
      name: 'Register',
      component: Register,
    }
  ]
});
