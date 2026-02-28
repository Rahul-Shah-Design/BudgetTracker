// ─── APP STATE ──────────────────────────────────────────────────────────────
let S = {
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  modalType: 'expense',
  settings: { needsBudget:2015, wantsBudget:605, savingsBudget:1411, paycheckAmount:1818, paycheckCount:2, startingSavings:13000 },
  months: {},
  calc: {
    salary:77536, payfreq:24,
    k401pct:11, hsa:110, health:26.07, dental:5.52, vision:0.59, gtl:3.06,
    fedOverride:false, fedManual:715,
    stateDollar:0, localDollar:0,
    roth:0, otherPost:0,
    spNeeds:50, spWants:15, spSave:35,
    _monthlyNet:0
  }
};

function mkey(y,m){ return `${y}-${m}`; }

function getMonth(y,m){
  const k=mkey(y,m);
  if(!S.months[k]){
    const pcs=[];
    for(let i=0;i<S.settings.paycheckCount;i++) pcs.push({id:Date.now()+i,date:'',amount:S.settings.paycheckAmount,desc:'Paycheck'});
    S.months[k]={expenses:[],incomes:pcs};
  }
  return S.months[k];
}

function calcMonthTotals(y,m){
  const d=getMonth(y,m); let n=0,w=0,s=0;
  for(const tx of d.expenses){ const a=+tx.amount||0; if(tx.cat==='Needs')n+=a; else if(tx.cat==='Wants')w+=a; else if(tx.cat==='Savings')s+=a; }
  return{needs:n,wants:w,savings:s};
}

function persist(){ try{ localStorage.setItem('bgt3',JSON.stringify(S)); }catch(e){} }

function hydrate(){
  try{
    const r=localStorage.getItem('bgt3');
    if(r){ const d=JSON.parse(r); S={...S,...d}; }
  }catch(e){}
}
