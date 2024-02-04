<template>
  <div class="contentAccess__item" :data-item_id="itemId">
    <div class="contentAccess__main">

      <div class="contentAccess__text">
        <label class="access">
          <p>住所</p>
          <input v-model="itemTitle" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_title', 'str', $event)" />
        </label>
        <label class="nearest">
          <p>最寄り駅</p>
          <input v-model="itemSubTitle" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_sub_title', 'str', $event)" />
        </label>
        <label class="mapInfo">
          <p>地図情報</p>
          <textarea v-model="itemDetail" class="c-textarea" placeholder="Googlemapの【共有/地図を埋め込む】iframeタグを入力してください" @change="itemUpdate('item_detail', 'str', $event)"></textarea>
        </label>
        <p class="map" v-html="itemDetail"></p>
      </div>

    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

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
      targetTbl: "item_list_access",

      itemId: 0,
      itemRoot: 0,
      itemTitle: "",
      itemSubTitle: "",
      itemDetail: "",
      itemOrder: 0,
      itemStatus: 0,
      itemRegistDt: "",
      itemUpdateDt: "",

      itemNameEn: null,
      rootId: 0,
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
  },

  mounted() {
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || 0;
    this.itemTitle = this.mainItem.item_title || null;
    this.itemSubTitle = this.mainItem.item_sub_title || null;
    this.itemDetail = this.mainItem.item_detail || null;
    this.itemOrder = this.mainItem.item_order || 0;
    this.itemStatus = this.mainItem.status || 0;
    this.itemRegistDt = this.mainItem.regist_dt || null;
    this.itemUpdateDt = this.mainItem.update_dt || null;

    this.itemNameEn = this.rootItem.item_base_name_en;
    this.rootId = this.rootItem.item_id;
  },

  computed: {},
};
</script>
