<template>
  <!-- グループ1 -->
  <div class="c-content c-form shopContent">
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

    <h2 class="c-title">グループ1</h2>
    <form v-on:submit.prevent="submit" v-show="!loading" method="POST" action="" enctype="multipart/form-data">
      <!-- アイテム1 -->
      <dl class="c-form__content shopName">
        <dt><label class="c-form__title" for="shopName">アイテム1</label></dt>
        <dd>
          <input class="c-form__item c-input" id="shopName" type="text" mane="shopName" v-model="shopName" placeholder="店舗名を入力してください。" />
        </dd>
      </dl>

      <!-- アイテム2 -->
      <dl class="c-form__content shopUrl">
        <dt><label class="c-form__title" for="shopUrl">アイテム2</label></dt>
        <dd>
          <input class="c-form__item c-input" id="shopUrl" type="text" mane="shopUrl" v-model="shopUrl" placeholder="店舗URLを入力してください。" />
        </dd>
      </dl>

      <!-- 受付時間 -->
      <dl class="c-form__content infoshop">
        <dt>設定年月</dt>
        <dd>
          <div class="infoshopStart c-select">
            <select name="shop_start_h" v-model="shopStartHour">
              <option value="-"> - </option>
              <option v-for="ctgShopH in ctgShopHList" :key="ctgShopH.id" :value="ctgShopH.id">
                {{ ctgShopH.name }}
              </option>
            </select>
          </div>
          <div class="txt">年</div>
          <div class="infoshopEnd c-select">
            <select name="shop_end_h" v-model="shopEndHour">
              <option value="-"> - </option>
              <option v-for="ctgShopM in ctgShopMList" :key="ctgShopM.id" :value="ctgShopM.id">
                {{ ctgShopM.name }}
              </option>
            </select>
          </div>
          <div class="txt">月</div>
        </dd>

      </dl>

      <!-- アイテム3 -->
      <dl class="c-form__content shopTitle">
        <dt>
          <label class="c-form__title" for="shopTitle">アイテム3</label>
        </dt>
        <dd>
          <input v-model="shopTitle" class="c-form__item c-input" id="shopTitle" type="text" mane="shopTitle" placeholder="Page Title" />
        </dd>
      </dl>

      <!-- アイテム4 -->
      <div class="c-form__content shopDesc">
        <dt>
          <label class="c-form__title" for="shopDesc">アイテム4</label>
        </dt>
        <dd>
          <input v-model="shopDesc" class="c-form__item c-input" id="shopDesc" type="text" mane="shopDesc" placeholder="このサイトの説明です。" />
        </dd>
      </div>

      <!-- 画像1 -->
      <dl class="c-form__content c-form__img shopLogo">
        <dt><p class="c-form__title">画像1</p></dt>
        <dd>
          <ul class="c-infoTxt">
            <li>※推奨画像サイズは横100px・縦100pxになります。</li>
          </ul>

          <div class="c-imgBox">
            <div class="c-imgBoxInner">
              <label>
                <input id="shopLogo" name="shopLogo" type="file" @change="uploadFile($event, 'urlShopLogo', 'nameShopLogo')" />

                <div v-if="!urlShopLogo" class="imgUp">
                  <p>ファイルをドラッグ、<br />もしくは選択してください。</p>
                </div>

                <div v-if="urlShopLogo" class="c-imgBoxView">
                  <img :src="urlShopLogo" />
                </div>
              </label>
            </div>
          </div>

          <div class="c-btnSet">
            <label class="c-btn" for="shopLogo">変更</label>
            <a @click="delFile($event, 'urlShopLogo', 'nameShopLogo')" class="c-btn c-btn--reset">削除</a>
          </div>
        </dd>
      </dl>

      <!-- 画像2 -->
      <dl class="c-form__content c-form__img infoImgIco">
        <dt><p class="c-form__title">画像2</p></dt>
        <dd>
          <ul class="c-infoTxt">
            <li>※推奨画像サイズは横100px・縦100pxになります。</li>
          </ul>

          <div class="c-imgBox">
            <div class="c-imgBoxInner">
              <label>
                <input id="infoImgIco" name="infoImgIco" type="file" @change="uploadFile($event, 'urlInfoImgIco', 'nameInfoImgIco')" />

                <div v-if="!urlInfoImgIco" class="imgUp">
                  <p>ファイルをドラッグ、<br />もしくは選択してください。</p>
                </div>

                <div v-if="urlInfoImgIco" class="c-imgBoxView">
                  <img :src="urlInfoImgIco" />
                </div>
              </label>
            </div>
          </div>

          <div class="c-btnSet">
            <label class="c-btn" for="infoImgIco">変更</label>
            <a @click="delFile($event, 'urlInfoImgIco', 'nameInfoImgIco')" class="c-btn c-btn--reset">削除</a>
          </div>
        </dd>
      </dl>

      <div class="c-footNav">
        <button class="c-formBtn shopContent__formBtn" type="submit">内容を保存する</button>
      </div>
    </form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
