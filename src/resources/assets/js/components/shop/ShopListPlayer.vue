<template>
  <div class="contentPlayer__item" :data-item_id="itemId">
    <div class="c-delBtn" @click="delSubItem($event)">✕</div>

    <div class="contentPlayer__main">
      <div class="contentPlayer__photo">
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
    
        <div class="btnSetPlayer">
          <label class="c-btn" :for="[itemNameEn + '_' + itemId + '_upImg']">変更</label>
          <a
            @click="delFile('item_photo', 'str', 'upImg', $event)"
            class="c-btn c-btn--reset"
            >削除</a>
        </div>
      </div>

      <div class="formSetPlayer">
        <div class="text1">
          <label>
            <p>役職</p>
            <input class="c-input" type="text" v-model="itemText1" placeholder="" @change="itemUpdate('item_text1', 'str', $event)" />
          </label>
        </div>
        <div class="text2">
          <label>
            <p>名前</p>
            <input class="c-input" type="text" v-model="itemText2" placeholder="" @change="itemUpdate('item_text2', 'str', $event)" />
          </label>
        </div>
        <div class="text3">
          <label>
            <p>年間売上</p>
            <input class="c-input" type="text" v-model="itemText3" placeholder="" @change="itemUpdate('item_text3', 'str', $event)" />
          </label>
        </div>
        <div class="text4">
          <label>
            <p>月間売上</p>
            <input class="c-input" type="text" v-model="itemText4" placeholder="" @change="itemUpdate('item_text4', 'str', $event)" />
          </label>
        </div>
      </div>
    </div>

    <div class="contentPlayer__text">
        <label class="itemUrl">
          <p>リンク</p>
          <input v-model="itemUrl" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_url', 'str', $event)" />
        </label>
        <label class="itemAlt">
          <p>画像名(alt)</p>
          <input v-model="itemAlt" class="c-input" type="text" mane="" placeholder="" @change="itemUpdate('item_alt', 'str', $event)" />
        </label>

        <div class="c-radio">
          <p>別タブ表示</p>
          <ul>
            <li>
              <label :for="[itemNameEn + '_' + itemId + '_1']">
                <input :id="[itemNameEn + '_' + itemId + '_1']" type="radio" name="" value="0" v-model="itemTarget" @change="itemUpdate('item_target', 'int', $event)" />
                <span>なし</span>
              </label>
            </li>
            <li>
              <label :for="[itemNameEn + '_' + itemId + '_2']">
                <input :id="[itemNameEn + '_' + itemId + '_2']" type="radio" name="" value="1" v-model="itemTarget" @change="itemUpdate('item_target', 'int', $event)" />
                <span>あり</span>
              </label>
            </li>
          </ul>
      </div>
    </div>

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
      targetTbl: "item_list_player",

      itemId: 0,
      itemRoot: 0,
      itemPhoto: "",
      itemUrl: "",
      itemTarget: 0,
      itemAlt: "",
      itemText1: "",
      itemText2: "",
      itemText3: "",
      itemText4: "",
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
      let parentItem = document.querySelectorAll('[data-item_id="' + this.itemId + '"].contentPlayer__item')[0];
      parentItem.classList.toggle("is-grey");
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
    this.itemUrl = this.mainItem.item_url || null;
    this.itemTarget = this.mainItem.item_target || 0;
    this.itemAlt = this.mainItem.item_alt || null;
    this.itemText1 = this.mainItem.item_text1 || null;
    this.itemText2 = this.mainItem.item_text2 || null;
    this.itemText3 = this.mainItem.item_text3 || null;
    this.itemText4 = this.mainItem.item_text4 || null;
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
