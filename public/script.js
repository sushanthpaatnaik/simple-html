const API = 'http://localhost:3000/api';

// PAGE NAVIGATION
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const page = link.dataset.page;
    link.classList.add('active');
    document.getElementById(page).classList.add('active');

    document.getElementById('page-title').textContent =
      link.textContent.replace(/[^\w\s]/g, '').trim();

    if (page === 'dashboard') loadDashboard();
    else if (page === 'employees') loadEmployees();
    else if (page === 'attendance') loadAttendance();
    else if (page === 'leaves') loadLeaves();
    else if (page === 'salary') loadSalaries();
    else if (page === 'promotions') loadPromotions();
    else if (page === 'transfers') loadTransfers();
    else if (page === 'postings') loadPostings();
  });
});

// ============ DASHBOARD ============
async function loadDashboard() {
  try {
    const empRes = await fetch(`${API}/employees`);
    const employees = await empRes.json();
    document.getElementById('total-employees').textContent = employees.length;
  } catch (err) {
    console.error('Error loading dashboard:', err);
  }
}

// ============ EMPLOYEES ============
const empModal = document.getElementById('emp-modal');
const empForm = document.getElementById('emp-form');
const addEmpBtn = document.getElementById('add-emp-btn');

addEmpBtn.addEventListener('click', () => {
  empForm.reset();
  empModal.classList.add('show');
});

document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.closest('.modal').classList.remove('show');
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
  }
});

empForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const empData = {
    empId: document.getElementById('empId').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    department: document.getElementById('department').value,
    designation: document.getElementById('designation').value,
    salary: parseFloat(document.getElementById('salary').value),
    dateOfJoining: document.getElementById('dateOfJoining').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    pincode: document.getElementById('pincode').value
  };

  try {
    const res = await fetch(`${API}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empData)
    });

    if (res.ok) {
      empModal.classList.remove('show');
      loadEmployees();
      alert('Employee added successfully!');
    }
  } catch (err) {
    console.error('Error adding employee:', err);
    alert('Error adding employee');
  }
});

async function loadEmployees() {
  try {
    const res = await fetch(`${API}/employees`);
    const employees = await res.json();

    const tbody = document.getElementById('employees-list');
    tbody.innerHTML = employees.map(emp => `
      <tr>
        <td>${emp.empId}</td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
        <td>${emp.designation}</td>
        <td>₹${emp.salary?.toLocaleString('en-IN') || 'N/A'}</td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-secondary" onclick="editEmployee('${emp.empId}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteEmployee('${emp.empId}')">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading employees:', err);
  }
}

async function deleteEmployee(empId) {
  if (!confirm('Are you sure?')) return;

  try {
    await fetch(`${API}/employees/${empId}`, { method: 'DELETE' });
    loadEmployees();
    alert('Employee deleted');
  } catch (err) {
    console.error('Error deleting employee:', err);
  }
}

function editEmployee(empId) {
  alert('Edit functionality - Employee: ' + empId);
}

// ============ ATTENDANCE ============
const attModal = document.getElementById('attendance-modal');
const attForm = document.getElementById('attendance-form');
const markAttBtn = document.getElementById('mark-attendance-btn');

markAttBtn.addEventListener('click', () => {
  attForm.reset();
  attModal.classList.add('show');
});

attForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const attData = {
    empId: document.getElementById('att-empId').value,
    date: document.getElementById('att-date').value,
    status: document.getElementById('att-status').value,
    checkInTime: document.getElementById('att-checkIn').value || null,
    checkOutTime: document.getElementById('att-checkOut').value || null,
    remarks: document.getElementById('att-remarks').value
  };

  try {
    const res = await fetch(`${API}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attData)
    });

    if (res.ok) {
      attModal.classList.remove('show');
      loadAttendance();
      alert('Attendance marked successfully!');
    }
  } catch (err) {
    console.error('Error marking attendance:', err);
    alert('Error marking attendance');
  }
});

async function loadAttendance() {
  const empId = document.getElementById('emp-id-filter')?.value || '';

  if (!empId) {
    document.getElementById('attendance-list').innerHTML =
      '<tr><td colspan="6">Enter Employee ID and filter to view attendance</td></tr>';
    return;
  }

  try {
    const res = await fetch(`${API}/attendance/${empId}`);
    const records = await res.json();

    const tbody = document.getElementById('attendance-list');
    tbody.innerHTML = records.map(rec => `
      <tr>
        <td>${rec.empId}</td>
        <td>${rec.date}</td>
        <td><span class="status-badge status-${rec.status.toLowerCase()}">${rec.status}</span></td>
        <td>${rec.checkInTime || '-'}</td>
        <td>${rec.checkOutTime || '-'}</td>
        <td>${rec.remarks || '-'}</td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading attendance:', err);
  }
}

