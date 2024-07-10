import { BaseEntity } from "./base";

/* eslint-disable @typescript-eslint/ban-types */
export interface Course {
  pagingData: pagingData;
}

export interface pagingData {
  content: [CourseModel];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export class CourseModel extends BaseEntity {
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
  ngayKhaiGiang: string;
  ngayBeGiang: string;
  soQDKG: string;
  ngayQDKG: string;
  ngaySatHach: string;
  thoiGianDT: string;
  state: string;
  error: string;
  ngayGui: string;
  nguoiGui: string;
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
    this.ngayKhaiGiang = '';
    this.ngayBeGiang = '';
    this.soQDKG = '';
    this.ngayQDKG = '';
    this.ngaySatHach = '';
    this.thoiGianDT = '';
    this.isChecked = false;
    this.state = '';
    this.error = ';'
    this.ngayGui = '';
    this.nguoiGui = '';
  }
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
