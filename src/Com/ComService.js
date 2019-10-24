function chkNum(str) {
    const reg = /[0-9]/g

    if (reg.test(str))  return true;

    return false;
}

function chkEng(str) {
    const reg = /[A-Za-z]/g

    if (reg.test(str))  return true;

    return false;
}

function chkKor(str) {
    const reg = /[ㄱ-ㅎ가-힣]/g

    if (reg.test(str))  return true;

    return false;
}

function chkSpecialStr(str) {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi

    if (reg.test(str))  return true;

    return false;
}

function chkEmail(str) {
    const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (reg.test(str))  return true;

    return false;
}

function chkId(str) {
    const reg = /^[.A-Za-z0-9]*$/

    if (reg.test(str))  return true;

    return false;
}

function getTodayDt() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0' + dd;
    }

    if(mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '.' + mm + '.' + dd;

    return today;
}

export {
    chkNum,
    chkEng,
    chkKor,
    chkSpecialStr,
    chkEmail,
    chkId
}