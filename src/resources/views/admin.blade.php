<!-------------------
home本体
------------------->

@extends('admin_layouts.app')
@include('admin_layouts.head', [])
@include('admin_layouts.header', [])
@include('admin_layouts.side', [])

@section('content_admin')
<div class="l-content">

    <ul class="c-tabBtns js-linkBtns" data-group="main">
        <li class="js-tubBtn" data-tab="/home/main/basic">
            <router-link to="/home/main/basic">グループ1</router-link>
        </li>
        <li class="js-tubBtn js-addAction" data-tab="/home/main/shop">
            <router-link to="/home/main/shop">グループ2</router-link>
        </li>
        <li class="js-tubBtn" data-tab="/home/main/mail">
            <router-link to="/home/main/mail">グループ3</router-link>
        </li>
    </ul>

    <ul class="c-tabBtns c-tabBtns--single js-linkBtns js-linkBtns--single" data-group="master">
        <li class="js-tabTitle">
            <router-link to="/home/master/template">情報</router-link>
        </li>
    </ul>

    <router-view auth_type="{{$auth_type}}"></router-view>
</div>
@endsection

@include('admin_layouts.footer', [])