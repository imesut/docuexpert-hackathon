import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  // Google app script correction (?)
  // target: document.getElementById('app'),
  target: document.body,
})

export default app
