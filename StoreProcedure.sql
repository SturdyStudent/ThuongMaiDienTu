-------------------Đăng nhập/ Đăng kí Nhân viên-----------------------------
CREATE PROC [dbo].[DangNhapNhanVien]
@Email nvarchar(50),
@MatKhau nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT TaiKhoan, Email
	FROM NhanVien
	WHERE Email = @Email AND MatKhau = @MatKhau
END
go

CREATE PROCEDURE [dbo].[InsertKhachHang]
@HoTen	nvarchar(50),
@TaiKhoan	nvarchar(50),
@MatKhau nvarchar(50),
@Email	nvarchar(50),
@DiaChi nvarchar(MAX),
@DienThoai nvarchar(20),
@GioiTinh nvarchar(3),
@NgaySinh date

AS
	INSERT INTO KhachHang(HoTen, TaiKhoan, MatKhau,Email,DiaChi,DienThoai,GioiTinh,NgaySinh)
VALUES (@HoTen, @TaiKhoan, @MatKhau,@Email,@DiaChi,@DienThoai,@GioiTinh,@NgaySinh);
GO
-------------------Đăng nhập/ Đăng kí khách hàng-----------------------------
CREATE PROC [dbo].[DangNhapKhachHang]
@Email nvarchar(50),
@MatKhau nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT TaiKhoan, Email
	FROM KhachHang
	WHERE Email = @Email AND MatKhau = @MatKhau
END
go

CREATE PROCEDURE [dbo].[InsertKhachHang]
@HoTen	nvarchar(50),
@TaiKhoan	nvarchar(50),
@MatKhau nvarchar(50),
@Email	nvarchar(50),
@DiaChi nvarchar(MAX),
@DienThoai nvarchar(20),
@GioiTinh nvarchar(3),
@NgaySinh date

AS
	INSERT INTO KhachHang(HoTen, TaiKhoan, MatKhau,Email,DiaChi,DienThoai,GioiTinh,NgaySinh)
VALUES (@HoTen, @TaiKhoan, @MatKhau,@Email,@DiaChi,@DienThoai,@GioiTinh,@NgaySinh);
GO
-------------------Chủ đề-----------------------------
CREATE PROCEDURE [dbo].[SelectChuDeById]
	@MaChuDe int
AS
	Select * FROM ChuDe
	WHERE MaChuDe = @MaChuDe
GO

CREATE PROCEDURE [dbo].[SelectAllChuDe]
AS
	Select * FROM ChuDe
GO;

CREATE PROCEDURE [dbo].[InsertChuDe]
@TenChuDe nvarchar(50)
AS
	INSERT INTO ChuDe(TenChuDe)
	Values(@TenChuDe);
GO

CREATE PROCEDURE [dbo].[UpdateChuDe]
(
@MaChuDe INT,
@TenChuDe nvarchar(50))
AS
	UPDATE ChuDe
	SET TenChuDe = @TenChuDe
	WHERE MaChuDe = @MaChuDe
GO

CREATE PROCEDURE [dbo].[DeleteCD]
	@MaChuDe int
AS
	Delete from ChuDe where MaChuDe = @MaChuDe;
GO

-------------------Tác giả-----------------------------
CREATE PROCEDURE [dbo].[SelectTacGiaById]
	@MaTacGia int
AS
	Select * FROM TacGia
	WHERE MaTacGia = @MaTacGia
GO

CREATE PROCEDURE [dbo].[SelectAllTacGia]
AS
	Select * FROM TacGia
GO;

CREATE PROCEDURE [dbo].[InsertTacGia](
@TenTacGia nvarchar(50),
@HinhTacGia nvarchar(MAX),
@DiaChi nvarchar(50),
@TieuSu nvarchar(MAX),
@DienThoai varchar(50))
AS
	INSERT INTO TacGia(TenTacGia, HinhTacGia, DiaChi, TieuSu, DienThoai)
	Values(@TenTacGia, @HinhTacGia, @DiaChi, @TieuSu, @DienThoai);
GO

CREATE PROCEDURE [dbo].[UpdateTacGia]
(@MaTacGia int,
@TenTacGia nvarchar(50),
@HinhTacGia nvarchar(MAX),
@DiaChi nvarchar(50),
@TieuSu nvarchar(MAX),
@DienThoai nvarchar(50))
AS
	UPDATE TacGia
	SET
		TenTacGia = @MaTacGia,
		HinhTacGia = @HinhTacGia,
		DiaChi = @DiaChi,
		TieuSu = @TieuSu,
		DienThoai = @DienThoai
	WHERE MaTacGia = @MaTacGia
GO

CREATE PROCEDURE [dbo].[DeleteTacGia]
	@MaTacGia int
