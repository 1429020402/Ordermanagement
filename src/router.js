//引入
import Vue from 'vue'
import VueRouter from 'vue-router'
import enter from './views/Enter'
import main from './views/main'
// import {from} from 'core-js/fn/array'

import { Checktoken} from '@/api/apis'
Vue.use(VueRouter) //使用VueRouter插件

//new 暴露对象

var router = new VueRouter({
    //路由配置
    routes: [{
            path: '/',
            name: 'enter',
            component: enter,
        },
        {
            path: '/main',
            name: 'main',
            component: main,
            children: [{
                    path: '/main/index',
                    name: 'index',
                    component: () => import('./views/main/index.vue'),
                    //meta 自定义数据
                    meta:{Breadcrumb:['首页']}
                },
                {
                    path: '/main/Store',
                    name: 'Store',
                    component: () => import('./views/main/Store.vue'),
                    meta:{Breadcrumb:['店铺管理']}
                },
                {
                    path: '/main/Order',
                    name: 'Order',
                    component: () => import('./views/main/Order.vue'),
                    meta:{Breadcrumb:['订单管理']}
                },
                // Order-received
                {
                    path: '/main/Order-received',
                    name: 'Order-received',
                    component: () => import('./views/main/Order-received.vue'),
                    meta:{Breadcrumb:['销售统计','订单统计']}
                },
                //Personal_center
                {
                    path: '/main/Personal_center',
                    name: 'Personal_center',
                    component: () => import('./views/main/Personal_center.vue'),
                    meta:{Breadcrumb:['个人中心']}
                },
                //Product_classify
                {
                    path: '/main/Product_classify',
                    name: 'Product_classify',
                    component: () => import('./views/main/Product_classify.vue'),
                    meta:{Breadcrumb:['商品管理','商品分类']}
                },
                //Product_list
                {
                    path: '/main/Product_list',
                    name: 'Product_list',
                    component: () => import('./views/main/Product_list.vue'),
                    meta:{Breadcrumb:['商品管理','商品列表']}
                },
                //Product_add
                {
                    path: '/main/Product_add',
                    name: 'Product_add',
                    component: () => import('./views/main/Product_add.vue'),
                    meta:{Breadcrumb:['商品管理','商品添加']}
                },
                //Product_received
                {
                    path: '/main/Product_received',
                    name: 'Product_received',
                    component: () => import('./views/main/Product_received.vue'),
                    meta:{Breadcrumb:['销售统计','商品统计']}
                },
                //Add_account
                {
                    path: '/main/Add_account',
                    name: 'Add_account',
                    component: () => import('./views/main/Add_account.vue'),
                    meta:{Breadcrumb:['账号管理','账号添加']}
                },
                //Change_Password
                {
                    path: '/main/Change_Password',
                    name: 'Change_Password',
                    component: () => import('./views/main/Change_Password.vue'),
                    meta:{Breadcrumb:['账号管理','修改密码']}
                },
                //Account_list
                {
                    path: '/main/Account_list',
                    name: 'Account_list',
                    component: () => import('./views/main/Account_list.vue'),
                    meta:{Breadcrumb:['账号管理','账号列表']}
                },
                {
                    path: '/main/Personal_center',
                    name: 'Personal_center',
                    component: () => import('./views/main/Personal_center.vue'),
                    meta:{Breadcrumb:['个人中心']}
                },
            ]
        }
    ]
})
//路由拦截
//router.beforeEach 跳转之前
router.beforeEach((to, from,next) => {
    //判断是否到登录页面
    if (to.path != '/') {
        //判断用户是否登录
        Checktoken(localStorage.token).then(res => {

            if (res.data.code == 0) { //登录 下一步
                next()
            } else { //否则 跳到登录用户
                next('/')
            }
        })
    } else
        next()
})

export default router