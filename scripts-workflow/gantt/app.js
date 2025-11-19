// Configuración inicial y datos
const HOURS_PER_WEEK = 20;
const INITIAL_TASKS = [
  { id: 1, name: "1.1 Estado del arte: EVE-NG y herramientas", category: "Estado del arte", hours: 40, start_date: "2025-10-15", end_date: "2025-10-25", completed: 0, critical: false },
  { id: 2, name: "1.2 Estado del arte: Labs de seguridad", category: "Estado del arte", hours: 40, start_date: "2025-10-26", end_date: "2025-11-08", completed: 0, critical: false },
  { id: 3, name: "1.3 Documentación técnica y referencias", category: "Estado del arte", hours: 10, start_date: "2025-11-09", end_date: "2025-11-15", completed: 0, critical: false },
  { id: 4, name: "2.1 Análisis de infraestructura existente", category: "Análisis VMs", hours: 20, start_date: "2025-11-16", end_date: "2025-11-30", completed: 0, critical: false },
  { id: 5, name: "2.2 Evaluación de adaptación a EVE-NG", category: "Análisis VMs", hours: 15, start_date: "2025-12-01", end_date: "2025-12-10", completed: 0, critical: false },
  { id: 6, name: "AVANTPROJECTE: Redacción y entrega", category: "Hito 1", hours: 25, start_date: "2025-12-11", end_date: "2026-01-16", completed: 0, critical: true },
  { id: 7, name: "3.1 Diseño lab 1: Introducción y reconocimiento", category: "Diseño", hours: 12, start_date: "2026-01-17", end_date: "2026-01-26", completed: 0, critical: false },
  { id: 8, name: "3.2 Diseño lab 2: Criptografía", category: "Diseño", hours: 13, start_date: "2026-01-27", end_date: "2026-02-06", completed: 0, critical: false },
  { id: 9, name: "3.3 Diseño lab 3: Seguridad en redes", category: "Diseño", hours: 12, start_date: "2026-02-07", end_date: "2026-02-16", completed: 0, critical: false },
  { id: 10, name: "3.4 Diseño lab 4: Vulnerabilidades web", category: "Diseño", hours: 13, start_date: "2026-02-17", end_date: "2026-02-28", completed: 0, critical: false },
  { id: 11, name: "4.1 Implementación lab 1", category: "Implementación", hours: 30, start_date: "2026-03-01", end_date: "2026-03-22", completed: 0, critical: false },
  { id: 12, name: "4.2 Implementación lab 2", category: "Implementación", hours: 30, start_date: "2026-03-23", end_date: "2026-04-12", completed: 0, critical: false },
  { id: 13, name: "MEMORIA INTERMEDIA: Redacción y entrega", category: "Hito 2", hours: 20, start_date: "2026-03-20", end_date: "2026-04-08", completed: 0, critical: true },
  { id: 14, name: "4.3 Implementación lab 3", category: "Implementación", hours: 30, start_date: "2026-04-13", end_date: "2026-05-02", completed: 0, critical: false },
  { id: 15, name: "4.4 Implementación lab 4", category: "Implementación", hours: 30, start_date: "2026-04-13", end_date: "2026-05-02", completed: 0, critical: false },
  { id: 16, name: "5.1 Scripts de automatización Python", category: "Automatización", hours: 35, start_date: "2026-05-03", end_date: "2026-05-17", completed: 0, critical: false },
  { id: 17, name: "5.2 Scripts de automatización Bash", category: "Automatización", hours: 25, start_date: "2026-05-03", end_date: "2026-05-17", completed: 0, critical: false },
  { id: 18, name: "6.1 Validación y testing de labs", category: "Validación", hours: 30, start_date: "2026-05-18", end_date: "2026-05-24", completed: 0, critical: false },
  { id: 19, name: "6.2 Ajustes finales y depuración", category: "Validación", hours: 20, start_date: "2026-05-18", end_date: "2026-05-24", completed: 0, critical: false },
  { id: 20, name: "7.1 Documentación técnica completa", category: "Documentación", hours: 40, start_date: "2026-04-25", end_date: "2026-05-10", completed: 0, critical: false },
  { id: 21, name: "7.2 Material docente para asignatura", category: "Documentación", hours: 25, start_date: "2026-05-11", end_date: "2026-05-20", completed: 0, critical: false },
  { id: 22, name: "7.3 Memoria final del TFG", category: "Documentación", hours: 30, start_date: "2026-05-11", end_date: "2026-05-25", completed: 0, critical: false },
  { id: 23, name: "MEMORIA FINAL: Revisión y entrega", category: "Hito 3", hours: 10, start_date: "2026-05-26", end_date: "2026-05-27", completed: 0, critical: true },
  { id: 24, name: "8.1 Preparación presentación", category: "Defensa", hours: 12, start_date: "2026-05-28", end_date: "2026-06-05", completed: 0, critical: false },
  { id: 25, name: "8.2 Ensayos de defensa", category: "Defensa", hours: 8, start_date: "2026-06-06", end_date: "2026-06-08", completed: 0, critical: false },
  { id: 26, name: "DEFENSA TFG", category: "Hito 4", hours: 3, start_date: "2026-06-08", end_date: "2026-06-19", completed: 0, critical: true }
];

const CATEGORIES = {
  "Estado del arte": { color: "#B3D9FF", darkColor: "#4D94FF" },
  "Análisis VMs":    { color: "#6699FF", darkColor: "#3366CC" },
  "Diseño":          { color: "#B3FFB3", darkColor: "#66CC66" },
  "Implementación":  { color: "#FFB366", darkColor: "#FF9900" },
  "Automatización":  { color: "#FF9999", darkColor: "#FF6666" },
  "Validación":      { color: "#D9B3FF", darkColor: "#B366FF" },
  "Documentación":   { color: "#CCCCCC", darkColor: "#999999" },
  "Defensa":         { color: "#FFFF99", darkColor: "#FFFF00" },
  "Hito 1":          { color: "#FF6666", darkColor: "#CC0000" },
  "Hito 2":          { color: "#FF6666", darkColor: "#CC0000" },
  "Hito 3":          { color: "#FF6666", darkColor: "#CC0000" },
  "Hito 4":          { color: "#FF6666", darkColor: "#CC0000" },

  // Categorías del CSV MIX
  "Preparación":     { color: "#B2EBF2", darkColor: "#00ACC1" }, // cian suave
  "Análisis":        { color: "#9FA8DA", darkColor: "#3949AB" }, // índigo suave
  "Desarrollo":      { color: "#FFCCBC", darkColor: "#F4511E" }, // naranja coral
  "Testing":         { color: "#E6EE9C", darkColor: "#9E9D24" }  // lima suave
};

// Estado de la aplicación
let tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
let selectedTaskId = null;
let editingCell = null;
let exportHistory = [];
let studentInfo = {
  name: '',
  tutor: '',
  projectName: 'Pentesting Ético en Entorns Virtualitzats amb EVE-NG'
};

