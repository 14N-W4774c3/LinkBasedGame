class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData["InitialLocation"]);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        // Implementing Search mechanic
        if (locationData.Search) {
            this.engine.addChoice("Search the room", "Search");
        }

        if(locationData.Choices) {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            if (choice == "Keypad"){
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Keypad, choice.Target);
            }
            if (choice == "Search"){
                this.engine.show("&gt; "+choice.Text);
                this.engine.show(locationData.Search);
            }
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
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