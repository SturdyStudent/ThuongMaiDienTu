USE [QLSach]
GO;

/****** Object:  StoredProcedure [dbo].[SelectAllCD]    Script Date: 10/17/2022 8:36:59 PM ******/
SET ANSI_NULLS ON
GO;

SET QUOTED_IDENTIFIER ON
GO;

--Utility
CREATE FUNCTION DescVoucher(@IDVoucher int)
RETURNS bit
AS
begin
	declare @SoLuong int
	if exists (select v.IDVoucher from Voucher v where v.IDVoucher = @IDVoucher)
		begin
			set @SoLuong = (Select Voucher.SoLuong from Voucher where Voucher.IDVoucher = @IDVoucher)
			Update Voucher
			SET Voucher.SoLuong = @SoLuong - 1
			return 1
		end
	return 0
end;
GO

--select all
CREATE PROCEDURE [dbo].[SelectAllCD]
AS
	Select * FROM ChuDe
GO;

--CREATE PROCEDURE [dbo].[SelectAllCTDHang]
--AS
--SELECT * FROM ChiTietDonHang
--GO;

CREATE PROCEDURE [dbo].[SelectAllDonHang]
AS
SELECT * FROM DonHang
GO;

CREATE PROCEDURE [dbo].[SelectAllGiaoHang]
AS
SELECT * FROM GiaoHang
GO;

CREATE PROCEDURE [dbo].[SelectAllKhachHang]
AS
SELECT * FROM KhachHang
GO;
GO

CREATE PROCEDURE [dbo].[SelectAllNhanVien]
AS
	SELECT * from NhanVien
GO

CREATE PROCEDURE [dbo].[SelectAllNXB]
AS
	SELECT * from NXB
GO

CREATE PROCEDURE [dbo].[SelectAllSach]
AS
	SELECT * from Sach
GO

CREATE PROCEDURE [dbo].[SelectAllTacGia]
AS
	SELECT * from TacGia
GO;

CREATE PROCEDURE [dbo].[SelectAllVoucher]
AS
	SELECT * from Voucher
GO;


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
GO;

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
GO;

CREATE PROCEDURE [dbo].[InsertChiTietDonHang](
@MaDonHang int,
@MaSach	int,
@SoLuong int,
@DonGia money
)
AS
	INSERT INTO ChiTietDonHang(MaDonHang,MaSach, SoLuong, DonGia)
	VALUES (@MaDonHang, @MaSach, @SoLuong, @DonGia);
GO;

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
GO;

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
GO;



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
GO;

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
GO;


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
GO;


--update
CREATE PROCEDURE [dbo].[UpdateChuDe]
@MaChuDe int,
@TenChuDe nvarchar(50)
AS
	UPDATE ChuDe
	SET ChuDe.TenChuDe = @TenChuDe
	WHERE ChuDe.MaChuDe = @MaChuDe
GO;


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
GO;


CREATE PROCEDURE [dbo].[UpdateDonHang](
@MaDonHang int,
@DaThanhToan bit,
@TinhTrangGiaoHang bit,
@NgayDat date,
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
		DonHang.NgayDat = @NgayDat,
		DonHang.NgayGiao = @NgayGiao,
		DonHang.TenNguoiNhan = @TenNguoiNhan,
		DonHang.DienThoaiNguoiNhan = @DienThoaiNguoiNhan,
		DonHang.DiaChiGiao = @DiaChiGiao

	WHERE DonHang.MaDonHang = @MaDonHang
GO;


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
GO;

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
GO;


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
GO;


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
GO;


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
GO;


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
GO;


CREATE PROCEDURE [dbo].[DeleteChiTietDonHang](
	@MaCTDH int
)
AS
	Delete from ChiTietDonHang where ChiTietDonHang.MaCTDH = @MaCTDH;
GO;


CREATE PROCEDURE [dbo].[DeleteDonHang](
	@MaDonHang int
)
AS
	Delete from DonHang where DonHang.MaDonHang = @MaDonHang;
GO;


CREATE PROCEDURE [dbo].[DeleteGiaoHang](
	@MaGH int
)
AS
	Delete from GiaoHang where GiaoHang.MaGH = @MaGH;
GO;


CREATE PROCEDURE [dbo].[DeleteKhachHang](
	@MaKH int
)
AS
	Delete from KhachHang where KhachHang.MaKH = @MaKH;
GO;


CREATE PROCEDURE [dbo].[DeleteNhanVien](
	@MaNV int
)
AS
	Delete from NhanVien where NhanVien.MaNV = @MaNV;
GO;


CREATE PROCEDURE [dbo].[DeleteNXB](
	@MaNXB int
)
AS
	Delete from NXB where NXB.MaNXB = @MaNXB;
GO;


CREATE PROCEDURE [dbo].[DeleteSach](
	@MaSach int
)
AS
	Delete from Sach where Sach.MaSach = @MaSach;
GO;


CREATE PROCEDURE [dbo].[DeleteTacGia](
	@MaTacGia int
)
AS
	Delete from TacGia where TacGia.MaTacGia = @MaTacGia;
GO;


CREATE PROCEDURE [dbo].[DeleteVoucher](
	@IDVoucher int
)
AS
	Delete from Voucher where Voucher.IDVoucher = @IDVoucher;
GO;


