document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver((e,o)=>{e.forEach((en,i)=>{if(en.isIntersecting){setTimeout(()=>en.target.classList.add('visible'),i*80);o.unobserve(en.target);}});},{threshold:.1}).observe(el));

var chOpen=false,chHist=[];
var SYS="Sos el asistente personal de Sergio González, Product Manager y consultor de automatización con IA en Bogotá, Colombia.\n\n" +
"Sobre Sergio:\n" +
"- 9+ años en producto digital, diseño web y campañas.\n" +
"- Web Master en Winner Group con iniciativas de producto y eficiencia operativa.\n" +
"- Fundador de Neón Píxel — agencia de diseño y automatización.\n" +
"- Stack: n8n, integración de modelos de IA y Figma.\n" +
"- Formación: PM Coderhouse, UX/UI LCI Veritas, Desarrollo Web Full Stack Universidad de Cataluña.\n" +
"- Busca primer rol formal como PM en LATAM, aportando su capacidad para optimizar procesos con tecnología.\n" +
"- Disponible para freelance ya y para roles PM con proceso normal.\n\n" +
"Proyectos:\n" +
"1. Adaptify — Investigación y estrategia para una plataforma SaaS de adaptación creativa inteligente.\n" +
"2. Winner Group — Ecosistema de referidos automatizado con n8n e integración de modelos de IA.\n" +
"3. Winner Group — Reducción del 75% en tiempo de producción gráfica mediante automatización de procesos.\n\n" +
"Contacto: sigonzalezv8@gmail.com · WhatsApp +57 305 751 3238 · https://www.linkedin.com/in/buildwithsergio\n\n" +
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
    var rep=d.reply||'Hubo un error. Escribile a sigonzalezv8@gmail.com';
    t.remove();
    chHist.push({role:'user',content:text});
    chHist.push({role:'assistant',content:rep});
    var b=document.createElement('div');b.className='msg mbot';b.textContent=rep;msgs.appendChild(b);
    var tl=text.toLowerCase();
    if(tl.includes('trabajo')||tl.includes('contratar')||tl.includes('disponible')||tl.includes('llamada')||tl.includes('agendar')){
      setTimeout(()=>{var c=document.createElement('div');c.className='msg mbot';c.innerHTML='📩 <a href="mailto:sigonzalezv8@gmail.com">sigonzalezv8@gmail.com</a> · <a href="https://wa.me/573057513238" target="_blank">WhatsApp</a>';msgs.appendChild(c);msgs.scrollTop=msgs.scrollHeight;},700);}
  }catch(e){t.remove();var er=document.createElement('div');er.className='msg mbot';er.textContent='Hubo un problema. Escribile a sigonzalezv8@gmail.com';msgs.appendChild(er);}
  msgs.scrollTop=msgs.scrollHeight;
}

