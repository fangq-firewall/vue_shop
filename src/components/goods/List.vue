<template>
  <div>
    <!--  面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="95px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="125px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeGoods(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				//查询参数
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 10,
				},
				//保存商品列表信息
				goodsList: [],
				//总数据条数
				total: 0,
			}
		},
		created() {
			this.getGoodsList()
		},
		methods: {
			async getGoodsList() {
				//   根据分页获取对应的商品列表
				const { data: res } = await this.$http.get('goods', {
					params: this.queryInfo,
				})
				if (res.meta.status !== 200)
					return this.$message.error('获取商品列表失败')
				this.$message.success('获取商品列表成功')
				this.goodsList = res.data.goods
				this.total = res.data.total
				console.log(res.data)
			},
			handleSizeChange(newSize) {
				//当页号发生改变时，更改pagesize，重新请求
				this.queryInfo.pagesize = newSize
				this.getGoodsList()
			},
			handleCurrentChange(newSize) {
				//当页码发生改变时，更改pagesize，重新请求
				this.queryInfo.pagenum = newSize
				this.getGoodsList()
			},
			//根据id删除商品
			async removeGoods(id) {
				const confirmResult = await this.$confirm(
					'此操作将永久删除该商品, 是否继续?',
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).catch((err) => err)
				if (confirmResult != 'confirm') {
					return this.$message.info('已经取消删除')
				}
				//没有取消就是要删除，发送请求完成删除
				const { data: res } = await this.$http.delete(`goods/${id}`)

				if (res.meta.status !== 200) {
					return this.$message.error('删除商品失败')
				}

				this.$message.success('删除商品成功')
				this.getGoodsList()
			},
			goAddPage() {
				this.$router.push('/goods/add')
			},
		},
	}
</script>

<style lang="less" scoped>
</style>