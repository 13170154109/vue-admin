import '../../theme/index.css'
import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
// import '../element-variables.scss'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})