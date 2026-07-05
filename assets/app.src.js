/* ====================================================================
   ROGEL GROUP — JS compartido (sin librerías externas)
   nav · menú móvil · reveal · contadores · parallax · progreso ·
   cursor · efecto Apple (pinned scroll) · formulario
   ==================================================================== */
(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Año dinámico */
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* Nav scrolled + barra de progreso superior */
  var nav = document.querySelector('header.nav');
  var bar = document.querySelector('.scroll-bar');
  function navState(){ if(nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  navState();

  /* Menú móvil */
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('.nav-links');
  if(burger && navLinks){
    burger.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true':'false');
      document.body.style.overflow = open ? 'hidden':'';
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open'); burger.classList.remove('open');
        burger.setAttribute('aria-expanded','false'); document.body.style.overflow='';
      });
    });
  }

  /* Botón volver arriba (se inyecta en todas las páginas) */
  var toTop = document.createElement('button');
  toTop.className = 'scroll-top';
  toTop.setAttribute('aria-label','Volver arriba');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduced ? 'auto' : 'smooth'}); });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduced){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -7% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else { reveals.forEach(function(el){ el.classList.add('in'); }); }

  /* Contadores */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dur = 1500, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts-start)/dur,1), eased = 1-Math.pow(1-p,3);
      el.textContent = prefix + Math.floor(eased*target) + suffix;
      if(p<1) requestAnimationFrame(step); else el.textContent = prefix+target+suffix;
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && !reduced){
    var cio = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ runCount(e.target); cio.unobserve(e.target); } });
    }, {threshold:.6});
    counters.forEach(function(el){ cio.observe(el); });
  } else { counters.forEach(function(el){ el.textContent = (el.getAttribute('data-prefix')||'')+el.getAttribute('data-count')+(el.getAttribute('data-suffix')||''); }); }

  /* ---- EFECTO APPLE: secuencia fijada ---- */
  var stages = [];
  document.querySelectorAll('.stage').forEach(function(stage){
    stages.push({
      el: stage,
      frames: stage.querySelectorAll('.stage-frame'),
      dots: stage.querySelectorAll('.stage-dots i')
    });
  });
  function updateStages(){
    if(reduced) return;
    stages.forEach(function(s){
      var rect = s.el.getBoundingClientRect();
      var total = s.el.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top,0), total);
      var p = total>0 ? scrolled/total : 0;
      var n = s.frames.length;
      var idx = Math.min(Math.floor(p*n), n-1);
      s.frames.forEach(function(f,i){ f.classList.toggle('active', i===idx); });
      if(s.dots.length) s.dots.forEach(function(d,i){ d.classList.toggle('on', i===idx); });
    });
  }

  /* ---- Parallax + progreso + nav en un rAF ---- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  var ticking = false;
  function onScroll(){
    if(ticking) return; ticking = true;
    requestAnimationFrame(function(){
      navState();
      if(toTop) toTop.classList.toggle('show', window.scrollY > 600);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h>0 ? window.scrollY/h : 0;
      if(bar) bar.style.width = (p*100)+'%';
      if(!reduced){
        parallaxEls.forEach(function(el){
          var sp = parseFloat(el.getAttribute('data-parallax'))||.15;
          el.style.transform = 'translateY('+(window.scrollY*sp)+'px)';
        });
      }
      updateStages();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  onScroll();
  // activa el primer frame al cargar
  stages.forEach(function(s){ if(s.frames[0]) s.frames[0].classList.add('active'); if(s.dots[0]) s.dots[0].classList.add('on'); });

  /* ---- Carrusel de reseñas ---- */
  document.querySelectorAll('.reviews-block').forEach(function(block){
    var track = block.querySelector('.rev-track');
    if(!track) return;
    var slides = track.children, n = slides.length, i = 0;
    var prev = block.querySelector('.prev'), next = block.querySelector('.next');
    var dotsWrap = block.querySelector('.rev-dots');
    var dots = [];
    if(dotsWrap){
      for(var k=0;k<n;k++){
        var b = document.createElement('button');
        b.setAttribute('aria-label','Reseña '+(k+1));
        (function(idx){ b.addEventListener('click', function(){ go(idx); }); })(k);
        dotsWrap.appendChild(b); dots.push(b);
      }
    }
    function render(){
      track.style.transform = 'translateX(' + (-i*100) + '%)';
      dots.forEach(function(d,idx){ d.classList.toggle('on', idx===i); });
    }
    function go(k){ i = (k+n)%n; render(); }
    if(prev) prev.addEventListener('click', function(){ go(i-1); });
    if(next) next.addEventListener('click', function(){ go(i+1); });
    render();
    // autoplay
    var timer = null;
    function start(){ if(reduced || n<2) return; timer = setInterval(function(){ go(i+1); }, 6000); }
    function stop(){ if(timer){ clearInterval(timer); timer = null; } }
    block.addEventListener('mouseenter', stop);
    block.addEventListener('mouseleave', start);
    // deslizar reseñas con el dedo
    var rsx=0, rsy=0, rdrag=false, rdec=false, rhor=false;
    var rvp = block.querySelector('.rev-viewport') || track;
    rvp.addEventListener('touchstart', function(e){ var t=e.touches[0]; rsx=t.clientX; rsy=t.clientY; rdrag=true; rdec=false; rhor=false; stop(); }, {passive:true});
    rvp.addEventListener('touchmove', function(e){
      if(!rdrag) return; var t=e.touches[0]; var mx=t.clientX-rsx, my=t.clientY-rsy;
      if(!rdec){ if(Math.abs(mx)>8||Math.abs(my)>8){ rdec=true; rhor=Math.abs(mx)>Math.abs(my); if(!rhor){ rdrag=false; return; } } else return; }
      if(rhor && e.cancelable) e.preventDefault();
    }, {passive:false});
    rvp.addEventListener('touchend', function(e){
      if(!rdrag) return; rdrag=false;
      if(rhor){ var mx=(e.changedTouches?e.changedTouches[0].clientX:rsx)-rsx; if(mx < -40) go(i+1); else if(mx > 40) go(i-1); }
      start();
    });
    start();
  });

  /* ---- Lightbox: ampliar fotos al hacer clic ---- */
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-label','Imagen ampliada');
  lb.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Cerrar imagen">&times;</button>' +
    '<button type="button" class="lightbox-nav prev" aria-label="Imagen anterior">&#8249;</button>' +
    '<img src="" alt="">' +
    '<button type="button" class="lightbox-nav next" aria-label="Imagen siguiente">&#8250;</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  var lbPrev = lb.querySelector('.prev');
  var lbNext = lb.querySelector('.next');
  var lbGroup = [], lbIdx = 0;
  function lbShow(k){
    if(!lbGroup.length) return;
    lbIdx = (k + lbGroup.length) % lbGroup.length;
    var src = lbGroup[lbIdx];
    lbImg.setAttribute('src', src.getAttribute('src'));
    lbImg.setAttribute('alt', src.getAttribute('alt') || '');
    var multi = lbGroup.length > 1;
    lbPrev.style.display = multi ? 'grid' : 'none';
    lbNext.style.display = multi ? 'grid' : 'none';
  }
  function openLightbox(group, index){
    lbGroup = (group || []).filter(Boolean);
    if(!lbGroup.length) return;
    document.body.style.overflow = 'hidden';
    lb.classList.add('open');
    lbShow(index || 0);
  }
  function lbClose(){ lb.classList.remove('open'); document.body.style.overflow = ''; }
  lb.querySelector('.lightbox-close').addEventListener('click', lbClose);
  lbPrev.addEventListener('click', function(e){ e.stopPropagation(); lbShow(lbIdx - 1); });
  lbNext.addEventListener('click', function(e){ e.stopPropagation(); lbShow(lbIdx + 1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) lbClose(); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') lbClose();
    else if(e.key === 'ArrowLeft') lbShow(lbIdx - 1);
    else if(e.key === 'ArrowRight') lbShow(lbIdx + 1);
  });
  document.querySelectorAll('.gal-item').forEach(function(item){
    var img = item.querySelector('img');
    if(!img) return;
    var grid = item.closest('.gal-grid');
    if(grid && grid.getAttribute('data-zoom') === 'off') return;
    item.addEventListener('click', function(e){
      e.preventDefault();
      var imgs = grid ? Array.prototype.slice.call(grid.querySelectorAll('.gal-item img')) : [img];
      openLightbox(imgs, imgs.indexOf(img));
    });
  });

  /* ---- Sliders de imágenes (flechas + puntos + arrastrar/swipe) ---- */
  document.querySelectorAll('.slider').forEach(function(slider){
    var track = slider.querySelector('.slider-track');
    if(!track) return;
    var slides = track.children, n = slides.length, i = 0;
    var prev = slider.querySelector('.prev'), next = slider.querySelector('.next');
    var dotsWrap = slider.querySelector('.slider-dots');
    var dots = [];
    if(dotsWrap){
      for(var k=0;k<n;k++){
        var b = document.createElement('button');
        b.setAttribute('aria-label','Imagen '+(k+1));
        (function(idx){ b.addEventListener('click', function(){ go(idx); }); })(k);
        dotsWrap.appendChild(b); dots.push(b);
      }
    }
    function render(){ track.style.transform = 'translateX('+(-i*100)+'%)'; dots.forEach(function(d,idx){ d.classList.toggle('on', idx===i); }); }
    function go(k){ i = (k+n)%n; render(); }
    if(prev) prev.addEventListener('click', function(){ go(i-1); });
    if(next) next.addEventListener('click', function(){ go(i+1); });
    render();
    // arrastrar / deslizar con el dedo (detecta gesto horizontal y no interfiere con el scroll vertical)
    var startX=0, startY=0, dx=0, dragging=false, horiz=false, decided=false, touchMode=false;
    function down(e){
      if(e.type==='mousedown' && touchMode) return; // ignora el raton emulado tras un toque
      dragging=true; decided=false; horiz=false; dx=0;
      var t = e.touches ? e.touches[0] : e;
      startX = t.clientX; startY = t.clientY;
      track.classList.add('dragging');
    }
    function move(e){
      if(!dragging) return;
      var t = e.touches ? e.touches[0] : e;
      var mx = t.clientX - startX, my = t.clientY - startY;
      if(!decided){
        if(Math.abs(mx) > 8 || Math.abs(my) > 8){
          decided = true;
          horiz = Math.abs(mx) > Math.abs(my);
          if(!horiz){ dragging = false; track.classList.remove('dragging'); return; }
        } else { return; }
      }
      if(horiz){
        dx = mx;
        if(e.cancelable) e.preventDefault();
        track.style.transform = 'translateX(calc('+(-i*100)+'% + '+dx+'px))';
      }
    }
    function up(){
      if(!dragging) return; dragging=false; track.classList.remove('dragging');
      var w = slider.clientWidth || 1;
      if(horiz && dx < -w*0.15) go(i+1);
      else if(horiz && dx > w*0.15) go(i-1);
      else {
        render();
        if(!decided && typeof openLightbox === 'function'){
          openLightbox(Array.prototype.map.call(slides, function(s){ return s.querySelector('img'); }), i);
        }
      }
      dx=0; horiz=false; decided=false;
    }
    track.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    track.addEventListener('touchstart', function(e){ touchMode=true; down(e); }, {passive:true});
    track.addEventListener('touchmove', move, {passive:false});
    track.addEventListener('touchend', up);
  });

  /* ---- Formulario (Web3Forms con envío AJAX) ---- */
  document.querySelectorAll('form.cform').forEach(function(form){
    var ok  = form.querySelector('.form-ok');
    var err = form.querySelector('.form-error');
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(ok)  ok.classList.remove('show');
      if(err) err.classList.remove('show');
      if(!form.checkValidity()){ form.reportValidity(); return; }

      var action = form.getAttribute('action') || '';
      // Sin Web3Forms configurado: comportamiento de demostración
      if(action.indexOf('web3forms') === -1){
        if(ok) ok.classList.add('show');
        if(btn) btn.style.display = 'none';
        setTimeout(function(){ form.reset(); }, 300);
        return;
      }

      var originalHtml = btn ? btn.innerHTML : '';
      if(btn){ btn.disabled = true; btn.innerHTML = 'Enviando…'; }

      fetch(action, { method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form) })
        .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(d){ return { okStatus:r.ok, data:d }; }); })
        .then(function(res){
          if(res.okStatus && res.data && res.data.success){
            if(ok) ok.classList.add('show');
            if(btn) btn.style.display = 'none';
            form.reset();
          } else {
            throw new Error('web3forms');
          }
        })
        .catch(function(){
          if(err) err.classList.add('show');
          if(btn){ btn.disabled = false; btn.innerHTML = originalHtml; }
        });
    });
  });

  /* ---- Selección de servicio desde botones rápidos ---- */
  document.querySelectorAll('[data-fill-service]').forEach(function(b){
    b.addEventListener('click', function(){
      var sel = document.querySelector('#f-serv');
      if(sel){ sel.value = b.getAttribute('data-fill-service'); }
    });
  });

  /* ---- Pie de foto "Foto real de Altium" ----
     data-cap="none" en un contenedor la oculta; data-cap="top" la coloca arriba */
  document.querySelectorAll('.slider, .gal-item, .stage-frame').forEach(function(box){
    var scope = box.closest('[data-cap]');
    var mode = scope ? scope.getAttribute('data-cap') : '';
    if(mode === 'none') return;
    if(box.querySelector('.foto-real')) return;
    var cap = document.createElement('span');
    cap.className = 'foto-real' + (mode === 'top' ? ' foto-real--top' : '');
    cap.setAttribute('aria-hidden','true');
    cap.textContent = 'Foto real de Altium';
    box.appendChild(cap);
  });

  /* ---- Cookies: banner solo en la página principal, una sola vez ---- */
  (function(){
    var page = (location.pathname.split('/').pop() || '').toLowerCase();
    var isHome = (page === '' || page === 'index.html');
    if(!isHome) return;
    function remembered(){
      try{ if(localStorage.getItem('altium_cookies')) return true; }catch(e){}
      return document.cookie.indexOf('altium_cookies=') !== -1;
    }
    function remember(value){
      try{ localStorage.setItem('altium_cookies', value); }catch(e){}
      try{
        var d = new Date(); d.setTime(d.getTime() + 180*864e5);
        document.cookie = 'altium_cookies=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
      }catch(e){}
    }
    if(remembered()) return;
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<p>Usamos cookies propias y técnicas necesarias para el funcionamiento del sitio y para recordar tus preferencias. Consulta nuestra <a href="politica-cookies.html">política de cookies</a>.</p>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="btn btn-ghost cookie-reject" data-cursor>Rechazar</button>' +
        '<button type="button" class="btn btn-primary cookie-accept" data-cursor>Aceptar</button>' +
      '</div>';
    document.body.appendChild(banner);
    requestAnimationFrame(function(){ banner.classList.add('show'); });
    function closeBanner(value){
      remember(value);
      banner.classList.remove('show');
      setTimeout(function(){ if(banner.parentNode) banner.parentNode.removeChild(banner); }, 500);
    }
    var accept = banner.querySelector('.cookie-accept');
    var reject = banner.querySelector('.cookie-reject');
    if(accept) accept.addEventListener('click', function(){ closeBanner('accepted'); });
    if(reject) reject.addEventListener('click', function(){ closeBanner('rejected'); });
  })();
})();
