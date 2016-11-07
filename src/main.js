import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import NotesPage from './components/pages/Notes'
import RecipesPage from './components/views/recipes/index'
import AuthPage from './components/pages/Auth'
import Auth from './data/Auth'

Vue.use(VueRouter)

let app = Vue.extend({
  components: { App }
})

let router = new VueRouter({
  history: true
})

router.map({
  '/notes': {
    name: 'notes',
    component: NotesPage,
    auth: true // this route requires the user to be signed in
  },
  '/recipes': {
    name: 'recipes',
    component: RecipesPage,
    auth: true
  },
  '/auth': {
    name: 'auth',
    component: AuthPage
  }
})

router.alias({
  '/': '/notes'
})

router.beforeEach((transition) => {
  if (transition.to.auth && !Auth.getAuth()) {
    transition.redirect('/auth')
  } else {
    transition.next()
  }
})

router.start(app, 'body')
