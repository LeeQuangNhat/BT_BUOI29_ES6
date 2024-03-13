function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
let thongBao = document.querySelectorAll(".sp-thongbao");
function checkEmptyValue(value, idSpan) {
  if (value == "") {
    thongBao.forEach((span) => {
      if (span.id == idSpan) {
        span.innerHTML = "Vui lòng không bỏ trống trường hợp này";
        span.style.display = "inline-block";
      }
    });
    return false;
  } else {
    thongBao.forEach((span) => {
      if (span.id == idSpan) {
        span.style.display = "none";
      }
    });
    return true;
  }
}
const checkText = (value, idSpan) => {
  const regex = /^[a-zA-Z\s]*$/;
  // const removeVietnamese = removeVietnameseTones(value)
  if (regex.test(removeVietnameseTones(value))) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Vui lòng nhập đúng định dạng chữ";
    document.getElementById(idSpan).style.display = "inline-block";
    return false;
  }
}
function checkUser(value, idSpan) {
  var User = ["Sinh viên", "Nhân viên", "Khách hàng"];
  if (User.includes(value)) {
    document.getElementById(idSpan).innerHTML = "";
    document.getElementById(idSpan).style.display = "none";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML = "Vui lòng chọn người dùng";
    document.getElementById(idSpan).style.display = "inline-block";
    return false;
  }
}
function checkEmailValue(value, idSpan) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var isValid = regexEmail.test(value);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML = "Email không đúng định dạng";
    document.getElementById(idSpan).style.display = "inline-block";
    return false;
  }
}
function checkNumberValue(value, idSpan, min, max) {
  const numberRegex = /^\d+$/;
  const isValid = numberRegex.test(value);
  const display = document.getElementById(idSpan);
  if (!isValid) {
    display.innerHTML = "Vui lòng nhập đúng định dạng số";
    display.style.display = "inline-block";
  } else if (value < min || value > max) {
    display.innerHTML = `Vui lòng nhập giá trị từ ${min} đến ${max}`;
    display.style.display = "inline-block";
    isValid = false;
  } else {
    display.innerHTML = "";
    display.style.display = "none";
  }
  return isValid;
}
