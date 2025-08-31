    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light'){ root.classList.add('light'); themeToggle.textContent = '☀️'; }
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('light');
      const lightOn = root.classList.contains('light');
      localStorage.setItem('theme', lightOn ? 'light' : 'dark');
      themeToggle.textContent = lightOn ? '☀️' : '🌙';
    });

    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', () => {
      alert('Implement mobile drawer or off-canvas menu here.');
    });

    const progress = document.getElementById('progress');
    function updateProgress(){
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = (scrollTop / height) * 100;
      progress.style.width = percent + '%';
    }
    document.addEventListener('scroll', updateProgress);
    updateProgress();
    const backTop = document.getElementById('backTop');
    const showBackTop = () => {
      if(window.scrollY > 500){ backTop.style.opacity = 1; backTop.style.pointerEvents = 'auto'; }
      else { backTop.style.opacity = 0; backTop.style.pointerEvents = 'none'; }
    };
    document.addEventListener('scroll', showBackTop);

    document.getElementById('year').textContent = new Date().getFullYear();

    const reveal = (el) => { el.animate([{opacity:0, transform:'translateY(12px)'}, {opacity:1, transform:'translateY(0)'}], {duration:600, easing:'ease-out', fill:'forwards'}); };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ reveal(e.target); io.unobserve(e.target);} });
    }, { threshold: .1 });
    document.querySelectorAll('.card, .project, .chip, .stat').forEach(el => io.observe(el));

    const grid = document.getElementById('projectGrid');
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('primary'));
      btn.classList.add('primary');
      const f = btn.dataset.filter;
      [...grid.children].forEach(card => {
        const tags = card.getAttribute('data-tags');
        const show = f === 'all' || (tags && tags.includes(f));
        card.style.display = show ? '' : 'none';
      });
    }));

    const modal = document.getElementById('projectModal');
    document.querySelectorAll('[data-modal-open]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); modal.showModal(); }));
    document.getElementById('modalClose').addEventListener('click', () => modal.close());

    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';

      const data = Object.fromEntries(new FormData(form).entries());
      if(!data.name || !data.email || !data.subject || !data.message){
        msg.textContent = 'Please fill all fields.';
        msg.className = 'hint error';
        return;
      }

      const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formMsg.innerText = "✅ Message sent successfully!";
      form.reset();
    } else {
      formMsg.innerText = "❌ Oops! Something went wrong.";
    }
  });

      const ENDPOINT = '';
      if(ENDPOINT){
        try{
          const res = await fetch(ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
          if(!res.ok) throw new Error('Network');
          msg.textContent = 'Message sent successfully!';
          msg.className = 'hint success';
          form.reset();
          return;
        }catch(err){
          console.error(err);
          msg.textContent = 'Could not send via API, using email app...';
          msg.className = 'hint error';
        }
      }

      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(`Hi Arpit,\n\n${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:yourmail@example.com?subject=${subject}&body=${body}`;
    });