import Vuex from "vuex";

// 状態管理
const shopList = new Vuex.Store({
    state: {
        item_dummy_id: 99,
        first_action: 0,
        //item_disabled: true,
        item_list: [],
        item_list_info: [],
        item_list_free: [],
        item_list_img: [],
        item_list_movie: [],
        item_list_slide: [],
        item_list_imgs: [],
        item_list_recep: [],
        item_list_standby: [],
        item_list_flow: [],
        item_list_access: [],
        item_list_faq: [],
        item_list_group: [],
        item_list_sns: [],
        item_list_contact: [],
        item_list_player: [],
    },
    getters: {},
    mutations: {
        // dummyID更新
        state_putDummyID(state) {
            state.item_dummy_id++
        },
        // disabled更新
        /*state_disabled(state) {
            state.item_disabled = !state.item_disabled
        },*/
        // 初回フラグ
        first_flag(state) {
            state.first_action = 1
        },
        // 置き換え(最初の一回のみ)
        state_putList_first(state, { list, tbl }) {
            if (state.first_action == 0) {
                state[tbl] = list
            };
        },
        // 置き換え
        state_putList(state, { list, tbl }) {
            state[tbl] = list
        },
        // 削除
        state_delList(state, { tbl, id }) {
            state[tbl] = state[tbl].filter((item) => item.item_id != id)
        },
        // 削除(サブアイテム)
        state_delSubList(state, { tbl, rootId }) {
            state[tbl] = state[tbl].filter((item) => item.item_root != rootId)
        },
        // 追加
        state_pushList(state, { tbl, addItem }) {
            let order = addItem.item_order;
            state[tbl].splice(order, 0, addItem);
        },
        // 更新
        state_editItem(state, { tbl, col, id, val }) {
            (state[tbl].filter((item) => item.item_id == id))[0][col] = val
        },
        // 並び替え
        state_sortItem(state, { tbl, col, list }) {
            Object.keys(list).forEach(function (key) {
                (state[tbl].filter((item) => item.item_id == list[key]))[0][col] = Number(key);
            });
        },
    },
    actions: {}
});

export default shopList;