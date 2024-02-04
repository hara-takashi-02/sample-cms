<template>
  <div class="is-active c-content c-form mainContent">
    <p
      :class="{
        'c-message is-view': viewMessage,
        'c-message is-view-err': viewMessageErr,
        'c-message': !viewMessage && !viewMessageErr,
      }"
    >
      {{ viewMessageText }}
    </p>
    <div v-show="loading" class="loader">Now loading...</div>

    <h2 class="c-title">求人情報</h2>
    <form class="" v-on:submit.prevent="submit" v-show="!loading" method="POST" action="" enctype="multipart/form-data">
      <div class="mainFillter">
        <h3 class="title">絞り込み</h3>
        <p>絞り込みしたいタグをクリックしてください</p>
        <ul class="js-contentsFilter">
          <li v-for="item in itemListBase" :key="item.item_type">
            <label :for="['filterBtn_' + item.item_type]">
              <input :id="['filterBtn_' + item.item_type]" type="checkbox" name="" :data-filter_ctg="item.item_type" />
              <span>{{ item.item_name }}</span>
            </label>
          </li>
        </ul>
      </div>

      <!--<button class="c-formBtn mainShowAllBtn" type="button">一括表示反映</button>-->

      <!-- 各アイテム -->
      <draggable v-model="itemListNew" item-key="item_id" @end="endSortItemList('item_list', 'item_order', $event)" group="itemListNew" handle=".handle" :disabled="disabled">
        <template #item="{ element }">
          <div
            v-if="element.item_status < 2"
            class="mainItemWrap js-filItem js-boxHover js-positon handle"
            :id="'target'+element.item_id"
            :data-filter_item="element.item_root"
            :data-item_id="element.item_id"
            :data-root_id="element.item_root"
            :data-item_order="element.item_order"
          >
            <ShopList ref="ShopList" :item="element" :disabled="disabled" @messegeEvent="messegeEvent" @viewUpdateMain="viewUpdateMain" @endSortItemList="endSortItemList" />
          </div>
        </template>
      </draggable>

      <div class="c-addMainBtn js-addMainBtn" data-order_positon="0">
        <ul>
          <li v-for="btn in addMainBtns" :key="btn.item_id" :class="['js-addAction btn--' + btn.item_name_en]" @click="addItem(btn, targetTbl, $event)">
            <a data-type="1" data-ctg="0"> + {{ btn.item_name }} </a>
          </li>
        </ul>
      </div>

      <div class="c-footNav">
        <a href="#" class="c-formBtn mainSortBtn" @click="sortStart()">
          <template v-if="disabled">並び変えをする</template>
          <template v-if="!disabled">並び変え完了</template>
        </a>
      </div>
    </form>

    <div class="c-currentNav">
      <ul>
        <li v-for="btn in itemListNew">
          <a class="js-smooth js-currentNav" :href="['#target' + btn.item_id]">{{ btn.item_base_name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import global from "../../global.js";

// json(テスト)
import setItemList from "../../data/item_list.json";
import setItemListBase from "../../data/item_base_list.json";

import setItemListInfo from "../../data/item_list_info.json";
import setItemListFree from "../../data/item_list_free.json";
import setItemListImg from "../../data/item_list_img.json";
import setItemListMv from "../../data/item_list_movie.json";
import setItemListSlide from "../../data/item_list_slide.json";
import setItemListImgs from "../../data/item_list_imgs.json";
import setItemListRecep from "../../data/item_list_recep.json";
import setItemListStandby from "../../data/item_list_standby.json";
import setItemListFlow from "../../data/item_list_flow.json";
import setItemListAccess from "../../data/item_list_access.json";
import setItemListFaq from "../../data/item_list_faq.json";
import setItemListGroup from "../../data/item_list_group.json";
import setItemListSns from "../../data/item_list_sns.json";
import setItemListContact from "../../data/item_list_contact.json";
import setItemListPlayer from "../../data/item_list_player.json";

// 子コンポーネント
import ShopList from "./ShopListItems.vue";

export default {
  props: {},

  data: () => {
    return {
      loading: false, //ロード開始
      targetTbl: "item_list",
      dummyId: 0, // フロントdummy用
      disabled: true, // D&D制御用

      itemList: setItemList, // コンテンツ
      itemListBase: setItemListBase, // ベースコンテンツ

      itemListInfo: setItemListInfo, // 詳細
      itemListFree: setItemListFree, // フリー
      itemListImg: setItemListImg, // 画像
      itemListMv: setItemListMv, // 画像
      itemListSlide: setItemListSlide, // スライド
      itemListImgs: setItemListImgs, // 店内
      itemListRecep: setItemListRecep, // 待遇
      itemListStandby: setItemListStandby, // 用意するもの
      itemListFlow: setItemListFlow, // 入店フロー
      itemListAccess: setItemListAccess, // アクセス
      itemListFaq: setItemListFaq, // 質問
      itemListGroup: setItemListGroup, // グループ
      itemListSns: setItemListSns, // X(エックス)
      itemListContact: setItemListContact, // コンタクト
      itemListPlayer: setItemListPlayer, // プレイヤー

      itemListNew: setItemList, // コンテンツ+ベースコンテンツ
      itemNameEn: "",

      addMainBtns: [], // コンテンツ追加ボタン
      scrollY: 0,

      viewMessage: false, //フラッシュメッセージ
      viewMessageErr: false,
      viewMessageText: null,
    };
  },

  components: {
    draggable,
    ShopList,
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
     * メインコンテンツ 状態更新
     * ------------
     */
    viewUpdateMain() {
      let newlist = this.getState();
      console.log(newlist.item_list);
      let newlistSortTime = global.listSortTime(newlist.item_list, "regist_dt");
      let newlistSort = global.listSort(newlistSortTime, "item_order");
      this.itemListNew = newlistSort;

      //let newlist = this.getState();
      //this.itemListNew = newlist.item_list;
    },

    /**
     * ------------
     * スクロール量
     * ------------
     */
    /*getScroll() {
      this.scrollY = window.scrollY;
    },*/

    /**
     * ------------
     * 追加ボタン アイテム取得
     * ------------
     */
    addBtns(itemListNew) {
      return itemListNew.filter((item) => item.item_add_active == 0);
    },

    /**
     * ------------
     * メインコンテンツ アイテム取得
     * ------------
     */
    getItems() {
      // console.log("getItems");
      // baseと合成
      this.itemListNew.forEach((item, index) => {
        this.itemListBase.forEach((itemBase, index2) => {
          if (item.item_root == itemBase.item_type) {
            this.itemListNew[index]["item_base_name_en"] = itemBase.item_name_en;
            this.itemListNew[index]["item_base_name"] = itemBase.item_name;
            this.itemListNew[index]["item_add_active"] = itemBase.item_add_active;
            this.itemListNew[index]["item_detail_status"] = itemBase.item_detail_status;
            this.itemListNew[index]["item_menu_status"] = itemBase.item_menu_status;
            this.itemListNew[index]["item_base_status"] = itemBase.item_status;
          }
        });
      });
      return this.itemListNew;
    },

    /**
     * ------------
     * メインコンテンツ アイテム追加
     * ------------
     */
    addItem(btn, tbl, event) {
      this.state_putDummyID();
      let getStateList = this.getState();
      this.dummyId = getStateList.item_dummy_id;
      let list = [];
      let sublist = [];

      let orderPositon = document.querySelectorAll("[data-order_positon]")[0].dataset.order_positon;

      list = {
        // 追加IDを代入
        item_id: this.dummyId,
        item_root: Number(btn.item_type),
        item_base_name: btn.item_name,
        item_base_name_en: btn.item_name_en,
        item_order: Number(orderPositon),
        item_status: 0,
        regist_dt: global.getTime(),
      };

      sublist = {
        // 追加IDを代入
        item_id: this.dummyId,
        item_root: this.dummyId,
        item_type: 0,
        item_order: 0,
        status: 0,
        regist_dt: global.getTime(),
      };

      switch (btn.item_type) {
        case 1: // 詳細の場合
          break;
        case 2: // フリーテキストの場合
          this.state_pushList("item_list_free", sublist);
          break;
        case 3: // 画像の場合
          list["item_detail_status"] = 0;
          this.state_pushList("item_list_img", sublist);
          break;
        case 5: // 動画の場合
          list["item_detail_status"] = 0;
          this.state_pushList("item_list_movie", sublist);
          break;
        default:
      }
      this.state_pushList(tbl, list);
      this.viewUpdateMain();
      //this.$refs.ShopList.viewUpdateSub();

      this.messegeEvent("UPDATE！", 0);
      console.log("DB => ", tbl, "item_root: " + btn.item_type, "item_order: " + orderPositon);
    },

    /**
     * ------------
     * メインコンテンツ アイテム並び替え用ボタン
     * ------------
     */
    sortStart() {
      console.log(this.$store.state);
      this.disabled = !this.disabled;
    },

    /**
     * ------------
     * メインコンテンツ アイテム並び替え
     * ------------
     */
    endSortItemList(tbl, col, event) {
      let list = [];
      let eventList = event.from.children;

      Object.keys(eventList).forEach(function (key) {
        let id = eventList[key].dataset.item_id;
        list.push(id);
      });
      this.state_sortItem(tbl, col, list);
      this.viewUpdateMain();

      console.log("DB => ", tbl, list);
      this.messegeEvent("UPDATE！", 0);
    },

    /**
     * ------------
     * フラッシュメッセージ
     * ------------
     */
    messegeEvent(m, v) {
      this.viewMessageText = m;
      if (v == 0) {
        this.viewMessage = !this.viewMessage;
      } else {
        this.viewMessageErr = !this.viewMessageErr;
      }
      setTimeout(() => {
        this.viewMessage = false;
        this.viewMessageErr = false;
      }, 800);
    },
  },

  mounted() {
    console.log("mounted_main");
    let createAddBtn = this.addBtns(this.itemListBase);
    this.addMainBtns = createAddBtn;
  },

  computed: {
  },

  created() {
    this.getItems();
    console.log("created_main");

    let list = this.getState();
    this.dummyId = list.item_dummy_id;

    // 一回だけDBと同期(DBと連動後は多分連続OK)
    this.state_putList_first(this.itemListNew, "item_list");
    this.state_putList_first(this.itemListInfo, "item_list_info");
    this.state_putList_first(this.itemListFree, "item_list_free");
    this.state_putList_first(this.itemListImg, "item_list_img");
    this.state_putList_first(this.itemListMv, "item_list_movie");
    this.state_putList_first(this.itemListSlide, "item_list_slide");
    this.state_putList_first(this.itemListImgs, "item_list_imgs");
    this.state_putList_first(this.itemListRecep, "item_list_recep");
    this.state_putList_first(this.itemListStandby, "item_list_standby");
    this.state_putList_first(this.itemListFlow, "item_list_flow");
    this.state_putList_first(this.itemListAccess, "item_list_access");
    this.state_putList_first(this.itemListFaq, "item_list_faq");
    this.state_putList_first(this.itemListGroup, "item_list_group");
    this.state_putList_first(this.itemListSns, "item_list_sns");
    this.state_putList_first(this.itemListContact, "item_list_contact");
    this.state_putList_first(this.itemListPlayer, "item_list_player");

    this.$store.commit("first_flag");
  },
};
</script>
