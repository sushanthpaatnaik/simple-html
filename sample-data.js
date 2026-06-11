// Sample Data Generator for HRMS
// Run: node sample-data.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hrms.db');

const sampleEmployees = [
  {
    empId: 'EMP001',
    name: 'राज कुमार',
    email: 'raj.kumar@mantralaya.gov.in',
    phone: '9876543210',
    department: 'Admin',
    designation: 'Senior Officer',
    salary: 65000,
    dateOfJoining: '2020-01-15',
    address: '123 Main Street',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001'
  },
  {
    empId: 'EMP002',
    name: 'प्रिया शर्मा',
    email: 'priya.sharma@mantralaya.gov.in',
    phone: '9876543211',
    department: 'Finance',
    designation: 'Accountant',
    salary: 50000,
    dateOfJoining: '2021-03-20',
    address: '456 Finance Street',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110002'
  },
  {
    empId: 'EMP003',
    name: 'विकास पटेल',
    email: 'vikas.patel@mantralaya.gov.in',
    phone: '9876543212',
    department: 'IT',
    designation: 'System Administrator',
    salary: 55000,
    dateOfJoining: '2019-06-10',
    address: '789 Tech Avenue',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110003'
  },
  {
    empId: 'EMP004',
    name: 'सुनीता वर्मा',
    email: 'sunita.verma@mantralaya.gov.in',
    phone: '9876543213',
    department: 'HR',
    designation: 'HR Manager',
    salary: 60000,
    dateOfJoining: '2018-08-05',
    address: '321 HR Plaza',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110004'
  },
  {
    empId: 'EMP005',
    name: 'अमित सिंह',
    email: 'amit.singh@mantralaya.gov.in',
    phone: '9876543214',
    department: 'Admin',
    designation: 'Junior Officer',
    salary: 35000,
    dateOfJoining: '2022-01-10',
    address: '654 Admin Road',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110005'
  }
];

const sampleAttendance = [
  { empId: 'EMP001', date: '2024-06-10', status: 'Present', checkInTime: '09:15', checkOutTime: '17:30' },
  { empId: 'EMP002', date: '2024-06-10', status: 'Present', checkInTime: '09:30', checkOutTime: '17:45' },
  { empId: 'EMP003', date: '2024-06-10', status: 'WFH', checkInTime: null, checkOutTime: null },
  { empId: 'EMP004', date: '2024-06-10', status: 'Present', checkInTime: '09:00', checkOutTime: '18:00' },
  { empId: 'EMP005', date: '2024-06-10', status: 'Absent', checkInTime: null, checkOutTime: null }
];

const sampleLeaves = [
  {
    empId: 'EMP001',
    leaveType: 'Annual',
    startDate: '2024-07-01',
    endDate: '2024-07-05',
    days: 5,
    reason: 'Family vacation',
    status: 'Pending'
  },
  {
    empId: 'EMP002',
    leaveType: 'Sick',
    startDate: '2024-06-15',
    endDate: '2024-06-16',
    days: 2,
    reason: 'Medical appointment',
    status: 'Approved',
    approvedBy: 'Admin'
  }
];

const sampleSalaries = [
  {
    empId: 'EMP001',
    month: '2024-05',
    basicSalary: 65000,
    allowances: 15000,
    deductions: 8000,
    netSalary: 72000,
    status: 'Approved'
  },
  {
    empId: 'EMP002',
    month: '2024-05',
    basicSalary: 50000,
    allowances: 10000,
    deductions: 6000,
    netSalary: 54000,
    status: 'Approved'
  }
];

const samplePromotions = [
  {
    empId: 'EMP005',
    oldDesignation: 'Junior Officer',
    newDesignation: 'Senior Officer',
    oldSalary: 35000,
    newSalary: 50000,
    promotionDate: '2024-07-01',
    reason: 'Excellent performance and 2 years of service',
    status: 'Pending'
  }
];

const sampleTransfers = [
  {
    empId: 'EMP003',
    oldDepartment: 'IT',
    newDepartment: 'Admin',
    transferDate: '2024-06-20',
    reason: 'Organizational restructuring',
    status: 'Pending'
  }
];

const samplePostings = [
  {
    empId: 'EMP001',
    location: 'Delhi Headquarters',
    designation: 'Senior Officer',
    department: 'Admin',
    postingDate: '2024-01-01',
    endDate: null,
    status: 'Active',
    remarks: 'Current posting'
  }
];

function insertData() {
  db.serialize(() => {
    // Insert employees
    const empStmt = db.prepare(
      `INSERT INTO employees (empId, name, email, phone, department, designation, salary, dateOfJoining, address, city, state, pincode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    sampleEmployees.forEach(emp => {
      empStmt.run([
        emp.empId, emp.name, emp.email, emp.phone, emp.department,
        emp.designation, emp.salary, emp.dateOfJoining, emp.address,
        emp.city, emp.state, emp.pincode
      ]);
    });
    empStmt.finalize();

    // Insert attendance
    const attStmt = db.prepare(
      `INSERT INTO attendance (empId, date, status, checkInTime, checkOutTime) VALUES (?, ?, ?, ?, ?)`
    );
    sampleAttendance.forEach(att => {
      attStmt.run([att.empId, att.date, att.status, att.checkInTime, att.checkOutTime]);
    });
    attStmt.finalize();

    // Insert leaves
    const leaveStmt = db.prepare(
      `INSERT INTO leaves (empId, leaveType, startDate, endDate, days, reason, status, approvedBy)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    sampleLeaves.forEach(leave => {
      leaveStmt.run([
        leave.empId, leave.leaveType, leave.startDate, leave.endDate,
        leave.days, leave.reason, leave.status, leave.approvedBy || null
      ]);
    });
    leaveStmt.finalize();

    // Insert salaries
    const salStmt = db.prepare(
      `INSERT INTO salaries (empId, month, basicSalary, allowances, deductions, netSalary, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    sampleSalaries.forEach(sal => {
      salStmt.run([
        sal.empId, sal.month, sal.basicSalary, sal.allowances,
        sal.deductions, sal.netSalary, sal.status
      ]);
    });
    salStmt.finalize();

    // Insert promotions
    const promoStmt = db.prepare(
      `INSERT INTO promotions (empId, oldDesignation, newDesignation, oldSalary, newSalary, promotionDate, reason, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    samplePromotions.forEach(promo => {
      promoStmt.run([
        promo.empId, promo.oldDesignation, promo.newDesignation,
        promo.oldSalary, promo.newSalary, promo.promotionDate, promo.reason, promo.status
      ]);
    });
    promoStmt.finalize();

    // Insert transfers
    const transStmt = db.prepare(
      `INSERT INTO transfers (empId, oldDepartment, newDepartment, transferDate, reason, status)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    sampleTransfers.forEach(trans => {
      transStmt.run([
        trans.empId, trans.oldDepartment, trans.newDepartment,
        trans.transferDate, trans.reason, trans.status
      ]);
    });
    transStmt.finalize();

    // Insert postings
    const postStmt = db.prepare(
      `INSERT INTO postings (empId, location, designation, department, postingDate, endDate, status, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    samplePostings.forEach(post => {
      postStmt.run([
        post.empId, post.location, post.designation, post.department,
        post.postingDate, post.endDate, post.status, post.remarks
      ]);
    });
    postStmt.finalize();

    console.log('✓ Sample data inserted successfully!');
    console.log('\nSample Employees Added:');
    sampleEmployees.forEach(emp => {
      console.log(`  - ${emp.name} (${emp.empId}) - ${emp.designation}`);
    });

    db.close();
  });
}

insertData();
