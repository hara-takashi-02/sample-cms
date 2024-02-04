<!-------------------
home header
------------------->
@section('header_admin')
<header class="l-header">
    <h1 class="l-header__title">
        <p>管理画面サンプル</p>
    </h1>
    <div class="l-header__time">
        <span class="u-inline">【 管理者 : ゲスト 】</span>
        <span class="u-inline">最終同期更新：2023/07/11 22:26</span>
    </div>
    <a href="/" class="c-viewBtn">プレビュー</a>

    <a class="c-loginBtn js-logoutBtn"></a>
    <form id="logout-form" action="{{ route('logout') }}" method="POST">@csrf</form>
</header>
@endsection