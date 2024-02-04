<template>
  <div class="contentStandby__item" :data-item_id="itemId">
    <div class="contentStandby__main">
      {{ itemTitle }}
    </div>
    <div class="c-delBtn" @click="delSubItem($event)">✕</div>
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
      targetTbl: "item_list_standby",

      itemId: 0,
      itemRoot: 0,
      itemTitle: "",
      itemOrder: 0,
      itemStatus: 0,
      itemDetail: "",
      itemOrder: 0,

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
     * サブコンテンツ アイテム削除
     * ------------
     */
    delSubItem(event) {
      this.$emit("delSubItem", this.targetTbl, this.itemId, event);
    },

  },

  mounted() {
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || null;
    this.itemTitle = this.mainItem.item_title || null;
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
