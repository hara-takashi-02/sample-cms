<template>
  <div class="contentFree__item" :data-item_id="itemId">
    <div class="contentFree__main">

      <div class="c-radio">
        <ul>
          <li>
            <label :for="[itemNameEn + '_' + itemId + '_1']"
              ><input :id="[itemNameEn + '_' + itemId + '_1']" type="radio" name="" value="0" v-model="itemType" @change="itemUpdate('item_type', 'int', $event)" /><span
                >文章</span
              ></label
            >
          </li>
          <li>
            <label :for="[itemNameEn + '_' + itemId + '_2']"
              ><input :id="[itemNameEn + '_' + itemId + '_2']" type="radio" name="" value="1" v-model="itemType" @change="itemUpdate('item_type', 'int', $event)" /><span
                >コード</span
              ></label
            >
          </li>
        </ul>
      </div>

      <textarea v-model="itemDetail" class="c-textarea" @change="itemUpdate('item_detail', 'str', $event)"></textarea>

      <div v-if="itemType == 1">
        <p class="review c-btn" @click="review()">
          <span v-if="!reviewBtn">コードのレビューを表示</span>
          <span v-if="reviewBtn">コードのレビューを閉じる</span>
        </p>
        <p v-if="reviewBtn" class="widget" v-html="itemDetail"></p>
      </div>

    </div>
  </div>
</template>

<script>
//import draggable from "vuedraggable";

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
      targetTbl: "item_list_free",

      itemId: 0,
      itemRoot: 0,
      itemType: 0,
      itemDetail: "",
      itemOrder: "",
      itemStatus: 0,
      itemRegistDt: "",
      itemUpdateDt: "",

      itemNameEn: null,
      rootId: 0,

      reviewBtn: false,
    };
  },

  methods: {
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
     * サブコンテンツ れびゅー切り替え
     * ------------
     */
    review(){
      this.reviewBtn = !this.reviewBtn;
    },

  },

  mounted() {
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || null;
    this.itemType = this.mainItem.item_type || 0;
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
