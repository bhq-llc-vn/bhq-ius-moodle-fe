import { BaseEntity } from "./base";

/* eslint-disable @typescript-eslint/ban-types */
export interface Course {
  pagingData: pagingData;
}

export interface pagingData {
  content: [courseContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export class courseContent extends BaseEntity {
  id: number;
  uuid: string;
  soCMT: string;
  soCMTCu: string;
  maBCI: string;
  maSoGTVT: string;
  tenSoGTVT: string;
  maCSDT: string;
  tenCSDT: string;
  maKhoaHoc: string;
  tenKhoaHoc: string;
  maHangDaoTao: string;
  hangGPLX: string;
  soBCI: string;
  luuLuong: string;
  soHocSinh: string;
  ngayKhaiGiang: Date;
  ngayBeGiang: Date;
  soQDKG: string;
  ngayQDKG: Date;
  ngaySatHach: Date;
  thoiGianDT: string;
  isChecked: Boolean;

  constructor() {
    super();

    this.id = 0;
    this.uuid = '';
    this.soCMT = '';
    this.soCMTCu = '';
    this.maBCI = '';
    this.maSoGTVT = '';
    this.tenSoGTVT = '';
    this.maCSDT = '';
    this.tenCSDT = '';
    this.maKhoaHoc = '';
    this.tenKhoaHoc = '';
    this.maHangDaoTao = '';
    this.hangGPLX = '';
    this.soBCI = '';
    this.luuLuong = '';
    this.soHocSinh = '';
    this.ngayKhaiGiang = new Date();
    this.ngayBeGiang = new Date();
    this.soQDKG = '';
    this.ngayQDKG = new Date();
    this.ngaySatHach = new Date();
    this.thoiGianDT = '';
    this.isChecked = false;
  }
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
