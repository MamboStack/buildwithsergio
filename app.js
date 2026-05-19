document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver((e,o)=>{e.forEach((en,i)=>{if(en.isIntersecting){setTimeout(()=>en.target.classList.add('visible'),i*80);o.unobserve(en.target);}});},{threshold:.1}).observe(el));

var chOpen=false,chHist=[];
var SYS="Sos el asistente personal de Sergio González, Webmaster y Web Product Specialist en Bogotá, Colombia.\n\n" +
"Sobre Sergio:\n" +
"- 9+ años de experiencia gestionando infraestructura digital, rendimiento web y conversión (CRO).\n" +
"- Web Master en Winner Group, responsable de la presencia digital de una red nacional de 72 casinos.\n" +
"- Fundador de Neón Píxel — agencia especializada en optimización web, flujos de QA y automatización.\n" +
"- Stack técnico: Gestión de CMS (WordPress), QA web, SEO técnico, n8n, HTML, CSS, JavaScript y Figma.\n" +
"- Formación: Diplomado Creative UX/UI LCI Veritas, Certificación Product Manager y AI Automation en Coderhouse.\n" +
"- Aporta una mirada analítica para transformar datos de comportamiento en mejoras reales de conversión.\n" +
"- Disponible para proyectos de consultoría y contratación en roles de Webmaster, QA o Web Specialist.\n\n" +
"Proyectos:\n" +
"1. Adaptify — Investigación de usuario y diseño conceptual SaaS para la optimización de procesos de diseño web.\n" +
"2. Winner Group — Ecosistema automatizado con n8n e IA para la conversión y tracking de leads en tiempo real.\n" +
"3. Winner Group — Reducción del 75% en tiempos de producción de activos mediante control de calidad y automatización.\n\n" +
"Contacto: hola@buildwithsergio.com · WhatsApp +57 305 751 3238 · https://www.linkedin.com/in/buildwithsergio\n\n" +
"Instrucciones: Respondé en español colombiano (trato de 'tú' cercano pero profesional). Máximo 3 párrafos cortos. Si preguntan por trabajo o colaboración, comparte siempre el email y el WhatsApp de una.";

function toggleChat(){chOpen=!chOpen;document.getElementById('chatWin').classList.toggle('open',chOpen);document.getElementById('cbadge').style.display=chOpen?'none':'flex';}
function sndSug(b){document.getElementById('chInp').value=b.textContent;document.getElementById('chSugs').style.display='none';chSend();}
function chKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();chSend();}}
async function chSend(){
  var inp=document.getElementById('chInp'),text=inp.value.trim();
  if(!text)return; inp.value='';
  var msgs=document.getElementById('chMsgs');
  var u=document.createElement('div');u.className='msg musr';u.textContent=text;msgs.appendChild(u);
  var t=document.createElement('div');t.className='mtyp';t.innerHTML='<span></span><span></span><span></span>';msgs.appendChild(t);msgs.scrollTop=msgs.scrollHeight;
  var contents=chHist.map(function(m){
    return {role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]};
  });
  contents.push({role:'user',parts:[{text:text}]});
  try{
    var r=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({system:SYS,contents:contents})
    });
    var d=await r.json();
    var rep=d.reply||'Hubo un error. Escribile a hola@buildwithsergio.com';
    t.remove();
    chHist.push({role:'user',content:text});
    chHist.push({role:'assistant',content:rep});
    var b=document.createElement('div');b.className='msg mbot';b.textContent=rep;msgs.appendChild(b);
    var tl=text.toLowerCase();
    if(tl.includes('trabajo')||tl.includes('contratar')||tl.includes('disponible')||tl.includes('llamada')||tl.includes('agendar')){
      setTimeout(()=>{var c=document.createElement('div');c.className='msg mbot';c.innerHTML='📩 <a href="mailto:hola@buildwithsergio.com">hola@buildwithsergio.com</a> · <a href="https://wa.me/573057513238" target="_blank">WhatsApp</a>';msgs.appendChild(c);msgs.scrollTop=msgs.scrollHeight;},700);}
  }catch(e){t.remove();var er=document.createElement('div');er.className='msg mbot';er.textContent='Hubo un problema. Escribile a hola@buildwithsergio.com';msgs.appendChild(er);}
  msgs.scrollTop=msgs.scrollHeight;
}

