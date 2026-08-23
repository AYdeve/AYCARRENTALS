
  // ── PAGE NAVIGATION ──
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const navEl = document.getElementById('nav-' + id);
    if(navEl) navEl.classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // ── HAMBURGER ──
  function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }

  // ── FLEET FILTER ──
  function filterCars(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#fleet-grid .car-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
    });
  }

  // ── PRICE CALC ──
  let dailyRate = 0;
  function updatePrice(sel) {
    dailyRate = parseInt(sel.value) || 0;
    calcDays();
  }
  function calcDays() {
    const p = document.getElementById('book-pickup').value;
    const r = document.getElementById('book-return').value;
    if (!p || !r) return;
    const days = Math.max(1, Math.round((new Date(r) - new Date(p)) / 86400000));
    const subtotal = dailyRate * days;
    const vat = Math.round(subtotal * 0.075);
    const total = subtotal + vat;
    document.getElementById('daily-rate').textContent = '₦' + dailyRate.toLocaleString();
    document.getElementById('num-days').textContent = days;
    document.getElementById('vat-amt').textContent = '₦' + vat.toLocaleString();
    document.getElementById('total-price').textContent = '₦' + total.toLocaleString();
  }

  // ── QUICK SEARCH ──
  function quickSearch() {
    const p = document.getElementById('quick-pickup').value;
    const r = document.getElementById('quick-return').value;
    if (!p || !r) { showToast('⚠️ Please select pickup and return dates'); return; }
    if (new Date(r) <= new Date(p)) { showToast('⚠️ Return date must be after pickup date'); return; }
    showPage('fleet');
  }

  // ── BOOKING SUBMIT ──
  function submitBooking() {
    showToast('🎉 Booking received! We\'ll confirm within 30 minutes.');
  }

  // ── CONTACT SUBMIT ──
  function submitContact() {
    showToast('✅ Message sent! We\'ll get back to you shortly.');
  }

  // ── TOAST ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  // ── SCROLL ──
  window.addEventListener('scroll', () => {
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
  });

  // ── ANIMATE ON SCROLL ──
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
    });
  }, {threshold:0.08});
  document.querySelectorAll('.car-card, .value-card, .team-card, .ci-card, .feature-row').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(24px)';
    el.style.transition='opacity 0.55s ease, transform 0.55s ease';
    obs.observe(el);
  });

  // ── SET MIN DATES ──
  const today = new Date().toISOString().split('T')[0];
  ['quick-pickup','quick-return','book-pickup','book-return'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.min = today;
  });
