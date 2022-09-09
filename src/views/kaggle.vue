<template>
  <div class="main">
    <!-- 头部组件 -->
    <Header :navInfo="navInfo" :menuList="menuList" :class="{ showShadle: showShadle }" />
    <!-- banner部分 -->
    <Banner />
    <h3>Inside Kaggle you'll find all the code data you need to do your data science work.Use over 50,000 public datasets and 400,000 public notebooks to conquer any analysis in no time.</h3>
    <!-- 新闻卡片部分 -->
    <News :btnList="btnList" :cardInfo="cardInfo" />
    <!-- 信息分格展示 -->
    <ComInfo :comInfo="comInfo" />
    <!-- 卡片占位 -->
    <div class="bottom-card"></div>
    <!-- 加入我们 -->
    <div class="joinUs">
      <h3>Join our community of over 10.6 million</h3>
      <div><i class="el-icon-s-tools"></i>REGISTER WITH GOOGLE</div>
      <div>Register with Email</div>
    </div>
   <!-- 页面底部 -->
   <Footer :tableData="tableData"></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import News from './components/News.vue'
import ComInfo from './components/ComInfo.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Header,
    Banner,
    News,
    ComInfo,
    Footer,
},
  data() {
    return {
      //头部菜单部分数据
      navInfo: ['Competitions', 'Datasets', 'Code', 'Discussions', 'Courses'],
      //头部下拉按钮内容数据
      menuList: [{ list: ['User Rankings'] }, { list: ['Blog', 'Documentation ', 'Progression', 'Host a Competition', 'Support/Contact'] }, { list: ['Team Terms Privacy'] }],
      //控制滚动屏幕头部导航阴影
      showShadle: false,
      //btnList按钮数据
      btnList: ['Maintained by Kaggle', 'Starter Code', 'Finance Datasets', 'Linguistics Datasets', 'Data Visualization Kernels'],
      //卡片信息
      cardInfo: [
        { url: 'dataset-cover.jpg', info1: 'Financial Tweets', info2: 'David Wallach', info3: 'CSV Dataset | 50 upvotes' },
        { url: 'dataset-cover1.jpg', info1: 'Face Detection in Images', info2: 'DataTurks', info3: 'JSON Dataset | 68 upvotes' },
        { url: 'dataset-cover2.jpg', info1: 'Star Trek Scripts', info2: 'Gary Broughton', info3: 'JSON Dataset | 12 upvotes' },
        { url: 'dataset-cover3.jpg', info1: 'Avocado Prices ', info2: ' Justin Kiggins', info3: 'CSV Dataset | 546 upvotes' },
      ],
      //信息分格展示数据
      comInfo: [
        {
          url: 'https://storage.googleapis.com/kaggle-competitions/kaggle/3136/logos/thumb76_76.png',
          name: 'Titanic',
          describe: 'Start here!Predict survival on the Titanic and get familiar with Machine Learning basics',
        },
        {
          url: 'https://storage.googleapis.com/kaggle-competitions/kaggle/5407/logos/thumb76_76.png',
          name: 'House Prices',
          describe: 'Predict sales prices and practice feature engineering,RFs,and gradient boosting',
        },
        {
          url: 'https://www.kaggle.com/static/images/design/HomePage/deepLearning.png',
          name: 'Predict Future Sales',
          describe: 'Final project for "How to win a data science competition"Coursera course',
        },
        {
          url: 'https://www.kaggle.com/static/images/design/HomePage/ml.png',
          name: 'Digit Recognizer',
          describe: 'Learn computer vision fundamentals with the famous MNIST data',
        },
      ],
      // 底部table数据
      tableData: [
        {
          Product: 'Competitions',
          Documentation: 'Competitions',
          Company: 'Our Team ',
        },
        {
          Product: 'Datasets ',
          Documentation: 'Datasets',
          Company: 'Blog ',
        },
        {
          Product: 'Notebooks',
          Documentation: 'Notebooks',
          Company: 'Contact Us',
        },
        {
          date: 'Learn ',
          Documentation: 'Public API',
          Company: 'Host a Competition',
        },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 0) {
        this.showShadle = true
      } else {
        this.showShadle = false
      }
    },
  },
}
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  width: 100vw;

  .showShadle {
    transition: box-shadow 100ms linear 0s;
    box-shadow: -4px 5px 17px #666;
  }
  h3 {
    margin: 0;
    margin-bottom: 48px;
    padding: 0 64px;
    font-size: 28px;
    font-weight: 400;
    letter-spacing: -0.5px;
    line-height: 48px;
    color: rgb(32, 33, 36);
  }
  .bottom-card {
    position: relative;
    bottom: 0;
    height: 600px;
    background-color: #666;
    margin: 64px;
    box-shadow: 0px 3px 14px #666;
    transition: 0.3s;
  }
  .bottom-card:hover {
    bottom: -5px;
  }
  .joinUs {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 160px;
    h3 {
      font-size: 20px;
      line-height: 24px;
      font-weight: 700;
    }
    div:nth-of-type(1) {
      i {
        font-size: 20px;
        padding-right: 10px;
      }
      height: 48px;
      width: 251.27px;
      line-height: 48px;
      text-align: center;
      border: 1px solid transparent;
      border-radius: 32px;
      margin-bottom: 24px;
      box-shadow: 0 3px 5px 1px #b4b4b4;
      color: #666;
    }
    div:nth-of-type(1):hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
    div:nth-of-type(2) {
      height: 36px;
      width: 179px;
      line-height: 36px;
      text-align: center;
      border-radius: 32px;
      color: 202124;
    }
    div:nth-of-type(2):hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
  }
 
}
</style>
