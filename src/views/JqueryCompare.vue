<!--
 * @Author: Ning Li 471099989@qq.com
 * @Date: 2022-09-23 12:33:58
 * @LastEditors: Ning Li 471099989@qq.com
 * @LastEditTime: 2022-10-23 10:01:06
 * @FilePath: /test01/src/views/JqueryCompare.vue
 * @Description: 关于JqueryApi的版本升级给出的版本对比
-->
<template>
    <div class="container">
        <div class="title">Jquery Version Compare</div>
        <div class="choose flex">
            <div class="selectItem">Current Version
                <input v-model="currentversion" />
            </div>
            <div class="selectItem">To Version
                <input v-model="toversion" />
            </div>

        </div>
        <div class="result">
            <el-button class="result-button" @click="getResult">Get Result</el-button>
            <!-- <button @click="getResult">Get Result</button> -->
            <div class="flexcolumn">
                <el-table :data="depInfo" style="width: 100%">
                    <el-table-column prop="funName" label="Name" width="180" />
                    <el-table-column prop="version" label="Version" width="180" />
                    <el-table-column prop="subNote" label="Note" />
                    <el-table-column prop="webroot" label="link" />
                </el-table>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'JqueryCompare',
    props: {
        msg: String
    },
    data() {
        return {
            currentversion: '',
            toversion: '',
            depInfo: []
        }
    },
    methods: {
        judgeVersion(depVersion) {
            // let depVersionNum = parseInt(depVersion);
            // let fromNum = parseInt(this.currentversion);
            // let toNum = parseInt(this.toversion);
            //
            let major = parseInt(depVersion[0]);
            let minor = parseInt(depVersion.substring(2));
            console.log('major is' + major);
            console.log('minor is' + minor);
            const majorFrom = parseInt(this.currentversion[0]);
            const minorFrom = parseInt(this.currentversion.substring(2));
            const majorTo = parseInt(this.toversion[0]);
            const minorTo = parseInt(this.toversion.substring(2));

            // if(depVersionNum>fromNum && depVersionNum<=toNum){
            //     return true;
            // }else 
            if (major > majorFrom && major < majorTo) {
                //1.x-2.x-3.x
                return true;
            } else if (major === majorFrom && major <= majorTo) {
                // 1.5-1.10-3.0
                if (minor > minorFrom) {
                    return true;
                }
            } else if (major > majorFrom && major === majorTo) {
                // 1.x-2.x-2.x
                if (minor <= minorTo) {
                    return true;
                }

                return false;
            }
        },
        getResult() {
            console.log('current is' + this.currentversion + 'to is' + this.toversion);
            axios.get("./json/jqueryApi.json", {}).then(
                response => {
                    console.log(response);
                    for (let i = 0; i < response.data.length; i++) {
                        // 遍历 TAG
                        let info = response.data[i];
                        for (let i = 0; i < info.Tag.length; i++) {
                            if (info.Tag[i].indexOf('Deprecated') !== -1) {
                                console.log(info.Tag[i])
                                let depVersion = info.Tag[i].substring(info.Tag[i].length - 4).trim(); //    存在1.10四位的版本号
                                console.log('dep Version is ' + depVersion);
                                
                                // judege is between  choose versions
                                if (this.judgeVersion(depVersion)) {
                                    // depVersion>this.currentversion && depVersion<=this.toversion
                                    console.log('是他！')
                        
                                    this.depInfo.push({...info,['version']:depVersion});
                                    

                                }
                            }
                        }
                        console.log(this.depInfo)
                    }
                }
            )

        }
    }
}
</script>

<style scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
.choose{
    margin-top: 20px;
    margin-bottom: 20px;
}
.selectItem{
    margin-right: 10px;
}
.flexcolumn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.result{
    padding: 10px 10px 10px;
    border-radius: 10px;
}
.result-button{
        margin-bottom: 20px;
    }

.func {
    display: flex;

}

.element {
    margin-left: 10px;
}
</style>