// json
import setShopData from "../../data/shop_data.json";
import setthemeColor from "../../data/theme_color.json";
import setthemeFont from "../../data/theme_font.json";

export default {
  props: {},

  data: function () {
    return {
      loading: false, //ロード開始
      imgPath: "/storage/photos/",

      shopDataList: setShopData[0],
      themeColorList: setthemeColor,
      themeFontList: setthemeFont,

      shopName: setShopData[0].shop_name,
      shopUrl: setShopData[0].shop_url,
      shopStartHour: "",
      shopStartMinutes: "",
      shopEndHour: "",
      shopEndMinutes: "",
      shopOp: false,
      shopTitle: setShopData[0].shop_title,
      shopDesc: setShopData[0].shop_desc,
      urlShopLogo: "",
      urlInfoImgIco: "",
      urlInfoImgMain: "",
      urlInfoImgSub: "",
      shopColor: "",
      shopFont: "",
      shop_widget: setShopData[0].shop_widget,

      nameShopLogo: "",
      nameInfoImgIco: "",
      nameInfoImgMain: "",
      nameInfoImgSub: "",

      // 時間
      ctgShopHList: [],
      ctgShopMList: [],

      // オリジナルカラー
      shopColorOrign: "#" + setthemeColor[0].color_code,
      shopColorFontOrign: "#" + setthemeColor[0].color_code_font,

      // サイトフォント
      ctgFonts: [
        {
          id: 0,
          font: "serif",
          text: "セリフ（serif）",
          status: 0,
        },
        {
          id: 1,
          font: "sans-serif",
          text: "サンセリフ（sans-serif）",
          status: 1,
        },
      ],

      viewMessage: false, //フラッシュメッセージ
      viewMessageErr: false,
      viewMessageText: null,
    };
  },

  methods: {
    /**
     * ------------
     * 画像処理
     * ------------
     */
    uploadFile(event, text, imgName) {
      let file = event.target.files[0];
      this[imgName] = file.name;
      if (file) {
        this[text] = URL.createObjectURL(file);
      }
    },
    delFile(event, text, imgName) {
      this[text] = "";
      this[imgName] = "";
    },

    /**
     * ------------
     * 更新
     * ------------
     */
    submit() {
      let data = new FormData();
      data.append("shopName", this.shopName);
      data.append("shopUrl", this.shopUrl);
      data.append("shopStart", this.shopStartHour + ':' + this.shopStartMinutes);
      data.append("shopEnd", this.shopEndHour + ':' + this.shopEndMinutes);
      data.append("shopOp", this.shopOp ? 1 : 0);
      data.append("shopTitle", this.shopTitle);
      data.append("shopDesc", this.shopDesc);
      data.append("nameShopLogo", this.nameShopLogo);
      data.append("nameInfoImgIco", this.nameInfoImgIco);
      data.append("nameInfoImgMain", this.nameInfoImgMain);
      data.append("nameInfoImgSub", this.nameInfoImgSub);

      for (let d of data.entries()) {
        console.log(`${d[0]}: ${d[1]}`);
      }
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

  mounted() {
    this.shopOp = setShopData[0].shop_op ? true : false;

    // 受付時間リスト生成
    for (let i = 2000; i <= 2029; i++) {
      let count = i;
      this.ctgShopHList.push({ id: count, name: count });
    }
    for (let i = 1; i <= 12; i++) {
      let count = i;
      this.ctgShopMList.push({ id: count, name: count });
    }

    // 時間
    let start = this.shopDataList.shop_start.split(":");
    let end = this.shopDataList.shop_end.split(":");
    this.shopStartHour = start[0];
    this.shopStartMinutes = start[1];
    this.shopEndHour = end[0];
    this.shopEndMinutes = end[1];

    // ロゴ画像
    this.urlShopLogo = this.shopDataList.shop_logo ? this.imgPath + this.shopDataList.shop_logo : null;
    this.urlInfoImgIco = this.shopDataList.shop_ico ? this.imgPath + this.shopDataList.shop_ico : null;
    this.urlInfoImgMain = this.shopDataList.shop_image_main ? this.imgPath + this.shopDataList.shop_image_main : null;
    this.urlInfoImgSub = this.shopDataList.shop_image_sub ? this.imgPath + this.shopDataList.shop_image_sub : null;
  },

  computed: {},
};
</script>