// Configuración de exportación
const exportSettings = {
  resolution: 'standard',
  format: 'png',
  includeWatermark: true,
  includeLegend: true,
  includeStats: true,
  backgroundColor: 'white'
};

const resolutions = {
  normal: { width: 1920, height: 1080 },
  standard: { width: 2560, height: 1440 },
  high: { width: 3840, height: 2160 }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  populateCategoryFilters();
  renderTaskTable();
  renderGantt();
  updateSummary();
  setupEventListeners();
  renderLegend();
  renderExportHistory();
  loadStudentInfo();
}

// Poblar filtros de categoría
function populateCategoryFilters() {
  const categoryFilter = document.getElementById('categoryFilter');
  const taskCategory = document.getElementById('taskCategory');
  
  const uniqueCategories = [...new Set(Object.keys(CATEGORIES))];
  
  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option.cloneNode(true));
    taskCategory.appendChild(option);
  });
}

// Renderizar tabla de tareas
function renderTaskTable() {
  const tbody = document.getElementById('taskTableBody');
  tbody.innerHTML = '';
  
  const categoryFilter = document.getElementById('categoryFilter').value;
  const showCompleted = document.getElementById('hideCompletedFilter').checked;
  
  const filteredTasks = tasks.filter(task => {
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    if (!showCompleted && task.completed === 100) return false;
    return true;
  });
  
  filteredTasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.setAttribute('draggable', 'true');
    row.setAttribute('data-task-index', index);
    row.ondragstart = () => handleDragStart(index);
    row.ondragend = () => handleDragEnd();
    row.ondragover = (e) => handleDragOver(e);
    row.ondrop = (e) => handleDrop(e, index);
    row.dataset.taskId = task.id;
    if (task.completed === 100) row.classList.add('completed');
    if (task.id === selectedTaskId) row.classList.add('selected');
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="editable-cell" data-field="name">${task.name}</td>
      <td class="editable-cell" data-field="category">${task.category}</td>
      <td class="editable-cell" data-field="hours">${task.hours}</td>
      <td class="editable-cell" data-field="start_date">${formatDate(task.start_date)}</td>
      <td class="editable-cell" data-field="end_date">${formatDate(task.end_date)}</td>
      <td class="editable-cell" data-field="completed">${task.completed}%</td>
      <td>
        <button class="action-btn" data-action="toggle-complete" title="Marcar como completada">
          ${task.completed === 100 ? '✅' : '🔴'}
        </button>
        <button class="action-btn" data-action="toggle-critical" title="Marcar como crítica">
          ${task.critical ? '✓' : '📌'}
        </button>
        <button class="action-btn" data-action="duplicate" title="Duplicar tarea">📋</button>
        <button class="action-btn" data-action="delete" title="Eliminar tarea">❌</button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
  
  setupTableEventListeners();
}

// Configurar event listeners de la tabla
function setupTableEventListeners() {
  document.querySelectorAll('.editable-cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', handleActionClick);
  });
}

// Manejar clic en celda editable
function handleCellClick(e) {
  if (editingCell) return;
  
  const cell = e.target;
  const row = cell.closest('tr');
  const taskId = parseInt(row.dataset.taskId);
  const field = cell.dataset.field;
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) return;
  
  editingCell = { cell, taskId, field, originalValue: task[field] };
  
  let input;
  if (field === 'start_date' || field === 'end_date') {
    input = document.createElement('input');
    input.type = 'date';
    input.value = task[field];
  } else if (field === 'hours' || field === 'completed') {
    input = document.createElement('input');
    input.type = 'number';
    input.value = field === 'completed' ? task[field] : task[field];
    if (field === 'completed') {
      input.min = 0;
      input.max = 100;
    } else {
      input.min = 1;
    }
  } else if (field === 'category') {
    input = document.createElement('select');
    Object.keys(CATEGORIES).forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      if (cat === task.category) option.selected = true;
      input.appendChild(option);
    });
  } else {
    input = document.createElement('input');
    input.type = 'text';
    input.value = task[field];
  }
  
  input.style.width = '100%';
  input.style.boxSizing = 'border-box';
  
  cell.innerHTML = '';
  cell.appendChild(input);
  input.focus();
  
  input.addEventListener('blur', () => confirmEdit(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmEdit(input.value);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  });
}

// Confirmar edición
function confirmEdit(newValue) {
  if (!editingCell) return;
  
  const { taskId, field, originalValue } = editingCell;
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    cancelEdit();
    return;
  }
  
  // Validar y actualizar
  if (field === 'hours') {
    const hours = parseInt(newValue);
    if (hours > 0) {
      task.hours = hours;
      task.end_date = calculateEndDate(task.start_date, hours);
      
      // Permitir cualquier cantidad de horas sin bloqueo
    }
  } else if (field === 'start_date') {
    task.start_date = newValue;
    const days = calculateWorkingDays(task.start_date, task.end_date);
    task.hours = Math.round((days / 7) * HOURS_PER_WEEK);
  } else if (field === 'end_date') {
    if (new Date(newValue) < new Date(task.start_date)) {
      alert('❌ Error: La fecha de fin no puede ser anterior a la fecha de inicio.');
      cancelEdit();
      return;
    }
    task.end_date = newValue;
    const days = calculateWorkingDays(task.start_date, task.end_date);
    task.hours = Math.round((days / 7) * HOURS_PER_WEEK);
  } else if (field === 'completed') {
    task.completed = Math.max(0, Math.min(100, parseInt(newValue) || 0));
  } else {
    task[field] = newValue;
  }
  
  editingCell = null;
  renderTaskTable();
  renderGantt();
  updateSummary();
  
  // Validar tareas críticas con retraso
  checkCriticalTasks();
}

// Cancelar edición
function cancelEdit() {
  editingCell = null;
  renderTaskTable();
}

// Manejar acciones
function handleActionClick(e) {
  const btn = e.target.closest('.action-btn');
  const row = btn.closest('tr');
  const taskId = parseInt(row.dataset.taskId);
  const action = btn.dataset.action;
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) return;
  
  switch(action) {
    case 'toggle-complete':
      task.completed = task.completed === 100 ? 0 : 100;
      break;
    case 'toggle-critical':
      task.critical = !task.critical;
      break;
    case 'duplicate':
      const newTask = { ...task, id: Math.max(...tasks.map(t => t.id)) + 1, name: task.name + ' (copia)' };
      tasks.push(newTask);
      break;
    case 'delete':
      if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.name}"?`)) {
        tasks = tasks.filter(t => t.id !== taskId);
      }
      break;
  }
  
  renderTaskTable();
  renderGantt();
  updateSummary();
}

