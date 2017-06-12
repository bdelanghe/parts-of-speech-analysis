// Job Listing POS
// Robert DeLanghe
// http://robertdelanghe.com
// version: '0.0.2'

//
// You can store all of the parts of speech
// as an array of dictionaries, so that it is
// ordered in consistently _and_ declarative.
//
// I took the previous code and in the js console, ran:
//
// ```js
// var o = [];
// for (var i = 0; i < pt.length; i++) {
//   o.push({ pos: pt[i], name: posdes[i] });
// }
// JSON.stringify(o);
// ```
//
var POS_CONFIG = [
  {"pos":"cc","name":"Coordinating conjunction"},
  {"pos":"cd","name":"Cardinal number"},
  {"pos":"dt","name":"Determiner"},
  {"pos":"ex","name":"Existential there"},
  {"pos":"fw","name":"Foreign word"},
  {"pos":"in","name":"Preposition or subordinating conjunction"},
  {"pos":"jj","name":"Adjective"},
  {"pos":"jjr","name":"Adjective, comparative"},
  {"pos":"jjs","name":"Adjective, superlative"},
  {"pos":"ls","name":"List item marker"},
  {"pos":"md","name":"Modal"},
  {"pos":"nn","name":"Noun, singular or mass"},
  {"pos":"nns","name":"Noun, plural"},
  {"pos":"nnp","name":"Proper noun, singular"},
  {"pos":"nnps","name":"Proper noun, plural"},
  {"pos":"pdt","name":"Predeterminer"},
  {"pos":"pos","name":"Possessive ending"},
  {"pos":"prp","name":"Personal pronoun"},
  {"pos":"prp$","name":"Possessive pronoun"},
  {"pos":"rb","name":"Adverb"},
  {"pos":"rbr","name":"Adverb, comparative"},
  {"pos":"rbs","name":"Adverb, superlative"},
  {"pos":"rp","name":"Particle"},
  {"pos":"sym","name":"Symbol"},
  {"pos":"to","name":"to"},
  {"pos":"uh","name":"Interjection"},
  {"pos":"vb","name":"Verb, base form"},
  {"pos":"vbd","name":"Verb, past tense"},
  {"pos":"vbg","name":"Verb, gerund or present participle"},
  {"pos":"vbn","name":"Verb, past participle"},
  {"pos":"vbp","name":"Verb, non-3rd person singular present"},
  {"pos":"vbz","name":"Verb, 3rd person singular present"},
  {"pos":"wdt","name":"Wh-determiner"},
  {"pos":"wp","name":"Wh-pronoun"},
  {"pos":"wp$","name":"Possessive wh-pronoun"},
  {"pos":"wrb","name":"Wh-adverb"}
];

function analyzeText() {

  //
  // Declaring all of the variables I'm going to be using
  // in the scope of this execution...
  var textInput = document.getElementById("TextBox").value,
      output = document.getElementById("div1"),
      rawWords = (new RiString(textInput)).words(),
      wordMap = {},
      posMap = {};

  //
  // Here, I'm going through every word, this `forEach` is
  // pretty similar to doing a `for loop`, but takes care of that
  // for you, you can write a function as an argument to `forEach`
  // (called a callback).
  //
  // This person may have explained this better than me:
  // http://eloquentjavascript.net/05_higher_order.html
  //
  // This goes through each of the words and stores them
  // by their normalized (lowercase) keys in a dictionary
  // so that we only have one `Word` object for each of them,
  // we can update the count when we see the word again.
  //
  rawWords.forEach(function(word) {
    var key = word.toLowerCase();
    if (key in wordMap) {
      wordMap[key].count++;
    } else {
      // Similarly to how this is storing the value in
      // `wordMap`, we can create a `posMap` and check if
      // this is a part of speech we care about _right here_
      // and then store that word in it, instead of doing the
      // many walkthroughs this wordMap object later when we're
      // looking through the POS_CONFIG
      //
      // I leave that to you...
      //
      // ¯\_(ツ)_/¯
      var partsOfSpeech = (new RiString(key)).pos();
      wordMap[key] = {
        word: key,
        count: 1,
        pos: partsOfSpeech
      };
    }
  });

  // instead of walking each of the children of this DOM node,
  // it's pretty easy to clear this out with the `innerText` property
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText
  output.innerHTML = ''; // clear it out

  // Given that we've defined this Parts of Speech configuration above,
  // we can walk it similarly to the words, and check if each
  // of the words belongs to a POS that we want to display
  POS_CONFIG.forEach(function(POS) {
    var words = [];
    for (var key in wordMap) {
      var word = wordMap[key];
      if (word.pos.includes(POS.pos)) {
        words.push(word.word);
      }
    }

    // If there are any words for this POS,
    // we sort them by their count and then do the
    // DOM node creation.
    if (words.length) {
      words.sort(function(a, b) {
        return wordMap[a].count >= wordMap[b].count ? -1 : 1;
      });

      // This can be prettier, the DOM api isn't the most succinct.
      var content = document.createElement("div");
      var heading = document.createElement("h2");
      heading.appendChild(document.createTextNode(POS.name));
      content.appendChild(heading);
      content.appendChild(document.createElement("p").appendChild(document.createTextNode(words.join(", "))));
      div1.appendChild(content);
    }
  });

}
