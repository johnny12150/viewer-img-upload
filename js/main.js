/*
 * jQuery File Upload Plugin JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global $, window */

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: 'server/php/'
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    console.log(window.location.hostname);

    // if (window.location.hostname === '172.16.100.20') {
    if (window.location.hostname === 'upload.yolo.dev.annotation.taieol.tw') {
        var urls = ['http://172.16.100.20:8800/', 'http://img-server.yolo.dev.annotation.taieol.tw'];
        // Demo settings:
        $('#fileupload').fileupload('option', {
            // url: '//jquery-file-upload.appspot.com/',
            // url: 'http://172.16.100.20:8800/',
            url: urls[1],
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            maxFileSize: 999000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            // 增加載入動畫
            $('#fileupload').addClass('fileupload-processing');
            $.ajax({
                // url: '//jquery-file-upload.appspot.com/',
                // url: 'http://172.16.100.20:8800/',
                url: urls[1],
                // type: 'HEAD'
                type: 'GET',
                context: $('#fileupload')[0]
            }).always(function () {
                $(this).removeClass('fileupload-processing');
            }).done(function (data) {
                var data_obj = JSON.parse(data);
                // document.getElementById("fileupload").innerHTML = tmpl("template-download", data_obj);
                // 增加node.js顯示server上所有檔案的功能
                $(this).fileupload('option', 'done')
                    .call(this, $.Event('done'), {result: data_obj});
            }).fail(function () {
                $('<div class="alert alert-danger"/>')
                    .text('Upload server currently unavailable - ' + new Date())
                    .appendTo('#fileupload');
            });
        }
    } else {
        console.log($('#fileupload').fileupload('option', 'url'));

        // Load existing files:
        $('#fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('#fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('#fileupload')[0]
        }).always(function () {
            console.log($(this));
            console.log($('#fileupload')[0]);
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $(this).fileupload('option', 'done')
                .call(this, $.Event('done'), {result: result});
        });
    }

});
