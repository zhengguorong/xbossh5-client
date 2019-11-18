<template>
  <div class="wraper">
    <div class="container">
      <div class="logo">
        <img class="icon" src="@/assets/logo.png" />
        <div class="title">螃蟹秀</div>
      </div>
      <div class="input-container">
        <div class="phone">
          <img class="icon" src="@/assets/phone.png" />
          <input placeholder="手机号" type="number" v-model="phone" max="11"/>
        </div>
        <div class="validate">
          <div class="code">
            <img class="icon" src="@/assets/mail.png" />
            <input placeholder="验证码" type="number" v-model="code" max="6"/>
          </div>
          <a-button @click="getValidateCode" :disabled="getCodeDisabled" size="large" type="defalut" class="get-code">{{timer === -1 ? '获取验证码': `${timer} (重发)`}}</a-button>
        </div>
      </div>
      <a-button @click="userLogin" :disabled="loginDisabled" size="large" type="primary" class="login-btn">登录</a-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from '@vue/composition-api';
import Vue from 'vue';
import userApis from '../apis/user';

export default {
  setup() {
    const state = reactive({
      phone: '',
      code: '',
      timer: -1,
      loginDisabled: computed(() => {
        if (state.phone && state.code.length > 5) {
          return false;
        }
        return true;
      }),
      getCodeDisabled: computed(() => (state.timer > -1 || !(/^1[3456789]\d{9}$/.test(state.phone)))),
    });
    function userLogin() {
      userApis.login(state.phone, state.code).then((res) => {
        if (res.code === 0) {
        // 跳转到列表
        } else {
          Vue.prototype.$message.error(res.message);
        }
      });
    }
    function getValidateCode() {
      userApis.sendCode(state.phone).then(() => {
        Vue.prototype.$message.success('发送成功');
        state.timer = 60;
        const inter = setInterval(() => {
          state.timer -= 1;
          if (state.timer === -1) {
            clearInterval(inter);
          }
        }, 1000);
      }).catch(() => {
        Vue.prototype.$message.error('发送失败，请稍后重试');
      });
    }
    return {
      ...toRefs(state),
      userLogin,
      getValidateCode,
    };
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/login-bg.png");
  background-size: 100% 100%;
  .container {
    width: 368px;
    .logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .icon {
        width: 95px;
      }
      .title {
        font-size: 33px;
        color: rgba($color: #000000, $alpha: 0.85);
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .input-container {
      margin-top: 23px;
      font-size: 16px;
      width: 100%;
      .phone,
      .code {
        position: relative;
        margin-bottom: 23px;
        flex: 1;
        input {
          height: 40px;
          width: 100%;
          border: 0;
          background: #fff;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          padding-left: 36px;
        }
        input::-webkit-input-placeholder {
          color: rgba($color: #000000, $alpha: 0.25);
        }
        .icon {
          width: 16px;
          position: absolute;
          left: 12px;
          top: 12px;
        }
      }
      .validate {
        display: flex;
        flex-direction: row;
        .get-code {
          margin-left: 8px;
          color: rgba($color: #000000, $alpha: 0.65);
          font-size: 14px;
          min-width: 102px;
        }
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
