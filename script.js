// let expenses = [];
// let editingId = null;

// function isLocalStorageAvailable() {
//     try {
//         const test = '__localStorage_test__';
//         localStorage.setItem(test, test);
//         localStorage.removeItem(test);
//         return true;
//     } catch (e) {
//         return false;
//     }
// }

// function loadExpenses() {
//     if (!isLocalStorageAvailable()) {
//         console.warn('localStorage is not available');
//         return;
//     }
    
//     try {
//         const saved = localStorage.getItem('expenses');
//         if (saved) {
//             expenses = JSON.parse(saved);
//         }
//     } catch (error) {
//         console.error('Error loading expenses:', error);
//         expenses = [];
//     }
    
//     renderExpenses();
//     updateSummary();
// }

// function saveExpenses() {
//     if (!isLocalStorageAvailable()) {
//         console.warn('localStorage is not available');
//         return;
//     }
    
//     try {
//         localStorage.setItem('expenses', JSON.stringify(expenses));
//     } catch (error) {
//         console.error('Error saving expenses:', error);
//         if (error.name === 'QuotaExceededError') {
//             alert('Storage quota exceeded. Please delete some expenses.');
//         }
//     }
// }

// function initializeApp() {
//     const dateInput = document.getElementById('date');
//     if (dateInput) {
//         dateInput.valueAsDate = new Date();
//     }
    
//     loadExpenses();
    
//     const expenseForm = document.getElementById('expense-form');
//     const cancelBtn = document.getElementById('cancel-btn');
//     const applyFilterBtn = document.getElementById('apply-filter-btn');
//     const clearFilterBtn = document.getElementById('clear-filter-btn');
    
//     if (expenseForm) {
//         expenseForm.addEventListener('submit', handleFormSubmit);
//     }
    
//     if (cancelBtn) {
//         cancelBtn.addEventListener('click', cancelEdit);
//     }
    
//     if (applyFilterBtn) {
//         applyFilterBtn.addEventListener('click', applyFilters);
//     }
    
//     if (clearFilterBtn) {
//         clearFilterBtn.addEventListener('click', clearFilters);
//     }
// }

// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initializeApp);
// } else {
//     initializeApp();
// }

// function handleFormSubmit(e) {
//     e.preventDefault();
    
   
//     document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
//     const amount = parseFloat(document.getElementById('amount').value);
//     const date = document.getElementById('date').value;
//     const category = document.getElementById('category').value;
//     const note = document.getElementById('note').value.trim();
    
//     let isValid = true;
    
//     if (!amount || amount <= 0) {
//         document.getElementById('amount-error').textContent = 'Please enter a valid amount';
//         isValid = false;
//     }
    
//     if (!date) {
//         document.getElementById('date-error').textContent = 'Please select a date';
//         isValid = false;
//     }
    
//     if (!category) {
//         document.getElementById('category-error').textContent = 'Please select a category';
//         isValid = false;
//     }
    
//     if (!isValid) return;
    
//     if (editingId !== null) {
        
        
//         const index = expenses.findIndex(exp => exp.id === editingId);
//         if (index !== -1) {
//             expenses[index] = {
//                 id: editingId,
//                 amount: amount,
//                 date: date,
//                 category: category,
//                 note: note
//             };
//         }
//         editingId = null;
//         document.getElementById('form-title').textContent = 'Add New Expense';
//         document.getElementById('submit-btn').textContent = 'Add Expense';
//         document.getElementById('cancel-btn').style.display = 'none';
//     } else {

//         const expense = {
//             id: Date.now(),
//             amount: amount,
//             date: date,
//             category: category,
//             note: note
//         };
//         expenses.push(expense);
//     }
    
//     saveExpenses();
//     renderExpenses();
//     updateSummary();
    
//     document.getElementById('expense-form').reset();
//     document.getElementById('date').valueAsDate = new Date();
// }


