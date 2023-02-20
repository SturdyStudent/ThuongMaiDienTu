
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
### SCREEN SHOTS CỦA DỰ ÁN
### HƯỚNG DẪN SETUP VÀ CÀI ĐẶT
Đầu tiên clone repository này về máy bằng git, sau đó vào thư mục chứa file bằng visual studio code.
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
