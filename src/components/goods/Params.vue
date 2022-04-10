<template>
  <div>
    <!--  面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 提示框 -->
      <el-row>
        <el-col>
          <el-alert :closable="false" title="注意：只允许第三级分类设置相关参数" type="warning"></el-alert>
        </el-col>
      </el-row>
      <!--分类选择下拉  -->
      <el-row class="cat_opt">
        <el-col>
          <span class="cate_l">选择商品分类</span>
          <!-- 级联选择框 -->
          <el-cascader
            v-model="selectedCatekeys"
            :options="cateList"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- 页签 -->
      <el-tabs v-model="activeName" @tab-click="handletabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtndisable"
            @click="addDialogVisible=true"
          >添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag
                  closable
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  @close="handleClose(i,scope.row)"
                >{{item}}</el-tag>
                <!-- 输入框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <!-- 按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editDialog(scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deletParamsData(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtndisable"
            @click="addDialogVisible=true"
          >添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag
                  closable
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  @close="handleClose(i,scope.row)"
                >{{item}}</el-tag>
                <!-- 输入框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <!-- 按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editDialog(scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deletParamsData(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加动态参数，静态属性共用的对话框 -->
    <el-dialog
      :title="'添加'+titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiaForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑动态参数，静态属性共用的对话框 -->
    <el-dialog
      :title="'编辑'+titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParamsDate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				//保存商品分类数据
				cateList: [],
				//配置商品分类级联选择器
				cateProps: {
					value: 'cat_id',
					label: 'cat_name',
					children: 'children',
					expandTrigger: 'hover',
				},
				//保存级联选择器选中id
				selectedCatekeys: [],
				//页签激活的id
				activeName: 'many',
				//动态参数的数据
				manyTableData: [],
				//静态属性的数据
				onlyTableData: [],
				//添加参数对话框默认显示
				addDialogVisible: false,
				//编辑参数对话框默认显示
				editDialogVisible: false,
				//保存添加动态参数，静态属性的对话中的数据
				addForm: {
					attr_name: '',
				},
				//保存编辑动态参数，静态属性的对话中的数据
				editForm: {
					attr_id: 0,
					attr_name: '',
				},
				//添加动态参数，静态属性的对话框的验证规则
				addFormRules: {
					attr_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
				},
			}
		},
		created() {
			this.getCateList()
		},
		methods: {
			//获取商品分类数据
			async getCateList() {
				const { data: res } = await this.$http.get('categories')
				if (res.meta.status !== 200) {
					return this.$message.error('获取商品分类数据失败')
				}
				this.cateList = res.data
			},

			//级联选择器选中事件
			handleChange() {
				//如果用户选择的不是三级分类
				if (this.selectedCatekeys.length !== 3) {
					this.selectedCatekeys = []
					this.manyTableData = []
					this.onlyTableData = []
					return
				}
				console.log(this.selectedCatekeys)
				this.getParamsData()
			},
			//页签点击事件
			handletabClick() {
				console.log(this.activeName)
				this.getParamsData()
			},
			//获取参数列表的数据
			async getParamsData() {
				//根据所选分类id和面板获取对应参数
				const { data: res } = await this.$http.get(
					`categories/${this.cateId}/attributes`,
					{
						params: {
							sel: this.activeName,
						},
					}
				)
				if (res.meta.status !== 200) {
					return this.$message.error('获取参数列表失败')
				}
				res.data.forEach((element) => {
					element.attr_vals = element.attr_vals
						? element.attr_vals.split(' ')
						: []
					//控制文本框的显示于隐藏
					element.inputVisible = false
					//文本框中输入的值
					element.inputValue = ''
				})
				console.log(res.data)
				if (this.activeName === 'many') {
					this.manyTableData = res.data
				} else {
					this.onlyTableData = res.data
				}
			},
			//监听添加模态框关闭事件
			addDialogClose() {
				this.$refs.addFormRef.resetFields()
			},
			//监听编辑模态框关闭事件
			editDialogClose() {
				this.editForm.attr_name = ''
				this.editForm.attr_id = 0
			},
			//添加动态参数、静态属性
			async addDiaForm() {
				const { data: res } = await this.$http.post(
					`categories/${this.cateId}/attributes`,
					{
						attr_name: this.addForm.attr_name,
						attr_sel: this.activeName,
					}
				)
				if (res.meta.status !== 201) {
					return this.$message.error('添加' + this.titleText + '数据失败')
				}
				this.$message.success('添加' + this.titleText + '数据成功')
				console.log(res)
				this.getParamsData()
				this.addDialogVisible = false
			},
			//编辑按钮点击事件
			editDialog(obj) {
				this.editForm.attr_name = obj.attr_name
				this.editForm.attr_id = obj.attr_id
				this.editDialogVisible = true
			},
			//编辑动态参数、静态属性
			async editParamsDate() {
				const { data: res } = await this.$http.put(
					`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
					{ attr_name: this.editForm.attr_name, attr_sel: this.activeName }
				)

				if (res.meta.status !== 200) {
					return this.$message.error('编辑' + this.titleText + '数据失败')
				}
				this.$message.success('编辑' + this.titleText + '数据成功')

				this.getParamsData()
				this.editDialogVisible = false
			},
			//删除参数/属性
			async deletParamsData(attr_id) {
				const confirmResult = await this.$confirm(
					'此操作将永久删除该' + this.titleText,
					'删除提示',
					{
						confirmButtonText: '确任删除',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).catch((err) => err)
				if (confirmResult != 'confirm') {
					return this.$message.info('已经取消删除')
				}

				//没有取消就是要删除，发送请求完成删除
				const { data: res } = await this.$http.delete(
					`categories/${this.cateId}/attributes/${attr_id}`
				)

				if (res.meta.status !== 200) {
					return this.$message.error('删除参数数据失败')
				}
				this.$message.success('删除' + this.titleText + '数据成功')
				this.getParamsData()
			},
			//tag文本框的事件添加处理函数
			async handleInputConfirm(row) {
				if (row.inputValue.trim().length === 0) {
					row.inputValue = ''
					row.inputVisible = false
					return
				}
				row.attr_vals.push(row.inputValue.trim())
				row.inputValue = ''
				row.inputVisible = false
				//发起请求保存操作
				this.saveAttrVals(row)
			},

			//将attr_vals操作保存的数据库
			async saveAttrVals(row) {
				//发起请求保存操作
				const { data: res } = await this.$http.put(
					`categories/${this.cateId}/attributes/${row.attr_id}`,
					{
						attr_name: row.attr_name,
						attr_sel: row.attr_sel,
						attr_vals: row.attr_vals.join(' '),
					}
				)

				if (res.meta.status !== 200) {
					return this.$message.error('修改参数项失败')
				}

				this.$message.success('修改参数项成功')
			},
			//tag按钮的事件添加处理函数
			showInput(row) {
				row.inputVisible = true
				this.$nextTick((_) => {
					this.$refs.saveTagInput.$refs.input.focus()
				})
			},
			//删除对应的参数可选项
			handleClose(i, row) {
				row.attr_vals.splice(i, 1)
				this.saveAttrVals(row)
			},
		},

		computed: {
			//按钮启用返回true
			isBtndisable() {
				if (this.selectedCatekeys.length !== 3) {
					return true
				}
				return false
			},

			//当前选中的分类id
			cateId() {
				if (this.selectedCatekeys.length === 3) {
					return this.selectedCatekeys[2]
				}
				return null
			},
			//动态计算标题的文本
			titleText() {
				if (this.activeName == 'many') {
					return '动态参数'
				} else {
					return '静态属性'
				}
			},
		},
	}
</script>

<style lang="less" scoped>
	.cat_opt {
		margin: 15px 0;
		.cate_l {
			margin-right: 20px;
		}
	}
	.el-tag {
		margin: 10px;
	}

	.input-new-tag {
		width: 120px;
	}
</style>