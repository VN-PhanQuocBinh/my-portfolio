# AGENTS.md — Technical Specification & Blueprint for Portfolio UI

Tài liệu đặc tả kiến trúc kỹ thuật và thiết kế giao diện (UI/UX Blueprint) cho trang web Portfolio cá nhân của **Phan Quốc Bình** (Full-Stack Developer).

---

## 1. Phong cách Thiết kế & Stack Công nghệ Chốt (Design Style & Tech Stack)

### Design Taxonomy & Style Keywords
* **Primary Style (Khung sườn chính):** **Minimalist Editorial / Tactile Design** *(Cảm hứng từ `moisez.com`)*
  * Tối giản tối đa đồ họa trang trí rườm rà.
  * Tận dụng khoảng trắng (whitespace) rộng rãi và tỷ lệ typography tương phản mạnh.
  * Mang lại cảm giác "xúc giác" (tactile) tinh tế — giống như một ấn phẩm tạp chí kỹ thuật cao cấp.
* **Interaction Style (Điểm nhấn tương tác):** **Experimental & Playful Interactive Micro-details** *(Cảm hứng từ `yeahright.co`)*
  * Các chi tiết tương tác nhỏ hóm hỉnh, thông minh và đậm chất dev (kinetic character-roll hovers, micro-toasts, widget chạy thuật toán thực tế).
  * Chuyển động ngắn (`150ms–250ms`), sắc nét và có phản hồi thị giác tức thì.

### Tech Stack Specification
* **Framework & Build Tool:** **Vite + React 18+ (TypeScript)** — Tốc độ HMR tức thì, phản hồi nhanh khi vibe code với AI, không lo lỗi Hydration SSR khi dùng hiệu ứng cuộn.
* **Styling Engine:** **Tailwind CSS (v3)**.
* **Typography & Fonts:**
  * **Sans-serif (Chính):** `Plus Jakarta Sans` hoặc `Inter`.
  * **Monospace (Thông số & Code):** `JetBrains Mono` hoặc `Geist Mono`.
* **Motion & Smooth Scroll Engines:**
  * **`lenis` (`@studio-freight/lenis` hoặc `lenis`):** Cuộn vật lý mượt mà (inertia smooth scroll).
  * **`framer-motion`:** Quản lý hiệu ứng masked text reveal, scale dividers, drawer accordion và Toast notifications.
* **Icons & Micro-interactions:** `lucide-react` (Bộ icon stroke 1px).

---

## 2. Hệ thống Màu sắc & Định dạng Typography (Design System)

### Bảng màu Blueprint (Color Palette)
| Vai trò | Mã Hex | Tên gọi | Cách áp dụng trên UI |
| :--- | :--- | :--- | :--- |
| **Nền chính (60%)** | `#F9FAFB` | Paper Off-White | Nền tổng thể từ Hero đến Chương 03. Tạo cảm giác giấy in kỹ thuật dịu mắt. |
| **Chữ & Viền (30%)** | `#010280` | Deep Navy | Tiêu đề lớn, văn bản chính, đường kẻ chia section `1px` và toàn bộ nền Chương 04 (Footer). |
| **Màu phụ hover (7%)** | `#E8EAFA` | Soft Lavender Tint | Nền nhạt khi di chuột vào dòng dự án, các thẻ công nghệ (`Tags / Badges`). |
| **Màu nhấn nút/Data (3%)** | `#00A3FF` | Electric Cyan | Chấm trạng thái live *Available*, nút chạy thuật toán, node đồ thị đang được duyệt. |

### Đơn vị Typography
* **Font tiêu đề:** `Plus Jakarta Sans` hoặc `Inter` (Font-weight: 700 / 800).
* **Font mã nguồn & Thông số:** `JetBrains Mono` hoặc `Geist Mono`.
* **Tiêu đề Hero lớn:** `clamp(2.5rem, 6vw, 5.5rem)`, line-height tight (1.05), letter-spacing (-0.03em).
* **Số thứ tự chương (`01`, `02`, `03`, `04`):** `font-mono text-5xl md:text-7xl text-[#010280]/20 font-bold`.

---

## 3. Quy tắc Navbar Tối giản (STRICT NAVBAR CONSTRAINTS)

