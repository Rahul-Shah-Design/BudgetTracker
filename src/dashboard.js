// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function renderStats(){
  const cm=new Date().getMonth(); let tn=0,tw=0,ts=0;
  for(let m=0;m<=cm;m++){const c=calcMonthTotals(S.currentYear,m);tn+=c.needs;tw+=c.wants;ts+=c.savings;}
  const mi=cm+1, nb=S.settings.needsBudget*mi, wb=S.settings.wantsBudget*mi, sb=S.settings.savingsBudget*mi;
  const pct=(v,b)=>Math.min(100,Math.round(v/b*100))||0;
  const diff=(v,b)=>{const d=v-b; return d>0?`<span class="over">+$${d.toFixed(0)} over</span>`:`<span class="under">$${Math.abs(d).toFixed(0)} under</span>`;};
  const f=v=>v.toLocaleString('en-US',{maximumFractionDigits:0});
  document.getElementById('stat-row').innerHTML=`
    <div class="stat-card"><div class="stat-label"><div class="badge" style="background:var(--needs)"></div>YTD Needs</div><div class="stat-value" style="color:var(--needs)">$${f(tn)}</div><div class="stat-sub">${diff(tn,nb)} vs budget</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${pct(tn,nb)}%;background:var(--needs)"></div></div></div>
    <div class="stat-card"><div class="stat-label"><div class="badge" style="background:var(--wants)"></div>YTD Wants</div><div class="stat-value" style="color:var(--wants)">$${f(tw)}</div><div class="stat-sub">${diff(tw,wb)} vs budget</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${pct(tw,wb)}%;background:var(--wants)"></div></div></div>
    <div class="stat-card"><div class="stat-label"><div class="badge" style="background:var(--savings)"></div>YTD Savings</div><div class="stat-value" style="color:var(--savings)">$${f(ts)}</div><div class="stat-sub">${diff(ts,sb)} vs target</div><div class="stat-bar"><div class="stat-bar-fill" style="width:${pct(ts,sb)}%;background:var(--savings)"></div></div></div>`;
}

function renderDashboard(){ renderStats(); renderChart(); }