// ===== MODAL PORTAFOLIO =====
var PROYECTOS = {
  adaptify: {
    cat: 'Producto conceptual · SaaS · Research',
    title: 'Adaptify — Plataforma SaaS de adaptación creativa inteligente',
    tags: ['Product Discovery','User Research','SaaS','Business Model','Roadmap','OKRs'],
    meta: [
      { label: 'Tipo', val: 'Producto conceptual' },
      { label: 'Research', val: '29 usuarios reales' },
      { label: 'Rol', val: 'PM · Product Design' }
    ],
    sections: [
      {
        badge: '01', title: 'Contexto y problema',
        content: '<p class="mc-p">Los equipos creativos en agencias digitales dedican cerca del <strong>44% de su jornada</strong> a redimensionar y adaptar piezas gráficas para múltiples formatos — Stories, Feed, Banners, Ads — en lugar de hacer trabajo estratégico o creativo.</p><p class="mc-p">El problema no es la falta de talento. Es una <strong>brecha técnica</strong>: las herramientas profesionales como Photoshop e Illustrator producen archivos complejos que las herramientas de automatización existentes no saben interpretar. Canva y similares no entienden capas. Adobe no automatiza. El diseñador queda atrapado en el medio haciendo trabajo manual, repetitivo y no facturable.</p>'
      },
      {
        badge: '02', title: 'Research · 29 diseñadores reales',
        content: '<p class="mc-p">Para validar el problema antes de definir la solución, realicé una encuesta con <strong>29 diseñadores y Creative Leads</strong> de agencias digitales en LATAM y España. Los hallazgos confirmaron que el problema es estructural:</p><div class="mc-metrics"><div class="mc-metric"><div class="mc-metric-val">43.8%</div><div class="mc-metric-lbl">de la jornada dedicada a adaptar piezas — con picos del 70%</div></div><div class="mc-metric"><div class="mc-metric-val">58.6%</div><div class="mc-metric-lbl">reporta retrasos en entregas por esta carga operativa</div></div><div class="mc-metric"><div class="mc-metric-val">3.28/5</div><div class="mc-metric-lbl">de impacto negativo en motivación creativa</div></div></div><p class="mc-p" style="margin-top:16px;"><strong>Conclusión del research:</strong> el problema ocurre en cada campaña, con cada cliente, todos los meses. El principal obstáculo al intentar automatizar: incompatibilidad con archivos .PSD y .AI nativos. Eso es el océano azul de Adaptify.</p>'
      },
      {
        badge: '03', title: 'Solución · Adaptify',
        content: '<p class="mc-p">Una plataforma SaaS que interpreta archivos nativos de Photoshop (.PSD) y genera automáticamente todas las adaptaciones de formato — sin perder fidelidad visual ni consistencia de marca.</p><div class="mc-problems"><div class="mc-problem"><div class="mc-problem-num">01</div><div class="mc-problem-text"><strong>Carga del archivo maestro:</strong> El diseñador sube su .PSD a la plataforma.</div></div><div class="mc-problem"><div class="mc-problem-num">02</div><div class="mc-problem-text"><strong>Lectura de capas con IA:</strong> El sistema identifica automáticamente logo, textos e imágenes, respetando la jerarquía visual del diseño original.</div></div><div class="mc-problem"><div class="mc-problem-num">03</div><div class="mc-problem-text"><strong>Generación de formatos:</strong> Se producen automáticamente Stories, Feed, Banners y Ads desde el mismo archivo maestro.</div></div><div class="mc-problem"><div class="mc-problem-num">04</div><div class="mc-problem-text"><strong>Aprobación manual:</strong> El diseñador revisa y aprueba antes de exportar — nunca automatización ciega. Decisión deliberada basada en el research: los diseñadores no quieren perder control creativo.</div></div><div class="mc-problem"><div class="mc-problem-num">05</div><div class="mc-problem-text"><strong>Exportación final:</strong> Todos los formatos listos para publicar en un solo paso.</div></div></div>'
      },
      {
        badge: '04', title: 'Métricas proyectadas y OKRs',
        content: '<p class="mc-p">Objetivo: <strong>validar que la automatización del flujo PSD reduce el tiempo operativo</strong>. Cada KR responde directamente a un dolor detectado en las encuestas.</p><div class="mc-metrics"><div class="mc-metric"><div class="mc-metric-val">-60%</div><div class="mc-metric-lbl">tiempo operativo en adaptaciones</div></div><div class="mc-metric"><div class="mc-metric-val">KR1</div><div class="mc-metric-lbl">Procesamiento correcto de capas PSD</div></div><div class="mc-metric"><div class="mc-metric-val">KR2</div><div class="mc-metric-lbl">% aprobaciones sin retrabajo</div></div></div>'
      },
      {
        badge: '05', title: 'Modelo de negocio',
        content: '<p class="mc-p"><strong>SaaS por suscripción mensual</strong> — justificado porque el problema es cíclico: ocurre en cada campaña, con cada cliente, todos los meses. El ingreso recurrente sigue la frecuencia del dolor.</p><div class="mc-phases"><div class="mc-phase"><div class="mc-phase-label">Básico</div><div><div class="mc-phase-title">Freelancers</div><div class="mc-phase-desc">Volumen bajo de archivos. Acceso a formatos estándar. Entrada con freemium desde comunidades Adobe y Figma.</div></div></div><div class="mc-phase"><div class="mc-phase-label">Pro</div><div><div class="mc-phase-title">Agencias medianas</div><div class="mc-phase-desc">Mayor volumen de procesamiento. Múltiples usuarios. Formatos personalizados y exportación por lotes.</div></div></div><div class="mc-phase"><div class="mc-phase-label">Agencia</div><div><div class="mc-phase-title">Equipos grandes</div><div class="mc-phase-desc">Sin límites de volumen. API access. Integración con flujos de trabajo existentes de la agencia.</div></div></div></div><p class="mc-p" style="margin-top:16px;">Mercado objetivo: agencias de diseño digital y freelancers en LATAM y España. Piloto planificado con 3 agencias en el mes 3.</p>'
      },
      {
        badge: '06', title: 'Aprendizajes',
        content: '<div class="mc-learnings"><div class="mc-learning">La decisión más importante fue limitar el MVP exclusivamente a archivos .PSD — descartando .AI en esta etapa. El research confirmó que Photoshop es la herramienta dominante en el segmento. Resolver bien un formato es más valioso que resolver mal dos.</div><div class="mc-learning">La aprobación manual antes de exportar no es un parche — es una decisión de producto deliberada. El research mostró que los diseñadores no quieren perder control creativo. La automatización sin supervisión genera desconfianza y retrabajo.</div><div class="mc-learning">La brecha identificada — herramientas profesionales que no automatizan vs. herramientas de automatización que no entienden archivos profesionales — sigue sin resolverse en el mercado. Eso es el diferencial de Adaptify.</div></div>'
      }
    ]
  },
  winner: {
    cat: 'Automatización · Entretenimiento digital',
    title: 'Ecosistema de automatización de referidos · Winner Group × n8n',
    tags: ['n8n','WhatsApp API','integración de modelos de IA','SAP BO','Product Strategy','Roadmap'],
    meta: [
      { label: 'Empresa', val: 'Winner Group' },
      { label: 'Implementación', val: '4 semanas' },
      { label: 'Rol', val: 'PM · Arquitectura' }
    ],
    sections: [
      {
        badge: '01', title: 'Contexto y problema',
        content: '<p class="mc-p">Winner Group opera una red de casinos y plataformas de entretenimiento en Colombia. Su programa <strong>Referidos Mesas</strong> buscaba captar nuevos jugadores a través de aliados existentes, pero el proceso completo era manual: seguimiento en hojas de cálculo, bonos asignados a mano, sin trazabilidad y sin comunicación automática con referenciadores ni referidos.</p><p class="mc-p">El resultado era un ciclo de vida del referido lleno de fricciones: bonos sin activar, aliados sin información de su desempeño, y un equipo de CRM ejecutando tareas repetitivas. El objetivo fue diseñar un <strong>ecosistema autónomo en n8n</strong> que gestionara el ciclo completo — desde el registro del aliado hasta el seguimiento inteligente de retorno — sin intervención manual.</p>'
      },
      {
        badge: '02', title: 'Ecosistema de workflows (WF 0 → WF 4)',
        content: '<p class="mc-p">El sistema se compone de <strong>5 workflows interconectados</strong>, cada uno responsable de una etapa del ciclo de vida del referido:</p><div class="mc-problems"><div class="mc-problem"><div class="mc-problem-num">WF 0</div><div class="mc-problem-text"><strong>Onboarding del referenciador:</strong> El aliado se registra, n8n clasifica al futuro referido en 3 categorías (Nuevo → bono $25K · Potencial → $100K · Histórico → $100K), genera un ID único y envía un kit digital con QR personalizado y link de referido por WhatsApp y correo.</div></div><div class="mc-problem"><div class="mc-problem-num">WF 1</div><div class="mc-problem-text"><strong>Registro centralizado y Habeas Data:</strong> El referido accede al formulario vía link o QR, acepta términos y verifica su categoría de forma independiente. Si coincide con WF 0 → bono confirmado automáticamente. Si hay inconsistencia → escala al gerente y CRM por correo para revisión manual.</div></div><div class="mc-problem"><div class="mc-problem-num">WF 2</div><div class="mc-problem-text"><strong>Detección de primera visita via QR:</strong> Cada mesa tiene un QR dinámico identificado por casino y mesa. El referido lo escanea al llegar, ingresa su ID, y n8n verifica en SAP BO, activa el bono y notifica por WhatsApp al referenciador, al referido y al equipo de mesas. Sin intervención manual.</div></div><div class="mc-problem"><div class="mc-problem-num">WF 3</div><div class="mc-problem-text"><strong>Seguimiento de abandono con IA:</strong> Si el referido no vuelve en X días, n8n detecta la inactividad y genera automáticamente un mensaje personalizado con la <strong>integración de modelos de IA</strong> para intentar reactivarlo por WhatsApp con contexto específico de su categoría y bono.</div></div><div class="mc-problem"><div class="mc-problem-num">WF 4</div><div class="mc-problem-text"><strong>Reporte automático al aliado:</strong> Semanal o mensualmente, n8n consulta SAP BO y envía al referenciador un reporte personalizado con referidos activos, premios acumulados y metas alcanzadas. Sin que nadie lo genere manualmente.</div></div></div>'
      },
      {
        badge: '03', title: 'Arquitectura técnica',
        content: '<p class="mc-p"><strong>n8n Cloud como orquestador central</strong>, integrado con SAP BO (base de datos existente de Winner), WhatsApp Business API e <strong>integración de modelos de IA</strong>. Sin desarrollo a medida — todo configurado desde la interfaz de n8n.</p><div class="mc-arch"><div class="mc-arch-row"><span class="mc-arch-node blue">Registro aliado</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node blue">n8n WF 0</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node green">WhatsApp + Email</span><span class="mc-arch-desc">Kit digital con QR único en &lt;2 min</span></div><div class="mc-arch-row"><span class="mc-arch-node gray">Formulario referido</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node blue">n8n WF 1</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node gray">SAP BO</span><span class="mc-arch-desc">Registro + Habeas Data automatizado</span></div><div class="mc-arch-row"><span class="mc-arch-node green">QR Mesa casino</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node blue">n8n WF 2</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node gray">SAP BO + WhatsApp</span><span class="mc-arch-desc">Bono activado sin intervención manual</span></div><div class="mc-arch-row"><span class="mc-arch-node blue">Inactividad X días</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node blue">n8n WF 3</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node green">Modelos de IA + WhatsApp</span><span class="mc-arch-desc">Reactivación personalizada con IA</span></div><div class="mc-arch-row"><span class="mc-arch-node gray">Scheduler semanal</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node blue">n8n WF 4</span><span class="mc-arch-arrow">→</span><span class="mc-arch-node green">Reporte al aliado</span><span class="mc-arch-desc">Sin generación manual</span></div></div>'
      },
      {
        badge: '04', title: 'Inversión mensual',
        content: '<p class="mc-p">Costo base de <strong>€24/mes</strong> (n8n Cloud Starter) más consumo variable de WhatsApp Business API e <strong>integración de modelos de IA</strong>. La base de datos SAP BO ya está incluida en la infraestructura de Winner.</p><div class="mc-metrics"><div class="mc-metric"><div class="mc-metric-val">€24</div><div class="mc-metric-lbl">n8n Cloud Starter<br>2.500 ejecuciones/mes</div></div><div class="mc-metric"><div class="mc-metric-val">$0.0009</div><div class="mc-metric-lbl">por mensaje WhatsApp<br>~$3.33 COP por envío</div></div><div class="mc-metric"><div class="mc-metric-val">$0</div><div class="mc-metric-lbl">SAP BO ya incluido<br>en infraestructura Winner</div></div></div><p class="mc-p" style="margin-top:16px;">Si el volumen supera 2.500 referidos/mes → plan Pro a €60/mes (10.000 ejecuciones). El monitoreo de ejecuciones determina cuándo hacer el upgrade.</p>'
      },
      {
        badge: '05', title: 'Cronograma de implementación',
        content: '<div class="mc-phases"><div class="mc-phase"><div class="mc-phase-label">Sem 1</div><div><div class="mc-phase-title">Configuración del entorno</div><div class="mc-phase-desc">Instalación de n8n Cloud. Validación de integración con SAP BO con el equipo de TI de Winner. Ambiente de desarrollo y testing listo.</div></div></div><div class="mc-phase"><div class="mc-phase-label">Sem 2</div><div><div class="mc-phase-title">Despliegue WF 0 y WF 1</div><div class="mc-phase-desc">Onboarding de referenciadores activo. Registro legal con Habeas Data activo. Primeras pruebas con datos reales de Winner Group.</div></div></div><div class="mc-phase"><div class="mc-phase-label">Sem 3</div><div><div class="mc-phase-title">Integración de IA · WF 2 y WF 3</div><div class="mc-phase-desc">Detección de primera visita via QR activa. Seguimiento de abandono con IA activo. Validación de mensajes y flujos completos.</div></div></div><div class="mc-phase"><div class="mc-phase-label">Sem 4</div><div><div class="mc-phase-title">Despliegue final y capacitación</div><div class="mc-phase-desc">WF 4 — reportes automáticos a aliados activos. Pruebas finales del ecosistema completo. Capacitación del equipo de monitoreo de Winner.</div></div></div></div>'
      },
      {
        badge: '06', title: 'Aprendizajes clave',
        content: '<div class="mc-learnings"><div class="mc-learning">La doble verificación de categoría (referenciador en WF 0 + referido en WF 1) es el corazón del sistema. Elimina el fraude de bonos sin agregar fricción — la discrepancia escala automáticamente al gerente sin bloquear el proceso.</div><div class="mc-learning">Los QR dinámicos por mesa son la pieza que reemplaza el registro manual en SAP BO. Cada escaneo genera trazabilidad completa: qué referido, en qué mesa, en qué casino, a qué hora.</div><div class="mc-learning">La <strong>integración de modelos de IA</strong> se aplica solo en WF 3 (reactivación), donde el mensaje personalizado justifica el costo operativo. Para los demás workflows, n8n puro es suficiente y más económico.</div><div class="mc-learning">Primer workflow en producción en 5 días hábiles desde el arranque. Ecosistema completo en 4 semanas. ROI desde el primer mes por ahorro operativo del equipo de CRM.</div></div>'
      }
    ]
  },
  indesign: {
    cat: 'Operaciones · Producto · Implementación real',
    title: 'Automatización de producción gráfica para 72 casinos · Winner Group',
    tags: ['Process Improvement','InDesign','Data Merge','Iniciativa propia','Winner Group'],
    meta: [
      { label: 'Empresa', val: 'Winner Group' },
      { label: 'Implementado', val: 'Hace 4 años' },
      { label: 'Rol', val: 'Iniciativa propia' }
    ],
    sections: [
      {
        badge: '01', title: 'Contexto y problema',
        content: '<p class="mc-p">Winner Group produce mensualmente más de <strong>1.500 piezas gráficas</strong> para sus 72 casinos en Colombia — actividades, torneos, promociones y eventos en formatos vertical y horizontal para cada sede.</p><p class="mc-p">Cuando llegué al equipo, el proceso era completamente manual: dos diseñadores tardaban <strong>3 semanas completas</strong> copiando y pegando información pieza por pieza desde un Excel de actividades. Era lo que siempre se había hecho y nadie lo había cuestionado como un problema de producto.</p>'
      },
      {
        badge: '02', title: 'Fricciones identificadas',
        content: '<div class="mc-problems"><div class="mc-problem"><div class="mc-problem-num">P1</div><div class="mc-problem-text"><strong>Tiempo bloqueado:</strong> 3 semanas de dos personas dedicadas a producción repetitiva cada mes — sin capacidad para trabajo creativo.</div></div><div class="mc-problem"><div class="mc-problem-num">P2</div><div class="mc-problem-text"><strong>Error humano frecuente:</strong> Al copiar información manualmente pieza por pieza, los errores tipográficos y de datos eran inevitables.</div></div><div class="mc-problem"><div class="mc-problem-num">P3</div><div class="mc-problem-text"><strong>Dependencia de personas:</strong> El conocimiento del proceso vivía en la cabeza de los diseñadores, no en el sistema. Sin documentación ni escalabilidad.</div></div><div class="mc-problem"><div class="mc-problem-num">P4</div><div class="mc-problem-text"><strong>Sin escalabilidad:</strong> Si Winner abría más casinos, el tiempo de producción crecía proporcionalmente. El sistema no podía crecer.</div></div></div>'
      },
      {
        badge: '03', title: 'Solución implementada',
        content: '<p class="mc-p">Diseñé un sistema de <strong>plantillas maestras en InDesign</strong> conectadas directamente al Excel de actividades mensuales usando la función de combinación de datos. En lugar de crear cada pieza manualmente, el diseñador configura la plantilla una vez y el sistema genera automáticamente todas las variaciones.</p><div class="mc-phases"><div class="mc-phase"><div class="mc-phase-label">Paso 1</div><div><div class="mc-phase-title">Plantillas maestras</div><div class="mc-phase-desc">Una plantilla por formato (vertical / horizontal) con campos variables vinculados al Excel de actividades.</div></div></div><div class="mc-phase"><div class="mc-phase-label">Paso 2</div><div><div class="mc-phase-title">Combinación de datos</div><div class="mc-phase-desc">InDesign lee el Excel fila por fila y genera automáticamente una versión por cada actividad y casino.</div></div></div><div class="mc-phase"><div class="mc-phase-label">Paso 3</div><div><div class="mc-phase-title">Exportación masiva</div><div class="mc-phase-desc">Todas las piezas se exportan en lote en el formato correcto sin intervención manual por pieza.</div></div></div></div><p class="mc-p" style="margin-top:16px;"><strong>Por qué InDesign:</strong> el equipo ya tenía licencia Adobe y las piezas requerían control tipográfico preciso. Operar el sistema no requiere saber programar — cualquier diseñador lo usa. <strong>Por qué Excel:</strong> el área de marketing ya lo producía mensualmente. Reutilizarlo eliminó la necesidad de migrar herramientas.</p>'
      },
      {
        badge: '04', title: 'Impacto medido',
        content: '<div class="mc-metrics"><div class="mc-metric"><div class="mc-metric-val">-75%</div><div class="mc-metric-lbl">Reducción de tiempo total de producción</div></div><div class="mc-metric"><div class="mc-metric-val">3 sem → 5 días</div><div class="mc-metric-lbl">Con 2 personas → con 1 persona</div></div><div class="mc-metric"><div class="mc-metric-val">100%</div><div class="mc-metric-lbl">Adopción por todo el equipo de diseño</div></div></div><p class="mc-p" style="margin-top:16px;">La solución fue adoptada orgánicamente por todo el equipo — incluyendo personas que no sabían usar InDesign avanzado. El proceso dejó de depender de individuos y se documentó en el sistema.</p>'
      },
      {
        badge: '05', title: 'Fase 2 propuesta',
        content: '<p class="mc-p">Dos cuellos de botella siguen siendo manuales y representan la oportunidad de la siguiente fase:</p><div class="mc-problems"><div class="mc-problem"><div class="mc-problem-num">→</div><div class="mc-problem-text"><strong>Generación del Excel:</strong> el área de marketing lo construye manualmente cada mes recopilando actividades de 72 casinos. Un flujo en n8n podría generarlo automáticamente desde una fuente centralizada.</div></div><div class="mc-problem"><div class="mc-problem-num">→</div><div class="mc-problem-text"><strong>Ajustes de diagramación:</strong> cuando los textos son muy largos o cortos, un diseñador los normaliza manualmente. Un script de IA podría procesar y normalizar los textos en el Excel antes de que entren a InDesign.</div></div></div><p class="mc-p" style="margin-top:12px;">Impacto proyectado de Fase 2: reducir el proceso total a <strong>1–2 días</strong> con mínima intervención humana.</p>'
      },
      {
        badge: '06', title: 'Aprendizajes',
        content: '<div class="mc-learnings"><div class="mc-learning">No era mi responsabilidad resolverlo. Nadie me lo pidió. Lo hice porque vi un problema operativo con solución clara — y eso liberó a dos diseñadores para hacer trabajo que realmente importa. Eso es mentalidad de producto.</div><div class="mc-learning">La mejor solución no siempre es la más sofisticada. Usar InDesign + Excel — herramientas que el equipo ya tenía — fue más efectivo que proponer una solución nueva que requiriera presupuesto y aprobación.</div><div class="mc-learning">La adopción orgánica fue la validación más importante. No hubo capacitación forzada — el equipo lo adoptó porque hacía su trabajo más fácil. Un producto que no necesita evangelización es un producto bien diseñado.</div></div>'
      }
    ]
  }
};

