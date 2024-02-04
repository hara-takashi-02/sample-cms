<!-------------------
homeベース
------------------->

<!DOCTYPE html>
<html lang="ja">
@yield('head_site')
<body class="indexPage js-body">

<div class="c-particle"></div>
@yield('header_site')
@yield('content_site')
<!-- topに戻る -->
<div class="pageTopWrap">
<div class="pageTop js-backtop">
</div>
</div>
@yield('footer_site')
</body>

</html>