/* ── NAV ── */
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open');}

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.09});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));
document.querySelectorAll('.reveal').forEach(el=>{ const r=el.getBoundingClientRect(); if(r.top<window.innerHeight) el.classList.add('visible'); });

/* ── ACTIVE NAV ── */
window.addEventListener('scroll',()=>{
  let cur='';
  document.querySelectorAll('section[id],div.hero-outer').forEach(s=>{
    if(window.scrollY >= s.offsetTop - 80) cur = s.id || 'hero';
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.style.color = (a.getAttribute('href')==='#'+cur) ? 'var(--navy)' : '';
  });
});

/* ── CALCULATORS ── */
function switchCalc(id,btn){
  document.querySelectorAll('.calc-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.calc-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById('calc-'+id).classList.add('active');
  btn.classList.add('active');
}
function calcROI(){
  const i=parseFloat(document.getElementById('ri').value),r=parseFloat(document.getElementById('rr').value);
  if(!i||!r) return;
  const v=((r-i)/i*100).toFixed(1);
  document.getElementById('roi-val').textContent=v+'%';
  document.getElementById('roi-box').classList.add('show');
}
function calcBEP(){
  const f=parseFloat(document.getElementById('bf').value),
        p=parseFloat(document.getElementById('bp').value),
        v=parseFloat(document.getElementById('bv').value);
  if(!f||!p||!v||p<=v){alert('Selling price must exceed variable cost.');return;}
  document.getElementById('bep-val').textContent=Math.ceil(f/(p-v)).toLocaleString('en-IN')+' units';
  document.getElementById('bep-box').classList.add('show');
}
function calcRun(){
  const c=parseFloat(document.getElementById('rc').value),
        b=parseFloat(document.getElementById('rb').value),
        r=parseFloat(document.getElementById('rrv').value)||0;
  if(!c||!b) return;
  const net=b-r;
  document.getElementById('run-val').textContent = net<=0 ? 'Cash-flow positive!' : (c/net).toFixed(1)+' months';
  document.getElementById('run-box').classList.add('show');
}

/* ── EMAIL MODAL ── */
const EMAIL='ca.akkothari@gmail.com',SUBJ='Consultation Enquiry',BODY='Hi Akshay,\n\nI would like to book a consultation.\n\nName:\nCompany:\nHow I need help:\n\nThanks';
function openEmailModal(){
  const e=encodeURIComponent(SUBJ),b=encodeURIComponent(BODY);
  document.getElementById('gmailLink').href='https://mail.google.com/mail/?view=cm&to='+EMAIL+'&su='+e+'&body='+b;
  document.getElementById('outlookLink').href='mailto:'+EMAIL+'?subject='+e+'&body='+b;
  document.getElementById('copyLbl').textContent=EMAIL;
  document.getElementById('emailModal').classList.add('open');
}
function closeEmailModal(){document.getElementById('emailModal').classList.remove('open');}
document.getElementById('emailBtn').addEventListener('click',e=>{e.preventDefault();openEmailModal();});
document.getElementById('emailModal').addEventListener('click',e=>{if(e.target===document.getElementById('emailModal'))closeEmailModal();});
document.getElementById('copyEmailBtn').addEventListener('click',e=>{
  e.preventDefault();
  navigator.clipboard.writeText(EMAIL).then(()=>{
    document.getElementById('copyLbl').textContent='Copied!';
    setTimeout(()=>document.getElementById('copyLbl').textContent=EMAIL,2000);
  });
});

/* ── CONTACT FORM ── */
function sendForm(){
  const n=document.getElementById('fn').value.trim(),em=document.getElementById('fe').value.trim(),s=document.getElementById('fs').value;
  if(!n||!em){alert('Please provide your name and email.');return;}
  const msg='Hi Akshay, I am '+n+' and I need help with: '+(s||'finance consulting')+'. My email is '+em+'.';
  document.getElementById('formOk').classList.add('show');
  setTimeout(()=>window.open('https://wa.me/919836665840?text='+encodeURIComponent(msg),'_blank'),1200);
}

/* ── DOWNLOAD CARD IMAGE ── */
function downloadCard(){
  const card = document.getElementById('bizCard');
  const btn = event.currentTarget;
  btn.textContent = 'Generating...';
  btn.disabled = true;
  // Temporarily hide action buttons for cleaner card image
  const actions = card.querySelector('.card-actions');
  if(actions) actions.style.display='none';
  html2canvas(card, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false
  }).then(canvas => {
    if(actions) actions.style.display='';
    btn.innerHTML = '&#8659; Download Card as Image';
    btn.disabled = false;
    const a = document.createElement('a');
    a.download = 'Akshay_K_Kothari_Card.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }).catch(()=>{
    if(actions) actions.style.display='';
    btn.innerHTML = '&#8659; Download Card as Image';
    btn.disabled = false;
    alert('Download failed. Try right-clicking the card and saving as image.');
  });
}

