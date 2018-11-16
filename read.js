var keypress = require("keypress"),
  tty = require("tty");

let index = 0;
let text = `“Dragons,” said Mollander. He snatched a withered apple off the ground and tossed it hand to hand.
“Throw the apple,” urged Alleras the Sphinx. He slipped an arrow from his quiver and nocked it tohis bowstring.“I should like to see a dragon.” Roone was the youngest of them, a chunky boy still two years shy ofmanhood. “I should like that very much.”And I should like to sleep with Rosey’s arms around me, Pate thought. He shifted restlessly on thebench. By the morrow the girl could well be his. I will take her far from Oldtown, across the narrowsea to one of the Free Cities. There were no maesters there, no one to accuse him.He could hear Emma’s laughter coming through a shuttered window overhead, mingled with thedeeper voice of the man she was entertaining. She was the oldest of the serving wenches at the Quilland Tankard, forty if she was a day, but still pretty in a fleshy sort of way. Rosey was her daughter,fifteen and freshly flowered. Emma had decreed that Rosey’s maidenhead would cost a goldendragon. Pate had saved nine silver stags and a pot of copper stars and pennies, for all the good thatwould do him. He would have stood a better chance of hatching a real dragon than saving up enoughcoin to make a golden one.“You were born too late for dragons, lad,” Armen the Acolyte told Roone. Armen wore a leatherthong about his neck, strung with links of pewter, tin, lead, and copper, and like most acolytes heseemed to believe that novices had turnips growing from their shoulders in place of heads. “The lastone perished during the reign of King Aegon the Third.”“The last dragon in Westeros,” insisted Mollander.“Throw the apple,” Alleras urged again. He was a comely youth, their Sphinx. All the servingwenches doted on him. Even Rosey would sometimes touch him on the arm when she brought himwine, and Pate had to gnash his teeth and pretend not to see.“The last dragon in Westeros was the last dragon,” said Armen doggedly. “That is well known.”`;

text = text.replace(/(?:\r\n|\r|\n)/g, " ");
text = text.replace(/“/g, "\"");
text = text.replace(/”/g, "\"");
text = text.replace(/’/g, "'");

keypress(process.stdin);
console.clear()
process.stdout.write(`${text.substr(0, index)}>${text.substr(index, 120)}...`);

process.stdin.on("keypress", function(ch, key) {

  if (key && key.ctrl && key.name == "c") {
      process.stdin.pause();
      console.log("");

  } else {

    let character = ch;
    if (key && key.sequence) character = key.sequence;
    if (index >= text.length) index = text.length-1;

    if (character.toLowerCase() === text[index].toLowerCase()) {
        index++;
        while (text[index] === '"') index++;

    } else if (key && key.name === 'right') {
        index++;
        let loop = key.shift ? 10 : 1;
        for (i = 0; i < loop; i++) {
            while (text[index] !== ' ' && index < text.length) index++;
            index++;
        }
        if (index >= text.length) index = text.length-1;

    } else if (key && key.name === 'left') {
        index--;
        let loop = key.shift ? 10 : 1;
        for (i = 0; i < loop; i++) {
            while (text[index] !== ' ' && index > 0) index--;
            index--;
        }
        if (index <= 0) index = 0;
    }

    writeLine();
    
  }
});

function writeLine() {
    console.clear()
    let afterIndexText = 120;
    if (afterIndexText + index >= text.length) afterIndexText = text.length-1;
    process.stdout.write(`${text.substr(0, index)}>${text.substr(index, 120)}...`);
}

if (typeof process.stdin.setRawMode == "function") {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}
process.stdin.resume();
