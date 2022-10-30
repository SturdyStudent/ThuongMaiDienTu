CREATE DATABASE QLSach
GO

USE QLSach
GO

/****** Object:  Table [dbo].[DummyCD]    Script Date: 10/22/2022 12:55:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ChuDe](
	[MaChuDe] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[TenChuDe] [nvarchar](50) NULL,
)
GO


CREATE TABLE [dbo].[KhachHang](
	[MaKH] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[HoTen] [nvarchar](50) NULL,
	[TaiKhoan] [nvarchar](50) NULL,
	[MatKhau] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](max) NULL,
	[DienThoai] [nvarchar](20) NULL,
	[GioiTinh] [nvarchar](3) NULL,
	[NgaySinh] [date] NULL,
)
GO


CREATE TABLE [dbo].[NhanVien](
	[MaNV] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[HoTenNV] [nvarchar](50) NULL,
	[NgaySinh] [date] NULL,
	[GioiTinh] [nvarchar](3) NULL,
	[Sdt] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](50) NULL,
)
GO

CREATE TABLE [dbo].[NXB](
	[MaNXB] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[TenNXB] [nvarchar](50) NULL,
	[Diachi] [nvarchar](50) NULL,
	[DienThoai] [nvarchar](50) NULL,
)
GO

CREATE TABLE [dbo].[TacGia](
	[MaTacGia] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[TenTacGia] [nvarchar](50) NULL,
	[HinhTacGia] [nvarchar](max),
	[DiaChi] [nvarchar](50) NULL,
	[TieuSu] [nvarchar](max) NULL,
	[DienThoai] [nvarchar](50) NULL,
)
GO


CREATE TABLE [dbo].[Sach](
	[MaSach] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[TenSach] [nvarchar](50) NULL,
	[GiaBan] [nvarchar](50) NULL,
	[MoTa] [nvarchar](max) NULL,
	[AnhBia] [nvarchar](max) NULL,
	[NgayCapNhat] [date] NULL,
	[SoLuongTon] [int] NULL,
	[MaNXB] [int] NULL,
	[MaChuDe] [int] NULL,
	[MaTacGia] [int] NULL,
	[SoLuotXem] [int] NULL,
	[SoLuongBan] [int] NULL
)
GO

ALTER TABLE [dbo].[Sach]  WITH CHECK ADD  CONSTRAINT [FK_Sach_ChuDe] FOREIGN KEY([MaChuDe])
REFERENCES [dbo].[ChuDe] ([MaChuDe])
GO

ALTER TABLE [dbo].[Sach] CHECK CONSTRAINT [FK_Sach_ChuDe]
GO

ALTER TABLE [dbo].[Sach]  WITH CHECK ADD  CONSTRAINT [FK_Sach_NXB] FOREIGN KEY([MaNXB])
REFERENCES [dbo].[NXB] ([MaNXB])
GO

ALTER TABLE [dbo].[Sach] CHECK CONSTRAINT [FK_Sach_NXB]
GO

ALTER TABLE [dbo].[Sach] WITH CHECK ADD  CONSTRAINT [FK_Sach_TacGia] FOREIGN KEY([MaTacGia])
REFERENCES [dbo].[TacGia] ([MaTacGia])
GO

ALTER TABLE [dbo].[Sach] CHECK CONSTRAINT [FK_Sach_TacGia]
GO


CREATE TABLE [dbo].[Voucher](
	[IDVoucher] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[CodeVoucher] [nvarchar](max) NULL,
	[NgayBatDau] [date] NULL,
	[NgayKetThuc] [date] NULL,
	[TriGiaGiam] [money] NULL,
	[DieuKienVoucher] [nvarchar](50) NULL,
	[SoLuong] [bigint] NULL,
	[HieuLuc] [bit] NULL,
)
GO


CREATE TABLE [dbo].[DonHang](
	[MaDonHang] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DaThanhToan] [bit] NULL,
	[TinhTrangGiaoHang] [bit] NULL,
	[NgayDat] [date] NULL,
	[NgayGiao] [date] NULL,
	[MaKH] [int] NULL,
	[TenNguoiNhan] [nvarchar](50) NULL,
	[DienThoaiNguoiNhan] [nvarchar](50) NULL,
	[DiaChiGiao] [nvarchar](50) NULL,
	[HinhThucThanhToan] [nvarchar](20) NULL,
	[HinhThucGiaoHang] [nvarchar](20) NULL,
	[IDVoucher] [int] NULL,
	[ThanhTien] [money] NULL,
)
GO

ALTER TABLE [dbo].[DonHang] ADD  CONSTRAINT [FK_DonHang_Voucher] FOREIGN KEY([IDVoucher])
REFERENCES [dbo].[Voucher] ([IDVoucher])

ALTER TABLE [dbo].[DonHang] CHECK CONSTRAINT [FK_DonHang_Voucher]

ALTER TABLE [dbo].[DonHang] ADD  CONSTRAINT [FK_DonHang_KhachHang] FOREIGN KEY([MaKH])
REFERENCES [dbo].[KhachHang] ([MaKH])
GO

ALTER TABLE [dbo].[DonHang] CHECK CONSTRAINT [FK_DonHang_KhachHang]
GO

CREATE TABLE ChiTietDonHang(
	[MaCTDH] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[MaDonHang] [int] NOT NULL,
	[MaSach] [int] NULL,
	[SoLuong] [int] NULL,
	[DonGia] [money] NULL,
)
GO

ALTER TABLE [dbo].[ChiTietDonHang]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHang_DonHang] FOREIGN KEY([MaDonHang])
REFERENCES [dbo].[DonHang] ([MaDonHang])
GO

ALTER TABLE [dbo].[ChiTietDonHang] CHECK CONSTRAINT [FK_ChiTietDonHang_DonHang]
GO

ALTER TABLE [dbo].[ChiTietDonHang]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietDonHang_Sach] FOREIGN KEY([MaSach])
REFERENCES [dbo].[Sach] ([MaSach])
GO

ALTER TABLE [dbo].[ChiTietDonHang] CHECK CONSTRAINT [FK_ChiTietDonHang_Sach]
GO



CREATE TABLE [dbo].[GiaoHang](
	[MaGH] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[MaNV] [int] NULL,
	[MaDonHang] [int] NULL,
	[NgayGiao] [date] NULL,
)
GO

ALTER TABLE [dbo].[GiaoHang] ADD  CONSTRAINT [FK_GiaoHang_DonHang] FOREIGN KEY([MaDonHang])
REFERENCES [dbo].[DonHang] ([MaDonHang])
GO

ALTER TABLE [dbo].[GiaoHang] CHECK CONSTRAINT [FK_GiaoHang_DonHang]
GO

ALTER TABLE [dbo].[GiaoHang] ADD  CONSTRAINT [FK_GiaoHang_NhanVien] FOREIGN KEY([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])
GO

ALTER TABLE [dbo].[GiaoHang] CHECK CONSTRAINT [FK_GiaoHang_NhanVien]
GO



