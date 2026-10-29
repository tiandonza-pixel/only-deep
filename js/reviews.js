(()=>{
const T=(window.TESTIMONIALS||[]).filter(t=>t&&(t.image||t.text)),
n=Number((window.STORE_CONFIG||{}).ordersCompleted)||0,
sec=document.getElementById('proof'),lb=document.getElementById('lightbox');
if(!sec||(!T.length&&!n))return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
sec.innerHTML=`<div class="proof-head"><div><p class="eyebrow">CUSTOMER FEEDBACK</p><h2>What customers say</h2></div>${n>0?`<div class="proof-stat"><b>${n.toLocaleString('en-US')}+</b><span>orders completed</span></div>`:''}</div>`
+(T.length?`<div class="proof-grid">${T.map((t,i)=>`<figure class="proof-card">${t.image?`<button type="button" class="proof-img" data-i="${i}" aria-label="View full message"><img src="${esc(t.image)}" alt="Customer message" loading="lazy"></button>`:''}${t.text?`<blockquote>“${esc(t.text)}”</blockquote>`:''}${(t.author||t.date)?`<figcaption>${esc(t.author)}${t.author&&t.date?' · ':''}${esc(t.date)}</figcaption>`:''}</figure>`).join('')}</div>`:'');
sec.classList.remove('hidden');
if(!lb)return;
const img=lb.querySelector('img'),close=()=>{lb.classList.add('hidden');img.removeAttribute('src');document.body.style.overflow=''};
sec.addEventListener('click',e=>{const b=e.target.closest('.proof-img');if(!b)return;img.src=T[b.dataset.i].image;lb.classList.remove('hidden');document.body.style.overflow='hidden'});
lb.addEventListener('click',close);
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
