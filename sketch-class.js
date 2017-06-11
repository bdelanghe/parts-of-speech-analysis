// Job Listing POS
// Robert DeLanghe
// http://robertdelanghe.com
// version: '0.0.2'

function setup(){
  noCanvas();
}

var i = (''), rs = [], ra = [], words = [], counts = [];

var word = class word {
  constructor(string, pos, freq, count) {
    this.string = string,
    this.pos = pos,
    this.freq = freq,
    this.count = count;
  }
}

function createwords(s, pos, freq, count) {
  arr = [];
  for (var w = 0; w < s.length; w++) {
    var word = {
      string:s[w],
      pos:pos[w],
      freq:freq[w],
      count:count[w]
    }
    console.log(word);
    arr.push(word);
  }
  // console.log(arr);
  return arr;
}

function wordarray(input){
  a = tokens(i);

  cs = count(a);
  c = cs[1];
  s = cs[0];
  f = freq(s);
  p = POS(s);

  arr = createwords(s,p,f,c);
  return arr;
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

function POS(s) {
  pos = [];
  for (var w = 0; w < s.length; w++) {
    rs = new RiString(str(s[w]));
    var p = rs.pos();
    pos.push(p[0]);
  }
  return pos;
}


function freq(s){
  arr = [];
  for (var w = 0; w < s.length; w++) {
    var ind = wfreq.indexOf(s[w]);
    if (ind == -1) {
      arr.push(null);
      } else {
      rank = rfreq[ind];
      arr.push(rank);
    }
  }
  return arr;
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
