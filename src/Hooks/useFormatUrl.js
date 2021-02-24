import React from 'react';

function useFormatUrl (props) {
    props = props.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    props = props.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    props = props.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    props = props.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    props = props.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    props = props.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    props = props.replace(/đ/g,"d");
    props = props.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    props = props.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    props = props.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    props = props.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    props = props.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    props = props.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    props = props.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    props = props.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣ 
    props = props.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    props = props.replace(/ + /g,"-");
    props = props.trim();
    // Remove punctuations
    props = props.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g,"");
    props = props.replace(/ /g,"-");
    props = props.toLowerCase();
    return props;
}

export default useFormatUrl;