// function cancelEdit() {
//     editingId = null;
//     document.getElementById('form-title').textContent = 'Add New Expense';
//     document.getElementById('submit-btn').textContent = 'Add Expense';
//     document.getElementById('cancel-btn').style.display = 'none';
//     document.getElementById('expense-form').reset();
//     document.getElementById('date').valueAsDate = new Date();
//     document.querySelectorAll('.error').forEach(el => el.textContent = '');
// }

// function renderExpenses(filteredExpenses = null) {
//     const tbody = document.getElementById('expense-tbody');
//     if (!tbody) return;
    
//     const expensesToShow = filteredExpenses || expenses;
    
//     if (expensesToShow.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="5" class="no-data">No expenses found.</td></tr>';
//         return;
//     }
    
//     const sorted = [...expensesToShow].sort((a, b) => new Date(b.date) - new Date(a.date));
    
//     tbody.innerHTML = sorted.map(expense => `
//         <tr>
//             <td>${expense.date}</td>
//             <td>${expense.category}</td>
//             <td>$${expense.amount.toFixed(2)}</td>
//             <td>${expense.note || '-'}</td>
//             <td class="actions">
//                 <button class="btn-update" onclick="editExpense(${expense.id})">Edit</button>
//                 <button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button>
//             </td>
//         </tr>
//     `).join('');
// }

// window.editExpense = function(id) {
//     const expense = expenses.find(exp => exp.id === id);
//     if (!expense) return;
    
//     editingId = id;
//     document.getElementById('amount').value = expense.amount;
//     document.getElementById('date').value = expense.date;
//     document.getElementById('category').value = expense.category;
//     document.getElementById('note').value = expense.note;
    
//     document.getElementById('form-title').textContent = 'Edit Expense';
//     document.getElementById('submit-btn').textContent = 'Update Expense';
//     document.getElementById('cancel-btn').style.display = 'inline-block';
    
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// };


// window.deleteExpense = function(id) {
//     if (!confirm('Are you sure you want to delete this expense?')) return;
    
//     expenses = expenses.filter(exp => exp.id !== id);
//     saveExpenses();
//     renderExpenses();
//     updateSummary();
// };


// function updateSummary() {
//     const totalEl = document.getElementById('total-amount');
//     const countEl = document.getElementById('total-count');
//     const categorySummaryEl = document.getElementById('category-summary');
    
//     if (!totalEl || !countEl || !categorySummaryEl) return;
    
//     const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
//     totalEl.textContent = total.toFixed(2);
//     countEl.textContent = expenses.length;
    
//     const categoryTotals = {};
//     expenses.forEach(exp => {
//         categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
//     });
    
//     const categoryHTML = Object.keys(categoryTotals).length > 0
//         ? '<strong>By Category:</strong> ' + Object.entries(categoryTotals)
//             .map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`)
//             .join(', ')
//         : '';
    
//     categorySummaryEl.innerHTML = categoryHTML;
// }

// function applyFilters() {
//     const category = document.getElementById('filter-category').value;
//     const fromDate = document.getElementById('filter-from-date').value;
//     const toDate = document.getElementById('filter-to-date').value;
    
//     let filtered = expenses;
    
//     if (category) {
//         filtered = filtered.filter(exp => exp.category === category);
//     }
    
//     if (fromDate) {
//         filtered = filtered.filter(exp => exp.date >= fromDate);
//     }
    
//     if (toDate) {
//         filtered = filtered.filter(exp => exp.date <= toDate);
//     }
    
//     renderExpenses(filtered);
// }

// function clearFilters() {
//     document.getElementById('filter-category').value = '';
//     document.getElementById('filter-from-date').value = '';
//     document.getElementById('filter-to-date').value = '';
//     renderExpenses();
// }


let expenses = [];
let editingId = null;

// Load expenses from memory on page load
function loadExpenses() {
    const saved = localStorage.getItem('expenses');
    if (saved) {
        expenses = JSON.parse(saved);
    }
    renderExpenses();
    updateSummary();
}

// Save expenses to memory
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Set today's date as default
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('date').valueAsDate = new Date();
    loadExpenses();

    document.getElementById('expense-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('cancel-btn').addEventListener('click', cancelEdit);
    document.getElementById('apply-filter-btn').addEventListener('click', applyFilters);
    document.getElementById('clear-filter-btn').addEventListener('click', clearFilters);
});

