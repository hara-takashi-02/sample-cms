<template>
  <div class="contentGroup__item" :data-item_id="itemId">
    <div class="c-delBtn" @click="delSubItem($event)">✕</div>
    <div class="contentGroup__main">

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

    <div class="c-btnSet btnSetGroup">
      <label class="c-btn" :for="[itemNameEn + '_' + itemId + '_upImg']">変更</label>
      <a
        @click="delFile('item_photo', 'str', 'upImg', $event)"
        class="c-btn c-btn--reset"
        >削除</a>
    </div>

    <div class="formSetGroup">
      <div class="shop">
        <label>
          <span>アイテム1</span>
          <input class="c-input" type="text" v-model="itemShop" placeholder="" @change="itemUpdate('item_shop', 'str', $event)" />
        </label>
      </div>
      <div class="url">
        <label>
          <span>アイテム2</span>
          <input class="c-input" type="text" v-model="itemUrl" placeholder="" @change="itemUpdate('item_url', 'str', $event)" />
        </label>
      </div>
      <div class="genre">
        <label>
          <span>アイテム3</span>
          <input class="c-input" type="text" v-model="itemGenre" placeholder="" @change="itemUpdate('item_genre', 'str', $event)" />
        </label>
      </div>
      <div class="tel">
        <label>
          <span>アイテム4</span>
          <input class="c-input" type="text" v-model="itemTel" placeholder="" @change="itemUpdate('item_tel', 'str', $event)" />
        </label>
      </div>
    </div>

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
      targetTbl: "item_list_group",

      itemId: 0,
      itemRoot: 0,
      itemPhoto: "",
      itemShop: "",
      itemUrl: "",
      itemGenre: "",
      itemTel: "",
      itemTime: "",
      itemAddress: "",
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
    },

    /**
     * ------------
     * サブコンテンツ アイテム削除
     * ------------
     */
    delSubItem(event) {
      this.$emit("delSubItem", this.targetTbl, this.itemId, event);
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
     * 画像削除
     * ------------
     */
    delFile(col, type, text, event) {
      this[text] = "";
      this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, '');
    },
  },

  mounted() {
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || null;
    this.itemPhoto = this.mainItem.item_photo || null;
    this.itemShop = this.mainItem.item_shop || null;
    this.itemUrl = this.mainItem.item_url || null;
    this.itemGenre = this.mainItem.item_genre || null;
    this.itemTel = this.mainItem.item_tel || null;
    this.itemTime = this.mainItem.item_time || null;
    this.itemAddress = this.mainItem.item_address || null;
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