document.getElementById('filter-btn')?.addEventListener('click', loadAttendance);

// ============ LEAVES ============
const leaveModal = document.getElementById('leave-modal');
const leaveForm = document.getElementById('leave-form');
const requestLeaveBtn = document.getElementById('request-leave-btn');

requestLeaveBtn.addEventListener('click', () => {
  leaveForm.reset();
  leaveModal.classList.add('show');
});

leaveForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const startDate = new Date(document.getElementById('leave-startDate').value);
  const endDate = new Date(document.getElementById('leave-endDate').value);
  const days = document.getElementById('leave-days').value;

  const leaveData = {
    empId: document.getElementById('leave-empId').value,
    leaveType: document.getElementById('leave-type').value,
    startDate: document.getElementById('leave-startDate').value,
    endDate: document.getElementById('leave-endDate').value,
    days: parseInt(days),
    reason: document.getElementById('leave-reason').value
  };

  try {
    const res = await fetch(`${API}/leaves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leaveData)
    });

    if (res.ok) {
      leaveModal.classList.remove('show');
      loadLeaves();
      alert('Leave request submitted successfully!');
    }
  } catch (err) {
    console.error('Error requesting leave:', err);
    alert('Error submitting leave request');
  }
});

async function loadLeaves() {
  try {
    const res = await fetch(`${API}/leaves/all`);
    let leaves = [];

    try {
      leaves = await res.json();
    } catch (e) {
      leaves = [];
    }

    const tbody = document.getElementById('leaves-list');
    if (!leaves || leaves.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7">No leave records found</td></tr>';
      return;
    }

    tbody.innerHTML = leaves.map(leave => `
      <tr>
        <td>${leave.empId}</td>
        <td>${leave.leaveType}</td>
        <td>${leave.startDate}</td>
        <td>${leave.endDate}</td>
        <td>${leave.days}</td>
        <td><span class="status-badge status-${leave.status.toLowerCase()}">${leave.status}</span></td>
        <td>
          ${leave.status === 'Pending' ? `
            <div class="action-buttons">
              <button class="btn btn-success" onclick="approveLeave(${leave.id})">Approve</button>
              <button class="btn btn-danger" onclick="rejectLeave(${leave.id})">Reject</button>
            </div>
          ` : '-'}
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading leaves:', err);
  }
}

async function approveLeave(id) {
  try {
    await fetch(`${API}/leaves/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Approved', approvedBy: 'Admin' })
    });
    loadLeaves();
    alert('Leave approved!');
  } catch (err) {
    console.error('Error approving leave:', err);
  }
}

async function rejectLeave(id) {
  try {
    await fetch(`${API}/leaves/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Rejected', approvedBy: 'Admin' })
    });
    loadLeaves();
    alert('Leave rejected!');
  } catch (err) {
    console.error('Error rejecting leave:', err);
  }
}

// ============ SALARY ============
const salaryModal = document.getElementById('salary-modal');
const salaryForm = document.getElementById('salary-form');
const addSalaryBtn = document.getElementById('add-salary-btn');

addSalaryBtn.addEventListener('click', () => {
  salaryForm.reset();
  salaryModal.classList.add('show');
});

salaryForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const salaryData = {
    empId: document.getElementById('sal-empId').value,
    month: document.getElementById('sal-month').value,
    basicSalary: parseFloat(document.getElementById('sal-basic').value),
    allowances: parseFloat(document.getElementById('sal-allowances').value),
    deductions: parseFloat(document.getElementById('sal-deductions').value)
  };

  try {
    const res = await fetch(`${API}/salaries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(salaryData)
    });

    if (res.ok) {
      salaryModal.classList.remove('show');
      loadSalaries();
      alert('Salary record created successfully!');
    }
  } catch (err) {
    console.error('Error creating salary record:', err);
    alert('Error creating salary record');
  }
});

async function loadSalaries() {
  try {
    const res = await fetch(`${API}/salaries/all`);
    let salaries = [];

    try {
      salaries = await res.json();
    } catch (e) {
      salaries = [];
    }

    const tbody = document.getElementById('salary-list');
    if (!salaries || salaries.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7">No salary records found</td></tr>';
      return;
    }

    tbody.innerHTML = salaries.map(sal => `
      <tr>
        <td>${sal.empId}</td>
        <td>${sal.month}</td>
        <td>₹${sal.basicSalary?.toLocaleString('en-IN') || 0}</td>
        <td>₹${sal.allowances?.toLocaleString('en-IN') || 0}</td>
        <td>₹${sal.deductions?.toLocaleString('en-IN') || 0}</td>
        <td>₹${sal.netSalary?.toLocaleString('en-IN') || 0}</td>
        <td><span class="status-badge status-${sal.status.toLowerCase()}">${sal.status}</span></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading salaries:', err);
  }
}

// ============ PROMOTIONS ============
const promoModal = document.getElementById('promo-modal');
const promoForm = document.getElementById('promo-form');
const addPromoBtn = document.getElementById('add-promo-btn');

addPromoBtn.addEventListener('click', () => {
  promoForm.reset();
  promoModal.classList.add('show');
});

promoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const promoData = {
    empId: document.getElementById('promo-empId').value,
    oldDesignation: document.getElementById('promo-oldDesignation').value,
    newDesignation: document.getElementById('promo-newDesignation').value,
    oldSalary: parseFloat(document.getElementById('promo-oldSalary').value),
    newSalary: parseFloat(document.getElementById('promo-newSalary').value),
    promotionDate: document.getElementById('promo-date').value,
    reason: document.getElementById('promo-reason').value
  };

  try {
    const res = await fetch(`${API}/promotions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promoData)
    });

    if (res.ok) {
      promoModal.classList.remove('show');
      loadPromotions();
      alert('Promotion request submitted!');
    }
  } catch (err) {
    console.error('Error submitting promotion:', err);
    alert('Error submitting promotion');
  }
});

async function loadPromotions() {
  try {
    const res = await fetch(`${API}/promotions/all`);
    let promotions = [];

    try {
      promotions = await res.json();
    } catch (e) {
      promotions = [];
    }

    const tbody = document.getElementById('promotions-list');
    if (!promotions || promotions.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8">No promotion records found</td></tr>';
      return;
    }

    tbody.innerHTML = promotions.map(promo => `
      <tr>
        <td>${promo.empId}</td>
        <td>${promo.oldDesignation}</td>
        <td>${promo.newDesignation}</td>
        <td>₹${promo.oldSalary?.toLocaleString('en-IN') || 0}</td>
        <td>₹${promo.newSalary?.toLocaleString('en-IN') || 0}</td>
        <td>${promo.promotionDate}</td>
        <td><span class="status-badge status-${promo.status.toLowerCase()}">${promo.status}</span></td>
        <td>
          ${promo.status === 'Pending' ? `
            <div class="action-buttons">
              <button class="btn btn-success" onclick="approvePromo(${promo.id})">Approve</button>
              <button class="btn btn-danger" onclick="rejectPromo(${promo.id})">Reject</button>
            </div>
          ` : '-'}
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading promotions:', err);
  }
}

async function approvePromo(id) {
  try {
    await fetch(`${API}/promotions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Approved', approvedBy: 'Admin' })
    });
    loadPromotions();
    alert('Promotion approved!');
  } catch (err) {
    console.error('Error approving promotion:', err);
  }
}

async function rejectPromo(id) {
  try {
    await fetch(`${API}/promotions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Rejected', approvedBy: 'Admin' })
    });
    loadPromotions();
    alert('Promotion rejected!');
  } catch (err) {
    console.error('Error rejecting promotion:', err);
  }
}

// ============ TRANSFERS ============
const transferModal = document.getElementById('transfer-modal');
const transferForm = document.getElementById('transfer-form');
const addTransferBtn = document.getElementById('add-transfer-btn');

