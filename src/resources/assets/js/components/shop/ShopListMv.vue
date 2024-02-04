<template>
  <div class="contentMv__item" :data-item_id="itemId">
      <div class="contentMv__mv">
        <h3 class="title">動画</h3>

        <div class="c-imgBox">
          <div class="c-imgBoxInner">
              <label>
                <input
                  :id="[itemNameEn + '_' + itemId + '_mv']"
                  name=""
                  type="file"
                  @change="uploadMv('item_movie', 'str', 'upMv', $event)"
                />
  
                <div v-if="!upMv" class="imgUp">
                  <p>ファイルをドラッグ、<br />もしくは選択してください。</p>
                </div>
  
                <div v-if="upMv" class="c-imgBoxView">
                  <video controls="" muted="" class="" :src="upMv"></video>
                </div>
              </label>
          </div>
        </div>

        <div class="c-btnSet">
          <label class="c-btn" :for="[itemNameEn + '_' + itemId + '_mv']">変更</label>
          <a
            @click="delFile('item_movie', 'str', 'upMv', $event)"
            class="c-btn c-btn--reset"
            >削除</a>
        </div>

      </div>

      <div class="contentMv__img">
        <h3 class="title">サムネイル画像</h3>

        <div class="c-imgBox">
          <div class="c-imgBoxInner">
              <label>
                <input
                  :id="[itemNameEn + '_' + itemId + '_img']"
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
          <label class="c-btn" :for="[itemNameEn + '_' + itemId + '_img']">変更</label>
          <a
            @click="delFile('item_photo', 'str', 'upImg', $event)"
            class="c-btn c-btn--reset"
            >削除</a>
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
      targetTbl: "item_list_movie",
      itemId: 0,
      itemRoot: 0,
      itemMv: "",
      itemPhoto: "",
      itemAlt: "",
      itemOrder: 0,
      itemStatus: 0,
      itemRegistDt: "",
      itemUpdateDt: "",

      itemNameEn: null,
      rootId: 0,

      upPathImg: global.globalVal[0].uploadFile,
      upImg: "",
      upPathMv: global.globalVal[0].uploadMv,
      upMv: "",
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
     * 動画処理
     */
    uploadMv(col, type, text, event) {
      if(event){
        let file = event.target.files[0];
        //console.log(file.type)
        if (file && file.type == 'video/mp4') {
          this[text] = URL.createObjectURL(file);
          this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, file.name, event);
        }
      };
    },

    /**
     * 画像処理
     */
    uploadFile(col, type, text, event) {
      if(event){
        let file = event.target.files[0];
        if (file && file.type != 'video/mp4') {
          this[text] = URL.createObjectURL(file);
          this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, file.name, event);
        }
      };
    },
    delFile(col, type, text, event) {
      this[text] = "";
      this.$emit("itemUpdate", this.targetTbl, col, this.itemId, type, null);
    },
  },

  mounted() {
    this.itemId = this.mainItem.item_id || null;
    this.itemRoot = this.mainItem.item_root || null;
    this.itemMv = this.mainItem.item_movie || null;
    this.itemPhoto = this.mainItem.item_photo || null;
    this.itemAlt = this.mainItem.item_alt || null;
    this.itemOrder = this.mainItem.item_order || 0;
    this.itemStatus = this.mainItem.item_status || 0;
    this.itemRegistDt = this.mainItem.regist_dt || null;
    this.itemUpdateDt = this.mainItem.update_dt || null;

    this.itemNameEn = this.rootItem.item_base_name_en;
    this.rootId = this.rootItem.item_id;

    this.upMv = this.itemMv ? this.upPathMv + this.itemMv : null;
    this.upImg = this.itemPhoto ? this.upPathImg + this.itemPhoto : null;
  },

  computed: {},

  created(){},
};
</script>
