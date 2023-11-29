import './index.css'
import './app.css'

import App from './App.svelte'

const target = document.getElementById('app')

if (!target) {
  throw new Error('No element found by ID #app')
}

const app = new App({ target })

export default app
