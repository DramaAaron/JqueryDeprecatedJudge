/*
 * @Author: Ning Li 471099989@qq.com
 * @Date: 2022-09-13 17:44:57
 * @LastEditors: Ning Li 471099989@qq.com
 * @LastEditTime: 2022-09-25 11:30:19
 * @FilePath: /test01/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// createApp(App).mount('#app')
const app = createApp(App);
app.use(router).mount('#app')
app.use(ElementPlus)
