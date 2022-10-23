/*
 * @Author: Ning Li 471099989@qq.com
 * @Date: 2022-09-23 12:37:50
 * @LastEditors: Ning Li 471099989@qq.com
 * @LastEditTime: 2022-09-23 15:57:09
 * @FilePath: /test01/src/router/rourter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {createRouter, createWebHashHistory} from 'vue-router'
import InfoSecurityClass from '../views/InfoSecurityClass.vue'
import JqueryCompare from '../views/JqueryCompare.vue'
// export default new Router({
//     routes:[{
//         path: '/infosecurity',
//         component: InfoSecurityClass
//     }]
// })
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/infosecurity',
            component: InfoSecurityClass
        },
        {
            path: '/jquery',
            component: JqueryCompare
        }
    ]
})
export default router