addTransferBtn.addEventListener('click', () => {
  transferForm.reset();
  transferModal.classList.add('show');
});

transferForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const transferData = {
    empId: document.getElementById('trans-empId').value,
    oldDepartment: document.getElementById('trans-oldDept').value,
    newDepartment: document.getElementById('trans-newDept').value,
    transferDate: document.getElementById('trans-date').value,
    reason: document.getElementById('trans-reason').value
  };

  try {
    const res = await fetch(`${API}/transfers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transferData)
    });

    if (res.ok) {
      transferModal.classList.remove('show');
      loadTransfers();
      alert('Transfer request submitted!');
    }
  } catch (err) {
    console.error('Error submitting transfer:', err);
    alert('Error submitting transfer');
  }
});

async function loadTransfers() {
  try {
    const res = await fetch(`${API}/transfers/all`);
    let transfers = [];

    try {
      transfers = await res.json();
    } catch (e) {
      transfers = [];
    }

    const tbody = document.getElementById('transfers-list');
    if (!transfers || transfers.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6">No transfer records found</td></tr>';
      return;
    }

    tbody.innerHTML = transfers.map(trans => `
      <tr>
        <td>${trans.empId}</td>
        <td>${trans.oldDepartment}</td>
        <td>${trans.newDepartment}</td>
        <td>${trans.transferDate}</td>
        <td><span class="status-badge status-${trans.status.toLowerCase()}">${trans.status}</span></td>
        <td>
          ${trans.status === 'Pending' ? `
            <div class="action-buttons">
              <button class="btn btn-success" onclick="approveTrans(${trans.id})">Approve</button>
              <button class="btn btn-danger" onclick="rejectTrans(${trans.id})">Reject</button>
            </div>
          ` : '-'}
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading transfers:', err);
  }
}

async function approveTrans(id) {
  try {
    await fetch(`${API}/transfers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Approved', approvedBy: 'Admin' })
    });
    loadTransfers();
    alert('Transfer approved!');
  } catch (err) {
    console.error('Error approving transfer:', err);
  }
}

async function rejectTrans(id) {
  try {
    await fetch(`${API}/transfers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Rejected', approvedBy: 'Admin' })
    });
    loadTransfers();
    alert('Transfer rejected!');
  } catch (err) {
    console.error('Error rejecting transfer:', err);
  }
}

// ============ POSTINGS ============
const postingModal = document.getElementById('posting-modal');
const postingForm = document.getElementById('posting-form');
const addPostingBtn = document.getElementById('add-posting-btn');

addPostingBtn.addEventListener('click', () => {
  postingForm.reset();
  postingModal.classList.add('show');
});

postingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postingData = {
    empId: document.getElementById('post-empId').value,
    location: document.getElementById('post-location').value,
    designation: document.getElementById('post-designation').value,
    department: document.getElementById('post-department').value,
    postingDate: document.getElementById('post-startDate').value,
    endDate: document.getElementById('post-endDate').value || null,
    remarks: document.getElementById('post-remarks').value
  };

  try {
    const res = await fetch(`${API}/postings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postingData)
    });

    if (res.ok) {
      postingModal.classList.remove('show');
      loadPostings();
      alert('Posting created successfully!');
    }
  } catch (err) {
    console.error('Error creating posting:', err);
    alert('Error creating posting');
  }
});

async function loadPostings() {
  try {
    const res = await fetch(`${API}/postings/all`);
    let postings = [];

    try {
      postings = await res.json();
    } catch (e) {
      postings = [];
    }

    const tbody = document.getElementById('postings-list');
    if (!postings || postings.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7">No posting records found</td></tr>';
      return;
    }

    tbody.innerHTML = postings.map(posting => `
      <tr>
        <td>${posting.empId}</td>
        <td>${posting.location}</td>
        <td>${posting.designation}</td>
        <td>${posting.department}</td>
        <td>${posting.postingDate}</td>
        <td>${posting.endDate || '-'}</td>
        <td><span class="status-badge status-${posting.status.toLowerCase()}">${posting.status}</span></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error loading postings:', err);
  }
}

// INITIAL LOAD
loadDashboard();
