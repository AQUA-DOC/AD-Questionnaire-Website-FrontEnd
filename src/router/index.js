import { createRouter, createWebHistory } from 'vue-router'
import RedirectHome from '../views/RedirectHome.vue'
import RequestReportPage from '../views/RequestReportPage.vue'
import BranchManagerQuestionnairePage from '../views/BranchManagerQuestionnairePage.vue'
import RegionalManagerQuestionnairePage from '../views/RegionalManagerQuestionnairePage.vue'
import FinanceTeamQuestionnairePage from '../views/FinanceTeamQuestionnairePage.vue'
import ClientCareTeamQuestionnairePage from '../views/ClientCareTeamQuestionnairePage.vue'

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
        },
        {
            path: '/branch-manager-questionnaire',
            name: 'branch-manager-questions-page',
            component: BranchManagerQuestionnairePage,
            props: route => ({})
        },
        {
            path: '/regional-manager-questionnaire',
            name: 'regional-manager-questions-page',
            component: RegionalManagerQuestionnairePage,
            props: route => ({})
        },
        {
            path: '/finance-team-questionnaire',
            name: 'finance-team-questions-page',
            component: FinanceTeamQuestionnairePage,
            props: route => ({})
        },
        {
            path: '/client-care-questionnaire',
            name: 'client-care-questions-page',
            component: ClientCareTeamQuestionnairePage,
            props: route => ({})
        }
    ]
})


export default router