// Calcular fecha de fin basada en horas
function calculateEndDate(startDate, hours) {
  const weeks = hours / HOURS_PER_WEEK;
  const days = Math.round(weeks * 7);
  const start = new Date(startDate);
  start.setDate(start.getDate() + days);
  return start.toISOString().split('T')[0];
}

// Calcular días laborables entre fechas
function calculateWorkingDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Formatear fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Actualizar resumen
function updateSummary() {
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);
  const completedTasks = tasks.filter(t => t.completed === 100).length;
  const milestones = tasks.filter(t => t.category.startsWith('Hito'));
  const completedMilestones = milestones.filter(t => t.completed === 100).length;
  
  const dates = tasks.flatMap(t => [new Date(t.start_date), new Date(t.end_date)]);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  const duration = calculateWorkingDays(minDate.toISOString().split('T')[0], maxDate.toISOString().split('T')[0]);
  const weeks = Math.round(duration / 7);
  
  // NO BLOQUEAR si > 500h, solo ADVERTIR
  let hoursWarning = '';
  if (totalHours > 500) {
    hoursWarning = ` ⚠️ (+${totalHours - 500}h sobre 500h)`;
  }
  
  document.getElementById('totalHours').textContent = totalHours + 'h' + hoursWarning;
  document.getElementById('totalTasks').textContent = tasks.length;
  document.getElementById('projectStart').textContent = formatDate(minDate.toISOString().split('T')[0]);
  document.getElementById('projectEnd').textContent = formatDate(maxDate.toISOString().split('T')[0]);
  document.getElementById('projectDuration').textContent = `${duration} días (${weeks} semanas)`;
  document.getElementById('completionRate').textContent = `${Math.round((completedTasks / tasks.length) * 100)}%`;
  document.getElementById('milestonesCompleted').textContent = `${completedMilestones}/${milestones.length}`;
}

// Verificar tareas críticas
function checkCriticalTasks() {
  const today = new Date();
  const criticalDelayed = tasks.filter(t => {
    if (!t.critical || t.completed === 100) return false;
    const endDate = new Date(t.end_date);
    return endDate < today;
  });
  
  if (criticalDelayed.length > 0) {
    const taskNames = criticalDelayed.map(t => `- ${t.name}`).join('\n');
    alert(`⚠️ ALERTA: Tareas críticas con retraso:\n${taskNames}`);
  }
}

// Renderizar diagrama de Gantt
function renderGantt() {
  const canvas = document.getElementById('ganttCanvas');
  const ctx = canvas.getContext('2d');
  
  // Configuración
  const ROW_HEIGHT = 30;
  const PADDING = 10;
  const LABEL_WIDTH = 250;
  const HEADER_HEIGHT = 60;
  
  // Calcular dimensiones
  const dates = tasks.flatMap(t => [new Date(t.start_date), new Date(t.end_date)]);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  
  minDate.setDate(1); // Inicio del mes
  maxDate.setMonth(maxDate.getMonth() + 1);
  maxDate.setDate(0); // Fin del mes
  
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
  const dayWidth = 3;
  
  canvas.width = LABEL_WIDTH + totalDays * dayWidth + PADDING * 2;
  canvas.height = HEADER_HEIGHT + tasks.length * ROW_HEIGHT + PADDING * 2;
  
  // Fondo
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar encabezado con meses
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, canvas.width, HEADER_HEIGHT);
  
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, HEADER_HEIGHT);
  ctx.lineTo(canvas.width, HEADER_HEIGHT);
  ctx.stroke();
  
  // Meses
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  
  let currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    const x = LABEL_WIDTH + Math.ceil((currentDate - minDate) / (1000 * 60 * 60 * 24)) * dayWidth;
    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
    
    ctx.fillText(monthName, x + 30, HEADER_HEIGHT / 2);
    
    // Línea divisoria
    ctx.strokeStyle = '#cccccc';
    ctx.beginPath();
    ctx.moveTo(x, HEADER_HEIGHT);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  // Línea de "hoy"
  const today = new Date();
  if (today >= minDate && today <= maxDate) {
    const todayX = LABEL_WIDTH + Math.ceil((today - minDate) / (1000 * 60 * 60 * 24)) * dayWidth;
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(todayX, HEADER_HEIGHT);
    ctx.lineTo(todayX, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  
  // Dibujar tareas
  tasks.forEach((task, index) => {
    const y = HEADER_HEIGHT + index * ROW_HEIGHT + PADDING;
    
    // Etiqueta de tarea
    ctx.fillStyle = '#333';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    const truncatedName = task.name.length > 35 ? task.name.substring(0, 32) + '...' : task.name;
    ctx.fillText(truncatedName, PADDING, y + ROW_HEIGHT / 2 + 4);
    
    // Barra de Gantt
    const startDate = new Date(task.start_date);
    const endDate = new Date(task.end_date);
    const startX = LABEL_WIDTH + Math.ceil((startDate - minDate) / (1000 * 60 * 60 * 24)) * dayWidth;
    const barWidth = Math.max(dayWidth, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) * dayWidth);
    
    const categoryColor = CATEGORIES[task.category]?.color || '#CCCCCC';
    
    // Fondo de la barra
    ctx.fillStyle = categoryColor;
    ctx.fillRect(startX, y, barWidth, ROW_HEIGHT - 10);
    
    // Borde (más grueso si es crítica)
    ctx.strokeStyle = '#666';
    ctx.lineWidth = task.critical ? 3 : 1;
    ctx.strokeRect(startX, y, barWidth, ROW_HEIGHT - 10);
    
    // Patrón si está completada
    if (task.completed === 100) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      for (let i = 0; i < barWidth; i += 4) {
        ctx.fillRect(startX + i, y, 2, ROW_HEIGHT - 10);
      }
    }
    
    // Patrón diagonal si es crítica
    if (task.critical) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < barWidth; i += 5) {
        ctx.beginPath();
        ctx.moveTo(startX + i, y);
        ctx.lineTo(startX + i + 5, y + ROW_HEIGHT - 10);
        ctx.stroke();
      }
    }
    
    // Línea de fondo de fila
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y + ROW_HEIGHT);
    ctx.lineTo(canvas.width, y + ROW_HEIGHT);
    ctx.stroke();
  });
  
  // Configurar interacción del tooltip
  setupGanttTooltip(canvas, minDate, maxDate, dayWidth, LABEL_WIDTH, HEADER_HEIGHT, ROW_HEIGHT);
}

