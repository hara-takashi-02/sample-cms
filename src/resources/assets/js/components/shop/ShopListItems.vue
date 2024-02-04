<template>
  <div :class="[item.item_status == 1 ? 'is-grey mainItem mainItem--' + item.item_base_name_en : 'mainItem mainItem--' + item.item_base_name_en]">
    <!--{{ item }}-->

    <ShopListHead :mainItem="item" @showSwitch="showSwitch" @itemUpdate="itemUpdate" @itemUpdateCheck="itemUpdateCheck" @itemDel="itemDel" />

    <div v-if="disabled">
      <!-- ワードブロック -->
      <div v-if="item.item_base_name_en == 'info'" :class="['mainItem__main content' + item.item_base_name_en]">
        <draggable v-model="itemListInfo" :class="['content' + item.item_base_name_en + 'Inner']" item-key="item_id" :group="itemNameEn" @end="endSortItemList('item_list_info', 'item_order', $event)">
          <template #item="{ element }">
            <ShopListInfo
              :key="element.item_id"
              v-if="element.item_root == item.item_id && element.status < 2"
              :mainItem="element"
              :rootItem="item"
              @itemUpdate="itemUpdate"
              @itemUpdateCheck="itemUpdateCheck"
              @delSubItem="delSubItem"
            />
          </template>
        </draggable>

        <button block type="button" @click="addSubItem('item_list_info', item.item_id, $event)" class="c-btn c-btnAdd">項目を追加する</button>
      </div>

      <!-- フリーワード -->
      <div v-if="item.item_base_name_en == 'free'" :class="['mainItem__main content' + item.item_base_name_en]">
        <template v-for="subItem in itemListFree">
          <ShopListFree
            :key="subItem.item_id"
            v-if="subItem.item_root == item.item_id && subItem.status < 2"
            :mainItem="subItem"
            :rootItem="item"
            @itemUpdate="itemUpdate"
            @itemUpdateCheck="itemUpdateCheck"
          />
        </template>
      </div>

      <!-- 画像 -->
      <div v-if="item.item_base_name_en == 'img'" :class="['mainItem__main content' + item.item_base_name_en]">
        <template v-for="subItem in itemListImg">
          <ShopListImg
            :key="subItem.item_id"
            v-if="subItem.item_root == item.item_id && subItem.status < 2"
            :mainItem="subItem"
            :rootItem="item"
            @itemUpdate="itemUpdate"
            @itemUpdateCheck="itemUpdateCheck"
            @messegeEvent="messegeEvent"
          />
        </template>
      </div>

      <!-- 動画 -->
      <div v-if="item.item_base_name_en == 'mv'" :class="['mainItem__main content' + item.item_base_name_en]">
        <template v-for="subItem in itemListMv">
          <ShopListMv
            :key="subItem.item_id"
            v-if="subItem.item_root == item.item_id && subItem.status < 2"
            :mainItem="subItem"
            :rootItem="item"
            @itemUpdate="itemUpdate"
            @itemUpdateCheck="itemUpdateCheck"
            @messegeEvent="messegeEvent"
          />
        </template>
      </div>

      <!-- 用意するもの -->
      <div v-if="item.item_base_name_en == 'standby'" :class="['mainItem__main content' + item.item_base_name_en]">
        <draggable
          v-model="itemListStandby"
          :class="['content' + item.item_base_name_en + 'Inner']"
          item-key="item_id"
          :group="itemNameEn"
          @end="endSortItemList('item_list_standby', 'item_order', $event)"
        >
          <template #item="{ element }">
            <ShopListStandby
              :key="element.item_id"
              v-if="element.item_root == item.item_id && element.status < 2"
              :mainItem="element"
              :rootItem="item"
              @itemUpdate="itemUpdate"
              @itemUpdateCheck="itemUpdateCheck"
              @delSubItem="delSubItem"
            />
          </template>
        </draggable>

        <p>カテゴリ追加</p>
        <input class="c-input" type="text" v-model="ctgStandby" placeholder="カテゴリ" />
        <button block type="button" @click="addSubItem('item_list_standby', item.item_id, $event)" class="btnAddCtg">追加</button>
      </div>

      <!-- 質問 -->
      <div v-if="item.item_base_name_en == 'faq'" :class="['mainItem__main content' + item.item_base_name_en]">
        <draggable v-model="itemListFaq" :class="['content' + item.item_base_name_en + 'Inner']" item-key="item_id" :group="itemNameEn" @end="endSortItemList('item_list_faq', 'item_order', $event)">
          <template #item="{ element }">
            <ShopListFaq
              :key="element.item_id"
              v-if="element.item_root == item.item_id && element.status < 2"
              :mainItem="element"
              :rootItem="item"
              @itemUpdate="itemUpdate"
              @itemUpdateCheck="itemUpdateCheck"
              @delSubItem="delSubItem"
            />
          </template>
        </draggable>

        <button block type="button" @click="addSubItem('item_list_faq', item.item_id, $event)" class="c-btn c-btnAdd">項目を追加する</button>
      </div>

      <!-- グループ -->
      <div v-if="item.item_base_name_en == 'group'" :class="['mainItem__main content' + item.item_base_name_en]">
        <draggable
          v-model="itemListGroup"
          :class="['content' + item.item_base_name_en + 'Inner']"
          item-key="item_id"
          :group="itemNameEn"
          @end="endSortItemList('item_list_group', 'item_order', $event)"
        >
          <template #item="{ element }">
            <ShopListGroup
              :key="element.item_id"
              v-if="element.item_root == item.item_id && element.status < 2"
              :mainItem="element"
              :rootItem="item"
              @itemUpdate="itemUpdate"
              @itemUpdateCheck="itemUpdateCheck"
              @delSubItem="delSubItem"
            />
          </template>
        </draggable>

        <button block type="button" @click="addSubItem('item_list_group', item.item_id, $event)" class="c-btn c-btnAdd">項目を追加する</button>
      </div>

      <!-- コンタクト -->
      <div v-if="item.item_base_name_en == 'contact'" :class="['mainItem__main content' + item.item_base_name_en]">
        <template v-for="subItem in itemListContact">
          <ShopListContact
            :key="subItem.item_id"
            v-if="subItem.item_root == item.item_id && subItem.status < 2"
            :mainItem="subItem"
            :rootItem="item"
            @itemUpdate="itemUpdate"
            @itemUpdateCheck="itemUpdateCheck"
          />
        </template>
      </div>

      <textarea
        v-if="item.item_detail_status == '0'"
        v-model="item.item_detail"
        class="c-textarea"
        @change="itemUpdate('item_list', 'item_detail', item.item_id, 'str', $event.target.value, $event)"
        placeholder="サイトに設定した項目の下部にテキストを表示します。"
      ></textarea>
    </div>
    <!--disabled-->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import global from "../../global.js";

