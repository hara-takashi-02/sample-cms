<template>
  <div class="contentContact__item" :data-item_id="itemId">
    <div class="contentContact__main">

      <div class="contentContact__text">
        <label class="tel">
          <span>電話番号</span>
          <input v-model="itemTel" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_tel', 'str', $event)" />
        </label>
        <label class="line">
          <span>LINE ユーザー名</span>
          <input v-model="itemLine" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_line', 'str', $event)" />
        </label>
        <label class="lineUrl">
          <span>LINE URL</span>
          <input v-model="itemLineUrl" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_line_url', 'str', $event)" />
        </label>
        <label class="formUrl">
          <span>外部フォームURL</span>
          <input v-model="itemForm" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_form', 'str', $event)" />
        </label>
        <label class="formType">
          <span>フォーム設置</span>
          <div class="c-radio">
            <ul>
              <li>
                <label :for="[itemNameEn + '_' + itemId + '_1']"
                  ><input :id="[itemNameEn + '_' + itemId + '_1']" type="radio" name="" value="0" v-model="itemType" @change="itemUpdate('item_type', 'int', $event)" /><span
                    >表示</span
                  ></label
                >
              </li>
              <li>
                <label :for="[itemNameEn + '_' + itemId + '_2']"
                  ><input :id="[itemNameEn + '_' + itemId + '_2']" type="radio" name="" value="1" v-model="itemType" @change="itemUpdate('item_type', 'int', $event)" /><span
                    >非表示</span
                  ></label
                >
              </li>
            </ul>
          </div>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
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
      targetTbl: "item_list_contact",

      itemId: 0,
      itemRoot: 0,
      itemType: 0,
      itemTel: "",
      itemLine: "",
      itemLineUrl: "",
      itemForm: "",
      itemOrder: 0,
      itemStatus: 0,
      itemRegistDt: "",
      itemUpdateDt: "",

      itemNameEn: null,
      rootId: 0,
    };
  },

  components: {
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
    this.itemRoot = this.mainItem.item_root || null;
    this.itemType = this.mainItem.item_type || 0;
    this.itemTel = this.mainItem.item_tel || null;
    this.itemLine = this.mainItem.item_line || null;
    this.itemLineUrl = this.mainItem.item_line_url || null;
    this.itemForm = this.mainItem.item_form || null;
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
