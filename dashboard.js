// Mobile sidebar toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

mobileMenuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

sidebarToggle?.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// Close sidebar when clicking on nav item (mobile)
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    // Remove active from all
    navItems.forEach(nav => nav.classList.remove('active'));
    // Add active to clicked
    item.classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 968) {
      sidebar.classList.remove('active');
    }
  });
});

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 968) {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  }
});

// Initialize Lucide icons after any dynamic content
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Simulate real-time updates for notifications
function updateNotifications() {
  const badge = document.querySelector('.nav-item .badge');
  if (badge) {
    // Simulate notification count updates
    const currentCount = parseInt(badge.textContent);
    // This would be replaced with actual notification logic
  }
}

// Update every 30 seconds
setInterval(updateNotifications, 30000);

// Simulate exercise completion
function completeExercise(exerciseElement) {
  exerciseElement.style.opacity = '0.5';
  exerciseElement.style.pointerEvents = 'none';
  
  // Show success message
  const successMsg = document.createElement('div');
  successMsg.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  successMsg.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <i data-lucide="check-circle"></i>
      <span>Exercício completado! 🎉</span>
    </div>
  `;
  document.body.appendChild(successMsg);
  lucide.createIcons();
  
  setTimeout(() => {
    successMsg.remove();
  }, 3000);
}

// Add click handlers to exercise play buttons
document.querySelectorAll('.exercise-item .btn-icon').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const exerciseItem = btn.closest('.exercise-item');
    const exerciseName = exerciseItem.querySelector('h3').textContent;
    
    // In real app, this would open video player
    alert(`Iniciando: ${exerciseName}\n\nEm breve você será redirecionado para o player de vídeo.`);
    
    // Simulate completion after "watching"
    // completeExercise(exerciseItem);
  });
});

// Add click handlers to article items
document.querySelectorAll('.article-item').forEach(article => {
  article.addEventListener('click', () => {
    const title = article.querySelector('h3').textContent;
    alert(`Abrindo artigo: ${title}\n\nEm breve você será redirecionado para a página do artigo.`);
  });
});

// Add click handlers to community posts
document.querySelectorAll('.post-action').forEach(action => {
  action.addEventListener('click', (e) => {
    e.stopPropagation();
    const icon = action.querySelector('i');
    const count = action.querySelector('span') || action.childNodes[1];
    
    if (icon.getAttribute('data-lucide') === 'heart') {
      // Toggle like
      const currentCount = parseInt(count.textContent);
      count.textContent = currentCount + 1;
      action.style.color = '#ef4444';
    } else {
      // Open comments
      alert('Em breve: Sistema de comentários estará disponível!');
    }
  });
});

// Quick action buttons
document.querySelectorAll('.quick-actions .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.textContent.trim();
    if (text.includes('Treino')) {
      alert('Redirecionando para página de exercícios...');
      window.location.hash = '#exercicios';
    } else if (text.includes('Agenda')) {
      alert('Redirecionando para sua agenda...');
      window.location.hash = '#agenda';
    }
  });
});

// User menu dropdown (placeholder)
const userBtn = document.getElementById('userBtn');
userBtn?.addEventListener('click', () => {
  alert('Menu do usuário:\n\n- Meu Perfil\n- Configurações\n- Ajuda\n- Sair\n\n(Em desenvolvimento)');
});

// Notification button
const notificationBtn = document.getElementById('notificationBtn');
notificationBtn?.addEventListener('click', () => {
  alert('Notificações:\n\n✓ Nova conquista desbloqueada!\n✓ Lembrete: Exercício às 14:00\n✓ Maria Costa curtiu seu post\n\n(Em desenvolvimento)');
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
