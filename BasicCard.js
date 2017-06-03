
//requiring inquirer module
var inq =require("inquirer");
//requiring json file which contains questions
var myJson = require("./basic.json");
//constructor which enable user to call it without new
function BasicCard(front, back){
     if(this instanceof BasicCard) {
        this.front = front;
        this.back = back;
    } else {
        return new BasicCard(front, back);
    }  
}
var count = 0;
//actual function which creates basic flash cards
BasicCard.prototype.basic = function() {
    //recursive function which go through each object of .json array
    if (count < 3) {
        //setting object's values
        this.front = myJson[count].front;
        this.back = myJson[count].back;
        //prompting the questions for the user and getting ansewrs
        inq.prompt([
            {
                type: "input",
                name: "q1",
                message: this.front
            }
        ]).then((answer) => {
            if (answer.q1.toLowerCase() == this.back.toLowerCase()) {
                console.log("\nyay that was correct.");
                console.log(this.back+" Is the correct Answer!\n");
            } else {
                console.log("\nNope. Here is the correct answer: \n" + this.back+"\n");
            }
            count++;
            //calling the function recursively
            this.basic();
        });

    }
}
//in this example I use "new" keyword so that it shows we can use/not use the "new" keyword 
//and it still creates the object.
var card = new BasicCard();
//calling basic function of the object
card.basic();
//exporting clozecard constructor so other files can use it
module.export = BasicCard;