import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Index from '@/views/home/Index';
import Login from '@/views/home/Login';
import Register from '@/views/home/Register';
import ArticleDetail from '@/views/home/ArticleDetail';

import admin from '@/views/admin/admin';
import articleWrite from '@/views/admin/articleWrite';
import articleList from '@/views/admin/articleList';

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
        path: '/ArticleDetail',
        name: 'ArticleDetail',
        component: ArticleDetail
      }]
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
