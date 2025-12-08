# Airline Reservation System

## I. Giới thiệu chung

Hệ thống **QAirline** là hệ thống đặt vé máy bay với các tính năng:
- **Tìm chuyến bay**: tìm chuyến bay theo địa điểm, ngày tháng
- **Theo dõi chuyến bay**: theo dõi thông tin chuyến bay đã đặt
- **Đăng ký/đăng nhập**: người dùng đăng nhập qua email
- **Đặt vé không cần đăng nhập**: hệ thống gửi vé và xác thực qua email
- **Thống kê**: admin xem thống kê đặt vé của khách hàng

---

## II. Cách chạy

### Backend

Cài PGAdmin sau đó tạo Login/Group Role:
- Tên: **qAirline**
- Password: **denhothoi1**

Sau đó tạo database qAirline với owner là qAirline.

```bash
cd backend
```

Sau khi vào thư mục backend, cài dependencies:

```bash
pip install -r requirements.txt
```

Migrate database:

```bash
pip manage.py migrate
```

Chạy backend:

```bash
pip manage.py runserver
```

### Frontend

Cài dependencies:

```bash
npm install
```

Chạy frontend:

```bash
npm run dev
```

---

## III. Những cải tiến đã thực hiện

#### 2 factor authentication:
Người dùng cần xác thực bằng ứng dụng Authentication App (Google Authenticator, Microsoft Authenticator…) để đăng nhập. Điều này tăng cường bảo mật, tránh truy cập trái phép ngay cả khi mật khẩu bị lộ.

#### Threading:
Hệ thống đã tách các tác vụ nặng như gửi email xác nhận vé, gửi thông báo, xử lý I/O lâu hoặc tính toán phức tạp sang Celery background worker.
Nhờ đó, luồng xử lý HTTP không bị chặn, giúp giảm đáng kể latency, tăng khả năng xử lý đồng thời và ngăn tình trạng nghẽn luồng (thread starvation).
Celery được cấu hình nhiều hàng đợi (queue) để tránh backlog, đồng thời các tác vụ blocking được đưa ra khỏi main thread nhằm tăng throughput và độ ổn định.

#### Caching:
Redis được sử dụng để cache các truy vấn nặng như thông tin chuyến bay, danh sách chuyến bay và số ghế còn trống.
Hệ thống áp dụng sharded keys theo từng Flight ID và cơ chế versioned cache + invalidation theo on_commit để đảm bảo dữ liệu luôn đồng bộ khi DB thay đổi.

#### Chống race condition:
Hệ thống bổ sung cơ chế xử lý trường hợp hai người dùng đặt cùng một ghế. Người đặt sau sẽ nhận thông báo rằng chỗ ngồi đã được đặt và được chuyển về trang chọn lại ghế. Điều này ngăn xung đột dữ liệu và đảm bảo tính toàn vẹn của giao dịch.

#### Sharding:
Hệ thống phân chia dữ liệu và cache theo từng phân vùng (ví dụ theo Flight ID) nhằm giảm độ tranh chấp tài nguyên, tăng tốc truy cập và khả năng mở rộng khi lượng dữ liệu lớn.

#### Giảm thời gian tính toán:
Trước đây, để tính số ghế còn trống, backend phải thực hiện phép JOIN và COUNT giữa các bảng, gây tốn thời gian mỗi khi truy vấn.
Giải pháp mới bổ sung biến “Số chỗ còn trống” trong bảng Flight và cập nhật ngay khi có vé mới được đặt. Nhờ đó, việc truy vấn số ghế trống trở nên cực nhanh, không cần chạy lại các truy vấn nặng.