// Configurar tooltip del Gantt
function setupGanttTooltip(canvas, minDate, maxDate, dayWidth, labelWidth, headerHeight, rowHeight) {
  const tooltip = document.getElementById('ganttTooltip');
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (y < headerHeight) {
      tooltip.style.display = 'none';
      return;
    }
    
    const taskIndex = Math.floor((y - headerHeight) / rowHeight);
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      const task = tasks[taskIndex];
      const startDate = new Date(task.start_date);
      const endDate = new Date(task.end_date);
      const startX = labelWidth + Math.ceil((startDate - minDate) / (1000 * 60 * 60 * 24)) * dayWidth;
      const barWidth = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) * dayWidth;
      
      if (x >= startX && x <= startX + barWidth) {
        tooltip.innerHTML = `
          <strong>${task.name}</strong><br>
          Categoría: ${task.category}<br>
          Horas: ${task.hours}h<br>
          Inicio: ${formatDate(task.start_date)}<br>
          Fin: ${formatDate(task.end_date)}<br>
          Completado: ${task.completed}%
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY + 15) + 'px';
        
        selectedTaskId = task.id;
        return;
      }
    }
    
    tooltip.style.display = 'none';
  });
  
  canvas.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
  
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    if (y < headerHeight) return;
    
    const taskIndex = Math.floor((y - headerHeight) / rowHeight);
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      selectedTaskId = tasks[taskIndex].id;
      renderTaskTable();
    }
  });
}

// Renderizar leyenda
function renderLegend() {
  const legend = document.getElementById('ganttLegend');
  legend.innerHTML = '<strong style="display: block; width: 100%; margin-bottom: 8px;">Leyenda:</strong>';
  
  Object.entries(CATEGORIES).forEach(([name, colors]) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <div class="legend-color" style="background-color: ${colors.color};"></div>
      <span>${name}</span>
    `;
    legend.appendChild(item);
  });
  
  // Símbolos adicionales
  legend.innerHTML += `
    <div class="legend-item">
      <div class="legend-color" style="background: linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%); background-size: 4px 4px;"></div>
      <span>Crítica</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background: repeating-linear-gradient(90deg, #333, #333 2px, transparent 2px, transparent 4px);"></div>
      <span>Completada</span>
    </div>
  `;
}

// Restaurar valores iniciales
function resetToInitialTasks() {
  const confirmed = confirm(
    '⚠️ ¿Está seguro?\n\n' +
    'Se eliminarán todos los cambios y se restaurarán las tareas iniciales.'
  );
  
  if (confirmed) {
    tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('hideCompletedFilter').checked = true;
    renderTaskTable();
    renderGantt();
    updateSummary();
    alert('✅ Tareas restauradas a valores iniciales');
  }
}

// Event Listeners
function setupEventListeners() {
  // Botón añadir tarea
  document.getElementById('addTaskBtn').addEventListener('click', openAddTaskModal);
  
  // Botón restaurar valores iniciales
  document.getElementById('restoreBtn').addEventListener('click', resetToInitialTasks);
  
  // Botón exportar
  document.getElementById('exportBtn').addEventListener('click', exportToCSV);
  
  // Botón importar CSV
  document.getElementById('importCSVBtn').addEventListener('click', importCSV);
  
  document.getElementById('importFile').addEventListener('change', importFromCSV);
  
  // Botón estadísticas
  document.getElementById('statsBtn').addEventListener('click', showStatistics);
  
  // Filtros
  document.getElementById('categoryFilter').addEventListener('change', renderTaskTable);
  document.getElementById('hideCompletedFilter').addEventListener('change', renderTaskTable);
  
  // Modal añadir tarea
  document.getElementById('closeModalBtn').addEventListener('click', closeAddTaskModal);
  document.getElementById('cancelModalBtn').addEventListener('click', closeAddTaskModal);
  document.getElementById('createTaskBtn').addEventListener('click', addNewTask);
  
  // Cerrar modal con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal.active');
      modals.forEach(modal => modal.classList.remove('active'));
    }
  });
  
  // Modal estadísticas
  document.getElementById('closeStatsModalBtn').addEventListener('click', closeStatsModal);
  
  // Botones de exportación
  document.getElementById('exportPngBtn').addEventListener('click', exportAsImage);
  document.getElementById('exportOptionsBtn').addEventListener('click', openExportOptionsModal);
  document.getElementById('closeExportOptionsBtn').addEventListener('click', closeExportOptionsModal);
  document.getElementById('cancelExportOptionsBtn').addEventListener('click', closeExportOptionsModal);
  document.getElementById('confirmExportBtn').addEventListener('click', exportWithOptions);
  document.getElementById('clearHistoryBtn').addEventListener('click', clearExportHistory);
  
  // Modal de comparación
  document.getElementById('closeCompareModalBtn').addEventListener('click', closeCompareModal);
  
  // Student info
  document.getElementById('studentName').addEventListener('input', (e) => {
    studentInfo.name = e.target.value;
    saveStudentInfo();
  });
  document.getElementById('tutorName').addEventListener('input', (e) => {
    studentInfo.tutor = e.target.value;
    saveStudentInfo();
  });
  
  // Cerrar modales al hacer clic fuera
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
}

// Abrir modal de añadir tarea
function openAddTaskModal() {
  document.getElementById('addTaskModal').classList.add('active');
  document.getElementById('taskStartDate').value = new Date().toISOString().split('T')[0];
}

// Cerrar modal de añadir tarea
function closeAddTaskModal() {
  document.getElementById('addTaskModal').classList.remove('active');
}

// Añadir nueva tarea con validación completa
function addNewTask() {
  const modal = document.getElementById('addTaskModal');
  const name = document.getElementById('taskName').value.trim();
  const category = document.getElementById('taskCategory').value;
  const hours = parseInt(document.getElementById('taskHours').value);
  const startDate = document.getElementById('taskStartDate').value;
  const endDate = document.getElementById('taskEndDate').value;
  
  // Validaciones
  if (!name) {
    alert('❌ Por favor ingresa nombre de tarea');
    return;
  }
  if (!category || !CATEGORIES[category]) {
    alert('❌ Por favor selecciona categoría válida');
    return;
  }
  if (!hours || hours <= 0) {
    alert('❌ Las horas deben ser mayor a 0');
    return;
  }
  if (!startDate || !endDate) {
    alert('❌ Por favor ingresa fechas inicio y fin');
    return;
  }
  if (new Date(endDate) < new Date(startDate)) {
    alert('❌ La fecha fin no puede ser anterior a fecha inicio');
    return;
  }
  
  // Crear tarea
  const newTask = {
    id: Math.max(...tasks.map(t => t.id), 0) + 1,
    name: name,
    category: category,
    hours: hours,
    start_date: startDate,
    end_date: endDate,
    completed: 0,
    critical: false
  };
  
  // Agregar
  tasks.push(newTask);
  
  // Limpiar y cerrar
  document.getElementById('taskName').value = '';
  document.getElementById('taskHours').value = '10';
  document.getElementById('taskStartDate').value = '';
  document.getElementById('taskEndDate').value = '';
  modal.style.display = 'none';
  modal.classList.remove('active');
  
  // Actualizar UI
  renderTaskTable();
  renderGantt();
  updateSummary();
  
  alert('✅ Tarea añadida correctamente');
}

