USE [QLSach]
GO

--Utility

CREATE PROCEDURE [dbo].[GiaoThanhCong](
	@MaDonHang INT
)
AS
	UPDATE DonHang
	SET DonHang.TinhTrangGiaoHang = 1
	WHERE DonHang.MaDonHang = @MaDonHang
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

CREATE PROCEDURE [dbo].[SelectSachChayHang](
@Limit int)
AS
	SELECT TOP (@Limit) * FROM Sach WHERE SoLuongTon = 0 ORDER BY SoLuotXem DESC 
GO

CREATE PROCEDURE [dbo].[SelectCTDHangById](
@IdDonHang int
)
AS
	Select * FROM ChiTietDonHang ct WHERE ct.MaDonHang = @idDonHang
GO

--select all
CREATE PROCEDURE [dbo].[SelectAllCD]
AS
	Select * FROM ChuDe cd
GO

CREATE PROCEDURE [dbo].[SelectAllCTDHang]
AS
SELECT * FROM ChiTietDonHang ct
GO

CREATE PROCEDURE [dbo].[SelectAllDonHang]
AS
SELECT * FROM DonHang
GO

CREATE PROCEDURE [dbo].[SelectAllKhachHang]
AS
	SELECT kh.*, lkh.LoaiKhachHang 
	FROM KhachHang kh, LoaiKH lkh 
	where kh.MaKH = lkh.MaLoaiKH
GO

CREATE PROCEDURE [dbo].[SelectAllLoaiKhachHang]
AS
	Select *
	From LoaiKH
GO

CREATE PROCEDURE [dbo].[SelectAllNhanVien]
AS
	SELECT * 
	from NhanVien
GO

CREATE PROCEDURE [dbo].[SelectAllNXB]
AS
	SELECT * 
	from NXB
GO

CREATE PROCEDURE [dbo].[SelectAllSach]
AS
	SELECT s.MaSach, s.TenSach, s.AnhBia, s.GiaBan, n.TenNXB, cd.TenChuDe ,t.TenTacGia, s.MoTa, s.NgayCapNhat, s.SoLuongBan, s.SoLuongTon, s.SoLuotXem 
	from Sach s, NXB n, TacGia t, ChuDe cd
	WHERE s.SoLuongTon >= 0 and s.MaNXB = n.MaNXB and s.MaTacGia = t.MaTacGia and s.MaChuDe = cd.MaChuDe
GO

CREATE PROCEDURE [dbo].[SelectAllTacGia]
AS
	SELECT * 
	from TacGia
GO

CREATE PROCEDURE [dbo].[SelectAllVoucher]
AS
	SELECT * 
	from Voucher
GO

--Select id
CREATE PROCEDURE [dbo].[SelectChuDeById] (
@idChuDe int
)
AS
	Select * from ChuDe 
	WHERE ChuDe.MaChuDe = @idChuDe
GO

CREATE PROCEDURE [dbo].[SelectChuDeByName] (
@TenChuDe nvarchar(50)
)
AS
	Select * from ChuDe 
	WHERE ChuDe.TenChuDe LIKE @TenChuDe
GO


CREATE PROCEDURE [dbo].[SelectNXBById] (
@idNXB int
)
AS
	Select * 
	from NXB 
	WHERE NXB.MaNXB = @idNXB
GO

CREATE PROCEDURE [dbo].[SelectNXBByName] (
@TenNXB nvarchar(50)
)
AS
	Select * 
	from NXB 
	WHERE NXB.TenNXB LIKE @TenNXB
GO


CREATE PROCEDURE [dbo].[SelectTacGiaById] (
@idTacGia int
)
AS
	Select * 
	from TacGia 
	WHERE TacGia.MaTacGia = @idTacGia
GO


CREATE PROCEDURE [dbo].[SelectTacGiaByName] (
@TenTacGia nvarchar(50)
)
AS
	Select * 
	from TacGia 
	WHERE TacGia.TenTacGia LIKE @TenTacGia
GO

CREATE PROCEDURE [dbo].[SelectSachById] (
@idSach int
)
AS
	Select s.MaSach, s.TenSach, s.AnhBia, s.GiaBan, n.TenNXB, cd.TenChuDe ,t.TenTacGia, s.MoTa, s.NgayCapNhat, s.SoLuongBan, s.SoLuongTon, s.SoLuotXem
	from Sach s, NXB n, TacGia t, ChuDe cd
	WHERE s.MaSach = @idSach and s.MaNXB = n.MaNXB and s.MaTacGia = t.MaTacGia and s.MaChuDe = cd.MaChuDe
