<template>
  <!-- メール情報 -->
  <div class="c-content c-form mailContent">
    <p
      :class="{
        'c-message is-view': viewMessage,
        'c-message is-view-err': viewMessageErr,
        'c-message': !viewMessage && !viewMessageErr,
      }"
    >
      {{ viewMessageText }}
    </p>
    <div v-show="loading" class="loader">Now loading...</div>

    <form v-on:submit.prevent="submit" v-show="!loading" method="POST" action="" enctype="multipart/form-data">

        <h2 class="c-tabTitle">メール情報</h2>

        <div class="c-formArea">
          <dl class="c-form__content mailSend">
            <dt><label class="c-form__title" for="mail_send">送信メールアドレス</label></dt>
            <dd>
              <input id="mail_send" class="c-form__item c-input" type="text" name="mail_send" value="" placeholder="例)✕✕✕@✕✕✕.com" />
            </dd>
          </dl>

          <dl class="c-form__content mailSmtp">
            <dt><label class="c-form__title" for="mail_smtp">SMTPサーバ</label></dt>
            <dd>
              <input id="mail_smtp" class="c-form__item c-input" type="text" name="mail_smtp" value="" placeholder="例)mail.✕✕✕@✕✕✕.com" />
            </dd>
          </dl>

          <dl class="c-form__content mailPortSend">
            <dt><label class="c-form__title" for="mail_port_send">送信ポート番号</label></dt>
            <dd>
              <input id="mail_port_send" class="c-form__item c-input" type="number" name="mail_port_send" value="" placeholder="数字のみです" />
            </dd>
          </dl>

          <dl class="c-form__content mailUser">
            <dt><label class="c-form__title" for="mail_user">ユーザID</label></dt>
            <dd>
              <input id="mail_user" class="c-form__item c-input" type="text" name="mail_user" value="" placeholder="" autocomplete="off" />
            </dd>
          </dl>

          <dl class="c-form__content mailPass">
            <dt><label class="c-form__title" for="mail_pass">パスワード</label></dt>
            <dd>
              <input id="mail_pass" class="c-form__item c-input" type="password" name="mail_pass" value="" placeholder="" autocomplete="off" />
              <span class="fa fa-eye passIcon js-btnEye" onclick="pushHideButton()"></span>
            </dd>
          </dl>

          <dl class="c-form__content mailSmtpCheck">
            <dt>SMTP認証</dt>
            <dd>

              <ul class="c-check">
                <li>
                  <label for="mail_smtp_check"><input id="mail_smtp_check" type="checkbox" name="mail_smtp_check" value="1" checked /><span>SMTP認証が必要な場合はチェックしてください</span></label>
                </li>
              </ul>

            </dd>
          </dl>

          <dl class="c-form__content mailRecep">
            <dt><label for="mail_recep">受信メールアドレス</label></dt>
            <dd>
              <input id="mail_recep" class="c-form__item c-input" type="text" name="mail_recep" value="" placeholder="例)✕✕✕@✕✕✕.com" />
            </dd>
          </dl>

          <dl class="c-form__content mailSiteKey">
            <dt><label class="c-form__title" for="mail_site_key">リキャプチャ サイトキー</label></dt>
            <dd>
              <input id="mail_site_key" class="c-form__item c-input" type="text" name="mail_site_key" value="" placeholder="" />
            </dd>
          </dl>

          <dl class="c-form__content mailSecretKey">
            <dt><label class="c-form__title" for="mail_secret_key">リキャプチャ シークレットキー</label></dt>
            <dd>
              <input id="mail_secret_key" class="c-form__item c-input" type="text" name="mail_secret_key" value="" placeholder="" />
            </dd>
          </dl>
        </div>
      

      <div class="c-footNav">
        <button class="c-formBtn shopContent__formBtn" type="submit">内容を保存する</button>
      </div>
    </form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: {},

data: function () {
  return {
    loading: false, //ロード開始
    viewMessage: false, //フラッシュメッセージ
    viewMessageErr: false,
    viewMessageText: null,
  };
},
  methods: {
    submit() {
      this.messegeEvent("UPDATE！", 0);
    },

    /**
     * ------------
     * フラッシュメッセージ
     * ------------
     */
     messegeEvent(m, v) {
      this.viewMessageText = m;
      if (v == 0) {
        this.viewMessage = !this.viewMessage;
      } else {
        this.viewMessageErr = !this.viewMessageErr;
      }
      setTimeout(() => {
        this.viewMessage = false;
        this.viewMessageErr = false;
      }, 800);
    },
  },
};
</script>
