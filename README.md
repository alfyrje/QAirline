# Airline Reservation System

## I. Giới thiệu chung

Hệ thống **QAirline** là hệ thống đặt vé máy bay với các tính năng:
- **Tìm chuyến bay**: tìm chuyến bay theo địa điểm, ngày tháng
- **Theo dõi chuyến bay**: theo dõi thông tin chuyến bay đã đặt
- **Đăng ký/đăng nhập**: người dùng đăng nhập qua email
- **Đặt vé không cần đăng nhập**: hệ thống gửi vé và xác thực qua email
- **Thống kê**: admin xem thống kê đặt vé của khách hàng

---

## II. Bối cảnh và vấn đề của hệ thống cũ

### 1. Kiến trúc ban đầu

Ở phiên bản đầu tiên, hệ thống đặt vé máy bay được xây dựng theo mô hình đơn giản và chủ yếu tập trung vào chức năng cơ bản:

- **Một backend duy nhất** xử lý toàn bộ:
  - Tìm chuyến bay
  - Đặt vé
  - Hủy vé
  - Xem thông tin vé
- **Frontend monolithic**, gọi trực tiếp API mà chưa có phân tầng rõ ràng.
- **Một cơ sở dữ liệu duy nhất**, bao gồm:
  - Bảng chuyến bay
  - Bảng ghế
  - Bảng khách hàng
  - Bảng vé
- Chưa có:
  - Two-factor authentication
  - Cache
  - Queue / background worker
  - Cơ chế chống race condition
  - Sharding / phân vùng dữ liệu
  - Biến đếm số ghế còn trống

Toàn bộ hệ thống chạy trong một process backend duy nhất, mọi thao tác I/O và tính toán đều thực hiện đồng bộ.

---

### 2. Vấn đề về hiệu năng & ổn định

Khi số lượng người dùng và lượng dữ liệu tăng, hệ thống bộc lộ nhiều hạn chế, đặc biệt ở các tác vụ đọc/ghi tần suất cao.

#### 2.1. Độ trễ cao ở các API nặng

Các API sau thường có latency cao:

- Tìm chuyến bay (JOIN nhiều bảng)
- Tính số ghế còn trống (COUNT vé)
- Đặt vé (transaction nhiều bước)

Tất cả xử lý đồng bộ, không dùng cache, không phân tách load → độ trễ cao khi có nhiều request.

#### 2.2. Nghẽn I/O và nghẽn luồng khi tải lớn

Hệ thống sử dụng một tiến trình duy nhất để xử lý:

- Gửi email xác nhận
- Gửi thông báo
- Truy vấn DB nặng
- Xử lý đặt vé

Các tác vụ I/O lâu làm **chặn luồng HTTP**, dẫn tới:

- Request chờ lâu
- Dễ bị timeout
- Tốc độ giảm mạnh khi concurrent users tăng

#### 2.3. Race condition khi nhiều người đặt cùng một ghế

Trường hợp hai người dùng chọn cùng một chỗ:

- Cả hai đều thấy ghế còn trống
- Cả hai gửi request đặt vé
- Ai vào DB trước thì đặt được
- Người còn lại vẫn có khả năng nhận “đặt thành công”

⇒ Dẫn đến **trùng ghế**, sai dữ liệu và mất tính toàn vẹn giao dịch.

#### 2.4. Không có cache → DB bị quá tải

Các dữ liệu được gọi liên tục như:

- Danh sách chuyến bay
- Số ghế còn trống
- Thông tin chuyến bay chi tiết

đều phải truy vấn trực tiếp vào DB mỗi lần.

⇒ Gây:

- Tăng tải database
- Latency cao
- CPU và connection pool bị chiếm dụng

#### 2.5. Không có phân vùng dữ liệu (sharding)

Toàn bộ dữ liệu (chuyến bay, vé, khách hàng…) đặt chung trong vài bảng lớn.

Khi dữ liệu tăng:

- Truy vấn chậm
- Tranh chấp tài nguyên cao

Đặc biệt các query liên quan đến ghế trống bị ảnh hưởng rõ rệt.

#### 2.6. Tính ghế còn trống bằng COUNT + JOIN quá chậm

Cách cũ:

1. COUNT số vé đã được đặt theo `flight_id`
2. Lấy tổng số ghế – số vé đã đặt

Đây là phép COUNT trên bảng lớn và phải JOIN bảng ghế → tốn thời gian.

⇒ Khi lượng vé tăng, truy vấn này trở thành bottleneck.

---

## III. Cách chạy

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

## IV. Những cải tiến đã thực hiện

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