export default class Person {
    id = "";
    name = "";
    email = "";
    address = "";
    DoiTuong = "";
    tinhDiemTrungBinh = function () {
        return (this.diemToan * 1 + this.diemLy * 1 + this.diemHoa * 1) / 3;
    };
    tinhLuong = function () {
        return this.soNgayLamViec * 1 * this.luongTheoNgay * 1;
    };
}
class Student extends Person {
    diemToan = "";
    diemLy = "";
    diemHoa = "";
    constructor(id, name, email, address, DoiTuong) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.DoiTuong = DoiTuong;
    }
}
class Employee extends Person {
    soNgayLamViec = "";
    luongTheoNgay = "";
    constructor(id, name, email, address, DoiTuong) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.DoiTuong = DoiTuong;
    }
}
class Customer extends Person {
    tenCongTy = "";
    triGiaHoaDon = "";
    danhGia = "";
    constructor(id, name, email, address, DoiTuong) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.DoiTuong = DoiTuong;
    }
}