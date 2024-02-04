/**
 * -------------
 * 初期設定
 * -------------
 */
const active = 'is-active';

/**
 * -------------
 * ログアウト
 * -------------
 * @param {*} e 
 * @returns 
 */
const actionLogout = (e) => {
  //e.preventDefault();
  if (!window.confirm('ログアウトしますか？')) {
    //window.alert('キャンセルされました'); 
    return false;
  }
  document.getElementById('logout-form').submit();
}

/**
 * -------------
 * スムーススクロール
 * -------------
 */
const smoothScroll = (e, anchor, height) => {
  e.preventDefault();
  let href = anchor.getAttribute('href');
  let target = document.getElementById(href.replace('#', ''));
  let targetPosition = target.getBoundingClientRect().top + window.scrollY - height;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * -------------
 * topスクロール
 * -------------
 */
const scrollTop = () => {
  window.scroll({ top: 0, behavior: "smooth" });
}

/**
 * -------------
 * 現在位置からナビを切り替え
 * -------------
 */
const currentNav = (y, position, nav) => {
  position.forEach((item, index) => {
    if (y > item.pos && y < item.pos + item.height) {
      nav.forEach((item, index) => {
        item.classList.remove('is-active');
      });
      nav[index].classList.add('is-active');
    };
  });
}

/**
 * -------------
 * topに戻る表示
 * -------------
 */
const pagetopBtn = document.querySelector(".js-backtop");
const scrollEvent = () => {
  let active = 'is-active';
  if (window.scrollY > 100) {
    //pagetopBtn.style.opacity = "1";
    pagetopBtn.classList.add(active);
  } else if (window.scrollY < 100) {
    //pagetopBtn.style.opacity = "0";
    pagetopBtn.classList.remove(active);
  }
}

/**
 * -------------
 * タブ表示切り替え(ボタン切り替え)
 * -------------
 * @param {*} target タブ
 * @param {*} href URLパス
 */
const tabChangeBtn = (target, href) => {
  target.forEach((item, index) => {
    item.classList.remove(active);
  })
  let targetTab = document.querySelectorAll('[data-tab="' + href + '"]')[0];
  targetTab ? targetTab.classList.add(active) : null;
}

/**
 * -------------
 * タブ表示切り替え(読み込み時)
 * -------------
 * @param {*} tabBtn 
 */
const tabChangeAuto = (tabBtns) => {
  let url = location.pathname;
  tabChangeBtn(tabBtns, url);
}

/**
 * -------------
 * タブグループ表示切替
 * -------------
 * @param {*} tabs タブグループ
 * @param {*} href /home/master/templateなど
 */
const changeTab = (tabs, href, title, tabTitle) => {
  if (tabTitle) {
    tabTitle.firstElementChild.textContent = tabTitle && title ? title : null;
  }

  tabs.forEach((tab, index) => {
    let group = tab.dataset.group;
    let bool = href.includes(group)

    if (bool == true) {
      tab.classList.add(active)
    } else {
      tab.classList.remove(active)
    }
  })
}

/**
 * -------------
 * アコーディオン
 * -------------
 * @param {*} h 
 * @param {*} item 
 * @param {*} index 
 * @param {*} dropItems 
 * @param {*} resultItem 
 * @returns 
 */
const accordion = (h, item, index, dropItems, resultItem) => {
  //console.log(resultItem)
  item.classList.toggle(active);
  resultItem = dropItems[index].classList.toggle(active);
  if (resultItem == true) {
    dropItems[index].style.height = h + 'px';
  } else {
    dropItems[index].style.height = 0 + 'px';
  };

  return [resultItem, dropItems];
}


/**
 * -------------
 * アイテムフィルター
 * -------------
 * @param {*} filterBtns 
 * @param {*} filterItems 
 * @param {*} hiddenClass 
 */
const filteringItems = (filterBtns, filterItems, hiddenClass) => {
  let count = 0;
  let showList = [];
  for (let i = 0; i < filterBtns.length; i++) {
    if (filterBtns[i].checked) {
      count++;
      showList.push(filterBtns[i].dataset.filter_ctg);
    }
  }
  if (count > 0) {
    filterItems.forEach((item, index) => {
      item.classList.add(hiddenClass);
    });
  } else {
    filterItems.forEach((item, index) => {
      item.classList.remove(hiddenClass);
    });
  };

  //押されたボタンのみ表示
  for (let i = 0; i < showList.length; i++) {
    let checkedItem = document.querySelectorAll('[data-filter_item="' + showList[i] + '"]');
    checkedItem.forEach(element => {
      element.classList.remove(hiddenClass);
    });
    //checkedItem.classList.remove(hiddenClass);
  }
}


/**
 * -------------
 * 実行
 * -------------
 */
const loadJs = () => {
  console.log("read loadJs");

  // .pagetopをクリックしたら
  pagetopBtn.addEventListener("click", scrollTop);
  // スクロールされたら表示
  window.addEventListener("scroll", scrollEvent);

  // ログアウト
  let logoutBtn = document.querySelectorAll('.js-logoutBtn')[0];
  logoutBtn.addEventListener('click', (e) => {
    actionLogout(e);
  }, false);

  //タブ切り替え用
  let tabBtns = document.querySelectorAll('.js-tubBtn');
  let tubBtnLinks = document.querySelectorAll('.js-tubBtnLink');
  // タブグループ切り替え用
  let linkBtns = document.querySelectorAll('.js-linkBtns li a');
  let tabGroup = document.querySelectorAll('[data-group]');
  let tabTitle = document.querySelectorAll('.js-tabTitle')[0];

  // 読み込み時タブ位置
  tabChangeAuto(tabBtns);

  // 読み込み時タブグループ位置

  // urlパス取得
  let url = location.pathname;
  // urlパス対応のリンク
  let linkHref = document.querySelectorAll('.js-linkBtns [href="' + url + '"]')[0];
  // urlパス対応のタブ
  let tabHref = document.querySelectorAll('.js-tabTitle [href="' + url + '"]')[0];
  // urlパス対応のタブ(親)
  let tabHrefParent = tabHref ? tabHref.parentNode : null;
  // urlパス対応のタブ(テキスト)
  let targetHref = linkHref.textContent;
  // シングルタブ
  let linkHrefSingle = document.querySelectorAll('.js-linkBtns--single a')[0];

  // シングルタブ名前変更
  linkHrefSingle.href = url;
  linkHrefSingle.textContent = targetHref;

  changeTab(tabGroup, url, targetHref, tabHrefParent);

  // 店舗情報タブボタン
  tabBtns.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let targetHref = e.target.getAttribute("href");
      tabChangeBtn(tabBtns, targetHref);
    }, false);
  })

  // 店舗情報リンクボタン
  tubBtnLinks.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      let targetHref = e.target.getAttribute("href");
      tabChangeBtn(tabBtns, targetHref);
    }, false);
  })

  // 管理者メニューリンクボタン
  linkBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      let title = e.target.textContent;
      let targetHref = e.target.getAttribute("href");
      changeTab(tabGroup, targetHref, title, tabTitle);
    }, false);
  })

  //アコーディオン(サブメニュー)
  let dropBtns = document.querySelectorAll('.js-dropBtn');
  let dropItems = document.querySelectorAll('.js-dropItem');

  dropBtns.forEach((item, index) => {
    let h = dropItems[index].offsetHeight;

    let resultItem = true;
    [resultItem, dropItems] = accordion(h, item, index, dropItems, resultItem);

    item.addEventListener('click', (e) => {
      [resultItem, dropItems] = accordion(h, item, index, dropItems, resultItem);
    }, false);
  });

  //アコーディオン(メインメニュー)
  let sideBtn = document.querySelectorAll('.js-sideBtn')[0];
  let sideItem = document.querySelectorAll('.js-side')[0];

  let resultSideBtn = sideItem.classList.toggle(active);

  sideBtn.addEventListener('click', (e) => {
    resultSideBtn = sideItem.classList.toggle(active);
  }, false);

}

