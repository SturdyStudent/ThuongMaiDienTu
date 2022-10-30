USE [QLSach]
GO

/****** Object:  StoredProcedure [dbo].[SelectAllCD]    Script Date: 10/17/2022 8:36:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--Utility
CREATE PROCEDURE DescVoucher(
	@IDVoucher int
)
AS
begin
	declare @SoLuong int
	if exists (select v.IDVoucher from Voucher v where v.IDVoucher = @IDVoucher)
		begin
			set @SoLuong = (Select Voucher.SoLuong from Voucher where Voucher.IDVoucher = @IDVoucher)
			Update Voucher
			SET Voucher.SoLuong = @SoLuong - 1
		end
end
GO

CREATE PROCEDURE [dbo].[GiaoThanhCong](
	@MaDonHang INT
)
AS
	UPDATE DonHang
	SET DonHang.TinhTrangGiaoHang = 1
	WHERE DonHang.MaDonHang = @MaDonHang
GO


--select all
CREATE PROCEDURE [dbo].[SelectAllCD]
AS
	Select * FROM ChuDe
GO
CREATE PROCEDURE [dbo].[SelectChuDeById]
	@MaChuDe int
AS
	Select * FROM ChuDe
	WHERE MaChuDe = @MaChuDe
GO
CREATE PROCEDURE [dbo].[SelectAllCTDHang]
AS
SELECT * FROM ChiTietDonHang
GO

CREATE PROCEDURE [dbo].[SelectAllDonHang]
AS
SELECT * FROM DonHang
GO

CREATE PROCEDURE [dbo].[SelectAllGiaoHang]
AS
SELECT * FROM GiaoHang
GO

CREATE PROCEDURE [dbo].[SelectAllKhachHang]
AS
SELECT * FROM KhachHang
GO


CREATE PROCEDURE [dbo].[SelectAllNhanVien]
AS
	SELECT * from NhanVien
GO

CREATE PROCEDURE [dbo].[SelectAllNXB]
AS
	SELECT * from NXB
GO
CREATE PROCEDURE [dbo].[SelectSachById]
	@MaSach int
AS
	SELECT * from Sach
	WHERE @MaSach = MaSach
GO
CREATE PROCEDURE [dbo].[SelectAllSach]
AS
	SELECT * from Sach
	WHERE SoLuongTon > 0
GO

CREATE PROCEDURE [dbo].[SelectAllSachByViews](
@Limit int)
AS
	SELECT TOP (@Limit) * FROM Sach WHERE SoLuongTon > 0 ORDER BY SoLuotXem DESC 
GO

CREATE PROCEDURE [dbo].[SelectAllSachBySales](
@Limit int)
AS
	SELECT TOP (@Limit) * FROM Sach WHERE SoLuongTon > 0 ORDER BY SoLuongBan DESC 
GO
--alter table Sach add SoLuotXem int
--alter table Sach add SoLuongBan int
CREATE PROCEDURE [dbo].[SelectSachChayHang](
@Limit int)
AS
	SELECT TOP (@Limit) * FROM Sach WHERE SoLuongTon = 0 ORDER BY SoLuotXem DESC 
GO

CREATE PROCEDURE [dbo].[SelectAllTacGia]
AS
	SELECT * from TacGia
GO
CREATE PROCEDURE [dbo].[SelectTacGiaById]
	@MaTacGia int
AS
	Select * FROM TacGia
	WHERE MaTacGia = @MaTacGia
GO
CREATE PROCEDURE [dbo].[SelectAllVoucher]
AS
	SELECT * from Voucher
GO


--Select id
CREATE PROCEDURE [dbo].[SelectIdChuDe] (
@idChuDe int
)
AS
	Select * from ChuDe 
	WHERE ChuDe.MaChuDe = @idChuDe
GO

CREATE PROCEDURE [dbo].[SelectTenChuDe] (
@TenChuDe nvarchar(50)
)
AS
	Select * from ChuDe 
	WHERE ChuDe.TenChuDe LIKE @TenChuDe
GO


CREATE PROCEDURE [dbo].[SelectIdNXB] (
@idNXB int
)
AS
	Select * from NXB WHERE NXB.MaNXB = @idNXB
GO

CREATE PROCEDURE [dbo].[SelectNXBById]
	@MaNXB int
AS
	Select * FROM NXB
	WHERE MaNXB = @MaNXB
GO

CREATE PROCEDURE [dbo].[SelectTenNXB] (
@TenNXB nvarchar(50)
)
AS
	Select * from NXB WHERE NXB.TenNXB LIKE @TenNXB
GO


CREATE PROCEDURE [dbo].[SelectIdTacGia] (
@idTacGia int
)
AS
	Select * from TacGia WHERE TacGia.MaTacGia = @idTacGia
GO


CREATE PROCEDURE [dbo].[SelectTenTacGia] (
@TenTacGia nvarchar(50)
)
AS
	Select * from TacGia WHERE TacGia.TenTacGia LIKE @TenTacGia
GO



CREATE PROCEDURE [dbo].[SelectIdSach] (
@idSach int
)
AS
	Select * from Sach WHERE Sach.MaSach = @idSach
GO


CREATE PROCEDURE [dbo].[SelectTenSach] (
@TenSach nvarchar(50)
)
AS
	Select * from Sach WHERE Sach.TenSach LIKE @TenSach
GO


CREATE PROCEDURE [dbo].[SelectIdKhachHang] (
@idKhachHang int
)
AS
	Select * from KhachHang WHERE KhachHang.MaKH = @idKhachHang
GO


CREATE PROCEDURE [dbo].[SelectTenKhachHang] (
@TenKhachHang nvarchar(50)
)
AS
	Select * from KhachHang WHERE KhachHang.HoTen LIKE @TenKhachHang
GO


CREATE PROCEDURE [dbo].[SelectIdNhanVien] (
@idNhanVien int
)
AS
	Select * from NhanVien WHERE NhanVien.MaNV = @idNhanVien
GO


CREATE PROCEDURE [dbo].[SelectTenNhanVien] (
@TenNhanVien nvarchar(50)
)
AS
	Select * from NhanVien WHERE NhanVien.HoTenNV LIKE @TenNhanVien
GO



CREATE PROCEDURE [dbo].[SelectIdDonHang] (
@idDonHang int
)
AS
	Select * from DonHang dh, ChiTietDonHang ct WHERE dh.MaDonHang = @idDonHang and dh.MaDonHang = ct.MaDonHang
GO


CREATE PROCEDURE [dbo].[SelectIdGiaoHang] (
@idGiaoHang int
)
AS
	Select * from GiaoHang gh, DonHang dh, NhanVien nv  WHERE gh.MaGH = @idGiaoHang and gh.MaNV = nv.MaNV and gh.MaDonHang = dh.MaDonHang
GO


CREATE PROCEDURE [dbo].[SelectIdVoucher](
@IdVoucher int
)
AS
	SELECT * from Voucher WHERE Voucher.IDVoucher = @IdVoucher
GO


CREATE PROCEDURE [dbo].[SelectTenVoucher](
@CodeVoucher nvarchar(50)
)
AS
	SELECT * from Voucher WHERE Voucher.CodeVoucher like @CodeVoucher
GO


--Insert
CREATE PROCEDURE [dbo].[InsertChuDe](
@TenChuDe	nvarchar(50)
)
AS
	INSERT INTO ChuDe(TenChuDe)
	VALUES (@TenChuDe);
GO

CREATE PROCEDURE [dbo].[InsertChiTietDonHang](
@MaDonHang int,
@MaSach	int,
@SoLuong int,
@DonGia money
)
AS
	INSERT INTO ChiTietDonHang(MaDonHang,MaSach, SoLuong, DonGia)
	VALUES (@MaDonHang, @MaSach, @SoLuong, @DonGia);
GO

CREATE PROCEDURE [dbo].[InsertDonHangNotVovucher](
@DaThanhToan	bit,
@TinhTrangGiaoHang bit,
@NgayDat date,
@MaKH int,
@TenNguoiNhan nvarchar(50),
@DienThoaiNguoiNhan nvarchar(50),
@DiaChiGiao nvarchar(50),
@HinhThucThanhToan nvarchar(20),
@HinhThucGiaoHang nvarchar(20),
@ThanhTien money
)
AS
	Declare @NgayGiao date
	Set @NgayGiao = DATEADD(day, 7, @NgayDat)
	begin
		INSERT INTO DonHang(DaThanhToan, TinhTrangGiaoHang, NgayDat, NgayGiao,
		MaKH, TenNguoiNhan, DienThoaiNguoiNhan, DiaChiGiao, HinhThucThanhToan,
		HinhThucGiaoHang, ThanhTien)
		VALUES (@DaThanhToan, @TinhTrangGiaoHang, @NgayDat, @NgayGiao, @MaKH,
		@TenNguoiNhan, @DienThoaiNguoiNhan, @DiaChiGiao, @HinhThucThanhToan,
		@HinhThucGiaoHang, @ThanhTien)
	end
GO

CREATE PROCEDURE [dbo].[InsertDonHangHaveVoucher](
@DaThanhToan	bit,
@TinhTrangGiaoHang bit,
@NgayDat date,
@MaKH int,
@TenNguoiNhan nvarchar(50),
@DienThoaiNguoiNhan nvarchar(50),
@DiaChiGiao nvarchar(50),
@HinhThucThanhToan nvarchar(20),
@HinhThucGiaoHang nvarchar(20),
@IDVoucher int null,
@ThanhTien money
)
AS
	Declare @NgayGiao date
	Set @NgayGiao = DATEADD(day, 7, @NgayDat)
	begin
		INSERT INTO DonHang(DaThanhToan, TinhTrangGiaoHang, NgayDat, NgayGiao,
		MaKH, TenNguoiNhan, DienThoaiNguoiNhan, DiaChiGiao, HinhThucThanhToan,
		HinhThucGiaoHang, IDVoucher, ThanhTien)
		VALUES (@DaThanhToan, @TinhTrangGiaoHang, @NgayDat, @NgayGiao, @MaKH,
		@TenNguoiNhan, @DienThoaiNguoiNhan, @DiaChiGiao, @HinhThucThanhToan,
		@HinhThucGiaoHang, @IDVoucher, @ThanhTien)
		select dbo.DescVoucher(@IDVoucher)
	end
GO



CREATE PROCEDURE [dbo].[InsertVoucher](
@CODEVoucher nvarchar(50),
@NgayBatDau date,
@NgayKeyThuc date,
@TriGiaGiam money,
@DieuKienVoucher nvarchar(50),
@Soluong int,
@Hieuluc bit
)
AS
	INSERT INTO Voucher(CodeVoucher, NgayBatDau, NgayKetThuc, TriGiaGiam, DieuKienVoucher, SoLuong, HieuLuc)
	VALUES (@CODEVoucher, @NgayBatDau, @NgayKeyThuc, @TriGiaGiam, @DieuKienVoucher, @Soluong, @Hieuluc)
GO


CREATE PROCEDURE [dbo].[InsertGiaoHang](
@MaNV	int,
@MaDonHang int,
@NgayGiao date
)
AS
	INSERT INTO GiaoHang(MaNV, MaDonHang, NgayGiao)
	VALUES (@MaNV, @MaDonHang, @NgayGiao);
GO

CREATE PROCEDURE [dbo].[InsertKhachHang](
@HoTen	nvarchar(50),
@TaiKhoan	nvarchar(50),
@MatKhau nvarchar(50),
@Email	nvarchar(50),
@DiaChi nvarchar(MAX),
@DienThoai nvarchar(20),
@GioiTinh nvarchar(3),
@NgaySinh date
)
AS
	INSERT INTO KhachHang(HoTen, TaiKhoan, MatKhau,Email,DiaChi,DienThoai,GioiTinh,NgaySinh)
	VALUES (@HoTen, @TaiKhoan, @MatKhau,@Email,@DiaChi,@DienThoai,@GioiTinh,@NgaySinh);
GO

CREATE PROCEDURE [dbo].[InsertNhanVien](
@HoTenNV	nvarchar(50),
@NgaySinh date,
@GioiTinh nvarchar(3),
@sdt nvarchar(50),
@DiaChi	nvarchar(50)
)
AS
	INSERT INTO NhanVien(HoTenNV,NgaySinh,GioiTinh,sdt,DiaChi)
	VALUES (@HoTenNV, @NgaySinh,@GioiTinh,@sdt,@DiaChi);
GO

CREATE PROCEDURE [dbo].[InsertNXB](
@TenNXB	nvarchar(50),
@DiaChi	nvarchar(50),
@DienThoai nvarchar(50)
)
AS
	INSERT INTO NXB (TenNXB, Diachi, DienThoai)
	VALUES (@TenNXB, @DiaChi, @DienThoai);
GO

CREATE PROCEDURE [dbo].[InsertSach](
@TenSach	nvarchar(50),
@GiaBan	int,
@MoTa nvarchar(MAX),
@AnhBia	nvarchar(MAX),
@NgayCapNhat	date,
@SoLuongTon int,
@MaNXB	int,
@MaChuDe	int,
@MaTacGia int
)
AS
	INSERT INTO Sach(TenSach, GiaBan, MoTa,AnhBia,NgayCapNhat,SoLuongTon,MaNXB,MaChuDe, MaTacGia)
	VALUES (@TenSach, @GiaBan, @MoTa,@AnhBia,@NgayCapNhat,@SoLuongTon,@MaNXB,@MaChuDe, @MaTacGia)
GO


CREATE PROCEDURE [dbo].[InsertTacGia](
@TenTacGia	nvarchar(50),
@HinhTacGia nvarchar(max),
@DiaChi nvarchar(50),
@TieuSu nvarchar(max),
@DienThoai	NVARCHAR(50)
)
AS
	INSERT INTO TacGia(TenTacGia, HinhTacGia, DiaChi, TieuSu, DienThoai)
	VALUES (@TenTacGia,@HinhTacGia, @DiaChi, @TieuSu,@DienThoai);
GO


--update
CREATE PROCEDURE [dbo].[UpdateChuDe]
@MaChuDe int,
@TenChuDe nvarchar(50)
AS
	UPDATE ChuDe
	SET ChuDe.TenChuDe = @TenChuDe
	WHERE ChuDe.MaChuDe = @MaChuDe
GO


CREATE PROCEDURE [dbo].[UpdateChiTietDonHang](
@MaDonHang int,
@MaSach int,
@SoLuong int,
@DonGia decimal(18,0),
@MaChiTietDonHang int
)
AS
	UPDATE ChiTietDonHang
	SET ChiTietDonHang.MaDonHang = @MaDonHang,
		ChiTietDonHang.MaSach = @MaSach,
		ChiTietDonHang.SoLuong = @SoLuong,
		DonGia = @DonGia
	WHERE ChiTietDonHang.MaCTDH = @MaChiTietDonHang
GO


CREATE PROCEDURE [dbo].[UpdateDonHang](
@MaDonHang int,
@DaThanhToan bit,
@TinhTrangGiaoHang bit,
@NgayGiao date,
@TenNguoiNhan nvarchar(50),
@DienThoaiNguoiNhan nvarchar(50),
@DiaChiGiao nvarchar(50)
)
AS
	UPDATE DonHang
	SET
		DonHang.DaThanhToan = @DaThanhToan,
		DonHang.TinhTrangGiaoHang = @TinhTrangGiaoHang,
		DonHang.NgayGiao = @NgayGiao,
		DonHang.TenNguoiNhan = @TenNguoiNhan,
		DonHang.DienThoaiNguoiNhan = @DienThoaiNguoiNhan,
		DonHang.DiaChiGiao = @DiaChiGiao

	WHERE DonHang.MaDonHang = @MaDonHang
GO


CREATE PROCEDURE [dbo].[UpdateGiaoHang](
@MaGH int,
@MaNV int,
@MaDonHang int,
@NgayGiao date
)
AS
	UPDATE GiaoHang
	SET
		GiaoHang.MaNV = @MaNV,
		GiaoHang.MaDonHang = @MaDonHang,
		GiaoHang.NgayGiao = @NgayGiao
	WHERE GiaoHang.MaGH = @MaGH
GO
select * from TacGia
CREATE PROCEDURE [dbo].[UpdateKhachHang](
@MaKH int,
@HoTen nvarchar(50),
@TaiKhoan nvarchar(50),
@MatKhau nvarchar(50),
@Email nvarchar(50),
@DiaChi nvarchar(MAX),
@DienThoai nvarchar(20),
@GioiTinh nvarchar(3),
@NgaySinh date
)
AS
	UPDATE KhachHang
	SET
		KhachHang.HoTen = @HoTen,
		KhachHang.TaiKhoan = @TaiKhoan,
		KhachHang.MatKhau = @MatKhau,
		KhachHang.Email = @Email,
		KhachHang.DiaChi = @DiaChi,
		KhachHang.DienThoai = @DienThoai,
		KhachHang.GioiTinh = @GioiTinh,
		KhachHang.NgaySinh = @NgaySinh
	WHERE KhachHang.MaKH = @MaKH
GO

CREATE PROCEDURE [dbo].[UpdateNhanVien](
@MaNV int,
@HoTenNV nvarchar(50),
@NgaySinh date,
@GioiTinh nvarchar(3),
@Sdt nvarchar(50),
@DiaChi nvarchar(50)
)
AS
	UPDATE NhanVien
	SET
		NhanVien.HoTenNV = @HoTenNV,
		NhanVien.NgaySinh = @NgaySinh,
		NhanVien.GioiTinh = @GioiTinh,
		NhanVien.Sdt = @Sdt,
		NhanVien.DiaChi = @DiaChi
	WHERE NhanVien.MaNV = @MaNV
GO


CREATE PROCEDURE [dbo].[UpdateNXB](
@MaNXB int,
@TenNXB nvarchar(50),
@DiaChi nvarchar(50),
@DienThoai nvarchar(50)
)
AS
	UPDATE NXB
	SET
		NXB.TenNXB = @TenNXB,
		NXB.Diachi = @DiaChi,
		NXB.DienThoai = @DienThoai
	WHERE NXB.MaNXB = @MaNXB
GO


CREATE PROCEDURE [dbo].[UpdateSach](
@MaSach int,
@TenSach nvarchar(50),
@GiaBan nvarchar(50),
@MoTa nvarchar(MAX),
@AnhBia image,
@NgayCapNhat date,
@SoLuongTon int,
@MaNXB int,
@MaChuDe int,
@MaTacGia int
)
AS
	UPDATE Sach
	SET
		Sach.TenSach = @TenSach,
		Sach.GiaBan = @GiaBan,
		Sach.MoTa = @MoTa,
		Sach.AnhBia = @AnhBia,
		Sach.NgayCapNhat = @NgayCapNhat,
		Sach.SoLuongTon = @SoLuongTon,
		Sach.MaNXB = @MaNXB,
		Sach.MaChuDe = @MaChuDe,
		Sach.MaTacGia = @MaTacGia
	WHERE Sach.MaSach = @MaSach
GO


CREATE PROCEDURE [dbo].[UpdateTacGia](
@MaTacGia int,
@TenTacGia nvarchar(50),
@HinhTacGia nvarchar(max),
@DiaChi nvarchar(50),
@TieuSu nvarchar(MAX),
@DienThoai nvarchar(50)
)
AS
	UPDATE TacGia
	SET
		TacGia.TenTacGia = @MaTacGia,
		TacGia.HinhTacGia = @HinhTacGia,
		TacGia.DiaChi = @DiaChi,
		TacGia.TieuSu = @TieuSu,
		TacGia.DienThoai = @DienThoai
	WHERE TacGia.MaTacGia = @MaTacGia
GO


CREATE PROCEDURE [dbo].[UpdateVoucher](
@IDVoucher int,
@CodeVoucher nvarchar(max),
@NgayBatDau date,
@NgayKetThuc date,
@TriGiaGiam money,
@DieuKienVoucher nvarchar(50),
@Soluong bigint,
@HieuLuc bit
)
AS
	BEGIN
		UPDATE Voucher
		SET 
			Voucher.CodeVoucher = @CodeVoucher,
			Voucher.NgayBatDau = @NgayBatDau,
			Voucher.NgayKetThuc = @NgayKetThuc,
			Voucher.TriGiaGiam = @TriGiaGiam,
			Voucher.DieuKienVoucher = @DieuKienVoucher,
			Voucher.SoLuong = @Soluong,
			Voucher.HieuLuc = @HieuLuc
		WHERE Voucher.IDVoucher = @IDVoucher
	END
GO


--delete

CREATE PROCEDURE [dbo].[DeleteChuDe](
	@MaChuDe int
)
AS
	Delete from ChuDe where ChuDe.MaChuDe = @MaChuDe;
GO


CREATE PROCEDURE [dbo].[DeleteChiTietDonHang](
	@MaCTDH int
)
AS
	Delete from ChiTietDonHang where ChiTietDonHang.MaCTDH = @MaCTDH;
GO


CREATE PROCEDURE [dbo].[DeleteDonHang](
	@MaDonHang int
)
AS
	Delete from DonHang where DonHang.MaDonHang = @MaDonHang;
GO


CREATE PROCEDURE [dbo].[DeleteGiaoHang](
	@MaGH int
)
AS
	Delete from GiaoHang where GiaoHang.MaGH = @MaGH;
GO


CREATE PROCEDURE [dbo].[DeleteKhachHang](
	@MaKH int
)
AS
	Delete from KhachHang where KhachHang.MaKH = @MaKH;
GO


CREATE PROCEDURE [dbo].[DeleteNhanVien](
	@MaNV int
)
AS
	Delete from NhanVien where NhanVien.MaNV = @MaNV;
GO


CREATE PROCEDURE [dbo].[DeleteNXB](
	@MaNXB int
)
AS
	Delete from NXB where NXB.MaNXB = @MaNXB;
GO


CREATE PROCEDURE [dbo].[DeleteSach](
	@MaSach int
)
AS
	Delete from Sach where Sach.MaSach = @MaSach;
GO


CREATE PROCEDURE [dbo].[DeleteTacGia](
	@MaTacGia int
)
AS
	Delete from TacGia where TacGia.MaTacGia = @MaTacGia;
GO


CREATE PROCEDURE [dbo].[DeleteVoucher](
	@IDVoucher int
)
AS
	Delete from Voucher where Voucher.IDVoucher = @IDVoucher;
GO



delete from Sach
delete from NXB
delete from TacGia
delete from ChuDe

select * from Sach
select * from TacGia
select * from NXB
select * from ChuDe


-------------Xóa primary index ---------------
DBCC CHECKIDENT ('[Sach]', RESEED, 0);
GO
DBCC CHECKIDENT ('[NXB]', RESEED, 0);
GO
DBCC CHECKIDENT ('[TacGia]', RESEED, 0);
GO
DBCC CHECKIDENT ('[ChuDe]', RESEED, 0);
GO

INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Victor Hugo', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Tô Hoài', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Stephen King', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Frances Hodgson', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Antoine De', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Anagarika Govinda', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N' Ajahn Chah', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Tatsuki Fujimoto', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Đại Đức Haemin', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Haruki Murakami', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Miêu công tử', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Ruth Ware', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Bram Stoker', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Trần Đình Hiếu', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Liesbet Slegers', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Naoki Kurosawa', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Evebade', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Alexander Barton Woodside', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Trương Anh Ngọc', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'DK', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Stephen Hawking', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Matthew Walker PhD', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Plato', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Socrates', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Trần Trọng Hoàng', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Neale Donald Walsch', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Li Tana', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Robert Greene', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Michael Sandal', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Jared Diamond', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Alan Phan', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Rob Moore', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Nguyễn Ngọc Thuần', N'Không có', N'Không có');
INSERT INTO TacGia (TenTacGia, TieuSu, DiaChi) VALUES (N'Nguyễn Nhật Ánh', N'Không có', N'Không có');
go

INSERT INTO NXB (TenNXB) VALUES (N'Văn học');
INSERT INTO NXB (TenNXB) VALUES (N'Kim Đồng');
INSERT INTO NXB (TenNXB) VALUES (N'Trẻ');
INSERT INTO NXB (TenNXB) VALUES (N'Phụ nữ');
INSERT INTO NXB (TenNXB) VALUES (N'Nhã Nam');
INSERT INTO NXB (TenNXB) VALUES (N'Chính trị quốc gia Sự Thật');
INSERT INTO NXB (TenNXB) VALUES (N'Đông Á');
INSERT INTO NXB (TenNXB) VALUES (N'Hội Nhà Văn');
go

INSERT INTO ChuDe(TenChuDe) VALUES (N'Văn học Việt Nam');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Văn học Nước ngoài');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Thiếu nhi');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Kinh tế - Chính trị');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Manga - Light Novel');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Ngôn tình - Lãng mạn');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Tâm linh - Huyền bí');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Giáo khoa');
INSERT INTO ChuDe(TenChuDe) VALUES (N'Kinh dị');
go


INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Những người khốn khổ', '105000', N'Những người khốn khổ là tiểu thuyết của văn hào Pháp 1, được xuất bản năm 1862. Tác phẩm được đánh giá là một trong những tiểu thuyết nổi tiếng nhất của nền văn học thế giới thế kỷ 19.', 'nhungnguoikhonkho.jpg', '2022-10-24', '1000', '1', '2', '1', '10000', '123');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Nhà thờ Đức Bà Paris', '105000', N'Nhà thờ Đức Bà Paris là tiểu thuyết của văn hào Pháp 1. Tác phẩm ra đời xuất phát từ việc tác giả muốn viết một cuốn tiểu thuyết về ngôi nhà thờ nổi tiếng ở thủ đô Paris vào năm 1828', 'nhathoducba.jpg', '2022-10-24', '1200', '2', '2', '1', '10002', '124');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Chiêm Ngưỡng', '105000', N'Được dịch từ tiếng Anh-Les Contemplations là một tuyển tập thơ của 1, xuất bản năm 1856. Nó bao gồm 156 bài thơ trong sáu cuốn sách. Hầu hết các bài thơ được viết từ năm 1841 đến năm 1855, mặc dù có niên đại lâu đời nhất từ ​​năm 1830.', 'chiemnguong.jpg', '2022-10-24', '900', '2', '2', '1', '10004', '125');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'“Ngày Cuối Cùng Của Một Tử Tù', '105000', N'Ngày cuối cùng của một người đàn ông bị kết án là một tiểu thuyết của 1 được xuất bản lần đầu tiên vào năm 1829. Nó kể lại những suy nghĩ của một người đàn ông bị kết án tử hình. 1 viết cuốn tiểu thuyết này để bày tỏ cảm xúc của mình rằng án tử hình nên được bãi bỏ', 'ngaycuoitutu.jpg', '2022-10-24', '850', '2', '1', '2', '20006', '126');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Người cười', '105000', N'The Man Who Laughs là một tiểu thuyết của 1, được xuất bản lần đầu vào tháng 4 năm 1869 với tựa đề tiếng Pháp là Homme qui rit. Nó diễn ra ở Anh bắt đầu từ năm 1690 và kéo dài đến đầu thế kỷ 18 trị vì của Nữ hoàng Anne.', 'nguoicuoi.jpg', '2022-10-24', '600', '1', '2', '3', '10008', '127');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Dế Mèn phiêu lưu ký', '105000', N'"Dế Mèn phiêu lưu ký là tác phẩm văn xuôi đặc sắc và nổi tiếng nhất của nhà văn Tô Hoài viết về loài vật, dành cho lứa tuổi thiếu nhi. Ban đầu truyện có tên là ""Con dế mèn"" do Nhà xuất bản Tân Dân, Hà Nội phát hành năm 1941. Sau đó, được sự ủng hộ nhiệt tình của nhân dân, Tô Hoài viết thêm truyện ""Dế Mèn phiêu lưu ký""."', 'demen.jpg', '2022-10-24', '420', '1', '3', '2', '10010', '128');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Quê người', '105000', N'Trong làng văn học Việt Nam rất hiếm có nhà văn nào nhận được sự yêu thương, mến mộ từ nhiều thế hệ độc giả khác nhau như nhà văn Tô Hoài. Nếu các bạn nhỏ biết đến ông như một người bạn dí dỏm, đáng yêu qua kiệt tác Dế mèn phiêu lưu ký và series truyện ngộ nghĩnh về loài vật, thì độc giả lớn tuổi biết đến ông như một cây đại thụ của làng văn với nhiều tác phẩm đã trở thành những tượng đài bất tử như Vợ chồng A Phủ, Cứu đất cứu mường, Chuyện đầm sen đền Đồng Cổ…', 'quenguoi.jpg', '2022-10-24', '360', '1', '1', '2', '10012', '129');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Gã hề ma quái', '105000', N'Gã hề ma quái là tiểu thuyết thuộc thể loại viễn tưởng kinh dị của nhà văn người Mỹ Stephen King. Đó là cuốn sách thứ 22 và cuốn tiểu thuyết thứ 17 của ông được viết dưới tên của chính ông.', 'it.jpg', '2022-10-24', '290', '3', '2', '3', '10014', '130');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'The Shining', '90000', N'The Shining là một tiểu thuyết kinh dị năm 1977 của tác giả người Mỹ Stephen King. Đây là cuốn tiểu thuyết xuất bản thứ ba của King và là cuốn sách bán chạy đầu tiên trên bìa cứng; Thành công của nó đã giúp King trở thành một tác giả xuất sắc trong thể loại kinh dị.', 'theshining.jpg', '2022-10-24', '400', '3', '2', '3', '20016', '131');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Đối đầu', '90000', N'The Stand là một cuốn tiểu thuyết hậu tận thế kinh dị / tưởng tượng của tác giả người Mỹ Stephen King.', 'thestand.jpg', '2022-10-24', '450', '3', '2', '3', '10018', '132');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Khu vườn bí mật', '90000', N'Mary Lennox, một cô bé mồ côi, cáu kỉnh, không ai ưa, tới sống tại nhà ông bác ở vùng đồng hoang Yorkshire, nước Anh, nơi có rất nhiều bí mật đang đợi cô. Ban đêm, có tiếng khóc của ai đó từ một hành lang gần phòng cô. Còn ban ngày, cô gặp Dickon, một cậu bé biết thuần dưỡng và nói chuyện cùng loài vật. Rồi một ngày, nhờ sự giúp đỡ của một con chim ức đỏ, Mary khám phá ra một nơi bí ẩn nhất trên thế gian này – Khu vườn bí mật. Mọi thứ dường như đã chết trong khu vườn mười năm qua khóa kín. Cùng với Colin, vị chủ nhân ốm yếu của tiếng khóc bí ẩn kia, và Dickon, cậu bé mà tất cả mọi người đều yêu mến, Mary đã tìm ra những thứ sẽ làm thay đổi cuộc đời cô mãi mãi, khi mùa xuân về đánh thức cả khu vườn tuyệt đẹp.', 'secretGarden.jpg', '2022-10-24', '190', '3', '3', '4', '10020', '133');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Công chúa nhỏ', '90000', N'Mary Lennox, một cô bé mồ côi, cáu kỉnh, không ai ưa, tới sống tại nhà ông bác ở vùng đồng hoang Yorkshire, nước Anh, nơi có rất nhiều bí mật đang đợi cô. Ban đêm, có tiếng khóc của ai đó từ một hành lang gần phòng cô. Còn ban ngày, cô gặp Dickon, một cậu bé biết thuần dưỡng và nói chuyện cùng loài vật. Rồi một ngày, nhờ sự giúp đỡ của một con chim ức đỏ, Mary khám phá ra một nơi bí ẩn nhất trên thế gian này – Khu vườn bí mật. Mọi thứ dường như đã chết trong khu vườn mười năm qua khóa kín. Cùng với Colin, vị chủ nhân ốm yếu của tiếng khóc bí ẩn kia, và Dickon, cậu bé mà tất cả mọi người đều yêu mến, Mary đã tìm ra những thứ sẽ làm thay đổi cuộc đời cô mãi mãi, khi mùa xuân về đánh thức cả khu vườn tuyệt đẹp.', 'congchuanho.jpg', '2022-10-24', '523', '4', '3', '4', '10022', '134');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Hoàng tử bé', '90000', N'Hoàng tử bé, được xuất bản năm 1943, là tiểu thuyết nổi tiếng nhất của nhà văn và phi công Pháp 5 Saint-Exupéry. Ông đã thuê ngôi biệt thự The Bevin House ở Asharoken, Long Island, New York trong khi viết tác phẩm này. Cuốn tiểu thuyết cũng bao gồm nhiều bức tranh do chính Saint-Exupéry vẽ.', 'hoangtube.jpg', '2022-10-24', '123', '4', '3', '5', '10024', '135');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Đường mây qua xứ tuyết', '90000', N'The way of the white clouds (tạm dịch: Đường mây qua xứ tuyết) là tập sách ghi nhận những điều tác giả 6 chứng kiến trong thời gian du hành Tây Tạng. Đối với người Tây Tạng, mây có nhiều ý nghĩa huyền bí. Nhìn vào các bức họa Tây Tạng (thankas), gần như bức nào cũng thấy họ vẽ các đám mây màu sắc khác nhau. Mây tượng trưng cho sự sáng tạo vì nó có thể mang bất cứ hình thù gì. Mây trắng tượng trưng cho môi trường để sự sáng tạo có thể nẩy nở, phát sinh nhưng nó còn có nghĩa là đám mây Phá', 'quaxutuyet.jpg', '2022-10-24', '653', '4', '7', '6', '10026', '136');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Tâm Tĩnh lặng', '124000', N'The way of the white clouds (tạm dịch: Đường mây qua xứ tuyết) là tập sách ghi nhận những điều tác giả 6 chứng kiến trong thời gian du hành Tây Tạng. Đối với người Tây Tạng, mây có nhiều ý nghĩa huyền bí. Nhìn vào các bức họa Tây Tạng (thankas), gần như bức nào cũng thấy họ vẽ các đám mây màu sắc khác nhau. Mây tượng trưng cho sự sáng tạo vì nó có thể mang bất cứ hình thù gì. Mây trắng tượng trưng cho môi trường để sự sáng tạo có thể nẩy nở, phát sinh nhưng nó còn có nghĩa là đám mây Phá', 'tamtinhlang.jpg', '2022-10-24', '145', '4', '7', '7', '10028', '137');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Suối nguồn tâm linh', '147000', N'The way of the white clouds (tạm dịch: Đường mây qua xứ tuyết) là tập sách ghi nhận những điều tác giả 6 chứng kiến trong thời gian du hành Tây Tạng. Đối với người Tây Tạng, mây có nhiều ý nghĩa huyền bí. Nhìn vào các bức họa Tây Tạng (thankas), gần như bức nào cũng thấy họ vẽ các đám mây màu sắc khác nhau. Mây tượng trưng cho sự sáng tạo vì nó có thể mang bất cứ hình thù gì. Mây trắng tượng trưng cho môi trường để sự sáng tạo có thể nẩy nở, phát sinh nhưng nó còn có nghĩa là đám mây Phá', 'suoinguon.jpg', '2022-10-24', '134', '4', '7', '7', '10030', '138');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Chainsaw Man', '90000', N'Chainsaw Man là một series manga Nhật Bản được viết và minh họa bởi Fujimoto Tatsuki.', 'chainsawman.jpg', '2022-10-24', '543', '4', '5', '8', '10032', '139');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Firepunch', '300000', N'Được dịch từ tiếng Anh-Fire Punch là một bộ truyện tranh Nhật Bản được viết và minh họa bởi 8. Nó được đăng nhiều kỳ thông qua trang web Shōnen Jump + của Shueisha từ tháng 4 năm 2016 đến tháng 1 năm 2018, với các chương của nó được thu thập thành tám tập tankōbon.', 'firepunch.jpg', '2022-10-24', '324', '3', '5', '8', '10034', '140');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Goodbye Eri', '120000', N'Sayonara Eri là một manga one-shot Nhật Bản được viết và minh họa bởi Fujimoto Tatsuki. Truyện được phát hành trên website Shōnen Jump+ vào tháng 4 năm 2022 và được phát hành dưới dạng in vào tháng 7 năm 2022. ', 'goodbyeeri.jpg', '2022-10-24', '541', '3', '5', '8', '20036', '141');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Nhà Giả Kim', '85000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'nhagiakim.jpg', '2022-10-24', '541', '3', '4', '9', '10038', '142');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Bước Chậm Lại Giữa Thế Gian Vội Vã (Tái Bản 2018)', '85000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'buocchamlai.jpg', '2022-10-24', '541', '3', '4', '9', '10040', '143');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Ra Bờ Suối Ngắm Hoa Kèn Hồng', '85000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'rabosuoi.jpg', '2022-10-24', '541', '3', '4', '9', '10042', '144');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Bố Già (Đông A)', '85000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'bogia.jpg', '2022-10-24', '541', '8', '4', '9', '10044', '145');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Cho Tôi Xin Một Vé Đi Tuổi Thơ', '90000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'vetuoitho.jpg', '2022-10-24', '541', '8', '4', '9', '20046', '146');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Tôi Là Bêtô', '90000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'toilabeto.jpg', '2022-10-24', '541', '8', '4', '9', '10048', '147');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Rừng Nauy', '90000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'rungnauy.jpg', '2022-10-24', '541', '8', '4', '10', '20050', '148');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', '90000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'toithay.jpg', '2022-10-24', '541', '8', '4', '10', '10052', '149');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Làm Bạn Với Bầu Trời', '95000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'lamban.jpg', '2022-10-24', '541', '8', '4', '10', '10054', '150');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Con Chim Xanh Biếc Bay Về', '95000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'conchimxanh.jpg', '2022-10-24', '541', '8', '6', '10', '10056', '151');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Có Hai Con Mèo Ngồi Bên Cửa Sổ', '95000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'haiconmeo.jpg', '2022-10-24', '541', '8', '6', '10', '10058', '152');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Dấu Chân Trên Cát', '95000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'dauchan.jpg', '2022-10-24', '541', '8', '6', '10', '10060', '153');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'999 Lá Thư Gửi Cho Chính Mình', '100000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', '999lathu.jpg', '2022-10-24', '541', '8', '6', '11', '10062', '154');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Bí Mật Của Naoko', '100000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'bimatnaoko.jpg', '2022-10-24', '541', '8', '6', '11', '10064', '155');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Vừa Nhắm Mắt Vừa Mở Cửa Số', '100000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'vuanhammat.jpg', '2022-10-24', '541', '8', '6', '11', '20066', '156');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Chuyện Cổ Tích Dành Cho Người Lớn', '100000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'chuyencotich.jpg', '2022-10-24', '541', '8', '6', '11', '10068', '157');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Ngày Xưa Có Một Chuyện Tình', '100000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'ngayxuacomot.jpg', '2022-10-24', '541', '8', '6', '11', '10070', '158');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'3 Năm Tầm Long 10 Năm Điểm Huyệt', '105000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', '3namtamlong.jpg', '2022-10-24', '541', '7', '9', '11', '10072', '159');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Sidney Sheldon - Nếu Còn Có Ngày Mai', '105000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'sidneysheldon.jpg', '2022-10-24', '541', '7', '9', '11', '10074', '160');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Cô Gái Trong Cabin Số 10', '105000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'cogaitrong.jpg', '2022-10-24', '541', '7', '9', '12', '10076', '161');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Người Thu Gió', '105000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'nguoithugio.jpg', '2022-10-24', '541', '7', '9', '12', '10078', '162');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Hòm Thư Số 110', '105000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'homthuso.jpg', '2022-10-24', '541', '7', '9', '12', '10080', '163');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Tú Xuất', '110000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'tuxuat.jpg', '2022-10-24', '541', '7', '9', '12', '10082', '164');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Dracula', '110000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'dracula.jpg', '2022-10-24', '541', '7', '9', '13', '20084', '165');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Lâu Đài Sói', '110000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'laudaisoi.jpg', '2022-10-24', '541', '7', '9', '13', '10086', '166');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Đi Tìm Sylvie Lee', '110000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'sylvielee.jpg', '2022-10-24', '541', '7', '9', '13', '10088', '167');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Ngôi Nhà Bên Bờ Biển Xanh Thẳm', '110000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'ngoinhabobien.jpg', '2022-10-24', '541', '7', '3', '13', '10090', '168');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Thánh Kinh Tân Ước Truyện', '115000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'thanhkinhtan.jpg', '2022-10-24', '541', '5', '3', '13', '10092', '169');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Những Trái Tim Lửa Cháy Paris 1968', '115000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'nhungtraitim.jpg', '2022-10-24', '541', '5', '3', '13', '10094', '170');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Búp Bê I', '115000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'bupbe.jpg', '2022-10-24', '541', '5', '3', '13', '10096', '171');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'TẢN MẠN KIẾN TRÚC NAM BỘ', '115000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'tanmankt.jpg', '2022-10-24', '541', '5', '6', '14', '10098', '172');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'CUỐN SÁCH LỚN RỰC RỠ VỀ CẢM XÚC', '115000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'camxuc.jpg', '2022-10-24', '541', '5', '6', '15', '10100', '173');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'CUỐN SÁCH LỚN RỰC RỠ VỀ GIÁC QUAN', '120000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'giacquan.jpg', '2022-10-24', '541', '5', '6', '15', '10102', '174');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'CUỐN SÁCH LỚN RỰC RỠ VỀ LOÀI VẬT', '120000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'loaivat.jpg', '2022-10-24', '541', '5', '6', '15', '10104', '175');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'CUỐN SÁCH LỚN RỰC RỠ VỀ BỐN MÙA', '120000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'bonmua.jpg', '2022-10-24', '541', '5', '6', '15', '10106', '176');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'CUỐN SÁCH LỚN RỰC RỠ VỀ XE CỘ', '120000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'xeco.jpg', '2022-10-24', '541', '5', '6', '15', '10108', '177');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'CUỐN SÁCH LỚN RỰC RỠ VỀ KỸ NĂNG', '120000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'kinang.jpg', '2022-10-24', '541', '5', '6', '15', '10110', '178');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Billy Bat', '125000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'billybat.jpg', '2022-10-24', '541', '7', '5', '16', '10112', '179');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'20th Century Boy', '125000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', '20thcentury.jpg', '2022-10-24', '541', '7', '5', '16', '20114', '180');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Monster', '125000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'monster.jpg', '2022-10-24', '541', '7', '5', '16', '10116', '181');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'PIXI THÔNG THÁI - BÍ MẬT THỨC ĂN', '125000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'thucan.jpg', '2022-10-24', '541', '7', '3', '17', '10118', '182');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'PIXI THÔNG THÁI - CƠ THỂ DIỆU KỲ', '125000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'cothe.jpg', '2022-10-24', '541', '7', '3', '17', '10120', '183');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'PIXI THÔNG THÁI - KHÁM PHÁ TOÁN HỌC', '130000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'toanhoc.jpg', '2022-10-24', '541', '7', '3', '17', '10122', '184');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'PIXI THÔNG THÁI - KỸ NĂNG SƠ CỨU', '130000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'socuu.jpg', '2022-10-24', '541', '7', '3', '17', '10124', '185');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'PIXI THÔNG THÁI - AN TOÀN GIAO THÔNG', '130000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'antoan.jpg', '2022-10-24', '541', '7', '3', '17', '10126', '186');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'PIXI THÔNG THÁI - BÍ KÍP HỌC TẬP', '130000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'bikip.jpg', '2022-10-24', '541', '2', '3', '17', '10128', '187');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'PIXI THÔNG THÁI - CƯ XỬ VĂN MINH', '130000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'cuxu.jpg', '2022-10-24', '541', '2', '3', '17', '10130', '188');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'VIỆT NAM VÀ HÌNH MẪU TRUNG HOA', '135000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'vietnamhinhmau.jpg', '2022-10-24', '541', '2', '1', '18', '10132', '189');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'TÍNH SIÊU VIỆT CỦA TỰ NGÃ', '135000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'sieuviet.jpg', '2022-10-24', '541', '2', '2', '18', '10134', '190');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'CÁC NHÂN VẬT NỔI TIẾNG TRONG LỊCH SỬ', '135000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'nhanvatnoi.jpg', '2022-10-24', '541', '2', '2', '18', '10136', '191');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'TIỀN - HIỂU RÕ HƠN, KIẾM TỐT HƠN ', '135000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'tienhieuro.jpg', '2022-10-24', '541', '2', '2', '18', '20138', '192');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'ĐI KHI TA CÒN TRẺ', '135000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'khitacontre.jpg', '2022-10-24', '541', '2', '2', '19', '10140', '193');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'DƯỠNG DA TỐI GIẢN', '140000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'duongda.jpg', '2022-10-24', '541', '2', '2', '19', '10142', '194');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'NHỮNG LỜI HỨA PHẢI GIỮ - CUỘC ĐỜI', '140000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'loihuaphai.jpg', '2022-10-24', '541', '2', '2', '19', '10144', '195');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'HÀN QUỐC QUỐC GIA GÂY SỮNG SỜ', '140000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'hanquocgay.jpg', '2022-10-24', '541', '2', '2', '19', '10146', '196');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Những nhà khám phá', '140000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'nhungnhakhampha.jpg', '2022-10-24', '541', '2', '2', '19', '10148', '197');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Lịch Sử Khoa Học', '140000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'lichsukhoahoc.jpg', '2022-10-24', '541', '6', '6', '20', '10150', '198');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Tri Thức Về Vạn Vật ', '145000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'trithucvanvat.jpg', '2022-10-24', '541', '6', '6', '20', '10152', '199');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Khoa Học giáo dục tiểu học', '145000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'khoahocgiaoduc.png', '2022-10-24', '541', '6', '6', '20', '10154', '200');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Homo Deus: Lược Sử Tương Lai', '145000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'homodeus.jpg', '2022-10-24', '541', '6', '6', '20', '10156', '201');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Bộ Sách Nhân Tố Enzyme', '145000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'enzyme.jpg', '2022-10-24', '541', '6', '6', '20', '10158', '202');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Lược Sử Thời Gian', '145000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'thoigian.jpg', '2022-10-24', '541', '6', '6', '21', '10160', '203');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Lịch Sử Tự Nhiên', '145000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'tunhien.jpg', '2022-10-24', '541', '6', '6', '21', '10162', '204');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Gen Vị Kỷ', '150000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'viki.jpg', '2022-10-24', '541', '6', '6', '21', '10164', '205');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'100 Bí Ẩn Đáng Kinh Ngạc Về Khoa Học', '150000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'biankinh.jpg', '2022-10-24', '541', '6', '6', '21', '10166', '206');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Thông Điệp Của Nước', '150000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'thongdiep.jpg', '2022-10-24', '541', '6', '6', '22', '10168', '207');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Power Vs Force – Trường Năng Lượng', '150000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'powervsforce.jpg', '2022-10-24', '541', '5', '6', '22', '10170', '208');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Sao Chúng Ta Lại Ngủ', '150000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'saolaingu.jpg', '2022-10-24', '541', '5', '6', '22', '10172', '209');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Bách Khoa Thư Về Khoa Học ', '155000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'bachkhoatoanthu.jpg', '2022-10-24', '541', '5', '6', '22', '10174', '210');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Khái Lược Những Tư Tưởng Lớn', '155000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'Khailuoc.jpg', '2022-10-24', '541', '5', '6', '22', '10176', '211');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Khế Ước Xã Hội', '155000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'kheuocxahoi.jpg', '2022-10-24', '541', '5', '4', '23', '10178', '212');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Chính Trị Luận', '155000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'chinhtriluan.png', '2022-10-24', '541', '5', '4', '23', '10180', '213');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Cộng Hòa', '155000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'conghoa.png', '2022-10-24', '541', '5', '4', '23', '10182', '214');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Thế Giới Cho Đến Ngày Hôm Qua', '160000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'thegioicho.jpg', '2022-10-24', '541', '5', '4', '30', '10184', '215');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Sụp Đổ', '160000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'supdo.jpg', '2022-10-24', '541', '5', '4', '30', '10186', '216');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Phải Trái Đúng Sai', '160000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'phaitrai.jpg', '2022-10-24', '541', '5', '4', '29', '10188', '217');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'33 Chiến Lược Của Chiến Tranh', '160000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', '33chienluoc.jpg', '2022-10-24', '541', '7', '4', '28', '10190', '218');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Xứ Đàng Trong – Lịch Sử Kinh Tế', '160000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'xudangtrong.jpg', '2022-10-24', '541', '7', '4', '31', '10192', '219');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Một Tư Duy Khác Về Kinh Tế Và Xã Hội Việt Nam', '160000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'kinhtexahoi.jpg', '2022-10-24', '541', '7', '4', '26', '10194', '220');
INSERT INTO Sach (TenSach, GiaBan, MoTa, AnhBia, NgayCapNhat, SoLuongTon, MaNXB, MaChuDe, MaTacGia, SoLuotXem, SoLuongBan) VALUES (N'Đối Thoại Với Thượng Đế', '160000', N'"Bước vào cuộc sống là từng ngày ta buông thả Tâm và Trí mình trôi theo dòng ""nhân duyên, sinh khởi"" để sau đó rước lấy sợ hãi, bám víu cái giả hư và quan niệm càng sai lầm về tự ngã. Ajahm Chah, bậc minh triết nổi tiếng Á Đông, đã nhấn mạnh ""giáo pháp tự nó phát khởi phù hợp với nhu cầu tức thời, nó phải sống trong hiện tại  mới đúng là chánh Pháp""."', 'doithoaivoi.png', '2022-10-24', '541', '3', '4', '27', '10196', '221');
