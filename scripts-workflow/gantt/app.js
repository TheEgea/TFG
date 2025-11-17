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
  "Análisis VMs": { color: "#6699FF", darkColor: "#3366CC" },
  "Diseño": { color: "#B3FFB3", darkColor: "#66CC66" },
  "Implementación": { color: "#FFB366", darkColor: "#FF9900" },
  "Automatización": { color: "#FF9999", darkColor: "#FF6666" },
  "Validación": { color: "#D9B3FF", darkColor: "#B366FF" },
  "Documentación": { color: "#CCCCCC", darkColor: "#999999" },
  "Defensa": { color: "#FFFF99", darkColor: "#FFFF00" },
  "Hito 1": { color: "#FF6666", darkColor: "#CC0000" },
  "Hito 2": { color: "#FF6666", darkColor: "#CC0000" },
  "Hito 3": { color: "#FF6666", darkColor: "#CC0000" },
  "Hito 4": { color: "#FF6666", darkColor: "#CC0000" }
};

// Estado de la aplicación
let tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
let selectedTaskId = null;
let editingCell = null;

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
      
      if (task.hours > 100) {
        alert('⚠️ Advertencia: La tarea tiene más de 100 horas asignadas.');
      }
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
  
  document.getElementById('totalHours').textContent = totalHours;
  document.getElementById('totalTasks').textContent = tasks.length;
  document.getElementById('projectStart').textContent = formatDate(minDate.toISOString().split('T')[0]);
  document.getElementById('projectEnd').textContent = formatDate(maxDate.toISOString().split('T')[0]);
  document.getElementById('projectDuration').textContent = `${duration} días (${weeks} semanas)`;
  document.getElementById('completionRate').textContent = `${Math.round((completedTasks / tasks.length) * 100)}%`;
  document.getElementById('milestonesCompleted').textContent = `${completedMilestones}/${milestones.length}`;
  
  if (totalHours > 500) {
    alert('⚠️ Advertencia: El total de horas supera las 500 horas planificadas.');
  }
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

// Event Listeners
function setupEventListeners() {
  // Botón añadir tarea
  document.getElementById('addTaskBtn').addEventListener('click', openAddTaskModal);
  
  // Botón resetear
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas restaurar los valores iniciales? Se perderán todos los cambios.')) {
      tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
      renderTaskTable();
      renderGantt();
      updateSummary();
    }
  });
  
  // Botón exportar
  document.getElementById('exportBtn').addEventListener('click', exportToCSV);
  
  // Botón importar
  document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });
  
  document.getElementById('importFile').addEventListener('change', importFromCSV);
  
  // Botón estadísticas
  document.getElementById('statsBtn').addEventListener('click', showStatistics);
  
  // Filtros
  document.getElementById('categoryFilter').addEventListener('change', renderTaskTable);
  document.getElementById('hideCompletedFilter').addEventListener('change', renderTaskTable);
  
  // Modal añadir tarea
  document.getElementById('closeModalBtn').addEventListener('click', closeAddTaskModal);
  document.getElementById('cancelModalBtn').addEventListener('click', closeAddTaskModal);
  document.getElementById('createTaskBtn').addEventListener('click', createTask);
  
  // Modal estadísticas
  document.getElementById('closeStatsModalBtn').addEventListener('click', closeStatsModal);
  
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

// Crear tarea
function createTask() {
  const name = document.getElementById('taskName').value.trim();
  const category = document.getElementById('taskCategory').value;
  const hours = parseInt(document.getElementById('taskHours').value);
  const startDate = document.getElementById('taskStartDate').value;
  const endDate = document.getElementById('taskEndDate').value;
  
  if (!name || !category || !hours || !startDate || !endDate) {
    alert('Por favor, completa todos los campos.');
    return;
  }
  
  if (new Date(endDate) < new Date(startDate)) {
    alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
    return;
  }
  
  const newTask = {
    id: Math.max(...tasks.map(t => t.id)) + 1,
    name,
    category,
    hours,
    start_date: startDate,
    end_date: endDate,
    completed: 0,
    critical: false
  };
  
  tasks.push(newTask);
  closeAddTaskModal();
  renderTaskTable();
  renderGantt();
  updateSummary();
  
  // Limpiar formulario
  document.getElementById('taskName').value = '';
  document.getElementById('taskHours').value = '10';
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

// Importar desde CSV
function importFromCSV(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const csv = event.target.result;
      const lines = csv.split('\n');
      const newTasks = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const match = lines[i].match(/"([^"]*)","([^"]*)",([^,]*),([^,]*),([^,]*),([^,]*),([^,\n]*)/);        if (match) {
          newTasks.push({
            id: i,
            name: match[1],
            category: match[2],
            hours: parseInt(match[3]),
            start_date: match[4],
            end_date: match[5],
            completed: parseInt(match[6]),
            critical: match[7].trim() === 'true'
          });
        }
      }
      
      if (newTasks.length > 0) {
        if (confirm(`Se importarán ${newTasks.length} tareas. ¿Deseas reemplazar las tareas actuales o fusionarlas?\n\nOK = Reemplazar | Cancelar = Fusionar`)) {
          tasks = newTasks;
        } else {
          const maxId = Math.max(...tasks.map(t => t.id));
          newTasks.forEach((task, index) => {
            task.id = maxId + index + 1;
          });
          tasks = [...tasks, ...newTasks];
        }
        
        renderTaskTable();
        renderGantt();
        updateSummary();
        alert('Importación completada con éxito.');
      }
    } catch (error) {
      alert('Error al importar el archivo CSV. Verifica el formato.');
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