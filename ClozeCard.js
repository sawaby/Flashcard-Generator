
//requiring inquirer module
var inq = require("inquirer");
//requiring json file which contains questions
var myJson = require("./cloze.json");
//constructor
function ClozeCard(text, cloze) {
    if(this instanceof ClozeCard) {
        this.text = text;
        this.cloze = cloze;
        this.partial = "";
    } else {
        return new ClozeCard(text, cloze);
    }  
}
//console.log(myJson.length);
var part;
var full;
var count = 0;
//creating a recursive function which goes through .json file and reads
//its array of objects
ClozeCard.prototype.clozeDel = function() {
    //there is only 3 questions in the file
    if (count < 3) {
        //this will create the partial answer for the card
        part = (myJson[count].text).replace(myJson[count].cloze, '...');
        //and this is the whole text
        full = myJson[count].text;
        inq.prompt([
            {
                type: "input",
                name: "q1",
                message: part
            }
        ]).then((answer) => {
            //check if answer is correct
            if (answer.q1.toLowerCase() == myJson[count].cloze.toLowerCase()) {
                console.log("\nyay that was correct. here is the complete sentence:");
                console.log(full+"\n");
            } else {
                console.log("\nNope. Here is the correct answer: \n" + full+"\n");
            }
            count++;
            this.clozeDel();
        });
    }
}
//creating the object without "new" keyword (calling the constructor)
var cloze = ClozeCard();
//calling clozeDel function of the object
cloze.clozeDel();
//exporting clozecard constructor so other files can use it
module.exports = ClozeCard;