/* ── SAVE VCARD ── */
function saveVCard(){
  const v=[
    'BEGIN:VCARD','VERSION:3.0',
    'FN:Akshay K Kothari','N:Kothari;Akshay;K;;',
    'TITLE:CA & FP&A Consultant','ORG:AKK Finance Consulting',
    'TEL;TYPE=CELL:+919836665840',
    'EMAIL;TYPE=INTERNET:ca.akkothari@gmail.com',
    'URL:https://www.linkedin.com/in/akkothari',
    'NOTE:Chartered Accountant & FP&A Professional',
    'END:VCARD'
  ].join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([v],{type:'text/vcard'}));
  a.download='Akshay_K_Kothari.vcf';
  a.click();
}

function openArticle(i) {
  const art = document.getElementById('art-' + i);
  if (!art) return;
  const tag   = art.dataset.tag;
  const title = art.dataset.title;
  const time  = art.dataset.time;
  const body  = art.innerHTML;
  document.getElementById('articleContent').innerHTML = `
    <div class="tag-wrap"><span class="article-tag-badge">${tag}</span></div>
    <h2 class="article-modal-title">${title}</h2>
    <div class="article-modal-meta">${time} &middot; Akshay K Kothari</div>
    ${body}
    <div class="article-modal-footer">
      <a href="https://wa.me/919836665840?text=Hi%20Akshay%2C%20I%20read%20your%20article%20on%20${encodeURIComponent(title)}%20and%20would%20like%20to%20discuss%20further." target="_blank" class="btn-solid btn-solid--sm">Discuss with Akshay</a>
      <button onclick="closeArticle()" class="btn-outline btn-outline--sm">&#8592; Back</button>
    </div>
  `;
  const modal = document.getElementById('articleModal');
  modal.style.display = 'flex';
  modal.scrollTop = 0;
}
function closeArticle() {
  document.getElementById('articleModal').style.display = 'none';
}

function openArticle(i){
  const a = ARTICLES[i];
  document.getElementById('articleContent').innerHTML = `
    <div class="tag-wrap">
      <span class="article-tag-badge">${a.tag}</span>
    </div>
    <h2 class="article-modal-title">${a.title}</h2>
    <div class="article-modal-meta">${a.time} &middot; Akshay K Kothari</div>
    ${a.content}
    <div class="article-modal-footer">
      <a href="https://wa.me/919836665840?text=Hi%20Akshay%2C%20I%20read%20your%20article%20on%20${encodeURIComponent(a.title)}%20and%20would%20like%20to%20discuss%20further." target="_blank" class="btn-solid btn-solid--sm">Discuss with Akshay</a>
      <button onclick="closeArticle()" class="btn-outline btn-outline--sm">&#8592; Back</button>
    </div>
  `;
  document.getElementById('articleModal').style.display='flex';
  document.getElementById('articleModal').scrollTop=0;
}
function closeArticle(){
  document.getElementById('articleModal').style.display='none';
}