// コンテンツ変動タイプ
const loadJsCotent = () => {
  console.log("read loadJsCotent");

  // コンテンツフィルター
  let filterBtns = document.querySelectorAll('.js-contentsFilter input');
  let filterItems = document.querySelectorAll('.js-filItem');

  filterBtns.forEach((item, index) => {
    let hiddenClass = 'is-hidden';

    item.addEventListener('click', function () {
      //ボタンが押されていれば全部非表示
      filteringItems(filterBtns, filterItems, hiddenClass);
    });
  });

  // 追加ボタン追従
  let boxHover = document.querySelectorAll('.js-boxHover');
  let addMainBtn = document.querySelectorAll('.js-addMainBtn')[0];
  //console.log(boxHover)

  boxHover.forEach((item, index) => {
    item.addEventListener('mouseenter', function () {
      let off = $(item).offset();
      let offTop = off.top - 135 + 'px';
      let order = item.dataset.item_order;
      addMainBtn.style.top = offTop;
      addMainBtn.dataset.order_positon = order;
    });
  });

  // 現在位置取得
  let itemPosithons = document.querySelectorAll('.js-positon');
  let itemCurrentNav = document.querySelectorAll('.js-currentNav');
  let positionList = [];

  itemPosithons.forEach((item, index) => {
    let itemId = item.dataset.item_id;
    let itemPosithon = item.getBoundingClientRect().top + window.scrollY;
    let itemHeight = item.offsetHeight;

    positionList[index] = [];
    positionList[index]['id'] = itemId;
    positionList[index]['pos'] = itemPosithon;
    positionList[index]['height'] = itemHeight;
  });

  // 現在位置からナビを切り替え
  window.addEventListener('scroll', () => {
    let y = window.scrollY;
    currentNav(y, positionList, itemCurrentNav);
  });

  // スムーススクロール
  let headerHeight = document.querySelector('header').offsetHeight;
  let offset = 80;
  document.querySelectorAll('.js-smooth').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      smoothScroll(e, anchor, headerHeight - offset);
    });
  });

}


window.addEventListener('load', () => {
  loadJs();
  loadJsCotent();
})

// 追加ボタンを押したとき
let addAction = document.querySelectorAll('.js-addAction');
addAction.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    loadJsCotent();
  }, false);
});