AS
	Delete from TacGia where TacGia.MaTacGia = @MaTacGia;
GO
-------------------Nhà Xuất bản-----------------------------
CREATE PROCEDURE [dbo].[SelectNXBById]
	@MaNXB int
AS
	Select * FROM NXB
	WHERE MaNXB = @MaNXB
GO

CREATE PROCEDURE [dbo].[SelectAllNXB]
AS
	SELECT * from NXB
GO

CREATE PROCEDURE [dbo].[InsertNXB]
@TenNXB	nvarchar(50),
@DiaChi	nvarchar(50),
@DienThoai nvarchar(50)

AS
	INSERT INTO NXB (TenNXB, Diachi, DienThoai)
VALUES (@TenNXB, @DiaChi, @DienThoai);
GO

CREATE PROCEDURE [dbo].[UpdateNXB]
(@MaNXB int,
@TenNXB nvarchar(50),
@DiaChi nvarchar(50),
@DienThoai nvarchar(50))

AS
	UPDATE NXB
	SET
		TenNXB = @TenNXB,
		Diachi = @DiaChi,
		DienThoai = @DienThoai
	WHERE MaNXB = @MaNXB
GO

CREATE PROCEDURE [dbo].[DeleteNXB]
	@MaNXB int
AS
	Delete from NXB where NXB.MaNXB = @MaNXB;
GO
-------------------Khách hàng-----------------------------
CREATE PROCEDURE [dbo].[SelectKhachHangById]
	@MaKH INT
AS
SELECT * FROM KhachHang
WHERE MaKH = @MaKH
GO

CREATE PROCEDURE [dbo].[SelectAllKhachHang]
AS
SELECT * FROM KhachHang
GO;

CREATE PROCEDURE [dbo].[UpdateKhachHang]
(@MaKH int,
@HoTen nvarchar(50),
@TaiKhoan nvarchar(50),
@MatKhau nvarchar(50),
@Email nvarchar(50),
@DiaChi nvarchar(MAX),
@DienThoai nvarchar(20),
@GioiTinh nvarchar(3),
@NgaySinh date)

AS
	UPDATE KhachHang
	SET
		HoTen = @HoTen,
		TaiKhoan = @TaiKhoan,
		MatKhau = @MatKhau,
		Email = @Email,
		DiaChi = @DiaChi,
		DienThoai = @DienThoai,
		GioiTinh = @GioiTinh,
		NgaySinh = @NgaySinh
	WHERE MaKH = @MaKH
GO

CREATE PROCEDURE [dbo].[DeleteKH]
	@MaKH int
AS
	Delete from KhachHang where MaKH = @MaKH;
GO
-------------------Sách-----------------------------
CREATE PROCEDURE [dbo].[SelectSachById]
	@MaSach int
AS
	SELECT * from Sach
	WHERE @MaSach = MaSach
GO

CREATE PROCEDURE [dbo].[SelectAllSach]
AS
	SELECT * from Sach
GO

CREATE PROCEDURE [dbo].[InsertSach]
@TenSach	nvarchar(50),
@GiaBan	int,
@MoTa nvarchar(MAX),
@AnhBia	nvarchar(MAX),
@NgayCapNhat date,
@SoLuongTon int,
@MaNXB	int,
@MaChuDe int,
@MaTacGia int
AS
	INSERT INTO Sach(TenSach, GiaBan, MoTa,AnhBia,NgayCapNhat,SoLuongTon,MaNXB,MaChuDe, MaTacGia)
VALUES (@TenSach, @GiaBan, @MoTa,@AnhBia,@NgayCapNhat,@SoLuongTon,@MaNXB,@MaChuDe, @MaTacGia);
GO

CREATE PROCEDURE [dbo].[UpdateSach]
(@MaSach int,
@TenSach nvarchar(50),
@GiaBan nvarchar(50),
@MoTa nvarchar(MAX),
@AnhBia nvarchar(MAX),
@NgayCapNhat date,
@SoLuongTon int,
@MaNXB int,
@MaChuDe int,
@MaTacGia int)

AS
	UPDATE Sach
	SET
		TenSach = @TenSach,
		GiaBan = @GiaBan,
		MoTa = @MoTa,
		AnhBia = @AnhBia,
		NgayCapNhat = @NgayCapNhat,
		SoLuongTon = @SoLuongTon,
		MaNXB = @MaNXB,
		MaChuDe = @MaChuDe,
		MaTacGia = @MaTacGia
	WHERE MaSach = @MaSach
GO

CREATE PROCEDURE [dbo].[DeleteSach]
	@MaSach int
AS
	Delete from Sach where MaSach = @MaSach;
GO