// Mantener compatibilidad con función antigua
function createTask() {
  addNewTask();
}

// Exportar a CSV
function exportToCSV() {
  let csv = 'Tarea,Categoría,Horas,Fecha Inicio,Fecha Fin,%,Crítica\n';
  
  tasks.forEach(task => {
    csv += `"${task.name}","${task.category}",${task.hours},${task.start_date},${task.end_date},${task.completed},${task.critical}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'planificacion_tfg.csv');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Parser CSV robusto
function parseCSVToTasks(csvContent) {
  const lines = csvContent.trim().split('\n');
  const tasks = [];
  
  // Saltar header (línea 1)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV: manejar comillas y campos
    const regex = /"([^"]*)"|([^,]+)/g;
    const fields = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
      fields.push((match[1] !== undefined ? match[1] : match[2]).trim());
    }
    
    if (fields.length < 7) continue;
    
    // Validar categoría
    if (!CATEGORIES[fields[1]]) {
      console.warn(`Categoría no válida: ${fields[1]}`);
      continue;
    }
    
    // Parse fields
    const task = {
      id: tasks.length + 1,
      name: fields[0],
      category: fields[1],
      hours: parseInt(fields[2]) || 0,
      start_date: fields[3],
      end_date: fields[4],
      completed: parseInt(fields[5]) || 0,
      critical: fields[6].toLowerCase() === 'true' || fields[6] === '1'
    };
    
    if (task.hours > 0) {
      tasks.push(task);
    }
  }
  
  return tasks;
}

// Importar CSV con validación mejorada
function importCSV() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const newTasks = parseCSVToTasks(event.target.result);
        
        if (newTasks.length === 0) {
          alert('❌ No se encontraron tareas válidas en el CSV.\n\nVerifica que el formato sea:\nTarea,Categoría,Horas,Fecha Inicio,Fecha Fin,%,Crítica');
          return;
        }
        
        const totalHours = newTasks.reduce((sum, t) => sum + t.hours, 0);
        
        // Confirmar
        const confirmed = confirm(
          `✅ Se encontraron ${newTasks.length} tareas válidas.\n` +
          `Total de horas: ${totalHours}h\n\n` +
          `¿Reemplazar tareas actuales con las importadas?`
        );
        
        if (confirmed) {
          tasks = newTasks;
          renderTaskTable();
          renderGantt();
          updateSummary();
          alert('✅ CSV importado correctamente');
        }
      } catch (error) {
        alert('❌ Error al importar CSV: ' + error.message + '\n\nVerifica el formato del archivo.');
        console.error(error);
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

// Mantener compatibilidad con input file existente
function importFromCSV(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const newTasks = parseCSVToTasks(event.target.result);
      
      if (newTasks.length === 0) {
        alert('❌ No se encontraron tareas válidas en el CSV.');
        return;
      }
      
      const totalHours = newTasks.reduce((sum, t) => sum + t.hours, 0);
      
      if (confirm(`Se importarán ${newTasks.length} tareas (${totalHours}h total). ¿Reemplazar tareas actuales?`)) {
        tasks = newTasks;
        renderTaskTable();
        renderGantt();
        updateSummary();
        alert('✅ Importación completada con éxito.');
      }
    } catch (error) {
      alert('❌ Error al importar el archivo CSV. Verifica el formato.');
      console.error(error);
    }
  };
  
  reader.readAsText(file);
  e.target.value = '';
}

// Mostrar estadísticas
function showStatistics() {
  document.getElementById('statsModal').classList.add('active');
  
  const statsContent = document.getElementById('statsContent');
  
  // Calcular estadísticas por categoría
  const categoryStats = {};
  const uniqueCategories = [...new Set(tasks.map(t => t.category))];
  
  uniqueCategories.forEach(cat => {
    const categoryTasks = tasks.filter(t => t.category === cat);
    categoryStats[cat] = {
      hours: categoryTasks.reduce((sum, t) => sum + t.hours, 0),
      tasks: categoryTasks.length,
      completed: categoryTasks.filter(t => t.completed === 100).length
    };
  });
  
  const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);
  
  let html = '<div class="stats-grid">';
  html += `
    <div class="stat-card">
      <h4>Total de Horas</h4>
      <div class="stat-value">${totalHours}h</div>
    </div>
    <div class="stat-card">
      <h4>Tareas Completadas</h4>
      <div class="stat-value">${tasks.filter(t => t.completed === 100).length}/${tasks.length}</div>
    </div>
    <div class="stat-card">
      <h4>Tareas Críticas</h4>
      <div class="stat-value">${tasks.filter(t => t.critical).length}</div>
    </div>
    <div class="stat-card">
      <h4>Horas Completadas</h4>
      <div class="stat-value">${tasks.filter(t => t.completed === 100).reduce((sum, t) => sum + t.hours, 0)}h</div>
    </div>
  `;
  html += '</div>';
  
  html += '<h3 style="margin: 24px 0 16px 0;">Desglose por Categoría</h3>';
  html += '<div class="category-breakdown">';
  
  Object.entries(categoryStats).sort((a, b) => b[1].hours - a[1].hours).forEach(([cat, stats]) => {
    const percentage = ((stats.hours / totalHours) * 100).toFixed(1);
    const color = CATEGORIES[cat]?.color || '#CCCCCC';
    
    html += `
      <div class="category-bar">
        <div class="category-bar-label">
          <span><strong>${cat}</strong> (${stats.tasks} tareas)</span>
          <span>${stats.hours}h (${percentage}%)</span>
        </div>
        <div class="category-bar-fill" style="width: ${percentage}%; background-color: ${color};">
          ${percentage}%
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  
  statsContent.innerHTML = html;
}

// Cerrar modal de estadísticas
function closeStatsModal() {
  document.getElementById('statsModal').classList.remove('active');
}

// Funciones de información del estudiante
function loadStudentInfo() {
  // Student info is maintained in memory during the session
  document.getElementById('studentName').value = studentInfo.name || '';
  document.getElementById('tutorName').value = studentInfo.tutor || '';
}

function saveStudentInfo() {
  // Student info is maintained in memory (no storage APIs used)
  // Information persists during the current session only
}

// Funciones de exportación de imagen mejoradas
async function exportAsImage() {
  await performExport();
}

function openExportOptionsModal() {
  document.getElementById('exportOptionsModal').classList.add('active');
  
  // Cargar configuración actual
  document.getElementById('exportResolution').value = exportSettings.resolution;
  document.getElementById('exportFormat').value = exportSettings.format;
  document.getElementById('includeWatermark').checked = exportSettings.includeWatermark;
  document.getElementById('includeLegend').checked = exportSettings.includeLegend;
  document.getElementById('includeStats').checked = exportSettings.includeStats;
  document.getElementById('exportBgColor').value = exportSettings.backgroundColor;
}

function closeExportOptionsModal() {
  document.getElementById('exportOptionsModal').classList.remove('active');
}

async function exportWithOptions() {
  // Actualizar configuración
  exportSettings.resolution = document.getElementById('exportResolution').value;
  exportSettings.format = document.getElementById('exportFormat').value;
  exportSettings.includeWatermark = document.getElementById('includeWatermark').checked;
  exportSettings.includeLegend = document.getElementById('includeLegend').checked;
  exportSettings.includeStats = document.getElementById('includeStats').checked;
  exportSettings.backgroundColor = document.getElementById('exportBgColor').value;
  
  closeExportOptionsModal();
  await performExport();
}

// NUEVA FUNCIÓN: Renderizar Gantt en canvas de alta resolución
function renderGanttToCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Configuración escalada
  const scale = width / 2560; // Base: 2560px de ancho
  const ROW_HEIGHT = 60 * scale;
  const PADDING = 40 * scale;
  const LABEL_WIDTH = 400 * scale;
  const HEADER_HEIGHT = 120 * scale;
  const MARGIN = 40 * scale;
  
  // Fondo
  ctx.fillStyle = exportSettings.backgroundColor === 'white' ? '#ffffff' : '#f5f5f5';
  ctx.fillRect(0, 0, width, height);
  
  // Calcular rango de fechas
  const dates = tasks.flatMap(t => [new Date(t.start_date), new Date(t.end_date)]);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  minDate.setDate(1);
  maxDate.setMonth(maxDate.getMonth() + 1);
  maxDate.setDate(0);
  
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
  const dayWidth = (width - LABEL_WIDTH - MARGIN * 2) / totalDays;
  
  let yOffset = MARGIN;
  
  // HEADER con info del proyecto
  ctx.fillStyle = '#134252';
  ctx.font = `bold ${32 * scale}px Arial, sans-serif`;
  ctx.fillText('Diagrama de Gantt - TFG', MARGIN, yOffset + 30 * scale);
  
  ctx.fillStyle = '#626C71';
  ctx.font = `${20 * scale}px Arial, sans-serif`;
  ctx.fillText(studentInfo.projectName || 'Pentesting Ético en Entorns Virtualitzats amb EVE-NG', MARGIN, yOffset + 60 * scale);
  
  ctx.font = `${14 * scale}px Arial, sans-serif`;
  if (studentInfo.name) {
    ctx.fillText(`Estudiante: ${studentInfo.name}`, MARGIN, yOffset + 85 * scale);
  }
  if (studentInfo.tutor) {
    ctx.fillText(`Tutor: ${studentInfo.tutor}`, MARGIN + 400 * scale, yOffset + 85 * scale);
  }
  
  const dateStr = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  ctx.fillText(`Generado: ${dateStr}`, MARGIN, yOffset + 105 * scale);
  
  yOffset += HEADER_HEIGHT;
  
  // Línea separadora
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(MARGIN, yOffset);
  ctx.lineTo(width - MARGIN, yOffset);
  ctx.stroke();
  
  yOffset += 20 * scale;
  
  // TIMELINE - Encabezado de meses
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(LABEL_WIDTH, yOffset, width - LABEL_WIDTH - MARGIN, 40 * scale);
  
  ctx.fillStyle = '#333333';
  ctx.font = `bold ${14 * scale}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  
  let currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    const daysSinceStart = Math.ceil((currentDate - minDate) / (1000 * 60 * 60 * 24));
    const x = LABEL_WIDTH + daysSinceStart * dayWidth;
    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
    
    // Nombre del mes
    ctx.fillText(monthName.toUpperCase(), x + 60 * scale, yOffset + 25 * scale);
    
    // Línea vertical divisoria
    ctx.strokeStyle = '#dddddd';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(x, yOffset);
    ctx.lineTo(x, height - MARGIN);
    ctx.stroke();
    
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  yOffset += 50 * scale;
  
  // Línea de HOY
  const today = new Date();
  if (today >= minDate && today <= maxDate) {
    const daysSinceStart = Math.ceil((today - minDate) / (1000 * 60 * 60 * 24));
    const todayX = LABEL_WIDTH + daysSinceStart * dayWidth;
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 3 * scale;
    ctx.setLineDash([5 * scale, 5 * scale]);
    ctx.beginPath();
    ctx.moveTo(todayX, yOffset);
    ctx.lineTo(todayX, yOffset + tasks.length * ROW_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  
  // TAREAS Y BARRAS
  ctx.textAlign = 'left';
  tasks.forEach((task, index) => {
    const taskY = yOffset + index * ROW_HEIGHT;
    
    // Fondo alternado de filas
    if (index % 2 === 0) {
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(MARGIN, taskY, width - MARGIN * 2, ROW_HEIGHT);
    }
    
    // Etiqueta de la tarea
    ctx.fillStyle = '#333333';
    ctx.font = `${13 * scale}px Arial, sans-serif`;
    const taskName = task.name.length > 45 ? task.name.substring(0, 42) + '...' : task.name;
    ctx.fillText(taskName, MARGIN + 5 * scale, taskY + ROW_HEIGHT / 2 + 5 * scale);
    
    // Calcular posición y tamaño de la barra
    const startDate = new Date(task.start_date);
    const endDate = new Date(task.end_date);
    const startDays = Math.ceil((startDate - minDate) / (1000 * 60 * 60 * 24));
    const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    const barX = LABEL_WIDTH + startDays * dayWidth;
    const barWidth = Math.max(dayWidth * 2, durationDays * dayWidth);
    const barHeight = ROW_HEIGHT * 0.6;
    const barY = taskY + (ROW_HEIGHT - barHeight) / 2;
    
    // Color de la categoría
    const categoryColor = CATEGORIES[task.category]?.color || '#CCCCCC';
    
    // Dibujar barra
    ctx.fillStyle = categoryColor;
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Borde de la barra (más grueso si es crítica)
    ctx.strokeStyle = task.critical ? '#000000' : '#666666';
    ctx.lineWidth = task.critical ? 3 * scale : 1.5 * scale;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    
    // Patrón de completado
    if (task.completed === 100) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      for (let i = 0; i < barWidth; i += 5 * scale) {
        ctx.fillRect(barX + i, barY, 2 * scale, barHeight);
      }
    }
    
    // Patrón diagonal para tareas críticas
    if (task.critical) {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
      ctx.lineWidth = 2 * scale;
      for (let i = 0; i < barWidth; i += 8 * scale) {
        ctx.beginPath();
        ctx.moveTo(barX + i, barY);
        ctx.lineTo(barX + i + 8 * scale, barY + barHeight);
        ctx.stroke();
      }
    }
    
    // Texto de horas dentro de la barra (si hay espacio)
    if (barWidth > 60 * scale) {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${11 * scale}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`${task.hours}h`, barX + barWidth / 2, barY + barHeight / 2 + 4 * scale);
      ctx.textAlign = 'left';
    }
    
    // Línea separadora de fila
    ctx.strokeStyle = '#eeeeee';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(MARGIN, taskY + ROW_HEIGHT);
    ctx.lineTo(width - MARGIN, taskY + ROW_HEIGHT);
    ctx.stroke();
  });
  
  const legendY = yOffset + tasks.length * ROW_HEIGHT + 30 * scale;
  
  // ESTADÍSTICAS (si está habilitado)
  if (exportSettings.includeStats) {
    const statsY = legendY;
    const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);
    const completedTasks = tasks.filter(t => t.completed === 100).length;
    const completionRate = Math.round((completedTasks / tasks.length) * 100);
    
    ctx.fillStyle = 'rgba(33, 128, 141, 0.1)';
    ctx.fillRect(MARGIN, statsY, width - MARGIN * 2, 80 * scale);
    
    ctx.fillStyle = '#134252';
    ctx.font = `bold ${24 * scale}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    
    const statWidth = (width - MARGIN * 2) / 4;
    ctx.fillText(`${totalHours}h`, MARGIN + statWidth * 0.5, statsY + 35 * scale);
    ctx.fillText(`${tasks.length}`, MARGIN + statWidth * 1.5, statsY + 35 * scale);
    ctx.fillText(`${completedTasks}`, MARGIN + statWidth * 2.5, statsY + 35 * scale);
    ctx.fillText(`${completionRate}%`, MARGIN + statWidth * 3.5, statsY + 35 * scale);
    
    ctx.fillStyle = '#626C71';
    ctx.font = `${12 * scale}px Arial, sans-serif`;
    ctx.fillText('Total horas', MARGIN + statWidth * 0.5, statsY + 55 * scale);
    ctx.fillText('Tareas', MARGIN + statWidth * 1.5, statsY + 55 * scale);
    ctx.fillText('Completadas', MARGIN + statWidth * 2.5, statsY + 55 * scale);
    ctx.fillText('Progreso', MARGIN + statWidth * 3.5, statsY + 55 * scale);
    
    ctx.textAlign = 'left';
  }
  
  // LEYENDA (si está habilitada)
  if (exportSettings.includeLegend) {
    const legendStartY = exportSettings.includeStats ? legendY + 100 * scale : legendY;
    
    ctx.fillStyle = '#333333';
    ctx.font = `bold ${14 * scale}px Arial, sans-serif`;
    ctx.fillText('LEYENDA:', MARGIN, legendStartY + 20 * scale);
    
    ctx.font = `${12 * scale}px Arial, sans-serif`;
    let x = MARGIN;
    let y = legendStartY + 45 * scale;
    let col = 0;
    
    Object.entries(CATEGORIES).forEach(([name, colors]) => {
      // Cuadrado de color
      ctx.fillStyle = colors.color;
      ctx.fillRect(x, y - 12 * scale, 16 * scale, 16 * scale);
      ctx.strokeStyle = '#999999';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(x, y - 12 * scale, 16 * scale, 16 * scale);
      
      // Nombre de categoría
      ctx.fillStyle = '#333333';
      ctx.fillText(name, x + 22 * scale, y);
      
      col++;
      if (col % 4 === 0) {
        x = MARGIN;
        y += 25 * scale;
      } else {
        x += 180 * scale;
      }
    });
  }
  
  return canvas;
}

