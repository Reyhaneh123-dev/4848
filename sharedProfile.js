// بارگذاری تصویر و نام کاربر
document.addEventListener('DOMContentLoaded', ()=>{
  const profileImg = document.getElementById('profileImg');
  if(profileImg){
    const img = localStorage.getItem('profileImage');
    if(img) profileImg.src = img;
    const name = localStorage.getItem('userName') || '';
    const lastName = localStorage.getItem('userLastName') || '';
    profileImg.title = name + ' ' + lastName;
  }

  // نمایش پاپ آپ
  const container = document.getElementById('profileContainer');
  const popup = document.getElementById('profilePopup');
  if(container && popup){
    container.onclick = ()=> popup.style.display = popup.style.display==='block'?'none':'block';
  }

  // ویرایش پروفایل
  const editBtn = document.getElementById('editProfileBtn');
  if(editBtn){
    editBtn.onclick = ()=> window.location.href='page2.html';
  }

  // مشاهده امتیازها
  const scoreBtn = document.getElementById('viewScoresBtn');
  if(scoreBtn){
    scoreBtn.onclick = ()=>{
      const scores = JSON.parse(localStorage.getItem('scores')||'[]');
      const total = scores.reduce((a,b)=>a+b,0);
      alert('مجموع امتیازها: ' + total);
    };
  }

  // مشاهده ذخیره شده‌ها
  const savedBtn = document.getElementById('viewSavedBtn');
  if(savedBtn){
    savedBtn.onclick = ()=>{
      const saved = JSON.parse(localStorage.getItem('savedQuestions')||'[]');
      if(saved.length===0){ alert('هیچ سوالی ذخیره نشده'); return; }
      let str='';
      saved.forEach((q,i)=> str += `${i+1}. ${q.text} [🗑]\n`);
      alert(str);
    };
  }
});
