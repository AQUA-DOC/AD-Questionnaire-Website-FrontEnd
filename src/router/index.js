import { createRouter, createWebHistory } from 'vue-router'
import RedirectHome from '../views/RedirectHome.vue'
import RequestReportPage from '../views/RequestReportPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home-page',
            component: RedirectHome,
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