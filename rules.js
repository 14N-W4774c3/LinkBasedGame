class Start extends Scene {
    
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        // Initialize variables
        let room1Keypad = false;
        let room1key = false;
        let northClue = false;
        let eastClue = false;
        let southClue = false;
        let westClue = false;
        let data = [room1Keypad, room1key, northClue, eastClue, southClue, westClue]
        this.engine.gotoScene(Location, [this.engine.storyData["InitialLocation"], data]);
    }
}

class Location extends Scene {
    create(inputData) {
        let key = inputData[0]
        let data = inputData[1]
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        // Implementing Search mechanic
        if (locationData.Search) {
            if (data[locationData.Search.SID] == true){
                this.engine.show(locationData.Search.Text)
            } else {
                this.engine.addChoice("Search the room", "Search");
            }
        }

        if(locationData.Choices) {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, [choice, data]);
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice, data) {
        if(choice) {
            if (choice == "Keypad"){
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Keypad, 4, choice.Code, choice.Variable, choice.Return, data);
            }
            else if (choice == "Search"){
                this.engine.show("&gt; "+choice.Text);
                this.engine.show(locationData.Search);
            }
            else {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target, data);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

// Implementing Keypad puzzle
class Keypad extends Scene {
    create(length, code, boolvar, source) {
        let solution = code;
        let output = boolvar;
        this.engine.show("This is a keypad with a "+length+"-digit combination.")
        for (let i = 0; i < 10; i++){
            this.engine.addChoice(i, i);
        }
        this.engine.addChoice("Enter");
        this.engine.addChoice("Go back", source);
    }

    handleChoice(choice) {
        if(choice) {
            if (typeof(choice) == Number){ 
                // Handle keypad inputs
                if (keypadInput.length < this.length){
                    keypadInput = keypadInput + choice;
                }
            }
            else { 
                // Handle going back
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
        }
        else{ 
            //Handle submitting code
            if (keypadInput == this.code){
                output = True;
            }
            else {
                keypadInput = null;
            }
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');