// Form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Get form values
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const note = document.getElementById('note').value.trim();

    // Validation
    let isValid = true;
    if (!amount || amount <= 0) {
        document.getElementById('amount-error').textContent = 'Please enter a valid amount';
        isValid = false;
    }
    if (!date) {
        document.getElementById('date-error').textContent = 'Please select a date';
        isValid = false;
    }
    if (!category) {
        document.getElementById('category-error').textContent = 'Please select a category';
        isValid = false;
    }
    if (!isValid) return;

    if (editingId !== null) {
        // Update existing expense
        const index = expenses.findIndex(exp => exp.id === editingId);
        if (index !== -1) {
            expenses[index] = {
                id: editingId,
                amount: amount,
                date: date,
                category: category,
                note: note
            };
        }
        editingId = null;
        document.getElementById('form-title').textContent = 'Add New Expense';
        document.getElementById('submit-btn').textContent = 'Add Expense';
        document.getElementById('cancel-btn').style.display = 'none';
    } else {
        // Add new expense
        const expense = {
            id: Date.now(),
            amount: amount,
            date: date,
            category: category,
            note: note
        };
        expenses.push(expense);
    }

    saveExpenses();
    renderExpenses();
    updateSummary();

    // Reset form
    document.getElementById('expense-form').reset();
    document.getElementById('date').valueAsDate = new Date();
}

// Cancel editing
function cancelEdit() {
    editingId = null;
    document.getElementById('form-title').textContent = 'Add New Expense';
    document.getElementById('submit-btn').textContent = 'Add Expense';
    document.getElementById('cancel-btn').style.display = 'none';
    document.getElementById('expense-form').reset();
    document.getElementById('date').valueAsDate = new Date();
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

// Render expenses in table
function renderExpenses(filteredExpenses = null) {
    const tbody = document.getElementById('expense-tbody');
    const expensesToShow = filteredExpenses || expenses;

    if (expensesToShow.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No expenses found.</td></tr>';
        return;
    }

    // Sort by date (newest first)
    const sorted = [...expensesToShow].sort((a, b) => new Date(b.date) - new Date(a.date));

    tbody.innerHTML = sorted.map(expense => `
        <tr>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.note || '-'}</td>
            <td class="actions">
                <button class="btn-update" onclick="editExpense(${expense.id})">Edit</button>
                <button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Edit expense
window.editExpense = function(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;

    editingId = id;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('date').value = expense.date;
    document.getElementById('category').value = expense.category;
    document.getElementById('note').value = expense.note;

    document.getElementById('form-title').textContent = 'Edit Expense';
    document.getElementById('submit-btn').textContent = 'Update Expense';
    document.getElementById('cancel-btn').style.display = 'inline-block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete expense
window.deleteExpense = function(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    renderExpenses();
    updateSummary();
}

// Update summary
function updateSummary() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById('total-amount').textContent = total.toFixed(2);
    document.getElementById('total-count').textContent = expenses.length;

    // Category breakdown
    const categoryTotals = {};
    expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const categoryHTML = Object.keys(categoryTotals).length > 0
        ? '<strong>By Category:</strong> ' + Object.entries(categoryTotals)
            .map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`)
            .join(', ')
        : '';

    document.getElementById('category-summary').innerHTML = categoryHTML;
}

// Apply filters
function applyFilters() {
    const category = document.getElementById('filter-category').value;
    const fromDate = document.getElementById('filter-from-date').value;
    const toDate = document.getElementById('filter-to-date').value;

    let filtered = expenses;

    if (category) {
        filtered = filtered.filter(exp => exp.category === category);
    }
    if (fromDate) {
        filtered = filtered.filter(exp => exp.date >= fromDate);
    }
    if (toDate) {
        filtered = filtered.filter(exp => exp.date <= toDate);
    }

    renderExpenses(filtered);
}

// Clear filters
function clearFilters() {
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-from-date').value = '';
    document.getElementById('filter-to-date').value = '';
    renderExpenses();
}

