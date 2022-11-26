DROP DATABASE IF EXISTS [QLSach]

CREATE DATABASE QLSach
GO

USE QLSachs
GO

DROP TABLE IF EXISTS [ChuDe]
DROP TABLE IF EXISTS [LoaiKH]
DROP TABLE IF EXISTS [KhachHang]
DROP TABLE IF EXISTS [NhanVien]
DROP TABLE IF EXISTS [NXB]
DROP TABLE IF EXISTS [TacGia]
DROP TABLE IF EXISTS [Sach]
DROP TABLE IF EXISTS [Voucher]
DROP TABLE IF EXISTS [DonHang]
DROP TABLE IF EXISTS [ChiTietDonHang]

CREATE TABLE [dbo].[ChuDe](
	[MaChuDe] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[TenChuDe] [nvarchar](50) NULL,
)
GO

CREATE TABLE [dbo].[LoaiKH](
	[MaLoaiKH] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[UuDaiMienPhiVanChuyen] [bit] NULL,
	[UuDaiSinhNhat] [bit] NULL,
	[UuDaiKhachHangThanThiet] [bit] NULL
)
GO

CREATE TABLE [dbo].[KhachHang](
	[MaKH] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[HoTen] [nvarchar](50) NULL,
	[TaiKhoan] [nvarchar](50) NULL,
	[MatKhau] [varchar](max) NULL,
	[Email] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](max) NULL,
	[DienThoai] [nvarchar](20) NULL,
	[GioiTinh] [nvarchar](3) NULL,
	[NgaySinh] [date] NULL,
	[DaXacNhan] [Bit] NULL,
	[MaOTP] [int] NULL,
	[DiemTichLuy] [int] NULL,
	[DiemDaSuDung] [int] NULL,
	[MaLoaiKH] [int] NULL
)
GO

ALTER TABLE [dbo].[KhachHang] ADD CONSTRAINT [FK_KhachHang_LoaiKH] FOREIGN KEY ([MaLoaiKH])
REFERENCES [dbo].[LoaiKH] ([MaLoaiKH])
GO

CREATE TABLE [dbo].[NhanVien](
	[MaNV] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[HoTenNV] [nvarchar](50) NULL,
	[Sdt] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](50) NULL,
	[VaiTro] [nvarchar](50) NULL,
	[Email] [varchar] (50) NULL,
	[MatKhau] [varchar] (50) NOT NULL
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
	[GiaBan] [money] NULL,
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
	[LoaiVoucher] [nvarchar](50) NULL,
	[SoLuong] [bigint] NULL,
	[HieuLuc] [bit] NULL,
	[MucToiThieuCan] [money] NULL,
	[MucToiDaCan] [money] NULL,
	[GhiChu] [nvarchar] (50) NULL
)
GO

CREATE TABLE [dbo].[DonHang](
	[MaDonHang] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DaThanhToan] [smallint] NULL,
	[TinhTrangGiaoHang] [bit] NULL,
	[NgayDat] [date] NULL,
	[NgayGiao] [date] NULL,
	[MaKH] [int] NULL,
	[TenNguoiNhan] [nvarchar](50) NULL,
	[DienThoaiNguoiNhan] [nvarchar](50) NULL,
	[DiaChiGiao] [nvarchar](MAX) NULL,
	[HinhThucThanhToan] [nvarchar](50) NULL,
	[HinhThucGiaoHang] [nvarchar](50) NULL,
	[IDVoucher] [int] NULL,
	[ThanhTien] [money] NULL,
	[MaNV] [int] NULL,
	[DaDuyet] [bit]
)
GO

ALTER TABLE [dbo].[DonHang] ADD  CONSTRAINT [FK_DonHang_Voucher] FOREIGN KEY([IDVoucher])
REFERENCES [dbo].[Voucher] ([IDVoucher])

ALTER TABLE [dbo].[DonHang] CHECK CONSTRAINT [FK_DonHang_Voucher]

ALTER TABLE [dbo].[DonHang] ADD  CONSTRAINT [FK_DonHang_KhachHang] FOREIGN KEY([MaKH])
REFERENCES [dbo].[KhachHang] ([MaKH])

ALTER TABLE [dbo].[DonHang] ADD CONSTRAINT [FK_DonHang_NhanVien] FOREIGN KEY ([MaNV])
REFERENCES [dbo].[NhanVien] ([MaNV])

ALTER TABLE [dbo].[DonHang] CHECK CONSTRAINT [FK_DonHang_KhachHang]
GO

CREATE TABLE [dbo].ChiTietDonHang(
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

