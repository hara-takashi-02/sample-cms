<template>
  <div class="contentInfo__item" :data-item_id="itemId">
    <div class="c-delBtn" @click="delSubItem($event)">✕</div>
    
    <div class="contentInfo__main">
      <div class="c-radio">
        <ul>
          <li>
            <label :for="[itemNameEn + '_' + itemId + '_1']">
              <input v-model="itemType" :id="[itemNameEn + '_' + itemId + '_1']" type="radio" name="" value="1" @change="itemUpdate('item_type', 'int', $event)" />
              <span>タイプ1</span>
            </label>
          </li>
          <li>
            <label :for="[itemNameEn + '_' + itemId + '_2']">
              <input v-model="itemType" :id="[itemNameEn + '_' + itemId + '_2']" type="radio" name="" value="2" @change="itemUpdate('item_type', 'int', $event)" />
              <span>タイプ2</span>
            </label>
          </li>
        </ul>
      </div>

      <div class="contentInfo__text">
        <label class="">
          <input v-model="itemTitle" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_title', 'str', $event)" />
        </label>
        <textarea v-model="itemDetail" class="c-textarea" @change="itemUpdate('item_detail', 'str', $event)"></textarea>
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
      targetTbl: "item_list_info",

      itemId: 0,
      itemRoot: 0,
      itemType: 0,
      itemTitle: "",
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
    //console.log(this.mainItem)
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || null;
    this.itemType = this.mainItem.item_type || 0;
    this.itemTitle = this.mainItem.item_title || null;
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
