# 📊 Mantralaya HRMS - Single HTML File

एक **standalone HTML HRMS application** - कोई backend नहीं, कोई installation नहीं! 🚀

## ⚡ Quick Start

बस `index.html` को browser में खोलो और शुरु करो!

```bash
# Option 1: Direct open
open index.html

# Option 2: Using Python (अगर local server चाहिए)
python -m http.server 8000
# फिर http://localhost:8000 खोलो
```

## ✨ Features

### 7 Core HR Modules
1. 👥 **Employee Management** - कर्मचारी जोड़ें, delete करें
2. 📋 **Attendance Tracking** - Daily attendance, check-in/out
3. 🏖️ **Leave Management** - Leave requests, approval
4. 💰 **Salary Management** - Salary records, automatic calculations
5. ⭐ **Promotions** - Promotion requests, approval
6. 🔄 **Transfers** - Department transfers
7. 📌 **Postings** - Employee posting locations

### Data Management
- **💾 LocalStorage** - Browser में automatic data save
- **📥 JSON Export** - सभी data को JSON file में download करो
- **📤 JSON Import** - पहले save किया हुआ JSON import करो
- **📊 Excel Export** - Data को Excel file (.xlsx) में export करो
- **📊 Excel Import** - Excel file से data import करो
- **📋 Dashboard** - Statistics और overview

## 🎯 कैसे use करें?

### 1. Employee Add करना
1. **Employees** menu में जाओ
2. **+ Add Employee** button दबाओ
3. Employee की details fill करो:
   - Employee ID
   - Name
   - Email
   - Department
   - Designation
   - Salary
   - Date of Joining
4. **Save** करो

### 2. Attendance Mark करना
1. **Attendance** menu में जाओ
2. **+ Mark Attendance** button दबाओ
3. Fill करो:
   - Employee ID
   - Date
   - Status (Present/Absent/Leave/WFH)
   - Check-in/Check-out times (optional)
4. **Save** करो

### 3. Leave Request करना
1. **Leaves** menu में जाओ
2. **+ Request Leave** button दबाओ
3. भरो:
   - Employee ID
   - Leave Type
   - Start & End Date
   - Number of Days
   - Reason
4. **Submit** करो
5. Admin द्वारा **✓ (Approve)** या **✗ (Reject)** किया जा सकता है

### 4. Salary Add करना
1. **Salary** menu में जाओ
2. **+ Add Salary** button दबाओ
3. भरो:
   - Employee ID
   - Month
   - Basic Salary
   - Allowances
   - Deductions
4. Net Salary **automatically calculate** होगी

### 5. Promotions, Transfers, Postings
Similar process - सब modules में same pattern है

## 📥📤 Data Export/Import

### Export Data

#### JSON Format में
```
Top bar में "📥 Export JSON" button दबाओ
→ hrms-backup-YYYY-MM-DD.json download होगी
```

#### Excel Format में
```
Top bar में "📊 Export Excel" button दबाओ
→ hrms-backup-YYYY-MM-DD.xlsx download होगी
→ Multiple sheets: Employees, Attendance, Leaves, etc.
```

### Import Data

#### JSON से
```
Top bar में "📤 Import JSON" button दबाओ
→ पहले save किया हुआ JSON file select करो
→ Data automatically load होगा
```

#### Excel से
```
Top bar में "📤 Import Excel" button दबाओ
→ Excel file select करो
→ Data automatically load होगा
```

## 🔧 Settings & Data Management

**Settings** page में जाकर:
- ✅ Export करो JSON या Excel format में
- ✅ Import करो पहले saved data
- ✅ Clear करो सभी data (⚠️ यह permanent है!)

## 💾 Data Storage

- **Automatic**: सभी data automatically browser के **LocalStorage** में save होता है
- **Persistent**: Browser close करने के बाद भी data रहता है
- **Backup**: Regular intervals पर JSON/Excel export करके backup रखो

## 📁 Data Structure

LocalStorage में यह data रहता है:
```json
{
  "employees": [...],
  "attendance": [...],
  "leaves": [...],
  "salaries": [...],
  "promotions": [...],
  "transfers": [...],
  "postings": [...]
}
```

## 🎨 UI Features

- **Modern Design** - Purple gradient sidebar
- **Responsive** - Mobile-friendly design
- **Easy Navigation** - Clear menu structure
- **Modal Forms** - Pop-up forms for data entry
- **Status Badges** - Color-coded status indicators
- **Data Tables** - Clean, organized tables
- **Dashboard** - Quick statistics overview

## ⚙️ Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks
- **SheetJS Library** - Excel support (CDN से load होता है)
- **LocalStorage API** - Browser data persistence
- **Responsive CSS** - Mobile-friendly
- **Offline Ready** - Internet connection की जरूरत नहीं

## 🔒 Data Security

- Data browser के **LocalStorage** में रहता है
- Data कहीं external server पर नहीं जाता
- Excel/JSON export करके अपने पास backup रखो
- "Clear All Data" से पहले export जरूर कर लेना!

## 🐛 Tips & Tricks

### Data Clear हो गया?
```
Browser console खोलो (F12)
→ localStorage.getItem('hrmsData') check करो
```

### Excel Import में issue?
```
Make sure Excel file में ये sheet names हैं:
- Employees
- Attendance
- Leaves
- Salaries
- Promotions
- Transfers
- Postings
```

### Backup कैसे लें?
```
Regular intervals पर:
1. "📥 Export JSON" दबाओ
2. File को safe place पर save करो
3. Backup complete!
```

## 📱 Browser Support

✅ Chrome/Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile Browsers

## 🚀 Usage Examples

### Test Data Add करना
```
1. Emp ID: EMP001
2. Name: राज कुमार
3. Department: Admin
4. Designation: Senior Officer
5. Salary: 50000
6. Save करो
```

### Attendance 100 employees का add करना
```
Spreadsheet में 100 rows बनाओ
→ Excel file export करो
→ Attendance sheet में data डालो
→ Back import करो
→ Done! 100 attendance records add हो गईं
```

## 📊 Reporting

Data को Excel में export करके analyze कर सकते हो:
- Employee statistics
- Attendance reports
- Salary summaries
- Leave patterns
- Promotion history
- Transfer records

## 🎓 Learning Purpose

यह application सीखने के लिए भी use कर सकते हो:
- HTML/CSS/JavaScript
- LocalStorage API
- File I/O operations
- Data structures
- CRUD operations
- Excel file handling

## ⚠️ Important Notes

1. **Backup** - Regular backup लेते रहो
2. **Browser Data** - If you clear browser data, सब कुछ गायब हो जाएगा
3. **Excel Format** - शीट names exact होनी चाहिए
4. **JSON Format** - Structure maintain करना जरूरी है
5. **Multiple Browsers** - हर browser का अपना data है

## 🎉 Enjoy!

अब आप अपना **HRMS application** use कर सकते हो!

- ✅ No server required
- ✅ No installation
- ✅ Just open index.html
- ✅ All data in your browser
- ✅ Export/Import anytime

---

**Happy HRMS-ing!** 🇮🇳

किसी भी issue के लिए code को inspect करो (Right-click → Inspect → Console)
