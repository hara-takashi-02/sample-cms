<template>
  <div class="contentImg__item" :data-item_id="itemId">
    <div class="c-radio">
      <ul>
        <li>
          <label :for="[itemNameEn + '_' + itemId + '_1']">
            <input :id="[itemNameEn + '_' + itemId + '_1']" type="radio" name="" value="0" v-model="itemType" @change="itemUpdate('item_type', 'int', $event)" />
            <span>タイプ1</span>
          </label>
        </li>
        <li>
          <label :for="[itemNameEn + '_' + itemId + '_2']">
            <input :id="[itemNameEn + '_' + itemId + '_2']" type="radio" name="" value="1" v-model="itemType" @change="itemUpdate('item_type', 'int', $event)" />
            <span>タイプ2</span>
          </label>
        </li>
      </ul>
    </div>

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

    <div class="c-btnSet">
      <label class="c-btn" :for="[itemNameEn + '_' + itemId + '_upImg']">変更</label>
      <a
        @click="delFile('item_photo', 'str', 'upImg', $event)"
        class="c-btn c-btn--reset"
        >削除</a>
    </div>

    <div class="contentImg__op">
      <div class="link">
        <label for="url">
          <span>サブタイトル</span>
          <input
            id="url"
            class="c-input"
            type="text"
            v-model="itemUrl"
            placeholder="url"
            @change="itemUpdate('item_url', 'str', $event)"
          />
        </label>
      </div>
    </div>

  </div>
</template>

<script>
//import draggable from "vuedraggable";
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
      targetTbl: "item_list_img",
      itemId: 0,
      itemRoot: 0,
      itemType: 0,
      itemPhoto: "",
      itemUrl: "",
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
     * 画像処理
     */
    uploadFile(col, type, text, event) {
      if(event){
        let file = event.target.files[0];
        console.log(file.name)
        if (file) {
          this[text] = URL.createObjectURL(file);
          this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, file.name);
        }
      }
    },
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
    this.itemUrl = this.mainItem.item_url || null;
    this.itemAlt = this.mainItem.item_alt || null;
    this.itemTarget = this.mainItem.item_target || 0;
    this.itemOrder = this.mainItem.item_order || 0;
    this.itemStatus = this.mainItem.item_status || 0;
    this.itemRegistDt = this.mainItem.regist_dt || null;
    this.itemUpdateDt = this.mainItem.update_dt || null;

    this.itemNameEn = this.rootItem.item_base_name_en;
    this.rootId = this.rootItem.item_id;

    this.upImg = this.itemPhoto ? this.upPath + this.itemPhoto : null;
  },

  computed: {},

  created(){},
};
</script>
