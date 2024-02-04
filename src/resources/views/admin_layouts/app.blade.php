<!-------------------
homeベース
------------------->

<!doctype html>
<html lang="ja">
@yield('head_admin')

<body class="adminPage">
    @yield('header_admin')
    <main class="l-main" id="app">
        @yield('side_admin')
        @yield('content_admin')
    </main>
    @yield('footer_admin')
</body>

</html>