// Job Listing POS
// Robert DeLanghe
// http://robertdelanghe.com
// version: '0.0.2'

function setup(){
  noCanvas();
}

var i = (''), rs = [], ra = [], words = [], counts = [];

var word = class word {
  constructor(string, pos, count) {
    this.string = string,
    this.pos = pos,
    this.freq = freq,
    this.count = count;
  }
}

function wordarray(input){
  a = tokens(i);
  c = count(a);
  p = POS(c[0]);
}

function input(){
  i = document.getElementById("TextBox").value;


  document.getElementById("button1").firstChild.data = 'processing...';
  document.getElementById("TextBox").value = '';

  var array = wordarray(i);

  document.getElementById("button1").firstChild.data = 'complete!';

  return i;
}

function tokens(s) {
  rs = new RiString(s);
  ra = rs.words();
  return ra;
}

function POS(words) {
  pos = [];
  for (var w = 0; w < words.length; w++) {
    var rita = new RiString(str(w));
    var p = rita.pos();
    pos.push(p);
  }
  return [words, pos];
}


function freq(){

}

function count(s){
  words = s.sort();
  arr = [];
  cnt = [];
  for (var w = 0; w < words.length; w++) {
    var lc = words[w].toLowerCase();
    if (!arr.includes(lc)) {
      arr.push(lc);
      cnt.push(1);
    } else {
      c = cnt[arr.length - 1];
      c += 1;
      cnt[arr.length - 1] = c;
    }
  }
  counts = cnt;
  return [arr, cnt];
}

// function duplicates(){
//
// }

function print(){

}

// i = input();
// wordarray = tokens(i);
// console.log(wordarray);
