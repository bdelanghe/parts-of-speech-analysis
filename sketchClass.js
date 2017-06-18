// Job Listing POS
// Robert DeLanghe
// http://robertdelanghe.com
// version: '0.0.3'

var posTerm = ['cc', 'cd', 'dt', 'ex', 'fw', 'in', 'jj', 'jjr', 'jjs', 'ls', 'md', 'nn', 'nns', 'nnp', 'nnps', 'pdt', 'pos', 'prp', 'prp$', 'rb', 'rbr', 'rbs', 'rp', 'sym', 'to', 'uh', 'vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz', 'wdt', 'wp', 'wp$', 'wrb'];
var posDescription = ['Coordinating conjunction','Cardinal number','Determiner','Existential there','Foreign word','Preposition or subordinating conjunction','Adjective','Adjective, comparative','Adjective, superlative','List item marker','Modal','Noun, singular or mass','Noun, plural','Proper noun, singular','Proper noun, plural','Predeterminer','Possessive ending','Personal pronoun','Possessive pronoun','Adverb','Adverb, comparative','Adverb, superlative','Particle','Symbol','to','Interjection','Verb, base form','Verb, past tense','Verb, gerund or present participle','Verb, past participle','Verb, non-3rd person singular present','Verb, 3rd person singular present','Wh-determiner','Wh-pronoun','Possessive wh-pronoun','Wh-adverb'];
var show = [false,false,false,false,false,false,true,false,false,false,false,true,true,true,true,false,false,true,true,false,false,false,false,false,false,false,true,true,true,true,true,true,false,false,false,false];

class Word {
  constructor(string, pos, freq, count) {
    this.string = string,
    this.pos = pos,
    this.freq = freq,
    this.count = count;
  }
}

function createWords(stringArray, posArray, freqArray, countArray) {
  var wordArray = [];
  for (var w = 0; w < stringArray.length; w++) {
    var word = new Word(stringArray[w],posArray[w],freqArray[w],countArray[w])
    wordArray.push(word);
  }
  return wordArray;
}

function wordArray(textInput){
  var ritaArray = tokens(textInput);
  var wordsCounts = count(ritaArray);
  var countArray = wordsCounts[1];
  var stringArray = wordsCounts[0];
  var freqArray = freq(stringArray);
  var posArray = pos(stringArray);
  var arrArray = createWords(stringArray,posArray,freqArray,countArray);
  return arrArray;
}

function clickEvent() {
  var p = document.getElementById("submit");
  p.onclick = anaylze;
};

function anaylze(){
  var textInput = input();
  var words = wordArray(textInput);
  var posGroups = groupPos(words);
  drawBody(posGroups);
}

function input(){
  var textInput = document.getElementById("textBox").value;
  while (form.hasChildNodes()) {
  form.removeChild(form.lastChild);
  }
  return textInput;
}

function tokens(text) {
  var ritaString = new RiString(text);
  var words = ritaString.words();
  return words;
}

function pos(stringArray) {
  var posArray = [];
  for (var w = 0; w < stringArray.length; w++) {
    var ritaString = new RiString(stringArray[w]);
    var posResult = ritaString.pos();
    posArray.push(posResult[0]);
  }
  return posArray;
}

function freq(stringArray){
  var frequencyArray = [];
  for (var w = 0; w < stringArray.length; w++) {
    var index = frequencyWord.indexOf(stringArray[w]);
    if (index == -1) {
      frequencyArray.push(null);
      } else {
      var rank = frequencyRank[index];
      frequencyArray.push(rank);
    }
  }
  return frequencyArray;
}

function count(textInput){
  var words = textInput.sort();
  var stringArray = [];
  var countArray = [];
  for (var w = 0; w < words.length; w++) {
    var lowerCase = words[w].toLowerCase();
    if (!stringArray.includes(lowerCase)) {
      stringArray.push(lowerCase);
      countArray.push(1);
    } else {
      wordCount = countArray[stringArray.length - 1];
      wordCount += 1;
      countArray[stringArray.length - 1] = wordCount;
    }
  }
  return [stringArray, countArray];
}

function groupPos(stringArray) {
  var sortedPos = [];
  for (var p = 0; p < posTerm.length; p++) {
    var groupPos = [];
    for (var s = stringArray.length - 1; s >= 0; s--) {
      var word = stringArray[s];
      if(word.pos === posTerm[p]) {
        groupPos.push(word.string);
        stringArray.splice(s, 1);
      }
    }
    sortedPos.push(groupPos);
  }
  return sortedPos;
}

function drawBody(posGroups) {
  for (var i = 0; i < posGroups.length; i++) {
    if (posGroups[i].length != 0 && show[i]){
      var head = document.createElement('h2');
      var headnode = document.createTextNode(posDescription[i]);
      head.appendChild(headnode);
      var element = document.getElementById("results");
      element.appendChild(head);
      var posParagraph = ('');
      for (var j = 0; j < posGroups[i].length; j++) {
        var group = posGroups[i];
        if (j == 0) {
          posParagraph += group[j];
        } else {
          posParagraph += ', ';
          posParagraph += group[j];
        }
      }
      var para = document.createElement("p");
      var node = document.createTextNode(posParagraph);
      para.appendChild(node);
      element.appendChild(para);
      posParagraph = ('');
    }
  }
}
