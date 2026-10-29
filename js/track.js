(()=>{
const id=String((window.STORE_CONFIG||{}).umamiWebsiteId||'').trim();
if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))return;
const q=[];
function send(n,d){
  if(!(window.umami&&window.umami.track)){if(q.length<50)q.push([n,d]);return}
  try{d?window.umami.track(n,d):window.umami.track(n)}catch(e){}
}
const s=document.createElement('script');
s.defer=true;s.src='https://cloud.umami.is/script.js';s.setAttribute('data-website-id',id);
s.onload=()=>q.splice(0).forEach(a=>send(a[0],a[1]));
document.head.appendChild(s);
const $=i=>document.getElementById(i),
txt=(el,sel)=>{const n=el&&el.querySelector(sel);return n?n.textContent.trim():''};
document.addEventListener('click',e=>{
  const t=e.target;if(!t||!t.closest)return;
  const act=t.closest('[data-action]');
  if(act){send(act.dataset.action==='buy'?'buy_click':'preview_open',{product:txt(act.closest('.product-card'),'h2')});return}
  if(t.closest('#previewBuy')){send('buy_click',{product:($('previewTitle')||{}).textContent});return}
  const pay=t.closest('.payment-option');
  if(pay){send('order_telegram',{product:txt($('orderSummary'),'span'),method:pay.dataset.method});return}
  const tg=t.closest('#telegramLink,#bottomTelegram,#footerTelegram');
  if(tg){send('telegram_click',{place:tg.id});return}
  const f=t.closest('.filter');
  if(f)send('filter_click',{filter:f.dataset.filter});
},true);
})();
