# MiniShop - React E-Commerce Application

Dự án ứng dụng bán hàng mini sử dụng **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Redux Toolkit**, **React Context API**, và **React Router v7**.

---

## 📊 Phân loại State Management: useState vs Context vs Redux

Trong dự án **MiniShop**, việc quản lý trạng thái (state) được phân chia rõ ràng theo 3 cấp độ dựa trên phạm vi sử dụng (scope), tần suất thay đổi (frequency of updates), và độ phức tạp của logic:

| Công cụ | Dữ liệu quản lý | Phạm vi (Scope) | Tần suất thay đổi | Lý do lựa chọn |
| :--- | :--- | :--- | :--- | :--- |
| **`useState`** | • `searchTerm`<br>• `username`, `password`, `error` (form login)<br>• `product`, `loading`, `error` (chi tiết sản phẩm)<br>• `isOrdered` | Cục bộ (Local Component) | Thường xuyên trong phạm vi component | Dữ liệu tạm thời, chỉ 1 component sử dụng, không cần chia sẻ sang nơi khác. |
| **`Context API`** | • `theme` (`light` / `dark`)<br>• `user` (trạng thái đăng nhập) | Toàn cục (Global App) | Rất ít khi thay đổi (Low frequency) | Chia sẻ xuyên suốt ứng dụng (Header, Layout, ProtectedRoute), logic đơn giản, không cần cấu hình phức tạp. |
| **`Redux Toolkit`** | • `products` (danh sách sản phẩm, status, error)<br>• `cart` (danh sách giỏ hàng, số lượng) | Toàn cục (Global App) | Thay đổi liên tục & Logic phức tạp | Dữ liệu nghiệp vụ cốt lõi, gọi async API, nhiều component cùng đọc/ghi (ProductCard, Header, CartPage, CheckoutPage). |

---

## 🔍 Chi tiết từng loại dữ liệu & Lý do lựa chọn

### 1. Quản lý bằng `useState` (Local State)

Các dữ liệu được giữ ở mức `useState`:
- **`searchTerm`** (trong `HomePage.tsx`):
  - **Dữ liệu**: Chuỗi ký tự người dùng nhập vào ô tìm kiếm sản phẩm.
  - **Lý do**: Chỉ dùng cục bộ để lọc danh sách `filteredItems` ngay tại `HomePage`. Các trang khác không cần biết người dùng đang tìm kiếm từ khóa gì, do đó không cần đưa lên store chung.
- **`username`, `password`, `error`** (trong `LoginPage.tsx`):
  - **Dữ liệu**: Giá trị các trường input trong form đăng nhập và thông báo lỗi xác thực tạm thời.
  - **Lý do**: Đây là trạng thái biểu mẫu (form-level state). Sau khi submit và xác thực xong, các giá trị này không còn giá trị sử dụng.
- **`product`, `loading`, `error`** (trong `ProductDetailPage.tsx`):
  - **Dữ liệu**: Chi tiết 1 sản phẩm cụ thể được fetch theo `id` từ URL params.
  - **Lý do**: Dữ liệu gắn liền với vòng đời của trang chi tiết; khi người dùng rời trang hoặc chuyển sang xem sản phẩm khác thì dữ liệu sẽ được tải mới, không cần lưu trữ vĩnh viễn trên Redux store.
- **`isOrdered`** (trong `CheckoutPage.tsx`):
  - **Dữ liệu**: Cờ boolean hiển thị thông báo "Đặt hàng thành công".
  - **Lý do**: Trạng thái giao diện (UI state) ngắn hạn tại chỗ.

---

### 2. Quản lý bằng `Context API` (Global Configuration & Auth)

Các dữ liệu được quản lý qua React Context:
- **`ThemeContext`** (`theme`: `'light' | 'dark'`, `toggleTheme`):
  - **Dữ liệu**: Chế độ giao diện sáng/tối và hàm đổi giao diện.
  - **Lý do**:
    - **Phạm vi rộng**: Toàn bộ ứng dụng (từ thẻ bọc ngoài `ThemeProvider` đến các button, card, header) đều cần biết theme hiện tại để áp dụng màu nền và màu chữ.
    - **Tần suất thay đổi thấp**: Người dùng chỉ bấm chuyển theme vài lần trong suốt phiên làm việc.
    - **Logic đơn giản**: Chỉ là toggle giữa `'light'` và `'dark'`, không có action hay reducer phức tạp, dùng Context API là gọn nhẹ và chuẩn idiomatic React nhất.
- **`AuthContext`** (`user`: `{ username } | null`, `login`, `logout`):
  - **Dữ liệu**: Thông tin phiên đăng nhập của người dùng.
  - **Lý do**:
    - **Chia sẻ đa điểm**: `Header` cần biết user để hiển thị lời chào và nút "Đăng xuất"; `ProtectedRoute` cần kiểm tra user để bảo vệ trang Checkout; `LoginPage` cần gọi hàm `login`.
    - **Tần suất cập nhật rất thấp**: Trạng thái chỉ đổi 1 lần khi đăng nhập và 1 lần khi đăng xuất. Tách riêng ra Context giúp cô lập domain xác thực (Auth) khỏi Redux store, dễ tái sử dụng và bảo trì.