// 子コンポーネント
import ShopListHead from "./ShopListHead.vue";
// コンテンツ
import ShopListInfo from "./ShopListInfo.vue";
import ShopListFree from "./ShopListFreeWord.vue";
import ShopListImg from "./ShopListImg.vue";
import ShopListMv from "./ShopListMv.vue";
import ShopListSlide from "./ShopListSlide.vue";
import ShopListImgs from "./ShopListImgs.vue";
import ShopListRecep from "./ShopListRecep.vue";
import ShopListStandby from "./ShopListStandby.vue";
import ShopListFlow from "./ShopListFlow.vue";
import ShopListAccess from "./ShopListAccess.vue";
import ShopListFaq from "./ShopListFaq.vue";
import ShopListGroup from "./ShopListGroup.vue";
import ShopListSns from "./ShopListSns.vue";
import ShopListContact from "./ShopListContact.vue";
import ShopListPlayer from "./ShopListPlayer.vue";

export default {
  props: {
    item: {
      type: [Object, null],
    },
    disabled: {
      type: [Boolean, null],
    },
  },

  components: {
    draggable,
    ShopListHead,
    // コンテンツ
    ShopListInfo,
    ShopListFree,
    ShopListImg,
    ShopListMv,
    ShopListSlide,
    ShopListImgs,
    ShopListRecep,
    ShopListStandby,
    ShopListFlow,
    ShopListAccess,
    ShopListFaq,
    ShopListGroup,
    ShopListSns,
    ShopListContact,
    ShopListPlayer,
  },

  data: () => {
    return {
      loading: false, //ロード開始
      dummyId: 99, // フロントdummy用

      itemList: [],
      itemListBase: [],
      // コンテンツ
      itemListInfo: [],
      itemListFree: [],
      itemListImg: [],
      itemListMv: [],
      itemListSlide: [],
      itemListImgs: [],
      itemListRecep: [],
      itemListStandby: [],
      itemListFlow: [],
      itemListAccess: [],
      itemListFaq: [],
      itemListGroup: [],
      itemListSns: [],
      itemListContact: [],
      itemListPlayer: [],

      ctgRecep: "",
      ctgStandby: "",

      itemNameEn: "",
      addMainBtns: [], // コンテンツ追加ボタン
      viewMessage: false, //フラッシュメッセージ
      viewMessageErr: false,
      viewMessageText: null,
    };
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

    /**
     * ------------
     * メインコンテンツ 状態更新
     * ------------
     */
    viewUpdateSub() {
      // console.log("viewUpdateSub");
      let newlist = this.getState();
      this.itemListInfo = newlist.item_list_info;
      this.itemListFree = newlist.item_list_free;
      this.itemListImg = newlist.item_list_img;
      this.itemListMv = newlist.item_list_movie;
      this.itemListSlide = newlist.item_list_slide;
      this.itemListImgs = newlist.item_list_imgs;
      this.itemListRecep = newlist.item_list_recep;
      this.itemListStandby = newlist.item_list_standby;
      this.itemListFlow = newlist.item_list_flow;
      this.itemListAccess = newlist.item_list_access;
      this.itemListFaq = newlist.item_list_faq;
      this.itemListGroup = newlist.item_list_group;
      this.itemListSns = newlist.item_list_sns;
      this.itemListContact = newlist.item_list_contact;
      this.itemListPlayer = newlist.item_list_player;
    },

    /**
     * ------------
     * メインコンテンツ アイテム更新
     * ------------
     * @param {*} type 'int' or 'str'
     */
    itemUpdate(tbl, col, id, type, val, event) {
      if (type == "int") {
        val = Number(val);
      } else if (type == "str") {
        val = String(val);
      }
      this.state_editItem(tbl, col, id, val);

      console.log("DB => ", tbl, id, col, val);
      this.messegeEvent("UPDATE！", 0);
    },
    itemUpdateCheck(tbl, col, id, val) {
      let switchItem = val ? 1 : 0;
      this.state_editItem(tbl, col, id, switchItem);

      console.log("DB => ", tbl, id, col, switchItem);
      this.messegeEvent("UPDATE！", 0);
    },

    /**
     * ------------
     * メインコンテンツ アイテム削除
     * ------------
     */
    itemDel(tbl, id, event) {
      let list = [];
      let parentItem = event.target.parentNode.parentNode.parentNode;
      let parentItemRoot = parentItem.dataset.root_id;
      //console.log(parentItemRoot);

      if (!window.confirm("削除しますか？")) {
        return false;
      }

      switch (Number(parentItemRoot)) {
        case 1: // 詳細の場合
          break;
        case 2: // フリーテキストの場合
          this.state_delSubList("item_list_free", id);
          break;
        case 3: // 画像の場合
          this.state_delSubList("item_list_img", id);
          break;
        case 5: // 動画の場合
          break;
        default:
      }

      this.state_delList(tbl, id);
      this.$emit("viewUpdateMain");
      this.viewUpdateSub();

      console.log("DB => ", "item_list_free", id);
      console.log("DB => ", tbl, id);
      this.messegeEvent("UPDATE！", 0);
    },

    /**
     * ------------
     * メインコンテンツ アイテム並び替え
     * ------------
     */
    endSortItemList(tbl, col, event) {
      this.$emit("endSortItemList", tbl, col, event);
      //this.viewUpdateSub();
    },

    /**
     * ------------
     * メインコンテンツ 表示切替
     * ------------
     */
    showSwitch(id, event) {
      let parentItem = document.querySelectorAll('[data-item_id="' + id + '"].mainItemWrap')[0];
      parentItem.firstElementChild.classList.toggle("is-grey");
    },

    /**
     * ------------
     * サブコンテンツ 削除
     * ------------
     */
    delSubItem(tbl, id, event) {
      if (!window.confirm("削除しますか？")) {
        return false;
      }

      this.state_delList(tbl, id);
      this.viewUpdateSub();

      console.log("DB => ", tbl);
      this.messegeEvent("UPDATE！", 0);
    },

    /**
     * ------------
     * サブコンテンツ 追加
     * ------------
     */
    addSubItem(tbl, id, event) {
      this.dummyId++;
      let list = {
        // 追加IDを代入
        item_id: this.dummyId,
        item_root: id,
        item_type: 1,
        item_order: 0,
        status: 0,
      };

      switch (tbl) {
        case "item_list_recep": // 待遇の場合
          if (this.ctgRecep) {
            list["item_title"] = this.ctgRecep;
          } else {
            return;
          }
          break;
        case "item_list_standby": // 用意するものの場合
          if (this.ctgStandby) {
            list["item_title"] = this.ctgStandby;
          } else {
            return;
          }
          break;

        default:
      }
      this.state_pushList(tbl, list);
      this.viewUpdateSub();

      console.log("DB => ", tbl);
      this.messegeEvent("UPDATE！", 0);
    },

    /**
     * ------------
     * フラッシュメッセージ
     * ------------
     */
    messegeEvent(m, v) {
      this.$emit("messegeEvent", m, v);
    },
  },

  mounted() {
    //console.log('mounted_sub');
    this.viewUpdateSub();
  },

  computed: {},

  created() {
    //console.log("created")
  },
};
</script>
