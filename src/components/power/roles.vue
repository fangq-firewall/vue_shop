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

    <el-card>
      <el-row>
        <el-col>
          <el-Button type="primary">添加角色</el-Button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" style="width: 100%" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item,li) in scope.row.children"
              :key="item.id"
              :class="['bd_bottom',li === 0?'bd_top':'']"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRigtsById(scope.row,item.id)">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item1,li) in item.children"
                  :key="item1.id"
                  :class="[li===0?'':'bd_top']"
                >
                  <!--二级权限  -->
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="removeRigtsById(scope.row,item1.id)"
                    >{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!--三级权限  -->
                    <el-tag
                      closable
                      type="warning"
                      v-for="(item2,li) in item1.children"
                      :key="item2.id"
                      :class="[li===0?'':'bd_top']"
                      @close="removeRigtsById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="30%"
      @close="setRightDialogClose"
    >
      <!-- 权限的树形结构 -->
      <el-tree
        :data="rightList"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defkeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				// 存储角色列表数据
				rolesList: [],
				//控制分配权限对话的显示与隐藏
				setRightDialogVisible: false,
				//存储权限树的数据
				rightList: [],
				//设置权限树的默认属性
				defaultProps: {
					children: 'children',
					label: 'authName',
				},
				//树形结构默认选中的节点id
				defkeys: [],
				//保存正在操作角色的id
				roleId: '',
			}
		},
		created() {
			// 获取角色列表数据
			this.getRolesList()
		},
		methods: {
			//获取角色列表数据
			async getRolesList() {
				const { data: res } = await this.$http.get('roles')
				if (res.meta.status !== 200)
					return this.$message.error('获取角色列表失败')
				this.rolesList = res.data
				console.log(this.rolesList)
			},
			//根据id移出权限
			async removeRigtsById(role, right) {
				const confirmResult = await this.$confirm(
					'此操作将永久删除该权限, 是否继续?',
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).catch((err) => err)
				if (confirmResult === 'cancel') return this.$message.info('已取消删除')
				const { data: res } = await this.$http.delete(
					`roles/${role.id}/rights/${right}`
				)
				console.log(res)
				if (res.meta.status !== 200) return this.$message.error('删除失败')

				this.$message.success('删除成功')
				role.children = res.data
			},

			//分配权限按钮事件
			async showSetRightDialog(role) {
				//获取权限树形结构数据
				const { data: res } = await this.$http.get('rights/tree')
				if (res.meta.status !== 200) {
					return this.$message.error('获取权限树形结构数据失败')
				}
				this.$message.success('获取权限树形结构数据成功')
				//  console.log(res);
				this.rightList = res.data
				this.roleId = role.id
				this.getLeftKeys(role, this.defkeys)
				// console.log( this.defkeys);
				this.setRightDialogVisible = true
			},
			//获取当前角色所有的三级权限id，并存入defkeys中,当前node不包含children属性，则node为三级权限
			getLeftKeys(node, arr) {
				if (!node.children) return arr.push(node.id)
				//递归调用
				node.children.forEach((item) => {
					if (!item.children) return arr.push(item.id)
					this.getLeftKeys(item, arr)
				})
			},
			setRightDialogClose() {
				//当用户关闭树形权限对话框的时候，清除掉所有选中状态
				this.defkeys = []
			},
			//当用户在树形权限对话框中点击确定，将用户选择的权限发送请求进行更新
			async setRightDialogConfirm() {
				const keys = [
					...this.$refs.treeRef.getCheckedKeys(),
					...this.$refs.treeRef.getHalfCheckedKeys(),
				]
				const idStr = keys.join(',')
				//发送请求更新权限
				const { data: res } = await this.$http.post(
					`roles/${this.roleId}/rights`,
					{ rids: idStr }
				)
				if (res.meta.status !== 200) return this.$message.error('分配权限失败')

				this.$message.success('分配权限成功')
				this.getRolesList()
				//关闭对话框
				this.setRightDialogVisible = false
			},
		},
	}
</script>
<style lang="less" scoped>
	.el-tag {
		margin: 7px;
	}
	.bd_top {
		border-top: 1px solid #eee;
	}
	.bd_bottom {
		border-bottom: 1px solid #eee;
	}
</style>