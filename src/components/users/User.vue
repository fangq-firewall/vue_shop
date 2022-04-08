<template>
  <div>
    <!--  面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input el-col="8" placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="this.getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editUser(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="setRole(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagesize"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 添加用户弹框中的表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 修改用户弹窗的表单 -->
      <el-form :model="editForm" ref="editFormRef" :rules="editFormRules" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色分配对话框 -->
    <el-dialog title="角色分配" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
      <div>
        <p>当前的用户:{{userInfo.username}}</p>
        <p>当前的角色:{{userInfo.role_name}}</p>
        <p>
          分配新角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
	export default {
		data() {
			//自定义验证邮箱的规则
			let checkEmail = (rule, value, cb) => {
				//验证邮箱的正则表达式
				let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if (!emailReg.test(value)) {
					cb(new Error('请输入正确的邮箱'))
				}
				return cb()
			}
			//自定义验证手机号的规则
			let checkMobile = (rule, value, cb) => {
				//验证手机号的正则表达式
				let mobileReg = /^1[34578]\d{9}$/
				if (!mobileReg.test(value)) {
					cb(new Error('请输入正确的手机号'))
				}
				return cb()
			}

			return {
				//获取查询用户信息的参数
				queryInfo: {
					query: '',
					//当前页码
					pagenum: 1,
					//每页条数
					pagesize: 2,
				},
				//保存用户列表响应数据
				userList: [],
				total: 0,
				//控制添加用户对话框的显示与隐藏
				addDialogVisible: false,
				//控制修改用户对话框的显示与隐藏
				editDialogVisible: false,
				//控制角色分配话框的显示与隐藏
				setRoleDialogVisible: false,
				//保存正在分配的角色信息
				userInfo: {},
				//保存所有角色信息
				rolesList: [],
				//分配角色按钮中下拉选中角色的id
				selectedRoleId: '',
				//添加用户的表单信息
				addForm: {
					username: '',
					password: '',
					email: '',
					mobile: '',
				},
				//修改用户的表单信息
				editForm: {},
				//添加用户的校验规则
				addFormRules: {
					username: [
						{ required: true, message: '请输入用户名称', trigger: 'blur' },
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur',
						},
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{
							min: 6,
							max: 10,
							message: '长度在 6 到 10 个字符',
							trigger: 'blur',
						},
					],
					email: [
						{ required: true, message: '请输入用户名称', trigger: 'blur' },
						{ validator: checkEmail, trigger: 'blur' },
					],
					mobile: [
						{ required: true, message: '请输入用户名称', trigger: 'blur' },
						{ validator: checkMobile, trigger: 'blur' },
					],
				},
				//修改用户的校验规则
				editFormRules: {
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ validator: checkEmail, trigger: 'blur' },
					],
					mobile: [
						{ required: true, message: '请输入电话', trigger: 'blur' },
						{ validator: checkMobile, trigger: 'blur' },
					],
				},
			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			//查询用户列表数据
			async getUserList() {
				const { data: res } = await this.$http.get('users', {
					params: this.queryInfo,
				})
				// console.log(res);
				if (res.meta.status !== 200) return this.$message.error(this.meta.msg)
				this.userList = res.data.users
				this.total = res.data.total
			},
			//分页方法
			handleSizeChange(newSize) {
				// console.log(newSize)
				this.queryInfo.pagesize = newSize
				this.getUserList()
			},
			handleCurrentChange(current) {
				// console.log(newSize)
				this.queryInfo.pagenum = current
				this.getUserList()
			},
			//监听switch开关的状态
			async userStateChange(userInfo) {
				// console.log(userInfo);
				const { data: res } = await this.$http.put(
					`users/${userInfo.id}/state/${userInfo.mg_state}`
				)
				if (res.meta.status !== 200) {
					userInfo.mg_state = !userInfo.mg_state
					return this.$message.error('更新用户状态失败')
				}
				this.$message.success('更新用户状态成功！')
			},
			//监听添加用户对话框的关闭事件
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},
			//监听修改用户对话框的关闭事件
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
			},
			//点击确定按钮，添加新用户
			addUser() {
				this.$refs.addFormRef.validate(async (valid) => {
					if (!valid) return this.$message.error('请完善表单信息')
					const { data: res } = await this.$http.post('users', this.addForm)
					console.log(res)
					if (res.meta.status !== 201) return this.$message.error('添加用户失败')
					this.$message.success('添加用户成功！')
					this.addDialogVisible = false
					this.getUserList()
				})
			},
			//点击确定按钮修改用户
			async editUser(id) {
				this.editDialogVisible = true
				//根据id查询用户信息
				const { data: res } = await this.$http.get(`users/${id}`)
				if (res.meta.status !== 200)
					return this.$message.error('获取用户信息失败')
				this.editForm = res.data
			},
			//提交修改用户信息
			editUserInfo() {
				this.$refs.editFormRef.validate(async (valid) => {
					if (!valid) return this.$message.error('请完善表单信息')
					const { data: res } = await this.$http.put(
						'users/' + this.editForm.id,
						{
							email: this.editForm.email,
							mobile: this.editForm.mobile,
						}
					)
					console.log(res)
					if (res.meta.status !== 200)
						return this.$message.error('修改用户信息失败')
					this.editDialogVisible = false
					this.getUserList()
					this.$message.success('修改用户信息成功！')
				})
			},
			//根据id删除用户
			async removeUserById(removeId) {
				const confirm = await this.$confirm(
					'此操作将永久删除该用户, 是否继续?',
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).catch((err) => err)
				// console.log(confirm);
				if (confirm === 'cancel') return this.$message.info('已取消删除用户')
				const { data: res } = await this.$http.delete(`users/${removeId}`)
				if (res.meta.status !== 200) return this.$message.error('删除用户失败')
				this.$message.success('删除用户成功！')
				this.getUserList()
			},
			//角色分配按钮事件,获取用户角色信息
			async setRole(userInfo) {
				this.userInfo = userInfo
				const { data: res } = await this.$http.get(`roles`)
				if (res.meta.status !== 200)
					return this.$message.error('获取角色列表失败')
				this.rolesList = res.data
				this.setRoleDialogVisible = true
			},
			//点击按钮分配角色
			async saveRoleInfo() {
				const { data: res } = await this.$http.put(
					`users/${this.userInfo.id}/role`,
					{ rid: this.selectedRoleId }
				)
				console.log(res)
				if (res.meta.status !== 200) return this.$message.error('分配角色失败')
				this.$message.success('分配角色成功！')
				this.getUserList();
				this.setRoleDialogVisible = false
			},
			//监听对话框关闭事件
			setRoleDialogClosed() {
				//当关闭对话框的时候，重置下拉框中的内容
				this.selectedRoleId = ''
				this.userInfo = {}
			},
		},
	}
</script>

<style lang="less" scoped>
</style>