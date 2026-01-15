import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RequestReportPage from '../views/RequestReportPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home-page',
            component: HomePage,
            props: route => ({})
        },
        {
            path: '/report-request',
            name: 'request-report-page',
            component: RequestReportPage,
            props: route => ({})
        }
    ]
})


export default router