---

### 3. Quản lý bằng `Redux Toolkit` (Core Business Data & Complex State)

Các dữ liệu được quản lý qua Redux Slices:
- **`productsSlice`** (`items`, `status`: `'idle' | 'loading' | 'succeeded' | 'failed'`, `error`):
  - **Dữ liệu**: Danh sách sản phẩm tải về từ FakeStore API, trạng thái xử lý bất đồng bộ, thông báo lỗi.
  - **Lý do**:
    - **Xử lý Async thunk**: Cần quản lý vòng đời bất đồng bộ phức tạp (`createAsyncThunk`), bắt các trạng thái `pending`, `fulfilled`, `rejected` một cách chuẩn hóa.
    - **Cache & chia sẻ**: Giữ danh sách sản phẩm trong Redux store giúp tránh gọi lại API không cần thiết khi người dùng điều hướng qua lại giữa các trang.
    - **Khả năng mở rộng**: Dễ dàng tích hợp thêm các chức năng phân trang, lọc nâng cao, sắp xếp theo giá mà không phá vỡ cấu trúc component.
- **`cartSlice`** (`items`: `CartItem[]`):
  - **Dữ liệu**: Danh sách các sản phẩm trong giỏ, số lượng (`quantity`) mỗi mặt hàng.
  - **Lý do**:
    - **Nhiều component cùng đọc và ghi**:
      - `ProductCard` & `ProductDetailPage`: Dispatch action `addToCart`.
      - `Header`: Lắng nghe giỏ hàng để tính tổng số lượng hiển thị trên icon giỏ hàng (`🛒 Giỏ hàng (n)`).
      - `CartPage`: Hiển thị bảng sản phẩm, tính tổng tiền, dispatch `updateQuantity` và `removeFromCart`.
      - `CheckoutPage`: Dispatch `clearCart` sau khi hoàn tất đặt hàng.
    - **Hiệu năng & Tránh Re-render không mong muốn**: Nếu đặt giỏ hàng (vốn thay đổi số lượng liên tục) vào Context API, mọi component tiêu thụ context đó sẽ bị re-render lại. Redux Toolkit kết hợp với `useSelector` chỉ kích hoạt re-render cho các component thực sự phụ thuộc vào slice data đó.
    - **Logic cập nhật tập trung**: Thao tác thêm trùng sản phẩm thì tăng số lượng, xoá sản phẩm, cập nhật số lượng, làm rỗng giỏ hàng được định nghĩa rõ ràng trong reducers, dễ viết unit test và theo dõi lịch sử qua Redux DevTools.

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### Cài đặt dependencies:
```bash
cd MiniShop
npm install
```

### Chạy môi trường phát triển (Dev server):
```bash
npm run dev
```
Truy cập: `http://localhost:5173`

### Kiểm tra build sản phẩm:
```bash
npm run build
```

---

## 🛠️ Cấu trúc thư mục

```
MiniShop/
├── src/
│   ├── app/
│   │   ├── hooks.ts             # Typed hooks (useAppDispatch, useAppSelector)
│   │   └── store.ts             # Redux Store cấu hình reducers
│   ├── components/
│   │   ├── Header.tsx           # Header hiển thị theme, auth, badge giỏ hàng
│   │   ├── ProductCard.tsx      # Thẻ sản phẩm với nút thêm giỏ hàng
│   │   └── ProtectedRoute.tsx   # HOC/Component bảo vệ route yêu cầu đăng nhập
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Context quản lý đăng nhập/đăng xuất
│   │   └── ThemeContext.tsx     # Context quản lý chế độ Sáng/Tối
│   ├── features/
│   │   ├── cart/cartSlice.ts    # Redux slice quản lý giỏ hàng
│   │   └── products/productsSlice.ts # Redux slice fetch dữ liệu FakeStore API
│   ├── layouts/
│   │   └── MainLayout.tsx       # Layout chung chứa Header & Outlet
│   ├── pages/
│   │   ├── HomePage.tsx         # Trang chủ danh sách sản phẩm & tìm kiếm
│   │   ├── ProductDetailPage.tsx# Trang chi tiết sản phẩm
│   │   ├── CartPage.tsx         # Trang giỏ hàng
│   │   ├── CheckoutPage.tsx     # Trang thanh toán (yêu cầu login)
│   │   ├── LoginPage.tsx        # Trang đăng nhập (mật khẩu: 123456)
│   │   └── NotFoundPage.tsx     # Trang lỗi 404
│   ├── types/
│   │   └── index.ts             # Định nghĩa Product, CartItem, User
│   ├── App.tsx                  # Thiết lập React Router
│   ├── index.css                # Cấu hình Tailwind CSS v4
│   └── main.tsx                 # Điểm khởi chạy React, Providers
├── package.json
└── vite.config.ts
```
