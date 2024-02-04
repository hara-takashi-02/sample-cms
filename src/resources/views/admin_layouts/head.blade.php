<!-------------------
home head
------------------->
@section('head_admin')
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'master') }}</title>
    <!--- google font --->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ mix('/css/app_admin.css') }}" rel="stylesheet">
    <link rel="shortcut icon" href="{{ asset('/images/favicon.ico') }}">
</head>
@endsection