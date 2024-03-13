import ListUser from "./listUser.js";
import Person from "./person.js";
document.querySelector(".btn_update").disabled = true;
function showDoiTuong() {
    let chonDoiTuong = document
        .getElementById("DoiTuong")
        .selectedOptions[0].getAttribute("name");
    console.log(chonDoiTuong);
    let id = ["sinhVien", "nhanVien", "khachHang"];
    id.forEach(function (id) {
        document.getElementById(id).style.display = "none";
    });
    function show(id) {
        document.getElementById(id).style.display = "block";
    }
    show(chonDoiTuong);
}

let user = new ListUser();
function addUser(showcheckID) {
    const arrField = document.querySelectorAll(
        ".account input,.account select,.account textarea"
    );
    console.log(arrField);
    let person = new Person();
    console.log(person);
    arrField.forEach((field, index) => {
        let { id, value } = field;
        person[id] = value;
    });
    let isValid = true;
    if (showcheckID) {
        isValid &=
            checkEmptyValue(person.id, "tbId") &&
            checkNumberValue(person.id, "tbId") &&
            checkID(person.id, "tbId");
    }
    isValid &=
        checkEmptyValue(person.name, "tbName") && checkText(person.name, "tbName");
    isValid &=
        checkEmptyValue(person.email, "tbEmail") &&
        checkEmailValue(person.email, "tbEmail");
    isValid &= checkEmptyValue(person.address, "tbAddress");
    isValid &= checkUser(person.DoiTuong, "tbDoiTuong");
    if (person.DoiTuong == "Sinh viên") {
        isValid &=
            checkEmptyValue(person.diemToan, "tbDiemToan") &&
            checkNumberValue(person.diemToan, "tbDiemToan", 0, 10);
        isValid &=
            checkEmptyValue(person.diemLy, "tbDiemLy") &&
            checkNumberValue(person.diemLy, "tbDiemLy", 0, 10);
        isValid &=
            checkEmptyValue(person.diemHoa, "tbDiemHoa") &&
            checkNumberValue(person.diemHoa, "tbDiemHoa", 0, 10);
    } else if (person.DoiTuong == "Nhân viên") {
        isValid &=
            checkEmptyValue(person.soNgayLamViec, "tbSoNgayLamViec") &&
            checkNumberValue(person.soNgayLamViec, "tbSoNgayLamViec");
        isValid &=
            checkEmptyValue(person.luongTheoNgay, "tbLuongTheoNgay") &&
            checkNumberValue(person.luongTheoNgay, "tbLuongTheoNgay");
    } else {
        isValid &= checkEmptyValue(person.tenCongTy, "tbTenCongTy");
        isValid &=
            checkEmptyValue(person.triGiaHoaDon, "tbTriGiaHoaDon") &&
            checkNumberValue(person.triGiaHoaDon, "tbTriGiaHoaDon");
    }
    if (isValid) {
        return person;
    }
}
document.querySelector(".btn_submit").onclick = function () {
    let person = addUser(true);
    if (person) {
        user.addUserToList(person);
        reset(false, "hide", true);
        showDoiTuong();
    }
};
const renderUser = (arrUser = user.listUser) => {
    let contentFull = "";
    let contentResponsive = "";
    arrUser.forEach((User) => {
        let newUser = new Person();
        newUser = { ...newUser, ...User };
        const {
            id,
            name,
            address,
            email,
            DoiTuong,
            diemToan,
            diemLy,
            diemHoa,
            soNgayLamViec,
            luongTheoNgay,
            tenCongTy,
            triGiaHoaDon,
            danhGia,
        } = newUser;
        let nguoiDung = "";
        if (DoiTuong == "Sinh viên") {
            nguoiDung = `
            <p class="mb-0">Điểm toán: ${diemToan}</p>
            <p class="mb-0">Điểm lý: ${diemLy}</p>
            <p class="mb-0">Điểm hóa: ${diemHoa}</p>
            <p class="mb-0">Điểm trung bình: ${newUser.tinhDiemTrungBinh()}</p>
            `;
        } else if (DoiTuong == "Nhân viên") {
            nguoiDung = `
            <p class="mb-0">Số ngày làm việc: ${soNgayLamViec}</p>
            <p class="mb-0">Lương theo ngày: ${luongTheoNgay}</p>
            <p class="mb-0">Tổng lương: ${newUser.tinhLuong()}$</p>
             `;
        } else if (DoiTuong == "Khách hàng") {
            nguoiDung = `
            <p class="mb-0">Tên công ty: ${tenCongTy}</p>
            <p class="mb-0">Trị giá hóa đơn: ${triGiaHoaDon}</p>
            <p class="mb-0">Đánh giá: ${danhGia}</p>`;
        }
        contentFull += `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${address}</td>
            <td>${email}</td>
            <td>${DoiTuong}</td>
            <td class="text-start">${nguoiDung}</td>
            <td>
            <button onclick="deleteUser('${id}')" type="button" class="btn btn-danger my-2">Xoá</button>
            <button onclick="getDetailUser('${id}')" class="btn btn-warning my-2" type="button">Sửa</button>
            </td>
        </tr>
        `;
        contentResponsive += `
        <tr>
            <td>${id}</td>
            <td class="text-start">
                <p class="mb-0">Tên: ${name}</p>
                <p class="mb-0">Địa chỉ: ${address}</p>
                <p class="mb-0">Email: ${email}</p>
                <p class="mb-0">Người dùng: ${DoiTuong}</p>
                ${nguoiDung}
            </td>
            <td>
            <button onclick="deleteUser('${id}')" type="button" class="btn btn-danger my-2">Xoá</button>
            <button onclick="getDetailUser('${id}')" class="btn btn-warning my-2" type="button">Sửa</button>
            </td>
        </tr>
        `;
    });
    document.querySelector(".info .display_full tbody").innerHTML = contentFull;
    document.querySelector(".info .display_responsive tbody").innerHTML =
        contentResponsive;
};
function saveDataLocal() {
    let stringData = JSON.stringify(user.listUser);
    localStorage.setItem("arrUser", stringData);
}
function getDataLocal() {
    let stringData = localStorage.getItem("arrUser");
    if (stringData) {
        user.listUser = JSON.parse(stringData);
        renderUser();
    }
}
getDataLocal();
function deleteUser(idUser) {
    let index = user.listUser.findIndex((user, index) => {
        return user.id == idUser;
    });
    if (index != -1) {
        user.deleteUser(index);
        saveDataLocal();
        renderUser();
    }
}
let getDetailUser = (idUser) => {
    let index = user.listUser.find((user, index) => {
        return user.id == idUser;
    });
    if (index) {
        const arrField = document.querySelectorAll(
            ".account input,.account select,.account textarea"
        );
        arrField.forEach((field) => {
            let { id } = field;
            field.value = index[id];
        });
    }
    reset(true, "show", false);
    document.querySelector(".btn_adduser").disabled = true;
    document.querySelector(".btn_update").disabled = false;
    showDoiTuong();
};
document.querySelector(".btn_update").onclick = () => {
    let person = addUser(false);
    let index = user.listUser.findIndex((item) => item.id === person.id);
    if (index !== -1) {
        user.updateUser(person, index);
        reset(false, "hide", true);
    }
    document.querySelector(".btn_adduser").disabled = false;
};
let reset = (boolean, render, save) => {
    if (save) {
        renderUser();
        saveDataLocal();
        document.getElementById("formUser").reset();
    }
    $("#exampleModal").modal(render);
    document.getElementById("id").readOnly = boolean;
};
window.onload = () => {
    window.deleteUser = (idUser) => {
        deleteUser(idUser);
    };
    window.getDetailUser = (idUser) => {
        getDetailUser(idUser);
    };
    window.showDoiTuong = () => {
        showDoiTuong();
    };
};
let filter = document.getElementById("filter");
filter.onchange = function () {
    const value = filter.value;
    let filterUser = user.listUser;
    if (value !== "All") {
        filterUser = filterUser.filter(function (user) {
            return user.DoiTuong == value;
        });
    }
    renderUser(filterUser);
};
const txtSearch = document.getElementById("txtSearch");
txtSearch.oninput = () => {
    const keyword = removeVietnameseTones(txtSearch.value.trim().toLowerCase());
    const arrUserFilter = user.listUser.filter((User) =>
        removeVietnameseTones(User.name.trim().toLowerCase()).includes(keyword)
    );
    renderUser(arrUserFilter);
    console.log(arrUserFilter);
};
const txtSort = document.getElementById("txtSort");
txtSort.onchange = () => {
    const sort = txtSort.value;
    if (sort == "a-z" || sort == "z-a") {
        const sortListUser = user.listUser.sort((a, b) => {
            const nameA = removeVietnameseTones(a.name);
            const nameB = removeVietnameseTones(b.name);
            return sort == "a-z" ? (nameA > nameB ? 1 : -1) : nameA < nameB ? 1 : -1;
        });
        console.log(sortListUser);
        renderUser(sortListUser);
    } else {
        renderUser(user.listUser);
    }
};
document.querySelector(".close").onclick = () => {
    document.getElementById("formUser").reset();
    document.getElementById("id").readOnly = false;
    document.querySelector(".btn_adduser").disabled = false;
    const thongBao = document.querySelectorAll(".sp-thongbao");
    thongBao.forEach((span) => {
        span.innerHTML = "";
        span.style.display = "none";
    });
    showDoiTuong();
};
function checkID(value, idSpan) {
    const getInfoId = [];
    user.listUser.forEach((user) => {
        getInfoId.push(user.id);
    });
    console.log(getInfoId);
    if (getInfoId.includes(value)) {
        document.getElementById(idSpan).innerHTML = "Mã số này đã tồn tại";
        document.getElementById(idSpan).style.display = "inline-block";
        return false;
    } else {
        document.getElementById(idSpan).innerHTML = "";
        return true;
    }
}
