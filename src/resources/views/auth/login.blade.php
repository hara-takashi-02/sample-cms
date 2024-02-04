@extends('auth_layouts.app')

@section('content')
    <div class="c-content loginContent">
        <div class="login">
            <h1 class="login__title">{{ __('ログイン') }}</h1>
            <form class="c-form" method="POST" action="{{ route('login') }}">
                @csrf

                <div class="login__item login__email">
                    <label for="name">ユーザー名</label>
                    <input id="name" type="name" class="c-input form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                    @error('name')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="login__item login__password">
                    <label for="password" class="">{{ __('Password') }}</label>
                    <input id="password" type="password" class="c-input form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <label class="login__item login__hold c-check" for="remember">
                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    <span class="c-check__dummy"></span>
                    <p class="txt">ログイン状態を保存する</p>
                </label>

                <button type="submit" class="c-formBtn">
                    {{ __('ログイン') }}
                </button>
                
                @if (Route::has('password.request'))
                <!--<a class="btn btn-link" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                </a>-->
                @endif
            </form>
        </div>
    </div>
@endsection