function openModal(id) {
  var p = PROYECTOS[id];
  if (!p) return;

  var tagsHtml = p.tags.map(function(t){ return '<span class="mc-tag">'+t+'</span>'; }).join('');
  var metaHtml = p.meta.map(function(m){ return '<div class="mc-meta-item"><div class="mc-meta-label">'+m.label+'</div><div class="mc-meta-val">'+m.val+'</div></div>'; }).join('');
  var sectionsHtml = p.sections.map(function(s){
    return '<div class="mc-section"><div class="mc-section-title"><span>'+s.badge+'</span>'+s.title+'</div>'+s.content+'</div>';
  }).join('');

  document.getElementById('modalContent').innerHTML =
    '<div class="mc-header">' +
      '<div class="mc-cat">'+p.cat+'</div>' +
      '<h2 class="mc-title">'+p.title+'</h2>' +
      '<div class="mc-tags">'+tagsHtml+'</div>' +
      '<div class="mc-meta">'+metaHtml+'</div>' +
    '</div>' +
    sectionsHtml +
    '<div class="mc-cta"><p><strong>¿Te interesa este tipo de trabajo?</strong><br>Estoy disponible para roles PM y proyectos de automatización en LATAM.</p>' +
    '<a href="mailto:sigonzalezv8@gmail.com" class="btn-p" style="white-space:nowrap;">Contactar →</a></div>';

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