<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="130px">
          <el-form-item label="用户ID" prop="id">
            <el-input v-model="queryParams.id" placeholder="用户ID" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用户账号" prop="username">
            <el-input v-model="queryParams.username" placeholder="用户账号" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="queryParams.nickname" placeholder="用户昵称" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="会员等级" prop="memberLevel">
            <el-select v-model="queryParams.memberLevel" placeholder="全部" style="width: 240px" @keyup.enter="handleQuery">
              <el-option v-for="dict in levelSelectionData" :key="dict.code" :label="dict.name" :value="parseInt(dict.code)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员分组" prop="groupId">
            <el-select v-model="queryParams.groupId" placeholder="全部" style="width: 240px" @keyup.enter="handleQuery">
              <el-option v-for="dict in groupSelectionData" :key="dict.code" :label="dict.name" :value="parseInt(dict.code)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="queryParams.email" placeholder="邮箱" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="queryParams.phone" placeholder="手机号" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="上级用户" prop="inviterName">
            <el-input v-model="queryParams.inviterName" placeholder="上级用户" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="推广码" prop="inviteCode">
            <el-input v-model="queryParams.inviteCode" placeholder="推广码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <el-input v-model="queryParams.ip" placeholder="注册\注册 IP" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="设备码" prop="deviceCode">
            <el-input v-model="queryParams.deviceCode" placeholder="设备码" clearable style="width: 240px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="冻结状态" prop="isFreeze">
            <el-select v-model="queryParams.isFreeze" placeholder="全部" clearable style="width: 240px">
              <el-option key="0" label="正常" :value="0" />
              <el-option key="1" label="冻结" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态" prop="enable">
            <el-select v-model="queryParams.enable" placeholder="全部" clearable style="width: 240px">
              <el-option key="0" label="停用" :value="0" />
              <el-option key="1" label="启用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否测试" prop="isFaker">
            <el-select v-model="queryParams.isFaker" placeholder="全部" clearable style="width: 240px">
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="软删除标识" prop="del">
            <el-select v-model="queryParams.del" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="IPO自动扣款" prop="ipoAutomaticDeduct">
            <el-select v-model="queryParams.ipoAutomaticDeduct" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="Post-IPO自动扣款" prop="postIpoAutomaticDeduct">
            <el-select v-model="queryParams.postIpoAutomaticDeduct" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="禁止交易" prop="prohibitTrade">
            <el-select v-model="queryParams.prohibitTrade" placeholder="全部" clearable style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间" prop="registerTime">
            <el-date-picker
              v-model="queryParams.registerTime"
              type="daterange"
              align="right"
              unlink-panels
              value-format="YYYY-MM-DD"
              placeholder="请选择提交时间"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['member:member:add']">新增会员</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Edit" :disabled="single" @click="handleUpdateInviter()" v-hasPermi="['member:member:edit:inviter']">修改上级</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['member:member:edit']"
              >修改会员</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdateCreditScore()" v-hasPermi="['member:member:edit:creditScore']">修改信用分</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Money" :disabled="single" @click="handleAdjustMoney()" v-hasPermi="['member:member:edit:money']"
              >人工存取</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Operation" :disabled="single" @click="handleAmountLog()" v-hasPermi="['member:member:edit:money']"
            >资金日志</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['member:member:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="memberList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="用户ID" align="center" prop="id" />
        <el-table-column label="用户账号" align="center" prop="username" width="180">
          <template #default="scope">
            <el-link @click="handleView(scope.row)" type="primary" v-if="scope.row.isFaker === 0">{{ scope.row.username }}</el-link>
            <el-link @click="handleView(scope.row)" type="primary" v-else>{{ scope.row.username }}（测试用户）</el-link>
          </template>
        </el-table-column>
        <el-table-column label="上级用户" align="center" prop="inviterName" width="180" />
        <el-table-column label="真实姓名" align="center" prop="realName" width="180" />
        <el-table-column label="手机号" align="center" prop="phoneAreaCode" width="180">
          <template #default="scope">
            <span>{{ scope.row.phoneAreaCode }}-{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center" prop="email" width="180" />
        <el-table-column label="可用余额(真实)" width = "120" align="center" prop="amount" />
        <el-table-column label="可用余额(虚拟)" width = "120" align="center" prop="virtualAmount" />
        <el-table-column label="保证金" align="center" prop="securityAmount" />
        <el-table-column label="会员等级" align="center" prop="memberLevelName" />
        <el-table-column label="信用分" align="center" prop="creditScore" />
        <el-table-column label="登录密码" align="center" prop="loginPasswordPlain" />
        <el-table-column label="资金密码" align="center" prop="withdrawPasswordPlain" />
        <el-table-column label="推广码" align="center" prop="inviteCode" />
        <el-table-column label="是否冻结" align="center" prop="isFreeze">
          <template #default="scope">
            <span>{{ scope.row.isFreeze == 1 ? '冻结' : '正常' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" align="center" prop="enable">
          <template #default="scope">
            <span>{{ scope.row.enable == 1 ? '启用' : '停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册信息" align="center" prop="registerTime" width="180">
          <template #default="scope">
            <span>{{ scope.row.registerTime }}</span> <br />
            <span>{{ scope.row.registerIp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="登录信息" align="center" prop="loginTime" width="180">
          <template #default="scope">
            <span>{{ scope.row.loginTime }}</span> <br />
            <span>{{ scope.row.loginIp }}</span> <br />
          </template>
        </el-table-column>
        <el-table-column label="设备类型" align="center" prop="device" />
        <el-table-column label="注册域名" align="center" prop="registerDomain" width="180" />
        <el-table-column label="最近存款时间" align="center" prop="depositTime" width="180" />
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改会员对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="50%" append-to-body>
      <el-form ref="memberFormRef" :model="form" :rules="rules" label-width="150px">
        <el-row :span="8">
          <el-form-item label="上级用户">
            <el-input v-model="form.inviterName" placeholder="请输入上级用户" style="width: 240px" :disabled="form.id != null" />
          </el-form-item>
          <el-form-item label="用户账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户账号" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入用户昵称" style="width: 240px" />
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="form.password" placeholder="请输入登录密码" style="width: 240px" />
          </el-form-item>
          <el-form-item label="取款密码">
            <el-input v-model="form.passwordWithdraw" placeholder="请输入取款密码" style="width: 240px" />
          </el-form-item>
          <el-form-item label="会员等级" prop="memberLevel">
            <el-select v-model="form.memberLevel" placeholder="请选择会员等级" style="width: 240px">
              <el-option v-for="dict in levelSelectionData" :key="dict.code" :label="dict.name" :value="parseInt(dict.code)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员分组" prop="groupId">
            <el-select v-model="form.groupId" placeholder="请选择会员分组" style="width: 240px">
              <el-option v-for="dict in groupSelectionData" :key="dict.code" :label="dict.name" :value="parseInt(dict.code)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推广码" prop="inviteCode">
            <el-input v-model="form.inviteCode" placeholder="清输入推广码" style="width: 240px" />
          </el-form-item>
          <el-form-item label="手机区号" prop="phoneAreaCode">
            <el-input v-model="form.phoneAreaCode" placeholder="请输入手机区号" style="width: 240px" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别" style="width: 240px">
              <el-option key="1" label="男" :value="1" />
              <el-option key="2" label="女" :value="2" />
              <el-option key="3" label="未知" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="冻结状态" prop="isFreeze">
            <el-select v-model="form.isFreeze" placeholder="请选择冻结状态" style="width: 240px">
              <el-option key="0" label="正常" :value="0" />
              <el-option key="1" label="冻结" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态" prop="enable">
            <el-select v-model="form.enable" placeholder="请选择启用状态" style="width: 240px">
              <el-option key="0" label="停用" :value="0" />
              <el-option key="1" label="启用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否测试用户" prop="isFaker">
            <el-select v-model="form.isFaker" placeholder="请选择是否测试用户" style="width: 240px" :disabled="form.id != null">
              <el-option key="0" label="否" :value="0" />
              <el-option key="1" label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱" style="width: 240px" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" placeholder="请输入地址" style="width: 240px" />
          </el-form-item>
          <el-form-item label="居住国家" prop="resideCountry">
            <el-select v-model="form.resideCountry" placeholder="请选择居住国家" style="width: 240px">
              <el-option v-for="dict in countrySelectionData" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国籍" prop="nationality">
            <el-select v-model="form.nationality" placeholder="请选择国籍" style="width: 240px">
              <el-option v-for="dict in countrySelectionData" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              clearable
              v-model="form.birthday"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择生日"
              style="width:100%;"
            />
          </el-form-item>
          <el-form-item label="软删除标识" prop="del" v-if="!!form.id">
            <el-select v-model="form.del" placeholder="请选择软删除标识" style="width: 240px" :disabled="form.del === 0">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="IPO自动扣款" prop="ipoAutomaticDeduct">
            <el-select v-model="form.ipoAutomaticDeduct" placeholder="请选择IPO自动扣款" style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="Post-IPO自动扣款" prop="postIpoAutomaticDeduct">
            <el-select v-model="form.postIpoAutomaticDeduct" placeholder="请选择Post-IPO自动扣款" style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
          <el-form-item label="禁止交易" prop="prohibitTrade">
            <el-select v-model="form.prohibitTrade" placeholder="请选择禁止交易" style="width: 240px">
              <el-option v-for="dict in yes_or_no_dic" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注">
              <el-input :rows="3" clearable type="textarea" v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改上级 -->
    <el-dialog title="修改上级" v-model="inviterDialog" width="500" append-to-body>
      <el-form ref="memberFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="上级用户">
          <el-input v-model="form.inviterName" placeholder="请输入上级用户" clearable style="width: 240px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitInviter">确 定</el-button>
          <el-button @click="inviterDialog = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 会员详情 -->
    <el-dialog title="会员详情" v-model="detailDialog" width="1500" append-to-body>
      <el-form ref="memberFormRef" :model="form" :rules="rules" label-width="120px" :disabled="true">
        <el-row :span="8">
          <el-form-item label="用户头像">
            <image-preview :src="form.avatar" :width="50" :height="50" />
          </el-form-item>
        </el-row>
        <el-row :span="8">
          <el-form-item label="用户账号">
            <el-input v-model="form.username" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="form.nickname" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="上级用户">
            <el-input v-model="form.inviterName" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户分组">
            <el-input v-model="form.groupName" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户层级">
            <el-input v-model="form.layer" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="用户性别">
            <el-select v-model="form.gender" placeholder="" style="width: 240px">
              <el-option key="1" label="男" :value="1" />
              <el-option key="2" label="女" :value="2" />
              <el-option key="3" label="未知" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="会员等级">
            <el-select v-model="form.memberLevel" placeholder="" style="width: 240px">
              <el-option v-for="dict in levelSelectionData" :key="dict.code" :label="dict.name" :value="parseInt(dict.code)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="信用分">
            <el-input v-model="form.creditScore" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="推广码">
            <el-input v-model="form.inviteCode" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="手机区号">
            <el-input v-model="form.phoneAreaCode" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="form.birthday" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="form.enable" placeholder="" style="width: 240px">
              <el-option key="0" label="停用" :value="0" />
              <el-option key="1" label="启用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="冻结状态">
            <el-select v-model="form.isFreeze" placeholder="" style="width: 240px">
              <el-option key="0" label="正常" :value="0" />
              <el-option key="1" label="冻结" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="冻结时间" v-if="form.isFreeze === 1">
            <el-input v-model="form.freezeTime" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="">
            <el-link type="success" @click="handleAmountLog(form)">资金日志</el-link>
          </el-form-item>
        </el-row>
        <el-divider />

        <el-row :span="8">
          <el-form-item label="注册时间">
            <el-input v-model="form.registerTime" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="注册域名">
            <el-input v-model="form.registerDomain" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="设备来源">
            <el-input v-model="form.device" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="设备码">
            <el-input v-model="form.deviceCode" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="注册IP">
            <el-input v-model="form.registerIp" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="注册国家">
            <el-input v-model="form.registerCountry" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="form.groupName" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="登录时间">
            <el-input v-model="form.loginTime" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="登录IP">
            <el-input v-model="form.loginIp" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="登录国家">
            <el-input v-model="form.loginCountry" placeholder="" style="width: 240px" />
          </el-form-item>
        </el-row>

        <el-divider />

        <el-row :span="8">
          <el-form-item label="可用余额">
            <el-input v-model="form.amount" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="冻结额度">
            <el-input v-model="form.freezeAmount" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="赠送金额">
            <el-input v-model="form.presentAmount" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="积分">
            <el-input v-model="form.score" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="总存款金额">
            <el-input v-model="form.depositAmount" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="总存款次数">
            <el-input v-model="form.depositCountTotal" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最后存款时间">
            <el-input v-model="form.depositTime" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="总提款金额">
            <el-input v-model="form.withdrawAmount" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="总提款次数">
            <el-input v-model="form.withdrawCountTotal" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="最后提款时间">
            <el-input v-model="form.withdrawTime" placeholder="" style="width: 240px" />
          </el-form-item>
        </el-row>

        <el-divider />
        <el-row :span="8">
          <el-form-item label="登录密码">
            <el-input v-model="form.loginPasswordPlain" placeholder="" style="width: 240px" />
          </el-form-item>
          <el-form-item label="资金密码">
            <el-input v-model="form.withdrawPasswordPlain" placeholder="" style="width: 240px" />
          </el-form-item>
        </el-row>

        <el-divider />

        <el-row>
          <el-col :span="20">
            <el-form-item label="备注">
              <el-input :rows="3" clearable type="textarea" v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 人工存取 -->
    <el-dialog title="人工存取" v-model="adjustMoneyDialog" width="500" append-to-body>
      <el-form ref="memberFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="用户账号">
          <el-input v-model="form.username" placeholder="" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="可用余额">
          <el-input v-model="form.amount" placeholder="" style="width: 240px" :disabled="true" />
        </el-form-item>
        <el-form-item label="账户类型" prop="accountType">
          <el-select v-model="form.accountType" placeholder="请选择" style="width: 240px">
            <el-option key="0" label="真实账户" :value="0" />
            <el-option key="1" label="模拟账户" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="出入款类型" prop="adjustMoneyType">
          <el-select v-model="form.adjustMoneyType" placeholder="请选择" style="width: 240px">
            <el-option key="0" label="入款（不记录报表）" :value="1" />
            <el-option key="1" label="出款（不记录报表）" :value="2" />
            <el-option key="2" label="入款（记录报表）" :value="3" />
            <el-option key="3" label="出款（记录报表）" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="adjustMoney">
<!--          <el-input v-model="form.adjustMoney" placeholder="" style="width: 240px" />-->
          <el-input-number v-model="form.adjustMoney" placeholder="请输入金额" :precision="2" :min="0.01" :max="100000000000" style="width: 240px" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.adjustRemark" placeholder="" style="width: 240px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitAdjustMoney">确 定</el-button>
          <el-button @click="adjustMoneyDialog = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 资金日志 -->
    <el-dialog title="资金日志" v-model="amountLogDialog" width="70%" append-to-body>
      <AmountLog ref="amountLogRef"></AmountLog>
    </el-dialog>

    <!-- 修改信用分 -->
    <el-dialog title="修改信用分" v-model="creditScoreDialog" width="500" append-to-body>
      <el-form ref="memberFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="信用分" prop="creditScore">
          <el-input-number v-model="form.creditScore" controls-position="right" :min="0" :max="100" :precision="0" placeholder="请输入信用分" style="width: 240px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitCreditScore">确 定</el-button>
          <el-button @click="creditScoreDialog = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Member" lang="ts">
import { listMember, getMember, adjustMoney, addMember, updateMember, updateInviter, updateCreditScore } from '@/api/member/member';
import { MemberVO, MemberQuery, MemberForm } from '@/api/member/member/types';
import { getLevelSelection, getMemberGroupSelection, getCountrySelection } from "@/api/common/selection";
import { parseTime } from "@/utils/ruoyi";
import AmountLog from "@/views/member/member/AmountLog.vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { yes_or_no_dic } = toRefs<any>(proxy?.useDict('yes_or_no_dic'));

const memberList = ref<MemberVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const memberFormRef = ref<ElFormInstance>();
const amountLogRef = ref<any>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const inviterDialog = ref(false);
const detailDialog = ref(false);
const adjustMoneyDialog = ref(false);
const amountLogDialog = ref(false);
const creditScoreDialog = ref(false);

const initFormData: MemberForm = {
  id: undefined,
  agentId: undefined,
  username: undefined,
  password: undefined,
  passwordWithdraw: undefined,
  realName: undefined,
  gender: undefined,
  memberLevel: undefined,
  passNum: undefined,
  email: undefined,
  phoneAreaCode: undefined,
  phone: undefined,
  registerTime: undefined,
  registerDomain: undefined,
  registerIp: undefined,
  loginTime: undefined,
  loginIp: undefined,
  isFreeze: undefined,
  freezeTime: undefined,
  enable: undefined,
  avatar: undefined,
  inviterId: undefined,
  inviteCode: undefined,
  remark: undefined,
  del: undefined,
  nickname: undefined,
  lateDepositTime: undefined,
  device: undefined,
  deviceCode: undefined,
  isFaker: undefined,
  ipoAutomaticDeduct: undefined,
  prohibitTrade: undefined,
  postIpoAutomaticDeduct: undefined,
}
const data = reactive<PageData<MemberForm, MemberQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: undefined,
    agentId: undefined,
    username: undefined,
    password: undefined,
    passwordWithdraw: undefined,
    realName: undefined,
    gender: undefined,
    memberLevel: undefined,
    passNum: undefined,
    email: undefined,
    phoneAreaCode: undefined,
    phone: undefined,
    registerTime: undefined,
    registerDomain: undefined,
    registerIp: undefined,
    loginTime: undefined,
    loginIp: undefined,
    isFreeze: undefined,
    freezeTime: undefined,
    enable: undefined,
    avatar: undefined,
    inviterId: undefined,
    inviteCode: undefined,
    del: undefined,
    nickname: undefined,
    lateDepositTime: undefined,
    device: undefined,
    deviceCode: undefined,
    isFaker: undefined,
    ipoAutomaticDeduct: undefined,
    prohibitTrade: undefined,
    postIpoAutomaticDeduct: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    username: [
      { required: true, message: "账号不能为空", trigger: "blur" }
    ],
    password: [
      { required: true, message: "登录密码不能为空", trigger: "blur" }
    ],
    passwordWithdraw: [
      { required: true, message: "取款密码不能为空", trigger: "blur" }
    ],
    realName: [
      { required: true, message: "姓名不能为空", trigger: "blur" }
    ],
    gender: [
      { required: true, message: "性别不能为空", trigger: "blur" }
    ],
    memberLevel: [
      { required: true, message: "会员等级id不能为空", trigger: "blur" }
    ],
    passNum: [
      { required: true, message: "登录密码输错次数不能为空", trigger: "blur" }
    ],
    registerTime: [
      { required: true, message: "注册时间不能为空", trigger: "blur" }
    ],
    registerDomain: [
      { required: true, message: "注册域名不能为空", trigger: "blur" }
    ],
    registerIp: [
      { required: true, message: "注册IP不能为空", trigger: "blur" }
    ],
    loginTime: [
      { required: true, message: "登录时间不能为空", trigger: "blur" }
    ],
    loginIp: [
      { required: true, message: "登录IP不能为空", trigger: "blur" }
    ],
    isFreeze: [
      { required: true, message: "是否冻结 1：冻结；0：未冻结不能为空", trigger: "blur" }
    ],
    freezeTime: [
      { required: true, message: "冻结时间不能为空", trigger: "blur" }
    ],
    enable: [
      { required: true, message: "启用状态 1：启用；0：停用不能为空", trigger: "blur" }
    ],
    avatar: [
      { required: true, message: "头像不能为空", trigger: "blur" }
    ],
    inviterId: [
      { required: true, message: "推荐人Id不能为空", trigger: "blur" }
    ],
    // inviteCode: [
    //   { required: true, message: "推广码不能为空", trigger: "blur" }
    // ],
    remark: [
      { required: true, message: "备注不能为空", trigger: "blur" }
    ],
    del: [
      { required: true, message: "软删除标识不能为空", trigger: "blur" }
    ],
    nickname: [
      { required: true, message: "昵称不能为空", trigger: "blur" }
    ],
    lateDepositTime: [
      { required: true, message: "最近一次存款时间不能为空", trigger: "blur" }
    ],
    device: [
      { required: true, message: "设备类型：1，苹果 2，安卓 3，H5 4，PC站 5，后台添加不能为空", trigger: "blur" }
    ],
    deviceCode: [
      { required: true, message: "设备码不能为空", trigger: "blur" }
    ],
    isFaker: [
      { required: true, message: "是否假人：0否 1是不能为空", trigger: "blur" }
    ],
    groupId: [
      { required: true, message: "会员分组不能为空", trigger: "blur" }
    ],
    adjustMoneyType: [
      { required: true, message: "出入款类型不能为空", trigger: "blur" }
    ],
    adjustMoney: [
      { required: true, message: "金额不能为空", trigger: "blur" }
    ],
    resideCountry: [
      { required: true, message: "居住国家不能为空", trigger: "blur" }
    ],
    nationality: [
      { required: true, message: "国籍不能为空", trigger: "blur" }
    ],
    accountType: [
      { required: true, message: "账户类型不能为空", trigger: "blur" }
    ],
    creditScore: [
      { required: true, message: "信用分不能为空", trigger: "blur" }
    ],
    ipoAutomaticDeduct: [
      { required: true, message: "IPO自动扣款不能为空", trigger: "blur" }
    ],
    prohibitTrade: [
      { required: true, message: "禁止交易不能为空", trigger: "blur" }
    ],
    postIpoAutomaticDeduct: [
      { required: true, message: "Post-IPO自动扣款不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会员列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMember(queryParams.value);
  memberList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  memberFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: MemberVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  form.value.creditScore = 100;
  form.value.memberLevel = 1;
  form.value.groupId = 1;
  form.value.phoneAreaCode = "+91";
  form.value.gender = 1;
  form.value.isFreeze = 0;
  form.value.enable = 1;
  form.value.isFaker = 1;
  form.value.resideCountry = "1";
  form.value.nationality = "1";
  form.value.ipoAutomaticDeduct = 0;
  form.value.prohibitTrade = 0;
  form.value.postIpoAutomaticDeduct = 0;
  dialog.visible = true;
  dialog.title = "添加会员";
}

/** 修改上级按钮操作 */
const handleUpdateInviter = async (row?: MemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMember(_id);
  Object.assign(form.value, res.data);
  inviterDialog.value = true;
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMember(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会员";
}

/** 详情按钮操作 */
const handleView = async (row?: MemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMember(_id);
  Object.assign(form.value, res.data);
  if (form.value.isFaker === 1) {
    form.value.username = form.value.username + '（测试用户）';
  }
  if (form.value.birthday) {
    form.value.birthday = parseTime(form.value.birthday, '{y}-{m}-{d}')
  }
  detailDialog.value = true;
}

/** 人工出入款按钮操作 */
const handleAdjustMoney = async (row?: MemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMember(_id);
  Object.assign(form.value, res.data);
  if (form.value.isFaker === 1) {
    form.value.username = form.value.username + '（测试用户）';
  }
  form.value.accountType = "0";
  adjustMoneyDialog.value = true;
}

/** 资金日志按钮操作 */
const handleAmountLog = async (row?: MemberVO) => {
  const _id = row?.id || ids.value[0]
  amountLogDialog.value = true;
  await nextTick(() => {
    amountLogRef.value?.getListByMemberId(_id);
  })
}

/** 提交按钮 */
const submitForm = () => {
  memberFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (form.value.birthday) {
        form.value.birthday = form.value.birthday + ' 00:00:00';
      }
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMember(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addMember(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("修改成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 修改上级用户 */
const submitInviter = (row?: MemberVO) => {
  memberFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      const _id = row?.id || ids.value[0]
      await proxy?.$modal.confirm('是否确认修改编号为"' + _id + '"的数据项的上级用户？').finally(() => buttonLoading.value = false);
      buttonLoading.value = true;
      await updateInviter(form.value).finally(() => buttonLoading.value = false);
      proxy?.$modal.msgSuccess("操作成功");
      inviterDialog.value = false;
      await getList();
    }
  });
}

/** 人工出入款 */
const submitAdjustMoney = () => {
  memberFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      await adjustMoney(form.value).finally(() =>  buttonLoading.value = false);
      proxy?.$modal.msgSuccess("操作成功");
      adjustMoneyDialog.value = false;
      await getList();
    }
  });
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('member/export', {
    ...queryParams.value
  }, `member_${new Date().getTime()}.xlsx`)
}

/** 修改信用分按钮操作 */
const handleUpdateCreditScore = async (row?: MemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMember(_id);
  Object.assign(form.value, res.data);
  creditScoreDialog.value = true;
}

/** 修改信用分提交按钮 */
const submitCreditScore = () => {
  memberFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      await updateCreditScore({ id: form.value.id, creditScore: form.value.creditScore }).finally(() => buttonLoading.value = false);
      proxy?.$modal.msgSuccess("操作成功");
      creditScoreDialog.value = false;
      await getList();
    }
  });
}

let levelSelectionData = ref([]);
let groupSelectionData = ref([]);
const countrySelectionData = ref<DictDataOption[]>([]);
/**
 * 获取数据选择
 */
const loadSelectionData = async () => {
  // 用户等级
  const levelData = await getLevelSelection();
  levelSelectionData.value = levelData.data;
  // 用户分组
  const groupData = await getMemberGroupSelection();
  groupSelectionData.value = groupData.data;
  // 国家
  const countryData = await getCountrySelection();
  countrySelectionData.value = countryData.data.map((item: { name: any; code: any; }) => ({
    label: item.name,
    value: String(item.code) // 确保类型一致
  }));
}

onMounted(() => {
  getList();
  loadSelectionData();
});
</script>

<style>
.el-input-number .el-input__inner {
  text-align: left;
}
</style>
