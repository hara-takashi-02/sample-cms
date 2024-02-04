<template>
  <div class="contentImgs__item" :data-item_id="itemId">

    <div class="c-imgBox">
      <div class="c-imgBoxInner">
          <label>
            <input
              :id="[itemNameEn + '_' + itemId + '_imgs']"
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

    <div class="c-btnSet btnSetImgs">
      <label class="c-btn" :for="[itemNameEn + '_' + itemId + '_imgs']">変更</label>
      <a
        @click="delFile('item_photo', 'str', 'upImg', $event)"
        class="c-btn c-btn--reset"
        >削除</a>
    </div>

    <div class="alt">
      <label>
        <span>画像名(alt)</span>
        <input class="c-input" type="text" v-model="itemAlt" placeholder="画像名" @change="itemUpdate('item_alt', 'str', $event)" />
      </label>
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
      targetTbl: "item_list_imgs",

      itemId: 0,
      itemRoot: 0,
      itemType: 0,
      itemPhoto: "",
      itemAlt: "",
      itemTarget: 0,
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
    this.itemType = this.mainItem.item_type || 0;
    this.itemPhoto = this.mainItem.item_photo || null;
    this.itemAlt = this.mainItem.item_alt || null;
    this.itemTarget = this.mainItem.item_target || 0;
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
