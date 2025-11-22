// مجموعه‌ها
let prevSetA = { type:'math', value:'{ x ∈ N | (x>3,x<7) }' };
let prevSetB = { type:'math', value:'{ x ∈ N | (x>1,x<5) }' };

function handleSelectAChange(){
  const sel = document.getElementById('selectA').value;
  if(sel==='prev'){ document.getElementById('ABox').innerText = prevSetA.value; }
  else if(sel==='new'){ document.getElementById('newAOptions').classList.remove('hidden'); }
}

function handleNewADisplayChange(){
  const sel = document.getElementById('newADisplay').value;
  document.getElementById('membersInputDiv').classList.add('hidden');
  document.getElementById('mathInputDiv').classList.add('hidden');
  document.getElementById('knownSetDiv').classList.add('hidden');
  if(sel==='members') document.getElementById('membersInputDiv').classList.remove('hidden');
  if(sel==='math') document.getElementById('mathInputDiv').classList.remove('hidden');
  if(sel==='knownSet') document.getElementById('knownSetDiv').classList.remove('hidden');
}

function handleMembersInput(which){
  const input = (which==='A'?document.getElementById('membersInput').value:document.getElementById('membersInputB').value).trim().split(/\s+/).join(',');
  if(which==='A') document.getElementById('ABox').innerText = `{ ${input} }`;
  else document.getElementById('BBox').innerText = `{ ${input} }`;
}

function displayMath(which){
  const cond = document.getElementById(which==='A'?'mathInput':'mathInputB').value.trim();
  const set = document.getElementById(which==='A'?'knownSetSelectMath':'knownSetSelectMathB').value;
  if(!cond || !set){ alert('لطفاً شرط و مجموعه را انتخاب کنید'); return; }
  const mathCond = cond.replace(/از/gi,'')
                       .replace(/بزرگتر مساویه/gi,'≥')
                       .replace(/کوچکتر مساویه/gi,'≤')
                       .replace(/بزرگتر/gi,'>')
                       .replace(/کوچکتر/gi,'<')
                       .replace(/مساوی/gi,'=')
                       .replace(/و/gi,' ∧ ')
                       .replace(/یا/gi,' ∨ ');
  const parts = mathCond.split(/ ∧ | ∨ /).map(p=>"x"+p.trim()).join(', ');
  if(which==='A') document.getElementById('mathResult').innerText = `{ x ∈ ${set} | (${parts}) }`;
  else document.getElementById('mathResultB').innerText = `{ x ∈ ${set} | (${parts}) }`;
}

function saveSet(which){
  if(which==='A') prevSetA.value = document.getElementById('ABox').innerText;
  else prevSetB.value = document.getElementById('BBox').innerText;
  alert(`مجموعه ${which} ثبت شد`);
}

function handleNewADisplayChangeB(){
  const sel = document.getElementById('displayB').value;
  document.getElementById('BInputDiv').innerHTML='';
  if(sel==='members'){
    document.getElementById('BInputDiv').innerHTML = `
      <label>اعضا:</label>
      <div style="position:relative;">
        <span style="position:absolute;left:0;top:50%;transform:translateY(-50%);">{"}</span>
        <input type="text" id="membersInputB" placeholder="عددها را وارد کنید" style="padding-left:12px;" oninput="handleMembersInput('B')">
        <span style="position:absolute;right:0;top:50%;transform:translateY(-50%);">{"}</span>
      </div>
      <small style="color:gray;">هر فاصله یک کاما محسوب می‌شود</small>
      <div class="result-box" id="BBox"></div>
      <button onclick="saveSet('B')">ثبت مجموعه B</button>
    `;
  } else if(sel==='math'){
    document.getElementById('BInputDiv').innerHTML=`
      <label>شرط کلامی:</label>
      <input type="text" id="mathInputB" placeholder="مثال: بزرگتر مساویه 1 و کوچکتر از 5">
      <label>عضو کدام مجموعه شناخته شده است؟</label>
      <select id="knownSetSelectMathB">
        <option value="">انتخاب...</option>
        <option value="N">N — اعداد طبیعی</option>
        <option value="W">W — اعداد حسابی</option>
        <option value="Z">Z — اعداد صحیح</option>
        <option value="Q">Q — اعداد گویا</option>
        <option value="I">I — اعداد گنگ</option>
        <option value="R">R — اعداد حقیقی</option>
      </select>
      <button onclick="displayMath('B')">نمایش نماد ریاضی</button>
      <div class="result-box" id="mathResultB"></div>
      <button onclick="saveSet('B')">ثبت مجموعه B</button>
    `;
  } else if(sel==='knownSet'){
    document.getElementById('BInputDiv').innerHTML=`
      <label>انتخاب مجموعه شناخته شده:</label>
      <select id="knownSetSelectNewB">
        <option value="">انتخاب...</option>
        <option value="N">N — اعداد طبیعی</option>
        <option value="W">W — اعداد حسابی</option>
        <option value="Z">Z — اعداد صحیح</option>
        <option value="Q">Q — اعداد گویا</option>
        <option value="I">I — اعداد گنگ</option>
        <option value="R">R — اعداد حقیقی</option>
      </select>
      <button onclick="saveSet('B')">ثبت مجموعه B</button>
    `;
  }
}

function doOperation(){
  const op = document.getElementById('operationSelect').value;
  const a = prevSetA.value;
  const b = prevSetB.value;
  let res='';
  try{
    const parseSet = str=>{
      if(str.includes('{ ... }')) return null;
      let s = str.replace(/[{}]/g,'').trim();
      if(!s) return [];
      return s.split(',').map(Number);
    }
    const setA = parseSet(a);
    const setB = parseSet(b);
    if(setA===null || setB===null) res='{ ... }';
    else{
      if(op==='union') res=`{ ${Array.from(new Set([...setA,...setB])).join(', ')} }`;
      else if(op==='intersection') res=`{ ${setA.filter(x=>setB.includes(x)).join(', ')} }`;
      else if(op==='difference') res=`{ ${setA.filter(x=>!setB.includes(x)).join(', ')} }`;
      else if(op==='subset') res = setA.every(x=>setB.includes(x))?'بلی':'خیر';
    }
  }catch(e){ res='نامعلوم'; }
  document.getElementById('operationResult').innerText=res;
}

function goSurvey(){ window.location.href='page5.html'; }
