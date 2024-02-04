<template>
  <div :class="[itemStatus == 1 ? 'is-grey contentSlide__item' : 'contentSlide__item']" :data-item_id="itemId">

    <div class="c-imgBox">
      <div class="c-imgBoxInner">
          <label>
            <input
              :id="[itemNameEn + '_' + itemId + '_upImg']"
              name=""
              type="file"
              @change="uploadFile('item_photo', 'str', 'upImg', $event)"
            />

            <div v-if="!upImg" class="imgUp">
              <p>ファイルをドラッグ、<br />もしくは選択してください。</p>
            </div>

            <div v-if="upImg" class="c-imgBoxView">
              <img :src="upImg" />
            </div>
          </label>
      </div>
    </div>

    <div class="link">
      <label>
        <span>リンク</span>
        <input class="c-input" type="text" v-model="itemUrl" placeholder="url" @change="itemUpdate('item_url', 'str', $event)" />
      </label>
    </div>

    <div class="alt">
      <label>
        <span>画像名(alt)</span>
        <input class="c-input" type="text" v-model="itemAlt" placeholder="画像名" @change="itemUpdate('item_alt', 'str', $event)" />
      </label>
    </div>

    <div class="c-radio">
      <ul>
        <li>
          <label :for="[itemNameEn + '_' + itemId + '_0']">
            <input :id="[itemNameEn + '_' + itemId + '_0']" type="radio" name="" value="0" v-model="itemTarget" @change="itemUpdate('item_target', 'int', $event)" />
            <span>なし</span>
          </label>
        </li>
        <li>
          <label :for="[itemNameEn + '_' + itemId + '_1']">
            <input :id="[itemNameEn + '_' + itemId + '_1']" type="radio" name="" value="1" v-model="itemTarget" @change="itemUpdate('item_target', 'int', $event)" />
            <span>あり</span>
          </label>
        </li>
      </ul>
    </div>

    <div class="c-btnSet btnSetSlide">
      <label :for="['switch' + itemNameEn + itemId]" class="c-switch" @change="itemUpdateCheck('status', $event)">
        <div class="inner">
          <input type="checkbox" :id="['switch' + itemNameEn + itemId]" value="1" :checked="itemStatus" />
          <div class="slider"></div>
          <div class="base"></div>
          <ul class="label">
            <li>表示</li>
            <li>非表示</li>
          </ul>
        </div>
      </label>

      <label class="c-btn" :for="[itemNameEn + '_' + itemId + '_upImg']">変更</label>
      <a
        @click="delFile('item_photo', 'str', 'upImg', $event)"
        class="c-btn c-btn--reset"
        >リセット</a>
    </div>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import global from "../../global.js";

export default {
    props: {
    mainItem: {
      type: [Object, null],
    },
    rootItem: {
      type: [Object, null],
    },
  },

    data: () => {
    return {
      targetTbl: "item_list_slide",

      itemId: 0,
      itemRoot: 0,
      itemTitle: "",
      itemPhoto: "",
      itemUrl: "",
      itemTarget: 0,
      itemAlt: "",
      itemOrder: 0,
      itemStatus: 0,
      itemRegistDt: "",
      itemUpdateDt: "",

      itemNameEn: null,
      rootId: 0,

      upPath: global.globalVal[0].uploadFile,
      upImg: "",
    };
  },

  components: {
    draggable,
  },

  methods: {
    /**
     * ------------
     * ステート更新用
     * ------------
     */
    getState() {
      return this.$store.state;
    },
    // 状態更新
    state_putDummyID() {
      this.$store.commit("state_putDummyID");
    },
    state_putList_first(list, tbl) {
      this.$store.commit("state_putList_first", { list, tbl });
    },
    state_putList(list, tbl) {
      this.$store.commit("state_putList", { list, tbl });
    },
    state_delList(tbl, id) {
      this.$store.commit("state_delList", { tbl, id });
    },
    state_delSubList(tbl, rootId) {
      this.$store.commit("state_delSubList", { tbl, rootId });
    },
    state_pushList(tbl, addItem) {
      this.$store.commit("state_pushList", { tbl, addItem });
    },
    state_editItem(tbl, col, id, val) {
      this.$store.commit("state_editItem", { tbl, col, id, val });
    },
    state_sortItem(tbl, col, list) {
      this.$store.commit("state_sortItem", { tbl, col, list });
    },

    /**
     * ------------
     * サブコンテンツ アイテム更新
     * ------------
     */
    itemUpdate(col, type, event) {
      this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, event.target.value, event);
    },
    itemUpdateCheck(col, event) {
      this.$emit("itemUpdateCheck", this.targetTbl, col, this.itemId, event.target.checked);
      let parentItem = document.querySelectorAll('[data-item_id="' + this.itemId + '"].contentSlide__item')[0];
      parentItem.classList.toggle("is-grey");
    },

    /**
     * ------------
     * 画像アップ
     * ------------
     */
    uploadFile(col, type, text, event) {
      if(event){
        let file = event.target.files[0];
        if (file) {
          this[text] = URL.createObjectURL(file);
          this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, file.name);
        }
      }
    },

    /**
     * ------------
     * リセット処理
     * ------------
     */
    delFile(col, type, text, event) {
      this[text] = "";
      this.itemUrl = "";
      this.itemAlt = "";
      this.itemTarget = 0;
      this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, '');
      this.$emit("itemUpdate", this.targetTbl, 'item_url', this.itemId, type, '');
      this.$emit("itemUpdate", this.targetTbl, 'item_alt', this.itemId, type, '');
      this.$emit("itemUpdate", this.targetTbl, 'item_target', this.itemId, type, 0);
    },

  },

  mounted() {
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || null;
    this.itemTitle = this.mainItem.item_title || null;
    this.itemPhoto = this.mainItem.item_photo || null;
    this.itemUrl = this.mainItem.item_url || null;
    this.itemTarget = this.mainItem.item_target || 0;
    this.itemAlt = this.mainItem.item_alt || null;
    this.itemOrder = this.mainItem.item_order || 0;
    this.itemStatus = this.mainItem.status || 0;
    this.itemRegistDt = this.mainItem.regist_dt || null;
    this.itemUpdateDt = this.mainItem.update_dt || null;

    this.itemNameEn = this.rootItem.item_base_name_en;
    this.rootId = this.rootItem.item_id;

    this.upImg = this.itemPhoto ? this.upPath + this.itemPhoto : null;
  },

  computed: {},
};
</script>
