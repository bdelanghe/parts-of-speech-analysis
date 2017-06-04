// Job Listing POS
// Robert DeLanghe
// http://robertdelanghe.com

var input;
var button;
var pt = ['cc', 'cd', 'dt', 'ex', 'fw', 'in', 'jj', 'jjr', 'jjs', 'ls', 'md', 'nn', 'nns', 'nnp', 'nnps', 'pdt', 'pos', 'prp', 'prp$', 'rb', 'rbr', 'rbs', 'rp', 'sym', 'to', 'uh', 'vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz', 'wdt', 'wp', 'wp$', 'wrb'];
var posdes = ['Coordinating conjunction','Cardinal number','Determiner','Existential there','Foreign word','Preposition or subordinating conjunction','Adjective','Adjective, comparative','Adjective, superlative','List item marker','Modal','Noun, singular or mass','Noun, plural','Proper noun, singular','Proper noun, plural','Predeterminer','Possessive ending','Personal pronoun','Possessive pronoun','Adverb','Adverb, comparative','Adverb, superlative','Particle','Symbol','to','Interjection','Verb, base form','Verb, past tense','Verb, gerund or present participle','Verb, past participle','Verb, non-3rd person singular present','Verb, 3rd person singular present','Wh-determiner','Wh-pronoun','Possessive wh-pronoun','Wh-adverb'];

  function setup() {

    noCanvas();
    // input = document.createElement('Integrity Analyst');
    // button = createButton('submit')
    // input.changed(processRita);
    // button.mousePressed(processRita);
  }
  function processRita() {
      var s = document.getElementById("listing").value;
      var rs = new RiString(s);
      var words = rs.words();
      var pos = rs.pos();
      // console.log(words);
      // console.log(pos);

      for (var j = 0; j < pt.length; j++) {
        var des = posdes[j];
        var array = [];
        lst = "";
         for (var i = 0; i < words.length; i++) {
           var lc = words[i].toLowerCase();
           if (pos[i] === pt[j] && !array.includes(lc)){
              array.push(lc);
          }
          var sort = array.sort();
          var lst = sort.toString();
          // console.log(list);
          // output += lst;
          }
        // console.log(list);
        if (lst !== "") {
          createElement('h2', des);
          createP(lst);
        }
        array = [];
      }
  }


  // function processRita() {
  //   var s = listing;
  //   createP(s);
  // }
