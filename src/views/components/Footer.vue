<template>
  <div class="main-foot">
    <div class="footer">
      <div class="top">
        <div class="leftLogo">
          <img src="https://www.kaggle.com/static/images/site-logo.svg" alt="" />
          <span>Have an account?<i>Sign in</i></span>
        </div>
        <div class="rightMenu">
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Documentation</td>
                <td>Company</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :Key="index">
                <td>{{ item.Product }}</td>
                <td>{{ item.Documentation }}</td>
                <td>{{ item.Company }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="beian">© 2022 Kaggle Inc. | Terms | Privacy</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['tableData']
}
</script>

<style lang="less" scoped>
.main-foot {
  .footer {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    .top {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    display: flex;
    justify-content: space-between;
    background-color: #f8f8f8;
    padding: 112px 64px;
    .leftLogo {
      display: flex;
      flex-direction: column;
      padding-top: 20px;
      img {
        height: 45.86px;
        width: 128px;
        margin-bottom: 24px;
      }
      span {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: rgb(196, 201, 205);
        i {
          color: rgb(32, 190, 255);
        }
      }
    }
    .rightMenu {
      table {
        border-collapse: separate;
        border-spacing: 32px 20px;
        thead {
          font-size: 20px;
          line-height: 24px;
          font-weight: 700;
          td {
            width: 176px;
          }
        }
        tbody {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.7);

          td {
            width: 176px;
          }
        }
      }
    }
    .beian {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      background-color: #f8f8f8;
    }
  }
}
</style>
