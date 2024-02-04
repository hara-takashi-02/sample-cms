import { createRouter, createWebHistory } from 'vue-router';

// 店舗情報
import BasicList from "./components/basic/BasicList";
import ShopList from "./components/shop/ShopList";
import MailList from "./components/mail/MailList";

// 管理者メニュー
import Template from "./components/master/Template";
import EditPage from "./components/master/EditPage";
import EditCss from "./components/master/EditCss";
import EditJs from "./components/master/EditJs";
import EditImg from "./components/master/EditImg";
import EditFront from "./components/master/EditFront";
import EditModel from "./components/master/EditModel";
import CreateUser from "./components/master/CreateUser";

window.Vue = require('vue').default;

const routes = [
    {
        path: '/',
        name: 'home',
        //component: homeComponent
    },
    {
        path: '/home/',
        name: 'home.list',
        //component: WorksListComponent,
        components: {
            //default: TaskListComponent,
            default: "",
            //works: WorksListComponent,
            //skills: SkillsListComponent,
            //products: ProductsListComponent,
            //profiles: ProfilesListComponent,
            //historys: HistorysListComponent,
        },
        redirect: '/home/main/shop'
        //props: true
    },

    /**
     * 店舗情報
     */
    /** basic */
    {
        path: '/home/main/basic',
        name: 'basic.list',
        component: BasicList
    },
    /** shop */
    {
        path: '/home/main/shop',
        name: 'shop.list',
        component: ShopList
    },
    /** mail */
    {
        path: '/home/main/mail',
        name: 'mail.list',
        component: MailList
    },

    /**
     * 管理者メニュー
     */
    {
        path: '/home/master/template',
        name: 'template.list',
        component: Template
    },
    {
        path: '/home/master/editPage',
        name: 'editPage.list',
        component: EditPage
    },
    {
        path: '/home/master/editCss',
        name: 'editCss.list',
        component: EditCss
    },
    {
        path: '/home/master/editJs',
        name: 'editJs.list',
        component: EditJs
    },
    {
        path: '/home/master/editImg',
        name: 'editImg.list',
        component: EditImg
    },
    {
        path: '/home/master/editFront',
        name: 'editFront.list',
        component: EditFront
    },
    {
        path: '/home/master/editModel',
        name: 'editModel.list',
        component: EditModel
    },
    {
        path: '/home/master/createUser',
        name: 'createUser.list',
        component: CreateUser
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;