// var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
var CURRENT_URL = window.location.pathname.split('#')[0].split('?')[0],
    $SIDEBAR_MENU = $('.sidebar-menu');

$(document).ready(function() {
    //check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('active').parents('ul').css({ display: "block" }).parent().addClass('menu-open');
});

/** 문자열 값이 없는지 여부 */
function isEmpty(str)
{
    return (!str || 0 === str.length);
}

/** 문자열 값이 없거나 빈 공간인지 여부 */
function isBlank(str)
{
    return (!str || /^\s*$/.test(str));
}

// 현재 시간 스트링으로 변환
function getCurrentTimeStamp() {
    var d = new Date();
    var s = leadingZeros(d.getFullYear(), 4) + '-' +
            leadingZeros(d.getMonth() + 1, 2) + '-' +
            leadingZeros(d.getDate(), 2) + ' ' +
            leadingZeros(d.getHours(), 2) + ':' +
            leadingZeros(d.getMinutes(), 2) + ':' +
            leadingZeros(d.getSeconds(), 2);

    return s;
  }

  function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if(n.length < digits) {
      for(i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }

/** 천 단위 컴마찍기  */
function numberWithCommas(x) {
    if (isBlank(x)) {
        return 0;
    }
    var parts = x.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

/** 천 단위 컴마 없애기  */
function numberWithoutCommas(x) {
    return x.toString().replace(/[^\d]+/g, "");
}

/** 숫자만 입력 */
function removeChar(event)
{
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
        return;
    else
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

/** 문자열 자르기 */
function textSlice (txt, x) {
    if (txt.length > x) return txt.substring(0, x) + '...'
    else return txt
}

/** Bootstrap Table Detail Formatter  */
function detailFormatter(index, row)
{
    var html = [];
    $.each(row, function (key, value) {
        html.push("<p><b>" + key + ":</b> " + value + "</p>");
    });
    return html.join("");
}

/** Bootstrap Table Price Formatter  */
function priceFormatter(value, row, index) {
    if(isBlank(value)) {
        return 0;
    } else {
        return numberWithCommas(value);
    }
}

/** Bootstrap Table Ratio Formatter  */
function ratioFormatter(value, row, index) {
    if(isBlank(value)) {
        return 0 + ' %';
    } else {
        return numberWithCommas(value) + ' %';
    }
}

function orderStatusValue(val) {
    return {
        'O110': '<span class="label label-gray">&nbsp;입금대기&nbsp;</span>',
        'O210': '<span class="label label-warning">&nbsp;출고요청&nbsp;</span>',
        'O220': '<span class="label label-warning">&nbsp;촐고요청&nbsp;</span>',
        'O230': '<span class="label label-warning">&nbsp;촐고요청&nbsp;</span>',
        'O310': '<span class="label label-info">&nbsp;출고준비중&nbsp;</span>',
        'O320': '<span class="label label-success">&nbsp;출고완료&nbsp;</span>',
        'O330': '<span class="label label-primary">&nbsp;배송완료&nbsp;</span>',
        'O340': '<span class="label label-primary">&nbsp;구매확정&nbsp;</span>',
        'O410': '<span class="label label-danger">&nbsp;취소&nbsp;</span>',
        'O420': '<span class="label label-danger">&nbsp;교환&nbsp;</span>',
        'O430': '<span class="label label-danger">&nbsp;반품&nbsp;</span>',
        'O440': '<span class="label label-danger">&nbsp;부분취소&nbsp;</span>'
    }[val];
}

function claimStatusValue(val) {
    return {
        'C110': '<span class="label label-white">&nbsp;취소요청&nbsp;</span>',
        'C120': '<span class="label label-white">&nbsp;취소승인&nbsp;</span>',
        'C130': '<span class="label label-white">&nbsp;취소완료&nbsp;</span>',
        'C140': '<span class="label label-white">&nbsp;주문취소&nbsp;</span>',
        'C150': '<span class="label label-white">&nbsp;부분취소&nbsp;</span>',
        'C190': '<span class="label label-white">&nbsp;취소거부&nbsp;</span>',
        'C210': '<span class="label label-white">&nbsp;교환요청&nbsp;</span>',
        'C220': '<span class="label label-white">&nbsp;교환접수&nbsp;</span>',
        'C230': '<span class="label label-white">&nbsp;교환수거중&nbsp;</span>',
        'C240': '<span class="label label-white">&nbsp;교환수거완료&nbsp;</span>',
        'C250': '<span class="label label-white">&nbsp;교환재배송&nbsp;</span>',
        'C260': '<span class="label label-white">&nbsp;교환완료&nbsp;</span>',
        'C270': '<span class="label label-white">&nbsp;교환철회&nbsp;</span>',
        'C290': '<span class="label label-white">&nbsp;교환거부&nbsp;</span>',
        'C310': '<span class="label label-white">&nbsp;반품요청&nbsp;</span>',
        'C320': '<span class="label label-white">&nbsp;반품접수&nbsp;</span>',
        'C330': '<span class="label label-white">&nbsp;반품수거중&nbsp;</span>',
        'C340': '<span class="label label-white">&nbsp;반품수거완료&nbsp;</span>',
        'C350': '<span class="label label-white">&nbsp;반품완료&nbsp;</span>',
        'C360': '<span class="label label-white">&nbsp;반품철회&nbsp;</span>',
        'C390': '<span class="label label-white">&nbsp;반품거부&nbsp;</span>'
    }[val];
}