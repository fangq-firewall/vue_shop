<template>
  <div class="main-banner">
    <!-- banner部分 -->
    <div class="banner">
      <div class="left">
        <div>Start with more than a blinking cursor</div>
        <div>Kaggle offers a no-setup, customizable, Jupyter Notebooks environment. Access GPUs at no cost to you and a huge repository of community published data & code.</div>
        <div><i class="el-icon-s-tools"></i>REGISTER WITH GOOGLE</div>
        <div>Register with Email</div>
      </div>
      <!-- 视频播放部分 -->
      <div class="video"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .main-banner{
    .banner {
    display: flex;
    justify-content: space-between;
    padding: 78px 64px 128px 64px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1.1;
      margin-right: 20px;
      div:nth-child(1) {
        color: rgb(32, 33, 36);
        font-size: 36px;
        line-height: 44px;
        font-weight: 400;
        margin-bottom: 16px;
      }
      div:nth-child(2) {
        color: rgba(0, 0, 0, 0.5);
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        margin-bottom: 32px;
      }
      div:nth-child(3) {
        i {
          font-size: 20px;
          padding-right: 10px;
        }
        height: 48px;
        line-height: 48px;
        text-align: center;
        width: 251.27px;
        border: 1px solid transparent;
        border-radius: 32px;
        margin-bottom: 24px;
        box-shadow: 0 3px 5px 1px #b4b4b4;
        color: #666;
      }
      div:nth-child(3):hover {
        background-color: #f1f1f1;
        cursor: pointer;
      }
      div:nth-child(4) {
      height: 36px;
      line-height: 36px;
      text-align: center;
      width: 179px;
      border-radius: 32px;
      color: 202124;
    }
    div:nth-child(4):hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
    }
    
    .video {
      flex: 2.5;
      background-color: pink;
      height: 558px;
      box-shadow: 0px 3px 14px #666;
    }
    .video:hover{
      cursor: pointer;
    }
  }
  }
</style>