async function performExport() {
  showNotification('⏳ Generando imagen...', 'info');
  
  try {
    // Calcular dimensiones según resolución
    const resolution = resolutions[exportSettings.resolution];
    const baseWidth = resolution.width;
    const tasksHeight = tasks.length * 60 * (baseWidth / 2560);
    const baseHeight = 120 + 50 + 40 + tasksHeight + 100 + (exportSettings.includeStats ? 100 : 0) + (exportSettings.includeLegend ? 120 : 0) + 80;
    
    // Renderizar Gantt en canvas de alta resolución
    const canvas = renderGanttToCanvas(baseWidth, baseHeight);
    
    // Convertir a blob y descargar
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T');
      const dateStr = timestamp[0].replace(/-/g, '');
      const timeStr = timestamp[1].split('-')[0].replace(/-/g, '');
      link.download = `Gantt_TFG_${dateStr}_${timeStr}.${exportSettings.format}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      
      // Guardar en historial
      saveToHistory(canvas);
      
      showNotification('✓ Imagen descargada correctamente', 'success');
    }, `image/${exportSettings.format}`, 0.95);
    
  } catch (error) {
    console.error('Error exporting image:', error);
    showNotification('❌ Error al generar la imagen', 'error');
  }
}

function saveToHistory(canvas) {
  const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);
  const completedTasks = tasks.filter(t => t.completed === 100).length;
  const completionRate = Math.round((completedTasks / tasks.length) * 100);
  
  const historyItem = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    image: canvas.toDataURL('image/png'),
    totalHours,
    completionRate,
    taskCount: tasks.length,
    tasksSnapshot: JSON.parse(JSON.stringify(tasks))
  };
  
  exportHistory.unshift(historyItem);
  
  // Limitar a 10 exportaciones
  if (exportHistory.length > 10) {
    exportHistory = exportHistory.slice(0, 10);
  }
  
  renderExportHistory();
}

function renderExportHistory() {
  const container = document.getElementById('exportHistory');
  const clearBtn = document.getElementById('clearHistoryBtn');
  
  if (exportHistory.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); font-size: var(--font-size-sm);">No hay exportaciones todavía</p>';
    clearBtn.style.display = 'none';
    return;
  }
  
  clearBtn.style.display = 'block';
  
  container.innerHTML = '';
  exportHistory.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <img src="${item.image}" class="history-thumbnail" alt="Exportación ${index + 1}">
      <div class="history-info">
        <div class="history-date">${new Date(item.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
        <div class="history-stats">${item.totalHours}h • ${item.taskCount} tareas • ${item.completionRate}% completado</div>
      </div>
      <div class="history-actions">
        <button class="history-btn" onclick="viewFullSize(${item.id})">👁️ Ver</button>
        <button class="history-btn" onclick="compareWithCurrent(${item.id})">🔍 Comparar</button>
        <button class="history-btn" onclick="downloadAgain(${item.id})">⬇️ Descargar</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function viewFullSize(id) {
  const item = exportHistory.find(h => h.id === id);
  if (!item) return;
  
  const win = window.open('', '_blank');
  win.document.write(`
    <html>
      <head>
        <title>Exportación TFG</title>
        <style>
          body { margin: 0; padding: 20px; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 100%; height: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 8px; background: white; }
        </style>
      </head>
      <body>
        <img src="${item.image}" alt="Gantt TFG">
      </body>
    </html>
  `);
}

function compareWithCurrent(id) {
  const previousItem = exportHistory.find(h => h.id === id);
  if (!previousItem) return;
  
  document.getElementById('compareModal').classList.add('active');
  
  // Calcular estadísticas actuales
  const currentHours = tasks.reduce((sum, t) => sum + t.hours, 0);
  const currentCompleted = tasks.filter(t => t.completed === 100).length;
  const currentRate = Math.round((currentCompleted / tasks.length) * 100);
  
  // Calcular diferencias
  const hoursDiff = currentHours - previousItem.totalHours;
  const tasksDiff = tasks.length - previousItem.taskCount;
  const rateDiff = currentRate - previousItem.completionRate;
  
  // Analizar cambios en tareas
  const previousTasks = previousItem.tasksSnapshot;
  const addedTasks = tasks.filter(t => !previousTasks.find(pt => pt.id === t.id));
  const removedTasks = previousTasks.filter(pt => !tasks.find(t => t.id === pt.id));
  const modifiedTasks = tasks.filter(t => {
    const prev = previousTasks.find(pt => pt.id === t.id);
    if (!prev) return false;
    return prev.hours !== t.hours || prev.start_date !== t.start_date || prev.end_date !== t.end_date;
  });
  
  const compareContent = document.getElementById('compareContent');
  compareContent.innerHTML = `
    <div class="compare-grid">
      <div class="compare-panel">
        <h4>📅 Versión Anterior</h4>
        <img src="${previousItem.image}" class="compare-image" alt="Anterior">
        <div class="compare-stats">
          <div class="stat-row">
            <span>Fecha:</span>
            <span>${new Date(previousItem.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          </div>
          <div class="stat-row">
            <span>Total horas:</span>
            <span>${previousItem.totalHours}h</span>
          </div>
          <div class="stat-row">
            <span>Tareas:</span>
            <span>${previousItem.taskCount}</span>
          </div>
          <div class="stat-row">
            <span>Completitud:</span>
            <span>${previousItem.completionRate}%</span>
          </div>
        </div>
      </div>
      
      <div class="compare-panel">
        <h4>📊 Versión Actual</h4>
        <canvas id="tempGanttCanvas" style="width: 100%; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 12px;"></canvas>
        <div class="compare-stats">
          <div class="stat-row">
            <span>Fecha:</span>
            <span>${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          </div>
          <div class="stat-row">
            <span>Total horas:</span>
            <span>${currentHours}h <span class="stat-diff ${hoursDiff >= 0 ? 'positive' : 'negative'}">${hoursDiff >= 0 ? '+' : ''}${hoursDiff}h</span></span>
          </div>
          <div class="stat-row">
            <span>Tareas:</span>
            <span>${tasks.length} <span class="stat-diff ${tasksDiff >= 0 ? 'positive' : 'negative'}">${tasksDiff >= 0 ? '+' : ''}${tasksDiff}</span></span>
          </div>
          <div class="stat-row">
            <span>Completitud:</span>
            <span>${currentRate}% <span class="stat-diff ${rateDiff >= 0 ? 'positive' : 'negative'}">${rateDiff >= 0 ? '+' : ''}${rateDiff}%</span></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="compare-summary">
      <h4>📈 Resumen de Cambios</h4>
      <ul>
        ${addedTasks.length > 0 ? `<li><strong>${addedTasks.length} tarea(s) añadida(s):</strong> ${addedTasks.map(t => t.name).join(', ')}</li>` : ''}
        ${removedTasks.length > 0 ? `<li><strong>${removedTasks.length} tarea(s) eliminada(s):</strong> ${removedTasks.map(t => t.name).join(', ')}</li>` : ''}
        ${modifiedTasks.length > 0 ? `<li><strong>${modifiedTasks.length} tarea(s) modificada(s):</strong> ${modifiedTasks.map(t => t.name).join(', ')}</li>` : ''}
        ${hoursDiff !== 0 ? `<li><strong>Cambio en horas totales:</strong> ${hoursDiff > 0 ? '+' : ''}${hoursDiff} horas</li>` : ''}
        ${rateDiff !== 0 ? `<li><strong>Cambio en completitud:</strong> ${rateDiff > 0 ? '+' : ''}${rateDiff}%</li>` : ''}
        ${addedTasks.length === 0 && removedTasks.length === 0 && modifiedTasks.length === 0 && hoursDiff === 0 ? '<li>No se detectaron cambios significativos</li>' : ''}
      </ul>
    </div>
  `;
  
  // Renderizar Gantt actual en miniatura
  setTimeout(() => {
    const tempCanvas = document.getElementById('tempGanttCanvas');
    if (tempCanvas) {
      const mainCanvas = document.getElementById('ganttCanvas');
      tempCanvas.width = mainCanvas.width;
      tempCanvas.height = mainCanvas.height;
      const ctx = tempCanvas.getContext('2d');
      ctx.drawImage(mainCanvas, 0, 0);
    }
  }, 100);
}

function downloadAgain(id) {
  const item = exportHistory.find(h => h.id === id);
  if (!item) return;
  
  const link = document.createElement('a');
  const timestamp = new Date(item.timestamp).toISOString().replace(/[:.]/g, '-').split('T');
  const dateStr = timestamp[0].replace(/-/g, '');
  const timeStr = timestamp[1].split('-')[0].replace(/-/g, '');
  link.download = `Gantt_TFG_${dateStr}_${timeStr}.png`;
  link.href = item.image;
  link.click();
  
  showNotification('✓ Imagen descargada correctamente', 'success');
}

function clearExportHistory() {
  if (confirm('¿Estás seguro de que deseas eliminar todo el historial de exportaciones?')) {
    exportHistory = [];
    renderExportHistory();
    showNotification('✓ Historial limpiado', 'success');
  }
}

function closeCompareModal() {
  document.getElementById('compareModal').classList.remove('active');
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = 'export-notification';
  notification.textContent = message;
  
  if (type === 'error') {
    notification.style.backgroundColor = 'var(--color-error)';
  } else if (type === 'info') {
    notification.style.backgroundColor = 'var(--color-info)';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// ==================== DRAG & DROP ====================
let draggedTaskIndex = null;

function handleDragStart(index) {
    draggedTaskIndex = index;
    const row = document.querySelector(`tr[data-task-index="${index}"]`);
    if(row) row.classList.add('dragging');
}

function handleDragEnd() {
    document.querySelectorAll('tr.dragging').forEach(row => row.classList.remove('dragging'));
    draggedTaskIndex = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e, targetIndex) {
    e.preventDefault();
    if(draggedTaskIndex === null || draggedTaskIndex === targetIndex) return;
    const [movedTask] = tasks.splice(draggedTaskIndex, 1);
    tasks.splice(targetIndex, 0, movedTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskTable();
    renderGantt();
}

function moveTaskUpDown(index, direction) {
    const newIndex = index + direction;
    if(newIndex < 0 || newIndex >= tasks.length) return;
    [tasks[index], tasks[newIndex]] = [tasks[newIndex], tasks[index]];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskTable();
    renderGantt();
}
