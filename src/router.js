import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
/**
 *  前端页面
 */
import Index from '@/views/home/Index';
import Login from '@/views/home/Login';
import Register from '@/views/home/Register';
import ArticleDetail from '@/views/home/ArticleDetail';
/**
 *  后台操作页面
 */
import admin from '@/views/admin/admin';
import articleWrite from '@/views/admin/articleWrite';
import articleList from '@/views/admin/articleList';
/**
 *  小功能开发页面
 */
import Time from "@/views/develop/Time.vue";
import TreeTable from "@/views/develop/TreeTable.vue";
import Tank from "@/views/develop/Tank.vue";
import Calendar from "@/views/develop/Calendar.vue";
import Snake from "@/views/develop/Snake.vue";
import keyGame from "@/views/develop/keyGame.vue";
import Draw from "@/views/develop/Draw.vue";


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
      },{
        path: "/Time",
        name: "Time",
        component: Time,
      },{
        path: "/TreeTable",
        name: "TreeTable",
        component: TreeTable,
      },{
        path: "/Calendar",
        name: "Calendar",
        component: Calendar,        
      },{
        path: "/Tank",
        name: "Tank",
        component: Tank,        
      },{
        path: "/Snake",
        name: "Snake",
        component: Snake,        
      },{
        path: "/keyGame",
        name: "keyGame",
        component: keyGame,        
      },{
        path: "/Draw",
        name: "Draw",
        component: Draw,        
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
