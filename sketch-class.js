// Job Listing POS
// Robert DeLanghe
// http://robertdelanghe.com
// version: '0.0.2'

function setup(){
  noCanvas();
}

var i = (''), rs = [], ra = [], words = [], counts = [];

var pt = ['cc', 'cd', 'dt', 'ex', 'fw', 'in', 'jj', 'jjr', 'jjs', 'ls', 'md', 'nn', 'nns', 'nnp', 'nnps', 'pdt', 'pos', 'prp', 'prp$', 'rb', 'rbr', 'rbs', 'rp', 'sym', 'to', 'uh', 'vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz', 'wdt', 'wp', 'wp$', 'wrb'];
var posdes = ['Coordinating conjunction','Cardinal number','Determiner','Existential there','Foreign word','Preposition or subordinating conjunction','Adjective','Adjective, comparative','Adjective, superlative','List item marker','Modal','Noun, singular or mass','Noun, plural','Proper noun, singular','Proper noun, plural','Predeterminer','Possessive ending','Personal pronoun','Possessive pronoun','Adverb','Adverb, comparative','Adverb, superlative','Particle','Symbol','to','Interjection','Verb, base form','Verb, past tense','Verb, gerund or present participle','Verb, past participle','Verb, non-3rd person singular present','Verb, 3rd person singular present','Wh-determiner','Wh-pronoun','Possessive wh-pronoun','Wh-adverb'];
var show = [false,false,false,false,false,false,true,false,false,false,false,true,true,true,true,false,false,true,true,false,false,false,false,false,false,false,true,true,true,true,true,true,false,false,false,false];

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
    arr.push(word);
  }
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

  while (div1.hasChildNodes()) {
  div1.removeChild(div1.lastChild);
  }

  document.getElementById("button1").firstChild.data = 'processing...';
  document.getElementById("TextBox").value = '';

  var array = wordarray(i);
  var groups = group_pos(array);
  var head = drawbody(groups);

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

function group_pos(arr) {
  var groups = [];
  for (var p = 0; p < pt.length; p++) {
    // console.log('looping: ', pt[p]);
    var group = [];
    for (var s = arr.length - 1; s >= 0; s--) {
      // console.log(arr[s].string, ' : ', arr[s].pos, ' : ', pt[p]);
      var x = arr[s];
      if(x.pos === pt[p]) {
        // console.log('true');
        group.push(x.string);
        arr.splice(s, 1);
      }
    }
    groups.push(group);
    // console.log(group);
  }
  return groups;
}

function drawbody(a) {
  for (var i = 0; i < a.length; i++) {
    if (a[i].length != 0 && show[i]){
      var head = document.createElement('h2');
      var headnode = document.createTextNode(posdes[i]);
      head.appendChild(headnode);
      var element = document.getElementById("div1");
      element.appendChild(head);

      t = ('');
      for (var j = 0; j < a[i].length; j++) {
        g = a[i];
        if (j == 0) {
          t += g[j];
        } else {
          t += ', ';
          t += g[j];
        }
      }
      var para = document.createElement("p");
      var node = document.createTextNode(t);
      para.appendChild(node);
      element.appendChild(para);
      t = ('');
    }
  }
  //   var head = document.createElement('h2');
  //   var headnode = document.createTextNode(des);
  //   var para = document.createElement("p");
  //   var node = document.createTextNode(lst);
  //   head.appendChild(headnode);
  //   para.appendChild(node);
  //   var element = document.getElementById("div1");
  //   element.appendChild(head);
  //   element.appendChild(para);
}