GO

CREATE PROCEDURE [dbo].[SelectSachByName] (
@TenSach nvarchar(50)
)
AS
	Select * 
	from Sach 
	WHERE Sach.TenSach LIKE @TenSach
GO


CREATE PROCEDURE [dbo].[SelectKhachHangById] (
@idKhachHang int
)
AS
	Select kh.HoTen, kh.Email, kh.GioiTinh ,kh.DienThoai, kh.DiemTichLuy, kh.DiemDaSuDung, kh.NgaySinh, lkh.LoaiKhachHang
	from KhachHang kh, LoaiKH lkh
	WHERE kh.MaKH = @idKhachHang and lkh.MaLoaiKH = kh.MaLoaiKH
GO


CREATE PROCEDURE [dbo].[SelectKhachHangByName] (
@TenKhachHang nvarchar(50)
)
AS
	Select * 
	from KhachHang 
	WHERE KhachHang.HoTen LIKE @TenKhachHang
GO


CREATE PROCEDURE [dbo].[SelectNhanVienById] (
@idNhanVien int
)
AS
	Select * 
	from NhanVien 
	WHERE NhanVien.MaNV = @idNhanVien
GO


CREATE PROCEDURE [dbo].[SelectNhanVienByTen] (
@TenNhanVien nvarchar(50)
)
AS
	Select * from NhanVien WHERE NhanVien.HoTenNV LIKE @TenNhanVien
GO

CREATE PROCEDURE [dbo].[SelectDonHangById] (
@idDonHang int
)
AS
	Select * from DonHang dh, ChiTietDonHang ct WHERE dh.MaDonHang = @idDonHang and dh.MaDonHang = ct.MaDonHang
GO


CREATE PROCEDURE [dbo].[SelectVoucherById](
@IdVoucher int
)
AS
	SELECT * from Voucher WHERE Voucher.IDVoucher = @IdVoucher
GO


