<template>
  <div class="hello" id="class">
    <button @click="encodeSeq">Input sequence</button>
    <div class="flex">
      <div class="phrases">
        <div v-for="(item,index) in phrases" :key="index">
          {{item}}
        </div>
      </div>
      <div class="encodeNum">
        <div v-for="(item,index) in temp" :key="index">
          {{item}}
        </div>
      </div>
    </div>
    <button @click="translateSeq(temp)">Translate to Character</button>
    <div>
      {{translateBack}}
    </div>
    <button @click="encodeShift(temp,11)">ShiftEncode</button>
    <div>
      {{shiftCode}}
    </div>
    <button @click="cacCharaSum">统计字数</button>
    <button @click="cacaandb">求唯一解</button>
    <!-- <vue-canvas-poster :widthPixels="1000" :painting="painting" @success="success" @fail="fail">
    </vue-canvas-poster> -->
    <button @click="test">html2convas</button>
    <img class='screenshot' :src="imgUrl"/>
  </div>
</template>

<script>
import axios from 'axios';
import html2canvas from "html2canvas";
// import { VueCanvasPoster } from 'vue-canvas-poster'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    // VueCanvasPoster,
  },
  data() {
    return {
      count: 0,
      jquery355: {},
      jquery3514: {},
      painting: {
        width: '550px',
        height: '876px',
        background: '#f4f5f7',
        views: [
          // {
          //     type: 'image',
          //     url: require("@/assets/1launcher_bg@2x.png"),
          //     css: {
          //         top: '20px',
          //         left: '36px',
          //         borderRadius: '40px',
          //         width: '80px',
          //         height: '80px',
          //     },
          // }, 
          {
            type: 'text',
            text: '生日今朝是，万喜万般宜',
            css: [
              {
                top: '50px',
                textDecoration: 'overline',
                right: '30px',
                left: '30px',
                width: '614px',
                textAlign: 'center',
                fontSize: '40px',
                color: '#F8D98A'
              }
            ]
          },
        ],
      },
      dictionary: [
        { character: 'a', num: '0' },
        { character: 'b', num: '1' },
        { character: 'c', num: '2' },
        { character: 'd', num: '3' },
        { character: 'e', num: '4' },
        { character: 'f', num: '5' },
        { character: 'g', num: '6' },
        { character: 'h', num: '7' },
        { character: 'i', num: '8' },
        { character: 'j', num: '9' },
        { character: 'k', num: '10' },
        { character: 'l', num: '11' },
        { character: 'm', num: '12' },
        { character: 'n', num: '13' },
        { character: 'o', num: '14' },
        { character: 'p', num: '15' },
        { character: 'q', num: '16' },
        { character: 'r', num: '17' },
        { character: 's', num: '18' },
        { character: 't', num: '19' },
        { character: 'u', num: '20' },
        { character: 'v', num: '21' },
        { character: 'w', num: '22' },
        { character: 'x', num: '23' },
        { character: 'y', num: '24' },
        { character: 'z', num: '25' },

      ],
      phrases: [],
      temp: [],// 转换成数字编码的语句
      translateBack: '',
      shiftCode: '',
      imgUrl: ''

    }
  },
  methods: {
    test(){
      const scale =   window.devicePixelRatio;
      const item = document.querySelector("#class");
      console.log(item.offsetHeight)
      const ops ={
        scale,
        useCORS: true,
        allowTaint: false,
        width: item.offsetWidth,
        height: item.offsetHeight
      }
      html2canvas(document.querySelector("#class"),ops).then(canvas => {
      document.body.appendChild(canvas)
      const data = canvas.toDataURL("image/png")
      console.log(data)
      this.imgUrl = data;
});

    },
    success(src) {
      console.log(src)
    },
    fail(err) {
      console.log('fail', err)
    },
    dealWithDoc() {
      this.count++;
      axios.get("./json/jqueryDoc355.json", {})
        .then(response => {
          console.log(response)
          this.jquery355 = response.data
        })
      axios.get("./json/jqueryDoc3514.json", {})
        .then(response => {
          console.log(response)
          this.jquery3514 = response.data
        })
      console.log(this.jquery3514)
    },
    async requestDOC() {
      var result1 = await axios.get("./json/jqueryDoc355.json");

      this.jquery355 = await result1.data;
      var result2 = await axios.get("./json/jqueryDoc3514.json");
      this.jquery3514 = await result2.data;

      this.count++;
      console.log(this.jquery3514);
      // 比较
      // 获取所有版本
      // const meta = packagejson('Jquery',{allVersions: true});
      // console.log(meta);
    },
    /*
      *字符是否存在字典中的字符编码
    */
    judgeIsExistCharacter(c) {
      for (let i = 0; i < this.dictionary.length; i++) {
        if (c === this.dictionary[i].character) {
          return i + 1
        }
      }
      return -1
    },
    judgeNum(num) {
      console.log('处理 ' + num)
      let result = ''
      if (num.includes(',')) {
        let onlyNum = num.replace(/,/g, "");
        console.log('去掉，后为' + onlyNum);
        for (let i = 0; i < this.dictionary.length; i++) {
          if (onlyNum === this.dictionary[i].num) {
            result = result + this.dictionary[i].character + ',';
            return result
          }
        }
      } else {
        for (let i = 0; i < this.dictionary.length; i++) {
          if (num === this.dictionary[i].num) {
            result = result + this.dictionary[i].character;
            return result;
          }
        }
        result = result + num;
        return result;
      }
      return result;
    },
    judgeNumShift(num, K) {
      console.log('处理 ' + num)
      let result = ''
      if (num.includes(',')) {
        let onlyNum = num.replace(/,/g, "");
        let shiftNum = (parseInt(onlyNum) + K) % 26;
        shiftNum = shiftNum + '';
        console.log(shiftNum)
        console.log('Shift去掉，后为' + onlyNum);
        for (let i = 0; i < this.dictionary.length; i++) {
          if (shiftNum === this.dictionary[i].num) {
            result = result + this.dictionary[i].character + ',';
            return result
          }
        }
      } else {
        let shiftNum = (parseInt(num) + K) % 26;
        shiftNum = shiftNum + '';
        for (let i = 0; i < this.dictionary.length; i++) {
          if (shiftNum === this.dictionary[i].num) {
            result = result + this.dictionary[i].character;
            return result;
          }
        }
        result = result + num;
        return result;
      }
      return result;
    },
    setSeqtonum(inputSeq) {
      let inputSeqLow = inputSeq.toLowerCase();
      console.log('转换后的小写原文为' + inputSeqLow)
      let result = '';
      for (let i = 0; i < inputSeqLow.length; i++) {
        // console.log('处理的字符为'+inputSeqLow[i])
        if (inputSeqLow[i] === ' ') {
          result = result + ' ';
          console.log('space ' + result)
        } else if (this.judgeIsExistCharacter(inputSeqLow[i]) !== -1) {
          let tag = this.judgeIsExistCharacter(inputSeqLow[i]) - 1;
          result = result + ' ' + this.dictionary[tag].num
        } else {
          result = result + inputSeqLow[i]
        }

      }
      console.log('result is ' + result)
      return result
    },
    /**
     * @description: 将语句编译成数字编码格式
     * @return {*} 
     */
    encodeSeq() {
      let inputSeq = 'my name is li ning,and my student ID is 71255902039'
      let splirReuslt = inputSeq.split(' ');
      this.phrases = splirReuslt;
      // let finalResult = [];
      console.log(splirReuslt)
      for (let item in splirReuslt) {
        console.log(splirReuslt[item])
        let resultItem = this.setSeqtonum(splirReuslt[item])
        this.temp.push(resultItem)
      }
      console.log(this.temp)

    },
    /**
     * @description: 将数字编码格式翻译成英文
     * @param {*} list
     * @return {*} 
     */
    translateSeq(list) {
      for (let i = 0; i < list.length; i++) {
        // 将每个词语分割成每个字符
        let perNums = list[i].split(' ');
        console.log('perNums', perNums);

        let perPhrase = ''
        for (let j = 0; j < perNums.length; j++) {
          let perTranslateChar = this.judgeNum(perNums[j]);
          perPhrase = perPhrase + perTranslateChar;

        }
        console.log('翻译结果为' + perPhrase);
        this.translateBack = this.translateBack + perPhrase + ' ';
      }
      console.log(this.translateBack);
      return;
    },
    /**
     * @description: 位移加密
     * @param {*} numCodes
     * @return {*}
     */
    encodeShift(list, K) {
      for (let i = 0; i < list.length; i++) {
        // 将每个词语分割成每个字符
        let perNums = list[i].split(' ');
        console.log('ShiftperNums', perNums);

        let perPhrase = ''
        for (let j = 0; j < perNums.length; j++) {
          let perTranslateChar = this.judgeNumShift(perNums[j], K);
          perPhrase = perPhrase + perTranslateChar;

        }
        console.log('Shift翻译结果为' + perPhrase);
        this.shiftCode = this.shiftCode + perPhrase + ' ';

      }
      return;

    },

    cacCharaSum() {
      let password1 = 'KQEREJEBCPPCJCRKIEACUZBKRVPKRBCIBQCARBJCVFCUPKRIOFKPACUZQEPBKRXPEIIEABDKPBCPFCDCCAFIEABDKPBCPFEQPKAZBKRHAIBKAPCCIBURCCDKDCCJCIDFUIXPAFFERBICZDFKABICBBENEFCUPJCVKABPCYDCCDPKBCOCPERKIVKSCPICBRKIJPKABI';
      let obj = {};
      let password = password1.toLocaleLowerCase()
      let result = '';
      for (let i = 0; i < password.length; i++) {
         let key = password[i];
         console.log('加密字段：'+key)
         let num = this.judgeIsExistCharacter(key) - 1;
         console.log('find num is'+ num)
         num = (11*num+8)%26;
         console.log('shift num 是：'+num)
         let transChar = this.judgeNum(num+'');
         result = result + transChar

         console.log('result is',result);

          if (obj[key]) {
          //对象中有这个字母
            obj[key]++;
        }
        else {
          //对象中没有这个字母,把字母加到对象中
          obj[key] = 1;
        }
      }

      for (let key in obj) //遍历这个对象
      {
        console.log(key + "这个字母出现了" + obj[key] + "次");
      }

    },
    cacaandb() {
      let A=4;
      let B=19;
      for(let i=0;i<26;i++){
        for(let j=0;j<26;j++){
          if((A*i+j)%26===17 && (B*i+j)%26===13){
            console.log('i is'+i,'j is'+j);
          }
        }
      }
      console.log('end');
    },
  } // end methods

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.screenshot{
  width: 300px;
  height: 400px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
