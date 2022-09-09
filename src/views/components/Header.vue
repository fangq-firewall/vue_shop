<template>
  <div class="main-header">
    <div class="header">
      <div class="header-left">
        <div class="logo">
          <img src="https://www.kaggle.com/static/images/site-logo.svg" alt="logo" />
        </div>
        <ul class="navList">
          <li v-for="(item, index) in navInfo" :key="index">{{ item }}</li>
          <li>
            <!-- 弹出按钮 -->
            <el-popover placement="right" width="256" trigger="click" style="padding: 0;">
              <div class="menuList">
                <ul>
                  <li v-for="(item, index) in menuList" :key="index">
                    <span v-for="(item1, index) in item.list" :key="index">{{ item1 }}</span>
                  </li>
                </ul>
              </div>
              <el-button slot="reference" style="font-size: 35px">···</el-button>
            </el-popover>
          </li>
        </ul>
      </div>
      <div class="header-right">
        <div class="serach">
          <input type="text" placeholder="Search"><span class="el-icon-search"></span>
        </div>
        <div class="sign" @click="sign">Sign In</div>
        <div class="login">Register</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { Popover,Icon } from 'element-ui'
Vue.use(Popover)
Vue.use(Icon)
export default {
  props:['navInfo','menuList'],
  methods: {
    sign(){
      this.$router.push('/login')
    }
  }

}
</script>
<style lang="less" scoped>
  .main-header {
    position: fixed;
    margin: 0 auto;
    background: #fff;
    width: 100vw;
    z-index: 999;
    li {
      list-style: none;
    }
    .header {
      height: 78px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 64px;
      &-left {
        display: flex;
        align-items: center;
        .navList {
          display: flex;
          justify-content: space-between;
          align-items: center;
          li {
            padding: 0 12px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.7);
            text-align: center;
            font-family: inherit;
            font-style: inherit;
            font-variant: inherit;
            font-weight: inherit;
            vertical-align: baseline;
           
          }
          li:hover{
            cursor: pointer;
          }
          /deep/.el-button {
            height: 48px;
            width: 48px;
            border: transparent !important;
            background-color: #fff;
            span {
              position: relative;
              left: -7px;
              top: -5px;
              height: 100%;
              width: 100%;
              letter-spacing: -6px
            }
            &:hover {
              background-color: #e7eaed;
              border-radius: 50%;
            }
          }
        }
  
        .logo {
          img {
            width: 82px;
          }
        }
      }
      &-right{
        display: flex;
        align-items: center;
        input{
          height: 48px;
          width: 136px;
          font-size: 14px;
          color: rgb(32, 33, 36);
          padding-left: 64px;
          border: 1px solid rgb(218, 220, 224);
          border-radius: 24px;
        }
        span{
          font-weight: 600px;
          position: relative;
          left: -174px;
          top: 2px;
        }
        /deep/.el-icon-search:before{
          font-weight: 800;
        }
        .sign{
          height: 36px;
          line-height: 36px;
          margin-right: 20px;
          padding: 0 24px;
          white-space: nowrap;
          width: fit-content;
          font-weight: 700;
          font-weight: 700;
          color: rgb(32, 33, 36);
          border-radius: 20px;
        }
        .sign:hover{
          background-color: #f0f3f4;
          cursor: pointer;
        }
        .login{
          height: 36px;
          line-height: 36px;
          padding: 0 24px;
          white-space: nowrap;
          width: fit-content;
          font-weight: 700;
          font-weight: 700;
          color:#fff;
          border-radius: 20px;
          background-color: #202124;
          box-shadow: -4px 5px 10px #f0f3f4;
        }
        .login:hover{
          cursor: pointer;
          box-shadow: 1px 6px 8px #ccc;
        }
        
      }
    }
  }
  .menuList {
    li {
      display: flex;
      flex-direction: column;
      padding: 5px 20px ;
      border-bottom: 1px solid #ccc;
      span{
        padding: 5px 20px ;
      }
    }
    li>span:hover{
      background-color: #f0f3f4;
    }
    ul {
      padding: 0;
    }
  }
  li:nth-child(3){
    border: 0;
  }
  
  </style>
  <style lang="less">
  .el-popover {
    padding: 0;
  }
  </style>
  