CREATE PROCEDURE [dbo].[SelectVoucherByName](
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

CREATE PROCEDURE [dbo].[InsertLoaiKhachHang](
@LoaiKhachHang NVARCHAR(50),
@UuDaiMienPhiVanChuyen BIT,
@UuDaiSinhNhat BIT,
@UuDaiKhachHangThanThiet BIT
)
AS
	INSERT INTO LoaiKH(LoaiKhachHang, UuDaiMienPhiVanChuyen, UuDaiSinhNhat, UuDaiKhachHangThanThiet)
	VALUES (@LoaiKhachHang, @UuDaiMienPhiVanChuyen, @UuDaiSinhNhat, @UuDaiKhachHangThanThiet)
GO

CREATE PROCEDURE [dbo].[InsertDonHangNotVoucher](
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
	Declare @NgayGiao date,
	@SoLuong int
	Set @NgayGiao = DATEADD(day, 7, @NgayDat)
	begin
		INSERT INTO DonHang(DaThanhToan, TinhTrangGiaoHang, NgayDat, NgayGiao,
		MaKH, TenNguoiNhan, DienThoaiNguoiNhan, DiaChiGiao, HinhThucThanhToan,
		HinhThucGiaoHang, IDVoucher, ThanhTien)
		VALUES (@DaThanhToan, @TinhTrangGiaoHang, @NgayDat, @NgayGiao, @MaKH,
		@TenNguoiNhan, @DienThoaiNguoiNhan, @DiaChiGiao, @HinhThucThanhToan,
		@HinhThucGiaoHang, @IDVoucher, @ThanhTien)
		Set @SoLuong = (select SoLuong from Voucher v where v.IDVoucher = @IDVoucher)
		UPDATE Voucher
		set SoLuong = @SoLuong - 1
	end
GO



CREATE PROCEDURE [dbo].[InsertVoucher](
@CODEVoucher nvarchar(50),
@NgayBatDau date,
@NgayKeyThuc date,
@TriGiaGiam money,
@LoaiVoucher nvarchar(50),
@Soluong int,
@Hieuluc bit,
@MucToiDaCan money,
@MucToiThieuCan money,
@GhiChu nvarchar(50)
)
AS
	INSERT INTO Voucher(CodeVoucher, NgayBatDau, NgayKetThuc, TriGiaGiam, LoaiVoucher, SoLuong, HieuLuc, MucToiThieuCan, MucToiDaCan, GhiChu)
	VALUES (@CODEVoucher, @NgayBatDau, @NgayKeyThuc, @TriGiaGiam, @LoaiVoucher, @Soluong, @Hieuluc,@MucToiDaCan,@MucToiThieuCan, @GhiChu)
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
	INSERT INTO KhachHang(HoTen, TaiKhoan, MatKhau,Email,DiaChi,DienThoai,GioiTinh,NgaySinh, DaXacNhan, MaOTP, DiemTichLuy, DiemDaSuDung, MaLoaiKH)
	VALUES (@HoTen, @TaiKhoan, @MatKhau,@Email,@DiaChi,@DienThoai,@GioiTinh,@NgaySinh, 0, '', 0, 0, 1)
GO

CREATE PROCEDURE [dbo].[InsertNhanVien](
@HoTenNV	nvarchar(50),
@NgaySinh date,
@GioiTinh nvarchar(3),
@sdt nvarchar(50),
@DiaChi	nvarchar(50),
@VaiTro nvarchar(50)
)
AS
	INSERT INTO NhanVien(HoTenNV, NgaySinh, GioiTinh, Sdt, DiaChi, VaiTro)
	VALUES (@HoTenNV, @NgaySinh, @GioiTinh, @sdt, @DiaChi, @VaiTro)
GO

CREATE PROCEDURE [dbo].[InsertNXB](
@TenNXB	nvarchar(50),
@DiaChi	nvarchar(50) = NULL,
@DienThoai nvarchar(50) = NULL
)
AS
	IF @DiaChi IS NULL 
		BEGIN
			SET @DiaChi = N'Đang cập nhật'
		END
	IF @DienThoai IS NULL
		BEGIN
			SET @DienThoai = N'Đang cập nhật'
		END
	BEGIN
		INSERT INTO NXB (TenNXB, Diachi, DienThoai)
		VALUES (@TenNXB, @DiaChi, @DienThoai)
	END
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
	INSERT INTO Sach(TenSach, GiaBan, MoTa,AnhBia,NgayCapNhat,SoLuongTon,MaNXB,MaChuDe, MaTacGia, SoLuotXem, SoLuongBan)
	VALUES (@TenSach, @GiaBan, @MoTa,@AnhBia,@NgayCapNhat,@SoLuongTon,@MaNXB,@MaChuDe, @MaTacGia, 0, 0)
GO


CREATE PROCEDURE [dbo].[InsertTacGia](
@TenTacGia	nvarchar(50),
@HinhTacGia nvarchar(max) = NULL,
@DiaChi nvarchar(50) = NULL,
@TieuSu nvarchar(max) = NULL,
@DienThoai	NVARCHAR(50) = NULL
)
AS
	IF @HinhTacGia IS NULL
		BEGIN
			SET @HinhTacGia = N'Đang cập nhật'
		END
	IF @DiaChi IS NULL
		BEGIN
			SET @DiaChi = N'Đang cập nhật'
		END
	IF @TieuSu IS NULL
		BEGIN
			SET @TieuSu = N'Đang cập nhật'
		END
	IF @DienThoai IS NULL
		BEGIN
			SET @DienThoai = N'Đang cập nhật'
		END
	BEGIN
		INSERT INTO TacGia(TenTacGia, HinhTacGia, DiaChi, TieuSu, DienThoai)
		VALUES (@TenTacGia,@HinhTacGia, @DiaChi, @TieuSu,@DienThoai)
	END
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

CREATE PROCEDURE [dbo].[UpdateKhachHang](
@MaKH int,
@HoTen nvarchar(50),
@TaiKhoan nvarchar(50),
@MatKhau nvarchar(50),
@Email nvarchar(50),
@DiaChi nvarchar(MAX),
@DienThoai nvarchar(20),
@GioiTinh nvarchar(3),
@NgaySinh date,
@MaLoaiKH int
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
		KhachHang.NgaySinh = @NgaySinh,
		KhachHang.MaLoaiKH = @MaLoaiKH
	WHERE KhachHang.MaKH = @MaKH
GO

CREATE PROCEDURE [dbo].[UpdateNhanVien](
@MaNV int,
@HoTenNV nvarchar(50),
@NgaySinh date,
@GioiTinh nvarchar(3),
@Sdt nvarchar(50),
@DiaChi nvarchar(50),
@VaiTro nvarchar(50)
)
AS
	UPDATE NhanVien
	SET
		NhanVien.HoTenNV = @HoTenNV,
		NhanVien.NgaySinh = @NgaySinh,
		NhanVien.GioiTinh = @GioiTinh,
		NhanVien.Sdt = @Sdt,
		NhanVien.DiaChi = @DiaChi,
		NhanVien.VaiTro = @VaiTro
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
@AnhBia nvarchar(MAX),
@NgayCapNhat date,
@SoLuongTon int,
@MaNXB int,
@MaChuDe int,
@MaTacGia int,
@SoLuotXem int,
@SoLuongBan int
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
		Sach.MaTacGia = @MaTacGia,
		Sach.SoLuotXem = @SoLuotXem,
		Sach.SoLuongBan = @SoLuongBan
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

Create PROCEDURE [dbo].[UpdateVoucher](
@IDVoucher int,
@CodeVoucher nvarchar(max),
@NgayBatDau date,
@NgayKetThuc date,
@TriGiaGiam money,
@LoaiVoucher nvarchar(50),
@Soluong bigint,
@HieuLuc bit,
@MucToiDaCan money,
@MucToiThieuCan money
)
AS
	BEGIN
		UPDATE Voucher
		SET 
			Voucher.CodeVoucher = @CodeVoucher,
			Voucher.NgayBatDau = @NgayBatDau,
			Voucher.NgayKetThuc = @NgayKetThuc,
			Voucher.TriGiaGiam = @TriGiaGiam,
			Voucher.LoaiVoucher = @LoaiVoucher,
			Voucher.SoLuong = @Soluong,
			Voucher.HieuLuc = @HieuLuc,
			Voucher.MucToiDaCan = @MucToiDaCan,
			Voucher.MucToiThieuCan = @MucToiThieuCan
		WHERE Voucher.IDVoucher = @IDVoucher
	END
GO

--delete
CREATE PROCEDURE [dbo].[DeleteChuDe](
	@MaChuDe int
)
AS
	Delete from ChuDe 
	where ChuDe.MaChuDe = @MaChuDe;
GO

CREATE PROCEDURE [dbo].[DeleteChiTietDonHang](
	@MaCTDH int
)
AS
	Delete from ChiTietDonHang 
	where ChiTietDonHang.MaCTDH = @MaCTDH;
GO

CREATE PROCEDURE [dbo].[DeleteDonHang](
	@MaDonHang int
)
AS
	Delete from DonHang 
	where DonHang.MaDonHang = @MaDonHang;
GO

CREATE PROCEDURE [dbo].[DeleteKhachHang](
	@MaKH int
)
AS
	Delete from KhachHang 
	where KhachHang.MaKH = @MaKH;
GO


CREATE PROCEDURE [dbo].[DeleteNhanVien](
	@MaNV int
)
AS
	Delete from NhanVien 
	where NhanVien.MaNV = @MaNV;
GO


CREATE PROCEDURE [dbo].[DeleteNXB](
	@MaNXB int
)
AS
	Delete from NXB 
	where NXB.MaNXB = @MaNXB;
GO


CREATE PROCEDURE [dbo].[DeleteSach](
	@MaSach int
)
AS
	Delete from Sach 
	where Sach.MaSach = @MaSach;
GO

CREATE PROCEDURE [dbo].[DeleteTacGia](
	@MaTacGia int
)
AS
	Delete from TacGia 
	where TacGia.MaTacGia = @MaTacGia;
GO

CREATE PROCEDURE [dbo].[DeleteVoucher](
	@IDVoucher int
)
AS
	Delete from Voucher 
	where Voucher.IDVoucher = @IDVoucher;
GO

CREATE PROCEDURE [dbo].[DeleteLoaiKhachHang](
	@IDLoaiKH int
)
AS
	DELETE FROM LoaiKH
	WHERE LoaiKH.MaLoaiKH = @IDLoaiKH
GO