1. **TUYỆT ĐỐI KHÔNG CHỨA TÊN TRÊN NAVBAR:** Không đặt "Phan Quốc Bình" hay tên logo cá nhân ở thanh điều hướng. Tên chủ sở hữu xuất hiện nổi bật tại Hero Section.
2. **Kích thước cực nhỏ (Micro-Pill Floating Navbar):**
   * Vị trí: Cố định góc trên (`fixed top-4 right-4 z-50` hoặc `fixed top-4 left-1/2 -translate-x-1/2 z-50`).
   * Kiểu dáng: Thanh nhỏ bo tròn dạng viên thuốc (`rounded-full px-5 py-2 backdrop-blur-md bg-white/75 border border-[#010280]/15 shadow-sm`).
3. **Thành phần trên Navbar:**
   * `01. WORK`
   * `02. EXP`
   * `03. LAB`
   * `04. CONTACT`
   * Chấm tròn cyan nhấp nháy nhẹ kèm chữ `● AVAILABLE`.

---

## 4. Công nghệ Animation & Playful Micro-details

1. **Masked Text Reveal:** Tiêu đề trượt từ bên dưới khung `overflow-hidden` lên trên (`y: 100% -> 0%`, `duration: 0.8s`, `ease: [0.16, 1, 0.3, 1]`).
2. **Scroll-Driven Hairline Dividers:** Mọi đường kẻ ngang `1px solid #010280` tự động vẽ dài theo nhịp cuộn trang (`scaleX: 0 -> 1`).
3. **Staggered Character Roll (Playful Hover):** Khi hover vào nút bấm/link, chữ trượt lên và thay thế bằng dòng chữ y hệt từ dưới trong `200ms`.
4. **Interactive Project List Hover:** Di chuột qua từng hàng dự án ở Chương 02 đổi nền sang `#E8EAFA`, mở rộng drawer thông số kỹ thuật.
5. **Kinetic Text Marquee (Footer):** Dòng chữ chạy ngang vô tận ở Chương 04: `"LET'S BUILD SOMETHING SOLID — AVAILABLE FOR FULL-STACK ROLES —"`.
6. **1-Click Copy Toast Notification:** Bấm vào email `binh26042005@gmail.com` tự động copy kèm Toast thông báo `[ COPIED TO CLIPBOARD ]` hiển thị 2 giây.

---

## 5. Đóng gói Nội dung Chi tiết theo Cấu trúc 4 Chương

### HERO SECTION (Nền `#F9FAFB`)
* **Floating Navbar:** Thanh menu siêu gọn (không chứa tên).
* **Main Heading (Tuyên ngôn):**
  > *"Architecting robust backend systems & engineering crisp digital experiences."*
* **Identity Card (Khối định vị cá nhân):**
  * Tên: **PHAN QUOC BINH** (Phan Quốc Bình)
  * Chức danh: **Junior Full-Stack Developer**
  * Trường & Học vấn: Sinh viên năm cuối ngành **Kỹ thuật Phần mềm** — Đại học Cần Thơ (GPA: **3.81 / 4.0**).
  * Vị trí & Trạng thái: `Cần Thơ, Việt Nam — Open to Remote / On-site Roles`.
* **Tech Stack Quick Badges:** `C# / ASP.NET Core` · `TypeScript / React` · `PostgreSQL` · `Node.js` · `Docker`.
* **Cụm CTA Buttons:** `[ XEM DỰ ÁN ↓ ]` và `[ TẢI CV (PDF) ]`.

---

