
### ỨNG DỤNG MUA SÁCH ONLINE THEO MÔ HÌNH B2C
Ứng dụng mua sách online phỏng theo thiết kế của web bán sách Power's redesign của Mary Nguyen 
https://www.behance.net/gallery/122757229/Powells-Books-Website-Re-design

### TRẠNG THÁI DỰ ÁN
Dự án hiện vẫn đang trong giai đoạn phát triển, các tính năng cơ bản đã hoàn thành như:
* Mua sách. 
* Thêm vào giỏ.
* Thanh toán bằng stripe.
* Theo dõi trạng thái đơn hàng
* Tìm kiếm, phân loại sách.
* Đã xây dựng CMS.
* Các phần liên quan đến quản lí tài khoản người dùng.
Các phần đang hoàn thiện:
* Mã khuyến mãi khách hàng.
* Chat online với khách hàng.
### TÀI KHOẢN TEST
* Email/pass: thanhdat5101@gmail.com/Huflit123
### SCREEN SHOTS CỦA DỰ ÁN
***Trang chủ***

![image](https://user-images.githubusercontent.com/99642423/220072447-2a4c8f1c-7855-4a03-9a62-f929808b080b.png)

***Trang chi tiết sản phẩm***

![image](https://user-images.githubusercontent.com/99642423/220073230-fb612634-b093-444e-abbf-62c789e19ec1.png)

***Trang tìm kiếm sản phẩm***

![image](https://user-images.githubusercontent.com/99642423/220073301-91a7243f-f4e5-4237-b1c9-2f019455f28e.png)

***Trang đơn hàng đã mua***

![image](https://user-images.githubusercontent.com/99642423/220073411-3826d56a-cf7d-40ea-a607-27486ea1a20d.png)

### HƯỚNG DẪN SETUP VÀ CÀI ĐẶT
Đầu tiên clone repository này về máy bằng lệnh:
```
git clone -b Hosting_v1.0 https://github.com/SturdyStudent/ThuongMaiDienTu.git
```
Vào thư mục chứa file bằng visual studio code.
Cài đặt:
1/ Đầu tiên cài đặt backend node trước để chạy dự án, vào bằng lệnh
```
cd ../backend
npm install -f
npm start
```
2/ Vào thư mục admin-site, và chạy lệnh tương tự như bước 1
```
cd ../admin-site
npm install -f
npm start
```
Tương tự với folder bookstore để chạy front end.
Để truy cập front end:
```
localhost:80/
```
Để truy cập front end admin:
```
localhost:3000/
```
### REFLECTION
Dự án là đề tài tự chọn của môn Thương Mại Điện Tử kéo dài 4 tháng. Mục tiêu dự án bao gồm việc áp dụng kiến thức đã học về thương mại điện tử để tạo ra một trang kinh doanh online hoàn chỉnh.

Dự định ban đầu của người phát triển muốn hoàn thiện trang web bán sách theo mô hình C2C, nhưng do khả năng có hạn và chưa có nhiều kinh nghiệm nên xây dựng theo hướng C2C, khó khăn gặp phải đa phần là do chưa tìm hiểu kĩ qui trình hoạt động của một trang thương mại điện tử, dẫn đến luồng logic không đúng phải liên tục chỉnh sửa.

Sau khi kì học kết thúc thì dự án cũng đã hoàn thiện được 60-70%, những phần không làm kịp là ở dịch vụ chăm sóc khách hàng như khuyến mãi, ưu đãi thành viên hạng VIP, hay trò chuyện trực tiếp với khách hàng. Trong lần phát triển kế tiếp tôi dự định sẽ hoàn thiện những phần này, và xa hơn nữa là phát triển trang web thành mô hình C2C.
