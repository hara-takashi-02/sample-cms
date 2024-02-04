$(function () {
  console.log("read commonjs");
});
//アンカーリンク スムーススクロール
$(function () {
  $('a[href^="#"]').not('.systemTab .js-systemTab').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

//topに戻るボタン
$(document).ready(function () {
  var showFlag = false;
  var topBtn = $('.js-backtop');
  (topBtn).css('opacity', '0');
  var showFlag = false;

  $(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
      if (showFlag == false) {
        showFlag = true;
        topBtn.stop().animate({ 'opacity': '1' }, 500);
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({ 'opacity': '0' }, 500);
      }
    }
  });

  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  $('.js-backtop').click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 400);
    return false;
  });
});

/* アコーディオン */
$(function () {
  var acBtn = $('.js-accordionBtn');
  acBtn.on('click', function () {
    $(this).next().slideToggle(200);
    $(this).toggleClass('open', 200);
  });
});

/* moreボタン */
$(function () {
  var acBtn = $('.js-moreBtn');
  acBtn.on('click', function () {
    $(this).prev().slideToggle(200);
    $(this).toggleClass('open', 200);
  });
});

// ハンバーガーメニュー
$(function () {

  var $hamburger_btn = $('#js-hamburger-btn');
  var $navin = $('#js-hamburger-gnav ');
  var $search_btn = $('#js-search-btn');
  var $nav2in = $('#js-search-gnav');
  var open = 'open'; // class

  $hamburger_btn.on('click', function () {
    if (!$hamburger_btn.hasClass(open)) {
      $hamburger_btn.addClass(open);
      $navin.addClass(open);
      $search_btn.removeClass(open);
      $nav2in.removeClass(open);
    } else {
      $hamburger_btn.removeClass(open);
      $navin.removeClass(open);
    }
  });

});

//swiper 必要なら設置
$(function () {
  if ($(".js-swiper-top").length) {
    let swiper = new Swiper('.js-swiper-top', {
      // 以下にオプションを設定
      loop: true, //最後に達したら先頭に戻る
      centeredSlides: true,
      slidesPerView: 1.5,
      spaceBetween: 20,
      autoplay: {
        delay: 2000,
      },

      //ページネーション表示の設定
      /*pagination: {
        el: '.swiper-pagination', //ページネーションの要素
        type: 'bullets', //ページネーションの種類
        clickable: true, //クリックに反応させる
      },
  
      //ナビゲーションボタン（矢印）表示の設定
      navigation: {
        nextEl: '.swiper-button-next', //「次へボタン」要素の指定
        prevEl: '.swiper-button-prev', //「前へボタン」要素の指定
      },
  
      //スクロールバー表示の設定
      scrollbar: {
        el: '.swiper-scrollbar', //要素の指定
      },*/
    })
  }

});

// modal
$(function () {
  $('.js-modal-open').on('click', function () {
    $('.js-modal').fadeIn();
    $('.js-modal-open').addClass("is-hidden");
    return false;
  });
  $('.js-modal-close').on('click', function () {
    $('.js-modal').fadeOut();
    $('.js-modal-open').removeClass("is-hidden");
    return false;
  });
});

//ページ内スクロールの位置微調整
$(function () {
  var headerHight = $("header").height();
  $('a[href^="#"]').click(function (e) {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - headerHight;
    $.when(
      $("html, body").animate({
        scrollTop: position
      }, 400, "swing"),
      e.preventDefault(),
    ).done(function () {
      var diff = target.offset().top - headerHight;
      if (diff === position) {
      } else {
        $("html, body").animate({
          scrollTop: diff
        }, 10, "swing");
      }
    });
  });
});

//タブ切り替え
const loadTab2 = () => {
  $tabBtn = $('.js-tubBtn');
  $tabItem = $('.js-tubItem');
  active = 'is-active';

  let tabBtn = document.querySelectorAll('.js-tubBtn');

  $tabBtn.on('click', function () {
    $($tabBtn).removeClass(active);
    $($tabItem).removeClass(active);
    $(this).addClass(active);
    var $index = $tabBtn.index(this);
    $tabItem.eq($index).addClass(active);
  });
}

/**
 * -------------
 * タブ切り替え(読み込み)
 * -------------
 * @param {*} tabBtn 
 * @param {*} tubItem 
 */
const tabChangeAuto = (tabBtns, tubItem) => {
  let url = location.pathname;
  url = url.split('/');
  pala = url.slice(1)[1];

  Object.keys(tabBtns).forEach((key) => {
    let tabBtn = tabBtns[key];
    let tabBtnUrl = tabBtns[key].children[0].href;
    tabBtnUrl = tabBtnUrl.split('/');
    tabBtnUrl = tabBtnUrl.slice(2)[2];

    tabChange(tabBtn, pala, tabBtnUrl);
  })
}

/**
 * -------------
 * タブ切り替え
 * -------------
 * @param {*} tabBtn 
 * @param {*} tabBtnUrl 
 */
const tabChange = (tabBtn, url, tabBtnUrl) => {
  tabBtn.classList.remove("is-active");
  if (url == tabBtnUrl) {
    tabBtn.classList.add("is-active");
  }
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
  item.classList.toggle('is-active');
  resultItem = dropItems[index].classList.toggle('is-active');
  if (resultItem == true) {
    dropItems[index].style.height = h + 'px';
  } else {
    dropItems[index].style.height = 0 + 'px';
  };

  return [resultItem, dropItems];
}

const logoutBtn = (e) => {
  //e.preventDefault();
  if(!window.confirm('ログアウトしますか？')){
    //window.alert('キャンセルされました'); 
    return false;
 }
  document.getElementById('logout-form').submit();
}

/**
 * 実行
 */
const loadAccordion = () => {

  //タブ切り替え
  let tabBtns = document.querySelectorAll('.js-tubBtn');
  let tubItems = document.querySelectorAll('.js-tubItem');
  tabChangeAuto(tabBtns, tubItems);

  tabBtns.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      tabBtns.forEach((item, index) => {
        item.classList.remove("is-active");
      })

      let targetHref = e.target.parentNode;
      targetHref.classList.add("is-active");
    }, false);
  })

  let dropBtns = document.querySelectorAll('.js-dropBtn');
  let dropItems = document.querySelectorAll('.js-dropItem');

  //アコーディオン(サブメニュー)
  dropBtns.forEach((item, index) => {
    let h = dropItems[index].offsetHeight;
    //console.log(h);

    let resultItem = true;
    [resultItem, dropItems] = accordion(h, item, index, dropItems, resultItem);

    item.addEventListener('click', (e) => {
      [resultItem, dropItems] = accordion(h, item, index, dropItems, resultItem);
    }, false);
  });

  //アコーディオン(メインメニュー)
  let sideBtn = document.querySelectorAll('.js-sideBtn')[0];
  let sideItem = document.querySelectorAll('.js-side')[0];

  let resultSideBtn = sideItem.classList.toggle('is-active');

  sideBtn.addEventListener('click', (e) => {
    resultSideBtn = sideItem.classList.toggle('is-active');
  }, false);
}
window.onload = loadAccordion;