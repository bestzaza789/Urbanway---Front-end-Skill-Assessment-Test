# ระบบเบิกถอนเงิน & รายงานสถานะการถอน
## Withdrawal Management System

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)

ระบบ Single Page Application สำหรับจัดการคำขอเบิกถอนเงิน พัฒนาด้วย **Next.js 14**, **TypeScript** และ **Tailwind CSS** พร้อมการออกแบบ UI ที่ทันสมัยด้วย **Glassmorphism**, **Bento Grid** และ **Micro-interactions**

---

## ⏱ สรุปโปรเจกต์

| รายการ | รายละเอียด |
|--------|------------|
| **เวลาที่ใช้** | 11 ชั่วโมง |
| **Framework** | Next.js 14 + TypeScript |
| **Styling** | Tailwind CSS + Custom Glassmorphism |

### ✅ สิ่งที่ทำสำเร็จ
- หน้ารายการคำขอพร้อม Dashboard สถิติ และ Bento Grid Layout
- ฟอร์มสร้างคำขอใหม่พร้อม Form Validation
- ระบบอัปโหลดไฟล์ (Drag & Drop) พร้อม Preview
- หน้ารายละเอียดพร้อม Status Timeline และ Attachment Gallery
- ระบบ Filter ตามสถานะ และ Search ด้วยชื่อ/เลขบัญชี/TX ID
- Error Handling แสดง Toast เมื่อเกิดข้อผิดพลาด
- Responsive Design รองรับ Desktop และ Mobile
- UI/UX ด้วย Glassmorphism, Micro-interactions
- **Unit Tests (18 tests passing)** - Vitest + Testing Library
- **Pagination** สำหรับรายการจำนวนมาก (8 items per page)
- **Dark/Light mode toggle** พร้อม localStorage persistence



## 📋 สารบัญ

