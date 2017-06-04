// Job Listing POS
// Robert DeLanghe
// http://robertdelanghe.com

var button;
var pt = ['cc', 'cd', 'dt', 'ex', 'fw', 'in', 'jj', 'jjr', 'jjs', 'ls', 'md', 'nn', 'nns', 'nnp', 'nnps', 'pdt', 'pos', 'prp', 'prp$', 'rb', 'rbr', 'rbs', 'rp', 'sym', 'to', 'uh', 'vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz', 'wdt', 'wp', 'wp$', 'wrb'];
var posdes = ['Coordinating conjunction','Cardinal number','Determiner','Existential there','Foreign word','Preposition or subordinating conjunction','Adjective','Adjective, comparative','Adjective, superlative','List item marker','Modal','Noun, singular or mass','Noun, plural','Proper noun, singular','Proper noun, plural','Predeterminer','Possessive ending','Personal pronoun','Possessive pronoun','Adverb','Adverb, comparative','Adverb, superlative','Particle','Symbol','to','Interjection','Verb, base form','Verb, past tense','Verb, gerund or present participle','Verb, past participle','Verb, non-3rd person singular present','Verb, 3rd person singular present','Wh-determiner','Wh-pronoun','Possessive wh-pronoun','Wh-adverb'];
var show = [false,false,false,false,false,false,true,false,false,false,false,true,true,true,true,false,false,true,true,false,false,false,false,false,false,false,true,true,true,true,true,true,false,false,false,false];
  function setup() {
    noCanvas();
  }

  function processRita() {
    var s = document.getElementById("listing").value;
    while (div1.hasChildNodes()) {
    div1.removeChild(div1.lastChild);
    }
    var rs = new RiString(s);
    var words = rs.words();
    var pos = rs.pos();

    for (var j = 0; j < pt.length; j++) {
      if (show[j]) {
        var des = posdes[j];
        var arr = [];
        lst = "";

       for (var i = 0; i < words.length; i++) {
         var lc = words[i].toLowerCase();
         if (pos[i] === pt[j] && !arr.includes(lc)){
           arr.push(lc);
            // arr.push({
            //   word: lc,
            //   pos: pos[i],
            //   count: 1,
            //   frequency: 0
            // });
        }
        var sort = arr.sort();
        var lst = sort.toString();
        // sort = arr.sort(function(a, b)
        // {
		    //   var x=a[1].toLowerCase(),
			  //   y=b[1].toLowerCase();
		    //   return x<y ? -1 : x>y ? 1 : 0;
	      //  });
        // console.log(sort);
        }

        if (lst !== "") {
          var head = document.createElement('h2');
          var headnode = document.createTextNode(des);
          var para = document.createElement("p");
          var node = document.createTextNode(lst);
          head.appendChild(headnode);
          para.appendChild(node);
          var element = document.getElementById("div1");
          element.appendChild(head);
          element.appendChild(para);
        }
        arr = [];
      }
    }
  }
