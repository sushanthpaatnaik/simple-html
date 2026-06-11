const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./hrms.db', (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('✓ Connected to SQLite database');
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Employees table
    db.run(`CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT UNIQUE,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      department TEXT,
      designation TEXT,
      salary REAL,
      dateOfJoining DATE,
      address TEXT,
      city TEXT,
      state TEXT,
      pincode TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Attendance table
    db.run(`CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT,
      date DATE,
      status TEXT,
      checkInTime TIME,
      checkOutTime TIME,
      remarks TEXT,
      FOREIGN KEY(empId) REFERENCES employees(empId)
    )`);

    // Leave table
    db.run(`CREATE TABLE IF NOT EXISTS leaves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT,
      leaveType TEXT,
      startDate DATE,
      endDate DATE,
      days INTEGER,
      reason TEXT,
      status TEXT DEFAULT 'Pending',
      approvedBy TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(empId) REFERENCES employees(empId)
    )`);

    // Salary table
    db.run(`CREATE TABLE IF NOT EXISTS salaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT,
      month DATE,
      basicSalary REAL,
      allowances REAL,
      deductions REAL,
      netSalary REAL,
      status TEXT DEFAULT 'Pending',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(empId) REFERENCES employees(empId)
    )`);

    // Promotions table
    db.run(`CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT,
      oldDesignation TEXT,
      newDesignation TEXT,
      oldSalary REAL,
      newSalary REAL,
      promotionDate DATE,
      reason TEXT,
      status TEXT DEFAULT 'Pending',
      approvedBy TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(empId) REFERENCES employees(empId)
    )`);

    // Transfers table
    db.run(`CREATE TABLE IF NOT EXISTS transfers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT,
      oldDepartment TEXT,
      newDepartment TEXT,
      transferDate DATE,
      reason TEXT,
      status TEXT DEFAULT 'Pending',
      approvedBy TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(empId) REFERENCES employees(empId)
    )`);

    // Postings table
    db.run(`CREATE TABLE IF NOT EXISTS postings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empId TEXT,
      location TEXT,
      designation TEXT,
      department TEXT,
      postingDate DATE,
      endDate DATE,
      status TEXT DEFAULT 'Active',
      remarks TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(empId) REFERENCES employees(empId)
    )`);
  });
}

initializeDatabase();

// ============ EMPLOYEE ROUTES ============
// Get all employees
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM employees', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single employee
app.get('/api/employees/:empId', (req, res) => {
  db.get('SELECT * FROM employees WHERE empId = ?', [req.params.empId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

// Add employee
app.post('/api/employees', (req, res) => {
  const { empId, name, email, phone, department, designation, salary, dateOfJoining, address, city, state, pincode } = req.body;
  db.run(
    `INSERT INTO employees (empId, name, email, phone, department, designation, salary, dateOfJoining, address, city, state, pincode)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [empId, name, email, phone, department, designation, salary, dateOfJoining, address, city, state, pincode],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Employee added successfully' });
    }
  );
});

// Update employee
app.put('/api/employees/:empId', (req, res) => {
  const { name, email, phone, department, designation, salary, address, city, state, pincode } = req.body;
  db.run(
    `UPDATE employees SET name=?, email=?, phone=?, department=?, designation=?, salary=?, address=?, city=?, state=?, pincode=? WHERE empId=?`,
    [name, email, phone, department, designation, salary, address, city, state, pincode, req.params.empId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Employee updated successfully' });
    }
  );
});

// Delete employee
app.delete('/api/employees/:empId', (req, res) => {
  db.run('DELETE FROM employees WHERE empId = ?', [req.params.empId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employee deleted successfully' });
  });
});

