const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .js('resources/assets/js/common.js', 'public/js')
    .js('resources/assets/js/common_admin.js', 'public/js')
    .vue()
    .sass('resources/assets/sass/app_admin.scss', 'public/css')
    .sass('resources/assets/sass/app_site.scss', 'public/css')
    .sourceMaps();