- [วิธีการรันโปรเจกต์](#-วิธีการรันโปรเจกต์)
- [ฟีเจอร์ที่พัฒนา](#-ฟีเจอร์ที่พัฒนา)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้)
- [การออกแบบ UI/UX](#-การออกแบบ-uiux)
- [การตัดสินใจทางเทคนิค](#-การตัดสินใจทางเทคนิค)

---

## 🚀 วิธีการรันโปรเจกต์

### ความต้องการระบบ
- Node.js 18+ 
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

```bash
# 1. เข้าไปยังโฟลเดอร์โปรเจกต์
cd withdrawal-app

# 2. ติดตั้ง dependencies
npm install

# 3. รันโปรเจกต์ (development mode)
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

### คำสั่งอื่นๆ

```bash
# Build สำหรับ production
npm run build

# รัน production build
npm start

# ตรวจสอบ code quality
npm run lint
```

---

## ✨ ฟีเจอร์ที่พัฒนา

### 1. หน้ารายการคำขอเบิกถอน (Home Page)
- ✅ **Dashboard สถิติ**: แสดงจำนวนรายการทั้งหมด, รอดำเนินการ, สำเร็จ, ล้มเหลว
- ✅ **Bento Grid Layout**: แสดงรายการคำขอในรูปแบบ Grid ที่สวยงาม
- ✅ **Status Badges**: แยกสีตามสถานะ (pending, processing, completed, failed, canceled)
- ✅ **Filter by Status**: กรองรายการตามสถานะ
- ✅ **Search**: ค้นหาด้วยชื่อ, เลขบัญชี หรือ Transaction ID
- ✅ **Debounced Search**: ป้องกัน API calls มากเกินไป

### 2. ฟอร์มสร้างคำขอใหม่ (New Withdrawal Page)
- ✅ **Form Validation**: ตรวจสอบข้อมูลครบถ้วน
  - ชื่อผู้ใช้ (required)
  - เลขบัญชี (required, format validation)
  - ธนาคาร (required)
  - จำนวนเงิน (required, > 0)
- ✅ **File Upload**: รองรับอัปโหลดไฟล์
  - รูปภาพ: JPG, PNG, GIF, WebP
  - วิดีโอ: MP4, MOV, WebM
  - เอกสาร: PDF
- ✅ **Drag & Drop**: ลากไฟล์มาวางได้
- ✅ **File Preview**: แสดงตัวอย่างรูปภาพและวิดีโอก่อนส่ง
- ✅ **Size Validation**: จำกัดขนาดไฟล์ 10MB ต่อไฟล์
- ✅ **Loading State**: แสดง spinner ระหว่างส่งข้อมูล
- ✅ **Toast Notifications**: แจ้งผลการส่งคำขอ

### 3. หน้ารายละเอียด (Detail Page)
- ✅ **ข้อมูลผู้ขอ**: ชื่อ, ธนาคาร, เลขบัญชี
- ✅ **จำนวนเงิน**: แสดงจำนวนเงินพร้อมสกุล
- ✅ **Status Timeline**: ประวัติการเปลี่ยนสถานะพร้อม timestamp
- ✅ **Attachment Gallery**: แสดงไฟล์แนบพร้อม lightbox
- ✅ **Copy Transaction ID**: คัดลอก ID ไปยัง clipboard
- ✅ **หมายเหตุ**: แสดงหมายเหตุ (ถ้ามี)

### 4. ระบบกรองและค้นหา
- ✅ **Filter by Status**: กรองตามสถานะทั้ง 5 สถานะ
- ✅ **Search by Name**: ค้นหาด้วยชื่อผู้ใช้
- ✅ **Search by Account Number**: ค้นหาด้วยเลขบัญชี
- ✅ **Search by Transaction ID**: ค้นหาด้วย ID

---

## 📁 โครงสร้างโปรเจกต์

```
src/
├── app/
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # หน้าหลัก (รายการเบิกถอน)
│   ├── globals.css         # Global styles + Glassmorphism
│   ├── new/
│   │   └── page.tsx        # ฟอร์มสร้างคำขอใหม่
│   └── [id]/
│       └── page.tsx        # หน้ารายละเอียด
├── components/
│   ├── layout/
│   │   └── Navigation.tsx  # Navigation bar
│   ├── ui/
│   │   ├── StatusBadge.tsx # Status badges
│   │   └── FileUpload.tsx  # File upload component
│   └── withdrawal/
│       ├── WithdrawalCard.tsx     # การ์ดรายการ
│       ├── WithdrawalFilter.tsx   # Filter/Search
│       ├── WithdrawalTimeline.tsx # Timeline
│       └── AttachmentGallery.tsx  # Gallery
├── context/
│   └── WithdrawalContext.tsx # Global state
├── services/
│   └── mockApi.ts          # Mock API handlers
├── types/
│   └── withdrawal.ts       # TypeScript interfaces
└── data/
    └── mockData.ts         # Sample data
```

---

## 🛠 เทคโนโลยีที่ใช้

| หมวด | เทคโนโลยี |
|------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom CSS |
| **State Management** | React Context API |
| **Icons** | Lucide React |
| **Font** | Inter (Google Fonts) |

---

## 🎨 การออกแบบ UI/UX

### Glassmorphism
- Background blur effect
- Semi-transparent cards
- Subtle borders and shadows
- Gradient overlays

### Bento Grid
- Responsive grid layout
- Cards with varying sizes
- Gap animations

### Micro-interactions
- **Hover Effects**: Cards lift up, borders glow
- **Status Badge**: Processing status pulses
- **Buttons**: Scale + shadow on hover
- **Page Transitions**: Fade in + slide up
- **Toast Notifications**: Slide in from bottom
- **Loading Spinners**: Smooth rotation
- **Copy to Clipboard**: Icon change animation

### Color Palette
| สถานะ | สี |
|-------|-----|
| Pending | Amber (#F59E0B) |
| Processing | Blue (#3B82F6) |
| Completed | Green (#10B981) |
| Failed | Red (#EF4444) |
| Canceled | Gray (#6B7280) |

---

## 💡 การตัดสินใจทางเทคนิค

### 1. ทำไมใช้ Next.js 14 App Router?
- **Server Components**: เหมาะสำหรับ SEO และ performance
- **File-based Routing**: จัดการ routes ง่าย
- **Built-in Optimization**: Image, Font optimization

### 2. ทำไมใช้ React Context แทน Redux/Zustand?
- **ความเรียบง่าย**: โปรเจกต์ขนาดเล็ก ไม่จำเป็นต้องใช้ library ภายนอก
- **เพียงพอ**: มี state ไม่ซับซ้อนมาก
- **ลด Bundle Size**: ไม่เพิ่ม dependencies

### 3. Mock API Design
- ใช้ **in-memory storage** เพื่อจำลอง database
- เพิ่ม **delay** เพื่อจำลอง network latency
- รองรับ **CRUD operations** ครบถ้วน

### 4. File Upload Approach
- ใช้ **FileReader API** สำหรับ preview
- ใช้ **URL.createObjectURL** สำหรับ blob URLs
- **Client-side validation** ก่อนส่ง

### Trade-offs
| เลือกใช้ | ไม่ได้ใช้ | เหตุผล |
|----------|-----------|--------|
| React Context | Redux | ความเรียบง่าย |
| CSS + Tailwind | Styled Components | Performance |
| Client-side Mock | JSON Server | ไม่ต้องรัน server แยก |
| Native FileReader | Third-party libs | ลด dependencies |

---

## 📸 Screenshots

### หน้าหลัก
- Dashboard สถิติ
- Bento Grid รายการ
- Filter และ Search

### ฟอร์มสร้างคำขอ
- Form validation
- File upload พร้อม preview

### หน้ารายละเอียด
- ข้อมูลครบถ้วน
- Timeline สถานะ
- Attachment gallery

---

## 👨‍💻 ผู้พัฒนา

**Front-end Developer Test Project**

---

## 📝 หมายเหตุ

- โปรเจกต์นี้ใช้ Mock API (ไม่มี backend จริง)
- ข้อมูลจะหายเมื่อ refresh หน้า (in-memory storage)
- รองรับ Responsive Design ทั้ง Desktop และ Mobile
