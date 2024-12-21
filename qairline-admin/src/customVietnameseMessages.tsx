import { TranslationMessages } from 'react-admin';
import vietnameseMessages from 'ra-language-vietnamese';

const customVietnameseMessages: TranslationMessages = {
    ...vietnameseMessages,
    ra: {
        ...vietnameseMessages.ra,
        page: {
            ...vietnameseMessages.ra.page,
            dashboard: 'Tổng quan'
        }
    },
    dashboard: {
        ticket_statistics: 'Thống kê vé',
        total_tickets: 'Tổng số vé',
        total_economic_tickets: 'Tổng số vé phổ thông',
        total_business_tickets: 'Tổng số vé thương gia',
        economy_vs_business: 'Tỷ lệ vé phổ thông - thương gia',
        tickets_per_flight: 'Số vé theo chuyến bay',
        tickets: 'Vé có hiệu lực',
        cancelled_tickets: 'Vé đã hủy'
    },
    resources: {
        flights: {
            name: 'Chuyến bay |||| Chuyến bay',
            fields: {
                code: 'Mã chuyến bay',
                start_location: 'Điểm khởi hành',
                end_location: 'Điểm đến',
                start_time: 'Thời gian khởi hành',
                end_time: 'Thời gian đến',
                plane: 'Máy bay',
                delay_status: 'Trạng thái delay',
                duration: 'Thời gian bay',
                economic_seats_left: 'Ghế phổ thông còn lại',
                business_seats_left: 'Ghế thương gia còn lại',
                economic_price: 'Giá vé phổ thông',
                business_price: 'Giá vé thương gia'
            }
        },
        planes: {
            name: 'Máy bay |||| Máy bay',
            fields: {
                name: 'Tên máy bay',
                manufacturer: 'Nhà sản xuất',
                economic_seats: 'Số ghế phổ thông',
                business_seats: 'Số ghế thương gia'
            }
        },
        tickets: {
            name: 'Vé |||| Vé',
            fields: {
                booker: 'Người đặt',
                flight: 'Chuyến bay',
                passenger: 'Hành khách',
                seat: 'Số ghế',
                ticket_class: 'Hạng vé',
                cancelled: 'Đã hủy',
                code: 'Mã vé'
            }
        },
        travelinfo: {
            name: 'Thông tin du lịch |||| Thông tin du lịch',
            fields: {
                title: 'Tiêu đề',
                html_content: 'Nội dung'
            }
        },
        vouchers: {
            name: 'Voucher |||| Voucher',
            fields: {
                voucher_code: 'Mã voucher',
                voucher_description: 'Mô tả',
                percentage: 'Phần trăm giảm giá',
                voucher_picture: 'Hình ảnh',
                voucher_flight_code: 'Mã chuyến bay'
            }
        },
        passengers: {
            name: 'Hành khách |||| Hành khách',
            fields: {
                first_name: 'Tên',
                last_name: 'Họ',
                qr_email: 'Email',
                date_of_birth: 'Ngày sinh',
                citizen_id: 'CCCD',
                nationality: 'Quốc tịch',
                gender: 'Giới tính'
            }
        }
    }
};

export default customVietnameseMessages;