// ===== MODAL PORTAFOLIO =====
var PROYECTOS = {
  adaptify: {
    cat: 'Optimización de Procesos Web · SaaS · CRO',
    title: 'Adaptify — Plataforma SaaS de adaptación creativa inteligente',
    tags: ['Product Discovery','User Research','SaaS','Conversion Optimization','Roadmap','OKRs'],
    meta: [
      { label: 'Tipo', val: 'Producto conceptual' },
      { label: 'Research', val: '29 usuarios reales' },
      { label: 'Rol', val: 'Web Product Specialist' }
    ],
    desc: 'Research con 29 diseñadores reales validó que el 43.8% de su jornada se dedica a adaptar piezas manualmente. Diseño de producto SaaS que interpreta archivos .PSD nativos y genera automáticamente todos los formatos requeridos — sin perder fidelidad visual.',
    link: '#'
  },
  winner: {
    cat: 'Optimización e Integración · Tracking de Leads',
    title: 'Ecosistema de automatización de referidos · Winner Group × n8n',
    tags: ['n8n','WhatsApp API','integración de modelos de IA','SAP BO','Product Strategy','QA Flows'],
    meta: [
      { label: 'Empresa', val: 'Winner Group' },
      { label: 'Implementación', val: '4 semanas' },
      { label: 'Rol', val: 'Webmaster · Arquitectura de Integraciones' }
    ],
    desc: 'Diseño de ecosistema autónomo con 5 workflows en n8n para gestionar el ciclo completo del referido en 72 casinos: registro, verificación legal, detección de primera visita via QR, reactivación con IA y reportes automáticos a aliados.',
    link: '#'
  },
  indesign: {
    cat: 'DesignOps · Control de Calidad · Implementación real',
    title: 'Automatización de producción gráfica para 72 casinos · Winner Group',
    tags: ['Process Improvement','InDesign','Data Merge','Iniciativa propia','Winner Group'],
    meta: [
      { label: 'Empresa', val: 'Winner Group' },
      { label: 'Implementado', val: 'Hace 4 años' },
      { label: 'Rol', val: 'Webmaster (Iniciativa Propia)' }
    ],
    desc: 'Iniciativa propia que redujo la producción de 1.500+ imágenes mensuales de 3 semanas con 2 personas a 5 días con 1 persona — sin presupuesto adicional. Sistema de plantillas InDesign con combinación de datos adoptado por todo el equipo.',
    link: '#'
  }
};

function openModal(id) {
  var p = PROYECTOS[id];
  if (!p) return;

  var tagsHtml = p.tags.map(function(t){ return '<span class="mc-tag">'+t+'</span>'; }).join('');
  var metaHtml = p.meta.map(function(m){ return '<div class="mc-meta-item"><div class="mc-meta-label">'+m.label+'</div><div class="mc-meta-val">'+m.val+'</div></div>'; }).join('');
  var sectionsHtml = p.sections 
    ? p.sections.map(function(s){
        return '<div class="mc-section"><div class="mc-section-title"><span>'+s.badge+'</span>'+s.title+'</div>'+s.content+'</div>';
      }).join('') 
    : '<div class="mc-section"><p class="mc-p">' + p.desc + '</p></div>';

  document.getElementById('modalContent').innerHTML =
    '<div class="mc-header">' +
      '<div class="mc-cat">'+p.cat+'</div>' +
      '<h2 class="mc-title">'+p.title+'</h2>' +
      '<div class="mc-tags">'+tagsHtml+'</div>' +
      '<div class="mc-meta">'+metaHtml+'</div>' +
    '</div>' +
    sectionsHtml +
    '<div class="mc-cta"><p><strong>¿Te interesa este tipo de trabajo?</strong><br>Estoy disponible para roles PM y proyectos de automatización en LATAM.</p>' +
    '<a href="mailto:hola@buildwithsergio.com" class="btn-p" style="white-space:nowrap;">Contactar →</a></div>';

  document.getElementById('modal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal').scrollTop = 0;
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });