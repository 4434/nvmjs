import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: (resolve) => {require(['@/components/HelloWorld'], resolve)},
      children: [{
        path: '/',
        name: 'Index',
        component: (resolve) => {require(['@/views/home/Index'], resolve)}
      },{
        path: '/ArticleDetail',
        name: 'ArticleDetail',
        component: (resolve) => {require(['@/views/home/ArticleDetail'], resolve)}
      },{
        path: '/Info',
        name: 'Info',
        component: (resolve) => {require(['@/views/home/Info'], resolve)}
      }]
    },{
      path: '/admin',
      component: (resolve) => {require(['@/views/admin/admin'], resolve)},
      children: [{
        path: '/articleWrite',
        name: 'articleWrite',
        component: (resolve) => {require(['@/views/admin/articleWrite'], resolve)}
      },{
        path: '/articleList',
        name: 'articleList',
        component: (resolve) => {require(['@/views/admin/articleList'], resolve)}
      },{
        path: "/Time",
        name: "Time",
        component: (resolve) => {require(['@/views/develop/Time.vue'], resolve)}
      },{
        path: "/TreeTable",
        name: "TreeTable",
        component: (resolve) => {require(['@/views/develop/TreeTable.vue'], resolve)}
      },{
        path: "/Calendar",
        name: "Calendar",
        component: (resolve) => {require(['@/views/develop/Calendar.vue'], resolve)}
      },{
        path: "/Tank",
        name: "Tank",
        component: (resolve) => {require(['@/views/develop/Tank.vue'], resolve)}
      },{
        path: "/Snake",
        name: "Snake",
        component: (resolve) => {require(['@/views/develop/Snake.vue'], resolve)}
      },{
        path: "/keyGame",
        name: "keyGame",
        component: (resolve) => {require(['@/views/develop/keyGame.vue'], resolve)}
      },{
        path: "/Draw",
        name: "Draw",
        component: (resolve) => {require(['@/views/develop/Draw.vue'], resolve)}
      },{
        path: "/Echarts",
        name: "Echarts",
        component: (resolve) => {require(['@/views/admin/echarts/Echarts.vue'], resolve)}
      },{
        path: "/Statistics",
        name: "Statistics",
        component: (resolve) => {require(['@/views/admin/echarts/Statistics.vue'], resolve)}
      },{
        path: "/Three",
        name: "Three",
        component: (resolve) => {require(['@/views/admin/three/Three.vue'], resolve)}
      }]
    },{
      path: '/Login',
      name: 'Login',
      component: (resolve) => {require(['@/views/home/Login'], resolve)}
    },{
      path: '/Register',
      name: 'Register',
      component: (resolve) => {require(['@/views/home/Register'], resolve)}
    }
  ]
});
