Những cải tiến đã được thực hiện:
- 2 factor authentication: Người dùng cần xác thực bằng authentication app để đăng nhập.
- Threading:
- Caching:
- Chống race condition: Cơ chế để 2 người đặt vé cùng lúc thì người đặt vé sau sẽ nhận thông báo chỗ ngồi đã được đặt và được chuyển về trang chọn chỗ.
- Sharding:
- Giảm thời gian tính toán: Hiện tại để tính số chỗ ngồi còn trống thì backend sẽ dùng tổng số ghế trừ đi số vé đã được đặt ở các ghế đó. Điều này sử dụng cả phép JOIN và phép COUNT đối với 2 bảng trong SQL nên thời gian tính toán sẽ lâu. Cách làm mới là sử dụng thêm 1 biến "Số chỗ còn trống" ở bảng Flight và biến đó sẽ được cập nhật mỗi khi 1 vé mới được đặt. Điều này làm giảm đáng kể thời gian query tính toán số ghế trống.