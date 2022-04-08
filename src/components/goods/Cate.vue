<template>
  <div>
    <!--  面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 添加分类按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 分类表格  -->
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
      <!-- 是否有效 -->
      <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen;"></i>
          <i class="el-icon-error" v-else style="color:red;"></i>
      </template>

      <!-- 排序 -->
      <template slot="order" slot-scope="scope">
          <el-tag>一级</el-tag>
          <el-tag>二级</el-tag>
          <el-tag>三级</el-tag>
      </template>
      </tree-table>
      <!-- 分页 -->
    </el-card>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				//商品分类数据
				cateList: [],
				//查询分类数据的条件
				queryInfo: {
					type: 3,
					pagenum: 1,
					pagesize: 5,
				},
				//保存数据总条数
				total: 0,
				//表格中列的配置信息
				columns: [
					{ label: '分类名称', prop: 'cat_name' },
					{
						label: '是否有效',
						type: 'template',
						template: 'isok',
					},
                    {
						label: '排序',
						type: 'template',
						template: 'order',
					},
				],
			}
		},
		created() {
			this.getCateList()
		},
		methods: {
			//获取商品分类数据
			async getCateList() {
				//发送请求
				const { data: res } = await this.$http.get('categories', {
					params: this.queryInfo,
				})
				if (res.meta.status !== 200) {
					return this.$message.error(res.meta.msg)
				}
				this.cateList = res.data.result
				console.log(this.cateList)
				this.total = res.data.total
			},
		},
	}
</script>

<style lang="less" scoped>
</style>

