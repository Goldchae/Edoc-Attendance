//출석단어
const todayWord = "행복은종강으로부터";

var form = document.getElementById('form');
var input = document.getElementById('msg');
var feedback = document.querySelector('.feedback');
var txt = document.getElementById('txt');

var msg = document.getElementById('msg').value;
var thisMsg = "";

form.addEventListener('submit', function(e) {

  e.preventDefault();

  var msg = input.value;

  if (msg) {

    txt.textContent = "로딩중입니다..";
    form.reset();
    thisMsg = msg;
    isHereCheck1(); // 1로 바꾸기

  } 
})


// 현재 출석체크가 되었는가? 또는 이독부원인가?
function isHereCheck1() {
  const Http = new XMLHttpRequest();
  let runNum = 1;
  let userNum = thisMsg;

  const url = `https://script.google.com/macros/s/AKfycbwgKDbl1LPyTmKT2Y5iaXpaDrMrTs9UVBGgWjQVxWYw0KVgWPOhx6OFLwejmSWG8eTWig/exec?runNum=${runNum}&userNum=${userNum}`;
  console.log(userNum);
  Http.open('GET', url);
  Http.send();
  Http.onreadystatechange = (e) => {
    const ThisThis = Http.responseText;
    console.log(ThisThis);
    whoisit(ThisThis);
  };
}

// 출석체크해주는 애
function changeDocs2() {
  let runNum = 2;
  let userNum = thisMsg;
  location.href = `https://script.google.com/macros/s/AKfycbwgKDbl1LPyTmKT2Y5iaXpaDrMrTs9UVBGgWjQVxWYw0KVgWPOhx6OFLwejmSWG8eTWig/exec?runNum=${runNum}&userNum=${userNum}`;
}


function whoisit(ThisThis) {
  let text = " ";
  if (ThisThis == 'O'){
    text = "출석이 이미 완료되었습니다!";
    form.style.display ='none';
  }else if (ThisThis == 'X'){
    text = "출석체크 해주세요!";
    document.getElementById("checking").style.display ='inline-block';
    form.style.display ='none';
  }else{
    text = "이독 부원이 아니신데 여기는 무슨 일이시죠?";
  }
  txt.innerHTML = text;
}

function myFunction() { // 출석 체크
  let text = "";
  let trys = prompt("이번 주차의 출석 단어를 써주세요!");

  if (trys == todayWord) { // 맞음
    text = "출석 완료되었습니다!";
    document.getElementById("checking").style.display ='none';
    changeDocs2();
  }else { //틀림
    text = "다시 시도해주세요!";
  }

  txt.innerHTML = text;
}

