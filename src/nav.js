// ─── NAVIGATION ─────────────────────────────────────────────────────────────
function switchView(id, el){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById(`view-${id}`).classList.add('active');
  document.querySelectorAll('.sidebar-nav li').forEach(li=>li.classList.remove('active'));
  if(el) el.classList.add('active');
  if(id==='dashboard') renderDashboard();
  if(id==='calculator'){ loadCalcUI(); recalc(); }
  if(id==='month') renderMonth();
  if(id==='settings') loadSettingsUI();
}

function openMonth(m,y){
  S.currentMonth=m; S.currentYear=y;
  switchView('month',null);
  document.querySelectorAll('.sidebar-nav li').forEach(li=>li.classList.remove('active'));
  const t=document.querySelector(`[data-month="${m}"]`);
  if(t)t.classList.add('active');
}

function navigateMonth(dir){
  S.currentMonth+=dir;
  if(S.currentMonth<0){S.currentMonth=11;S.currentYear--;}
  if(S.currentMonth>11){S.currentMonth=0;S.currentYear++;}
  renderMonth();
  document.querySelectorAll('.sidebar-nav li[data-month]').forEach(li=>li.classList.remove('active'));
  const t=document.querySelector(`[data-month="${S.currentMonth}"]`);
  if(t)t.classList.add('active');
}

function changeYear(dir){
  S.currentYear+=dir;
  document.getElementById('chart-year-label').textContent=S.currentYear;
  renderDashboard();
}

function buildMonthNav(){
  const nav=document.getElementById('month-nav'); nav.innerHTML='';
  MONTHS.forEach((name,i)=>{
    const li=document.createElement('li'); li.dataset.month=i;
    const d=S.months[mkey(S.currentYear,i)];
    if(d&&d.expenses.length>0)li.classList.add('has-data');
    li.innerHTML=`<div class="dot"></div>${name}`;
    li.onclick=()=>openMonth(i,S.currentYear);
    nav.appendChild(li);
  });
}
