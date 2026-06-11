# 📊 Mantralaya HRMS Application

एक comprehensive Human Resource Management System (HRMS) Mantralaya कर्मचारियों के लिए।

## Features ✨

- **👥 Employee Management** - कर्मचारी जानकारी जोड़ें, edit करें, delete करें
- **📋 Attendance Tracking** - Daily attendance mark करें, check-in/check-out times
- **🏖️ Leave Management** - Leave requests submit करें और approve करें
- **💰 Salary Management** - Salary records बनाएं और manage करें
- **⭐ Promotions** - Promotion requests और approval workflow
- **🔄 Transfers** - Department transfers manage करें
- **📌 Postings** - Employee postings को track करें

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js + Express.js
- **Database**: SQLite
- **API**: RESTful APIs

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm

### Steps to Run

1. **Dependencies Install करें:**
```bash
npm install
```

2. **Server Start करें:**
```bash
npm start
```

Server `http://localhost:3000` पर चलेगा

3. **Browser में खोलें:**
```
http://localhost:3000
```

## Project Structure

```
├── server.js                 # Express server और database setup
├── package.json             # npm dependencies
├── public/
│   ├── index.html          # Main HTML dashboard
│   ├── style.css           # Styling (Responsive CSS)
│   └── script.js           # Frontend logic और API calls
└── hrms.db                 # SQLite database (auto-generated)
```

## Database Tables

1. **employees** - Employee information
2. **attendance** - Daily attendance records
3. **leaves** - Leave requests
4. **salaries** - Salary information
5. **promotions** - Promotion records
6. **transfers** - Transfer records
7. **postings** - Employee postings

## API Endpoints

### Employees
- `GET /api/employees` - सभी employees get करें
- `GET /api/employees/:empId` - Single employee
- `POST /api/employees` - नया employee add करें
- `PUT /api/employees/:empId` - Employee update करें
- `DELETE /api/employees/:empId` - Employee delete करें

### Attendance
- `GET /api/attendance/:empId` - Employee का attendance
- `POST /api/attendance` - Attendance mark करें

### Leaves
- `GET /api/leaves/all` - सभी leave requests
- `GET /api/leaves/:empId` - Employee के leaves
- `POST /api/leaves` - Leave request submit करें
- `PUT /api/leaves/:id` - Leave approve/reject करें

### Salary
- `GET /api/salaries/all` - सभी salary records
- `GET /api/salaries/:empId` - Employee की salary
- `POST /api/salaries` - Salary record add करें

### Promotions
- `GET /api/promotions/all` - सभी promotions
- `GET /api/promotions/:empId` - Employee के promotions
- `POST /api/promotions` - Promotion request submit करें
- `PUT /api/promotions/:id` - Promotion approve/reject करें

### Transfers
- `GET /api/transfers/all` - सभी transfers
- `GET /api/transfers/:empId` - Employee के transfers
- `POST /api/transfers` - Transfer request submit करें
- `PUT /api/transfers/:id` - Transfer approve/reject करें

### Postings
- `GET /api/postings/all` - सभी postings
- `GET /api/postings/:empId` - Employee के postings
- `POST /api/postings` - नया posting create करें

## Usage

### Employee Add करना
1. Sidebar में "Employees" पर click करें
2. "+ Add Employee" button दबाएं
3. Employee details fill करें
4. Save करें

### Attendance Mark करना
1. "Attendance" page खोलें
2. "+ Mark Attendance" button दबाएं
3. Employee ID, Date, Status select करें
4. Check-in/Check-out times (optional) add करें
5. Submit करें

### Leave Request करना
1. "Leaves" page खोलें
2. "+ Request Leave" button दबाएं
3. Employee ID, Leave Type, Start/End Date fill करें
4. Reason add करें
5. Submit करें
6. Admin द्वारा Approve/Reject किया जा सकता है

### Promotion/Transfer/Posting
Similar process सभी के लिए है।

## Features Details

### Dashboard
- Total employees count
- Today's attendance summary
- Pending leaves count
- Pending promotions count

### Status Tracking
- **Pending** - Approval का इंतज़ार
- **Approved** - Approved
- **Rejected** - Rejected
- **Present/Absent/Leave/WFH** - Attendance statuses

## Responsive Design
- Desktop-friendly sidebar navigation
- Mobile-responsive tables
- Adaptive modals
- Touch-friendly buttons

## Future Enhancements
- User authentication and role-based access
- PDF salary slip generation
- Email notifications
- Advanced reporting and analytics
- Integration with payroll systems
- Biometric attendance integration

## Notes
- Database is automatically created on first run
- All timestamps are in UTC
- Salary calculations are automatic (Net = Basic + Allowances - Deductions)

---

**Made for Mantralaya Employees** 🇮🇳
