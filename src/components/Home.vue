<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/heima.png" />
        <span>电商后台主页</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :width="iscollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+itemChildren.path "
              v-for="itemChildren in item.children"
              :key="itemChildren.id"
              @click="saveMenuState('/'+itemChildren.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{itemChildren.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <!-- 欢饮页占位 --> 
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      //控制左侧折叠变量
      iscollapse: false,
      //激活子菜单高亮值
      activePath: '',
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取左侧菜单数据
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    //折叠左侧菜单
    toggleCollapse() {
      this.iscollapse = !this.iscollapse
    },
    //点击二级菜单高亮
    saveMenuState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style lang="less" scoped>
	.home_container {
		height: 100%;
	}
	.el-header {
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		div {
			display: flex;
			align-items: center;
			color: #fff;
			span {
				margin-left: 15px;
			}
      img {
        border-radius: 50%;
        box-shadow:0 0 50px 20px #ccc
      }
		}
	}
	.el-aside {
		background-color: #333744;
		.el-menu {
			border-right: 0;
		}
		.toggle-button {
			background-color: #333744;
			color: #fff;
			font-size: 10px;
			text-align: center;
			cursor: pointer;
			letter-spacing: 0.2em;
			line-height: 24px;
		}
	}
	.el-main {
		background-color: #eaedf1;
	}
	.iconfont {
		margin-right: 10px;
	}
</style>