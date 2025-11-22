let quizzes = [
  { text:'مجموعه {1,2,3} ∪ {2,3,4} چیست؟', answer:'{1,2,3,4}', userAnswer:'' },
  { text:'آیا {1,2} زیرمجموعه {1,2,3} است؟', answer:'بلی', userAnswer:'' }
];
let currentIndex = 0;

function showQuestion(){
  const box = document.getElementById('quizBox');
  if(!box) return;
  const q = quizzes[currentIndex];
  box.innerHTML = `<p>${q.text}</p><input type="text" id="userAnswer" placeholder="پاسخ خود را وارد کنید"><button onclick="checkAnswer()">ثبت پاسخ</button>`;
}

function checkAnswer(){
  const ua = document.getElementById('userAnswer').value.trim();
  quizzes[currentIndex].userAnswer = ua;
  alert('پاسخ ثبت شد. پاسخ صحیح: '+ quizzes[currentIndex].answer);
}

function nextQuestion(){
  if(currentIndex < quizzes.length-1){ currentIndex++; showQuestion(); }
  else alert('سوالات تمام شد');
}

function saveCurrentQuestion(){
  const saved = JSON.parse(localStorage.getItem('savedQuestions')||'[]');
  saved.push(quizzes[currentIndex]);
  localStorage.setItem('savedQuestions', JSON.stringify(saved));
  alert('سوال ذخیره شد');
}

document.addEventListener('DOMContentLoaded', showQuestion);
