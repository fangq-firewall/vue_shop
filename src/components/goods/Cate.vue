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
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 分类表格  -->
      <tree-table
        class="treeTable"
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
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color:lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color:red;"></i>
        </template>

        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" ref="addFormRef" width="50%" @close="resetAddCateForm">
      <!-- 带有验证规则的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- 级联选择框 -->
          <el-cascader
            expandTrigger="hover"
            v-model="selectedKeys"
            :options="parentCatelogList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
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
				//控制添加分类对话框的显示隐藏
				addDialogVisible: false,
				//添加分类对话框中的表单数据
				addCateForm: {
					cat_name: '',
					cat_pid: 0,
					cat_level: 0,
				},
				//添加分类对话框中的表单数据的验证规则
				addCateFormRules: {
					cat_name: [
						{ required: true, message: '请输入分类名称', trigger: 'blur' },
						{
							min: 2,
							max: 10,
							message: '长度在 2 到 10 个字符',
							trigger: 'blur',
						},
					],
				},
				//父级分类的列表
				parentCatelogList: [],
				//级联选择框中的数据
				selectedKeys: [],
				//级联选择框子选项的数据显示规则
				cascaderProps: {
					value: 'cat_id',
					label: 'cat_name',
					children: 'children',
					expandTrigger: 'hover',
				},
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
			//监听pageSize的变化
			handleSizeChange(newPage) {
				this.queryInfo.pagesize = newPage
				this.getCateList()
			},
			//监听当且页变化
			handleCurrentChange(newPage) {
				this.queryInfo.pagenum = newPage
				this.getCateList()
			},
			//添加分类按钮点击事件
			showAddCateDialog() {
				this.getParentCateList()
				this.addDialogVisible = true
			},
			//获取父级分类的列表数据
			async getParentCateList() {
				const { data: res } = await this.$http.get('categories', {
					params: {
						type: 2,
					},
				})
				if (res.meta.status !== 200) {
					return this.$message.error('获取商品分类列表数据失败')
				}
				this.parentCatelogList = res.data
				// console.log(this.parentCatelogList)
			},
			//级联选择框中的数据发生变化
			parentCateChange() {
				console.log(this.selectedKeys)
				if (this.selectedKeys.length > 0) {
                    this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
                    this.addCateForm.cat_level = this.selectedKeys.length 
					return
				}else{
                    this.addCateForm.cat_pid = 0
				    this.addCateForm.cat_level = 0
                    return
                }
			},
            //监听关闭分类对话框的事件，重置表单
            resetAddCateForm () {
                this.$refs.addCateFormRef.resetFields()
                 this.selectedKeys = [];
                 this.addCateForm.cat_pid = 0
                 this.addCateForm.cat_level = 0
            
            },
            //提交添加分类表单中的数据
            addCate(){
                this.$refs.addCateFormRef.validate(async (valid) => {
                    if(!valid){
                        this.$message.error('请按要求填写表单')
                        return
                    }
                    const { data: res } = await this.$http.post('categories', this.addCateForm)
                    if(res.meta.status !== 201){
                        return this.$message.error('添加分类失败')
                    }
                    this.$message.success('添加分类成功')
                    this.getCateList()
                    this.addDialogVisible = false
                })
            }
		},
	}
</script>

<style lang="less" scoped>
	.treeTable {
		margin-top: 10px;
	}
	.el-cascader {
		width: 100%;
	}
</style>