### CHƯƠNG 01 — KINH NGHIỆM THỰC TẾ (`01 // EXPERIENCE`)
* **Layout:** Chia 2 cột bất đối xứng (Cột trái `30%`: Sticky `01 // EXPERIENCE`; Cột phải `70%`: Đoạn giới thiệu phương châm & Timeline).
* **Phương châm làm việc:** Đề cao tư duy thiết kế hệ thống sạch (Clean Architecture), tính toàn vẹn dữ liệu, tối ưu hóa API và ứng dụng các công cụ AI modern vào quy trình phát triển sản phẩm.
* **Timeline Kinh nghiệm:**
  1. **FPT Software (Cần Thơ)** | *Java Intern* (`05/2026 – 08/2026`)
     * Ứng dụng các công cụ AI để triển khai, refactor tính năng Java, viết Unit Tests và tham gia code review.
     * Trực tiếp điều tra bug và xử lý phản hồi review từ các cấp senior.
     * Làm việc chuẩn quy trình Agile Scrum & Git Flow trong môi trường dự án thực tế.
  2. **Giratech AI** | *Frontend Developer (Remote)* (`07/2025 – 02/2026`)
     * Phát triển giao diện React.js / Next.js chuẩn responsive, tích hợp hệ thống REST APIs.
     * Xây dựng và tối ưu bộ component CMS dùng chung cho các sản phẩm khách hàng.
     * Đóng góp cho các dự án thực tế: *VN168 & CMS*, *GiraTech Landing Page*, *Loyalty App CMS*.

---

### CHƯƠNG 02 — DỰ ÁN TIÊU BIỂU (`02 // SELECTED WORK`)
Trình bày dưới dạng danh sách hàng ngang tương tác (Interactive Project Rows), nhấp vào để mở rộng drawer chi tiết:

#### Project 01 (Spotlight): SmartHire — Recruitment & CV Management Platform
* **Vai trò:** Team Leader / Fullstack Developer (Nhóm 3 người - 3 Sprints Agile).
* **Key Metrics Badges:** `29 DB Tables` | `28+ REST APIs` | `9 CI/CD Deployments`.
* **Đặc tả Backend & CSDL:**
  * Thiết kế 29 bảng CSDL PostgreSQL và schema JSONB tối ưu lưu trữ thông tin CV.
  * Xây dựng 28+ REST API endpoints (Xác thực, Phân quyền RBAC, Quản lý công việc, Hồ sơ ứng tuyển) bằng ASP.NET Core / EF Core.
  * Đánh index PostgreSQL, cấu hình Hangfire background jobs xử lý tác vụ bất đồng bộ và CSDL transactions đảm bảo tính toàn vẹn dữ liệu.
* **Đặc tả Frontend & AI:**
  * Triển khai bộ trình soạn thảo WYSIWYG CV Builder trên React/TypeScript.
  * Tích hợp Gemini API gợi ý nội dung CV thông minh và tính năng xuất PDF.
  * Cấu hình CI/CD tự động lên Vercel, Render và Supabase.
* **Tech Stack:** C#, ASP.NET Core, EF Core, PostgreSQL, React.js, TypeScript, Hangfire, Supabase, Docker, GitHub Actions.
* **Links:** Demo (smart-recruitment-app.vercel.app), GitHub (SE-Project-CTU/smart-recruitment-app).

#### Project 02: Graph Algorithm Visualization Platform (Desktop Application)
* **Vai trò:** Personal Project Developer (`01/2026 – 09/2026`).
* **Key Metrics Badges:** `6 Algorithm Variants` | `Decoupled Architecture` | `Live State Tracking`.
* **Đặc tả kỹ thuật:**
  * Trực quan hóa 6 biến thể thuật toán đồ thị: BFS, DFS, Dijkstra, Chu trình Eulerian, Thành phần liên thông, Thành phần liên thông mạnh.
  * Kiến trúc tách rời hoàn toàn logic thuật toán khỏi tầng hiển thị giao diện thông qua state contract trung tâm (Zustand).
  * Hỗ trợ điều hướng từng bước execution (step playback), Undo/Redo, lưu/mở đồ thị và xuất file hình ảnh PNG.
* **Tech Stack:** TypeScript, React.js, Electron.js, Cytoscape.js, Zustand.
* **Links:** GitHub (VN-PhanQuocBinh/eulerian-cycle).

#### Project 03: Smart Book Management System
* **Vai trò:** Fullstack Developer (`09/2025 – 12/2025`).
* **Key Metrics Badges:** `Vector Search` | `AI Book Recs` | `Dockerized`.
* **Đặc tả kỹ thuật:**
  * Xây dựng giao diện Vue.js/TypeScript tương tác với REST APIs (Node.js/Express).
  * Tích hợp cơ chế xác thực JWT, chuẩn hóa tìm kiếm từ khóa tiếng Việt, bộ lọc đa tiêu chí và phân trang.
  * Xây dựng tính năng gợi ý sách và chat bot AI bằng Vector Search (MongoDB Atlas Vector Search) kết hợp Gemini API embeddings.
  * Đóng gói toàn bộ backend và client portal bằng Docker.
