import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import article from "@/components/article";
import admin from "@/components/admin";
import articleWrite from "@/components/articleWrite";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: HelloWorld,
      children: [{
        path: "/",
        name: "article",
        component: article
      },{
        path: "/admin",
        name: "admin",
        component: admin,
        children: [{
          path: '/articleWrite',
          name: articleWrite,
          component: articleWrite
        }]
      }]
    }
  ]
});
