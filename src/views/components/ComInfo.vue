<template>
  <div class="comInfo-main">
    <div class="comInfo">
      <div class="comHeader">
        <span>Competitions</span>
        <span>Join a competition to solve real-world machine learning problems</span>
      </div>
      <ul>
        <li v-for="(item, index) in comInfo" :key="index">
          <!-- 头像姓名部分 -->
          <div>
            <img :src="item.url" /> <span>{{ item.name }}</span>
          </div>
          <!-- 描述信息部分 -->
          <div>{{ item.describe }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['comInfo'],
}
</script>
<style lang="less" scoped>
.comInfo-main {
  .comInfo {
    padding: 0 64px;
    margin-top: 150px;
    .comHeader {
      margin-bottom: 40px;
      span:nth-child(1) {
        display: inline-block;
        height: 36px;
        line-height: 36px;
        padding: 0 24px;
        margin-right: 16px;
        color: #fff;
        background-color: rgb(32, 33, 36);
        border-radius: 20px;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
      }
      span:nth-child(2) {
        font-size: 20px;
        line-height: 24px;
        font-weight: 700;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      li {
        height: 136px;
        width: 267px;
        padding-right: 8px;
        border-right: 1px solid #ccc;
        list-style: none;
        div:nth-child(1) {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          img {
            height: 32px;
            width: 32px;
            margin-right: 12px;
            border-radius: 50%;
          }
          span {
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
          }
        }
        div:nth-child(2) {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          padding: 0 9px;
        }
      }
      li:nth-child(4) {
        border: 0;
      }
      li:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