* **Tech Stack:** Node.js, Express.js, Vue.js, TypeScript, MongoDB, Docker, Gemini API.
* **Links:** Demo Frontend, GitHub (Backend, User-Frontend, Admin-Frontend).

---

### CHƯƠNG 03 — PHÒNG THÍ NGHIỆM TƯƠNG TÁC (`03 // INTERACTIVE LAB`)
* **Mục đích:** Khẳng định năng lực tư duy giải thuật backend bằng một widget tương tác chạy trực tiếp trên browser.
* **Widget Specification (Mini Graph Traversal Stepper):**
  * Khung vẽ SVG/Canvas nhỏ màu nền `#010280`.
  * Hiển thị một đồ thị mẫu gồm 6 đỉnh (Nodes) và các cạnh (Edges).
  * Hai nút bấm thao tác: `[ Run BFS ]` và `[ Run Dijkstra ]`.
  * Khi bấm chạy: Các đỉnh được duyệt tự động đổi màu sang cyan sáng `#00A3FF` theo từng bước execution, đính kèm bảng chữ hiển thị trạng thái `Queue / Visited Stack` thời gian thực.

---

### CHƯƠNG 04 — KỸ NĂNG & LIÊN HỆ (`04 // SKILLS & CONTACT`)
* **Đặc trưng Giao diện:** ĐẢO NGƯỢC NỀN (`Background: #010280`, `Text: #F9FAFB`).

#### 1. Bộ Kỹ năng Chuyên môn (Skills Grid - Tiếng Việt)
Hiển thị dạng 7 khối thẻ (Cards) với font chữ Monospace cho các từ khóa công nghệ:

* **1. Ngôn ngữ lập trình (Programming Languages):**
  `JavaScript`, `TypeScript`, `C#`, `Java`, `SQL`, `HTML5 / CSS3`
* **2. Lập trình Frontend (Frontend Development):**
  `React.js`, `Next.js`, `Vue.js`, `Tailwind CSS`, `Responsive Design`, `State Management (Zustand)`
* **3. Lập trình Backend (Backend Development):**
  `Node.js`, `Express.js`, `ASP.NET Core`, `EF Core`, `RESTful APIs`, `Hangfire`, `JWT & RBAC`
* **4. Cơ sở dữ liệu (Database Management):**
  `PostgreSQL (JSONB & Indexing)`, `Supabase`, `MongoDB (Atlas Vector Search)`
* **5. Công cụ & Quy trình AI (Tools & AI Workflows):**
  `Git / GitHub Flow`, `GitHub Actions (CI/CD)`, `Docker`, `Postman`, `CodeRabbit (AI Review)`, `Gemini API Integration`
* **6. Kiểm thử & Sửa lỗi (Testing & Debugging):**
  `Unit Testing`, `Manual Testing`, `API Testing`, `Debugging`
* **7. Nền tảng & Kiến trúc (Fundamentals & Architecture):**
  `Lập trình hướng đối tượng (OOP)`, `Cấu trúc dữ liệu & Giải thuật (DSA)`, `Design Patterns`, `Clean Architecture`, `Layered Architecture`

#### 2. Học vấn & Chứng chỉ (Education & Credentials)
* **Đại học Cần Thơ (Can Tho University):** Chuyên ngành Kỹ thuật Phần mềm (2023 – 2027). GPA hiện tại: **3.81 / 4.0**.
* **Ngoại ngữ:** Chứng chỉ **TOEIC 675** (01/2026) — Đọc hiểu tài liệu kỹ thuật và giao tiếp công việc cơ bản.

#### 3. Chân trang Liên hệ Trực tiếp (Direct Contact Block)
* **Email (Nút bấm 1-Click Copy):** `binh26042005@gmail.com`
* **Điện thoại:** `0387405218`
* **Địa điểm:** `Cần Thơ, Việt Nam`
* **Liên kết xã hội:**
  * GitHub: `github.com/VN-PhanQuocBinh`
  * LinkedIn: `linkedin.com/in/phan-quoc-binh`