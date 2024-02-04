<template>
  <div class="mainItem__head">
    <h3 class="mainItem__title">{{ itemBaseName }}</h3>

    <label class="titleForm">
      <span>タイトル</span>
      <input class="c-input" type="text" mane="" v-model="itemTitle" placeholder="" @change="itemUpdate('item_title', 'str', $event)" />
    </label>

    <label :for="['switch' + itemBaseNameEn + itemId]" class="c-switch" @change="itemUpdateCheck('item_status', $event)">
      <div class="inner">
        <input type="checkbox" :id="['switch' + itemBaseNameEn + itemId]" value="1" :checked="itemStatus" />
        <div class="slider"></div>
        <div class="base"></div>
        <ul class="label">
          <li>表示</li>
          <li>非表示</li>
        </ul>
      </div>
    </label>
    <div
      :class="{
        'c-delBtn': itemAddActive === 0,
        'c-delBtn is-hidden': itemAddActive === 1,
      }"
      @click="itemDel(targetTbl, itemId, $event)"
    >
      ✕
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ShopListHead",
  props: {
    mainItem: {
      type: [Object, null],
    },
  },

  data: () => {
    return {
      targetTbl: "item_list",

      itemId: 0,
      itemRoot: 0,
      itemTitle: "",
      itemSubTitle: "",
      itemDetail: "",
      itemOthers: "",
      itemOrder: 0,
      itemMenuStatus: 0,
      itemStatus: 0,
      registDt: "",
      updateDt: "",

      itemBaseNameEn: "",
      itemBaseName: "",
      itemAddActive: 0,
      itemDetailStatus: 0,
    };
  },

  methods: {
    /**
     * ------------
     * ステート更新用
     * ------------
     */
    state_putList(plus, text){
      this.$store.commit('state_putList', {plus, text});
    },
    state_editItem(plus, tbl, id, col){
      this.$store.commit('state_editItem', {plus, tbl, id, col});
    },
    state_pushList(plus, text){
      this.$store.commit('state_pushList', {plus, text});
    },

    /**
     * ------------
     * メインコンテンツ アイテム削除
     * ------------
     */
    itemDel(tbl, id, event) {
      this.$emit("itemDel", tbl, id, event);
    },

    /**
     * ------------
     * メインコンテンツ アイテム更新
     * ------------
     */
    itemUpdate(col, type, event) {
      this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, event.target.value, event);
    },
    itemUpdateCheck(col, event) {
      this.$emit("itemUpdateCheck", this.targetTbl, col, this.itemId, event.target.checked);
      this.$emit("showSwitch", this.itemId, event);
    },

  },

  mounted() {
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || null;
    this.itemTitle = this.mainItem.item_title || null;
    this.itemSubTitle = this.mainItem.item_sub_title || null;
    this.itemDetail = this.mainItem.item_detail || null;
    this.itemOthers = this.mainItem.item_others || null;
    this.itemOrder = this.mainItem.item_order || 0;
    this.itemMenuStatus = this.mainItem.item_menu_status || 0;
    this.itemStatus = this.mainItem.item_status || 0;
    this.registDt = this.mainItem.regist_dt || null;
    this.updateDt = this.mainItem.update_dt || null;

    this.itemBaseNameEn = this.mainItem.item_base_name_en || null;
    this.itemBaseName = this.mainItem.item_base_name || null;
    this.itemAddActive = this.mainItem.item_add_active || 0;
    this.itemDetailStatus = this.mainItem.item_detail_status || 0;
  },
};
</script>