// ============ ATTENDANCE ROUTES ============
app.get('/api/attendance/:empId', (req, res) => {
  const { month } = req.query;
  const query = month
    ? `SELECT * FROM attendance WHERE empId = ? AND date LIKE ?`
    : `SELECT * FROM attendance WHERE empId = ?`;
  const params = month ? [req.params.empId, month + '%'] : [req.params.empId];

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/attendance', (req, res) => {
  const { empId, date, status, checkInTime, checkOutTime, remarks } = req.body;
  db.run(
    `INSERT INTO attendance (empId, date, status, checkInTime, checkOutTime, remarks)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [empId, date, status, checkInTime, checkOutTime, remarks],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Attendance recorded' });
    }
  );
});

// ============ LEAVE ROUTES ============
app.get('/api/leaves/all', (req, res) => {
  db.all('SELECT * FROM leaves ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/leaves/:empId', (req, res) => {
  db.all('SELECT * FROM leaves WHERE empId = ? ORDER BY createdAt DESC', [req.params.empId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/leaves', (req, res) => {
  const { empId, leaveType, startDate, endDate, days, reason } = req.body;
  db.run(
    `INSERT INTO leaves (empId, leaveType, startDate, endDate, days, reason, status)
     VALUES (?, ?, ?, ?, ?, ?, 'Pending')`,
    [empId, leaveType, startDate, endDate, days, reason],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Leave request submitted' });
    }
  );
});

app.put('/api/leaves/:id', (req, res) => {
  const { status, approvedBy } = req.body;
  db.run(
    `UPDATE leaves SET status = ?, approvedBy = ? WHERE id = ?`,
    [status, approvedBy, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Leave request updated' });
    }
  );
});

// ============ SALARY ROUTES ============
app.get('/api/salaries/all', (req, res) => {
  db.all('SELECT * FROM salaries ORDER BY month DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/salaries/:empId', (req, res) => {
  db.all('SELECT * FROM salaries WHERE empId = ? ORDER BY month DESC', [req.params.empId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/salaries', (req, res) => {
  const { empId, month, basicSalary, allowances, deductions } = req.body;
  const netSalary = basicSalary + allowances - deductions;

  db.run(
    `INSERT INTO salaries (empId, month, basicSalary, allowances, deductions, netSalary, status)
     VALUES (?, ?, ?, ?, ?, ?, 'Pending')`,
    [empId, month, basicSalary, allowances, deductions, netSalary],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, netSalary, message: 'Salary record created' });
    }
  );
});

// ============ PROMOTION ROUTES ============
app.get('/api/promotions/all', (req, res) => {
  db.all('SELECT * FROM promotions ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/promotions/:empId', (req, res) => {
  db.all('SELECT * FROM promotions WHERE empId = ? ORDER BY createdAt DESC', [req.params.empId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/promotions', (req, res) => {
  const { empId, oldDesignation, newDesignation, oldSalary, newSalary, promotionDate, reason } = req.body;
  db.run(
    `INSERT INTO promotions (empId, oldDesignation, newDesignation, oldSalary, newSalary, promotionDate, reason, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')`,
    [empId, oldDesignation, newDesignation, oldSalary, newSalary, promotionDate, reason],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Promotion request submitted' });
    }
  );
});

app.put('/api/promotions/:id', (req, res) => {
  const { status, approvedBy } = req.body;
  db.run(
    `UPDATE promotions SET status = ?, approvedBy = ? WHERE id = ?`,
    [status, approvedBy, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Promotion updated' });
    }
  );
});

// ============ TRANSFER ROUTES ============
app.get('/api/transfers/all', (req, res) => {
  db.all('SELECT * FROM transfers ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/transfers/:empId', (req, res) => {
  db.all('SELECT * FROM transfers WHERE empId = ? ORDER BY createdAt DESC', [req.params.empId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/transfers', (req, res) => {
  const { empId, oldDepartment, newDepartment, transferDate, reason } = req.body;
  db.run(
    `INSERT INTO transfers (empId, oldDepartment, newDepartment, transferDate, reason, status)
     VALUES (?, ?, ?, ?, ?, 'Pending')`,
    [empId, oldDepartment, newDepartment, transferDate, reason],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Transfer request submitted' });
    }
  );
});

app.put('/api/transfers/:id', (req, res) => {
  const { status, approvedBy } = req.body;
  db.run(
    `UPDATE transfers SET status = ?, approvedBy = ? WHERE id = ?`,
    [status, approvedBy, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Transfer updated' });
    }
  );
});

// ============ POSTING ROUTES ============
app.get('/api/postings/all', (req, res) => {
  db.all('SELECT * FROM postings ORDER BY createdAt DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.get('/api/postings/:empId', (req, res) => {
  db.all('SELECT * FROM postings WHERE empId = ? ORDER BY createdAt DESC', [req.params.empId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/postings', (req, res) => {
  const { empId, location, designation, department, postingDate, endDate, remarks } = req.body;
  db.run(
    `INSERT INTO postings (empId, location, designation, department, postingDate, endDate, status, remarks)
     VALUES (?, ?, ?, ?, ?, ?, 'Active', ?)`,
    [empId, location, designation, department, postingDate, endDate, remarks],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Posting created' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`✓ HRMS Server running on http://localhost:${PORT}`);
});
