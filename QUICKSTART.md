# 🚀 Quick Start Guide

## शुरू करने के लिए (Getting Started)

### 1️⃣ Installation (30 seconds)

```bash
npm install
```

### 2️⃣ Start Server

```bash
npm start
```

Server चल जाएगा: **http://localhost:3000**

### 3️⃣ Open in Browser

```
http://localhost:3000
```

✅ आप ready हैं! Dashboard खुल जाएगा।

---

## Sample Data Add करना (Optional)

अगर आप demo के लिए test data चाहते हैं:

```bash
# First, make sure server is NOT running
# Stop the server (Ctrl+C)

# Then run:
node sample-data.js

# फिर से server start करें:
npm start
```

यह add करेगा:
- 5 Sample Employees (भारतीय नाम)
- Attendance Records
- Leave Requests
- Salary Data
- Promotion Requests
- Transfer Requests
- Posting Information

---

## Main Features

### 1. 👥 Employee Management
- Employee add करें
- Details edit करें
- Employee delete करें
- Email और phone की जानकारी रखें

### 2. 📋 Attendance
- Daily attendance mark करें
- Check-in / Check-out times track करें
- Status: Present, Absent, Leave, WFH

### 3. 🏖️ Leave Management
- Leave requests submit करें
- Leave types: Sick, Casual, Annual, Maternity
- Approve/Reject workflow

### 4. 💰 Salary
- Salary records create करें
- Automatic Net Salary calculation
- Basic + Allowances - Deductions

### 5. ⭐ Promotions
- Promotion requests submit करें
- Old और New designation track करें
- Salary increment manage करें

### 6. 🔄 Transfers
- Department transfers manage करें
- Transfer requests approve/reject करें

### 7. 📌 Postings
- Employee posting locations track करें
- Current posting maintain करें

---

## Test करना (Testing)

### Test Employee Add करने के लिए:

1. "Employees" menu में जाएं
2. "+ Add Employee" button दबाएं
3. यह details fill करें:
   - Emp ID: `TEST001`
   - Name: `टेस्ट यूजर`
   - Email: `test@test.com`
   - Department: `Testing`
   - Designation: `Test Officer`
   - Salary: `50000`
   - Date of Joining: `आज की तारीख`
4. "Save Employee" दबाएं

✅ Employee list में दिखेगा!

### Test Leave Request करने के लिए:

1. "Leaves" menu में जाएं
2. "+ Request Leave" button दबाएं
3. Fill करें:
   - Emp ID: `TEST001` (या कोई existing)
   - Leave Type: `Casual`
   - Start Date: कल की तारीख
   - End Date: कल से 2 दिन बाद
   - Days: `2`
   - Reason: `Testing leave`
4. Submit करें

✅ Leave request "Pending" status में दिखेगी!

---

## Database

Database automatically create होगी जब आप पहली बार server start करेंगे।

File: `hrms.db` (SQLite)

### Tables:
- `employees` - कर्मचारी information
- `attendance` - Attendance records
- `leaves` - Leave requests
- `salaries` - Salary information
- `promotions` - Promotion records
- `transfers` - Transfer records
- `postings` - Posting information

---

## Troubleshooting

### Port 3000 already in use?

```bash
# Linux/Mac - Find and kill process
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database corrupt?

```bash
# Delete the database
rm hrms.db

# Restart server - new database auto-create होगी
npm start
```

### Dependencies issue?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## API Testing (curl examples)

### Get all employees:
```bash
curl http://localhost:3000/api/employees
```

### Add employee:
```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "empId": "EMP100",
    "name": "John Doe",
    "email": "john@example.com",
    "department": "IT",
    "designation": "Developer",
    "salary": 60000,
    "dateOfJoining": "2024-01-01"
  }'
```

### Get leaves:
```bash
curl http://localhost:3000/api/leaves/all
```

---

## Next Steps

1. ✅ Server run करें
2. ✅ Dashboard देखें
3. ✅ Sample data add करें (optional)
4. ✅ Different features explore करें
5. ✅ Test data create करें

---

## Support

अगर कोई issue हो:
1. Browser console check करें (F12)
2. Server logs देखें
3. Database file check करें
4. Port availability verify करें

**Happy HRMS-ing!** 🎉
