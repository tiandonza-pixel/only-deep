(()=>{
const c=window.STORE_CONFIG||{},name=String(c.brandName||'').trim();
if(c.showOffer===false){const o=document.querySelector('.offer-bar');if(o)o.classList.add('hidden')}
if(!name)return;
const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const w=name.split(/\s+/),last=w.pop(),html=(w.length?esc(w.join(' '))+' ':'')+'<span>'+esc(last)+'</span>';
document.title=name;
document.querySelectorAll('.brand,.footer-brand').forEach(e=>e.innerHTML=html);
})();
