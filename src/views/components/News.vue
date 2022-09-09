<template>
  <div class="main-news">
    <div class="news">
      <div class="btnList">
        <ul>
          <li v-for="(item, index) in btnList" :key="index">
            <span><i class="el-icon-s-unfold" />{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <ul>
          <li v-for="(item, index) in cardInfo" :key="index">
            <img :src="require('@/assets/imgs/' + item.url)" />
            <span>{{ item.info1 }}</span>
            <span>{{ item.info2 }}</span>
            <span>{{ item.info3 }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['btnList', 'cardInfo'],
}
</script>
<style lang="less" scoped>
.main-news {
  .news {
    padding: 0 64px;
    .btnList ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0;
      li {
        height: 32px;
        line-height: 32px !important;
        margin: 0 8px 16px 0;
        padding: 0 12px;
        font-size: 14px;
        line-height: 20px;
        list-style: none;
        border: 1px solid #ccc;
        border-radius: 20px;
        i {
          margin-right: 15px;
        }
      }
      li:hover {
        cursor: pointer;
      }
    }
    .card {
      ul {
        display: flex;
        justify-content: space-around;
        padding: 0;
      }
      li {
        width: 276px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        list-style: none;
        img {
          height: 128px;
          width: 276px;
          border-radius: 10px;
          margin-bottom: 12px;
        }
        span:nth-child(2) {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: rgb(32, 33, 36);
        }
        span:nth-child(3) {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.5);
          margin-bottom: 16px;
        }
        span:nth-child(4) {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          color: rgb(32, 33, 36);
        }
      }
      li:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
