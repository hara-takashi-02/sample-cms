<!-------------------
home side
------------------->
@section('side_admin')
<div class="l-side js-side">
    <div class="l-side__btn js-sideBtn"></div>
    <ul>
        <li>
            <a class="js-dropBtn c-dropBtn">メイン</a>
            <ul class="js-dropItem c-dropItem js-linkBtns">
                <li class="js-tubBtnLink">
                    <router-link to="/home/main/basic">グループ1</router-link>
                </li>
                <li class="js-tubBtnLink js-addAction">
                    <router-link to="/home/main/shop">グループ2</router-link>
                </li>
                <li class="js-tubBtnLink">
                    <router-link to="/home/main/mail">グループ3</router-link>
                </li>
            </ul>
        </li>
        <li>
            <a class="js-dropBtn c-dropBtn">サブ</a>
            <ul class="js-dropItem c-dropItem js-linkBtns">
                <li>
                    <router-link to="/home/master/template">サブグループ1</router-link>
                </li>
                <li>
                    <router-link to="/home/master/editPage">サブグループ2</router-link>
                </li>
                <li>
                    <router-link to="/home/master/editCss">サブグループ3</router-link>
                </li>
                <li>
                    <router-link to="/home/master/editJs">サブグループ4</router-link>
                </li>
                <li>
                    <router-link to="/home/master/editImg">サブグループ5</router-link>
                </li>
                <li>
                    <router-link to="/home/master/editFront">サブグループ6</router-link>
                </li>
                <li>
                    <router-link to="/home/master/editModel">サブグループ7</router-link>
                </li>
                <li>
                    <router-link to="/home/master/createUser">サブグループ8</router-link>
                </li>
            </ul>
        </li>
    </ul>
</div>
@endsection