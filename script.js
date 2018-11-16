let topics = ["Mood","Lighting","Staging"]

let firstSlot = []
let secondSlot = []
let thirdSlot = []

let conf = location.href.split("#")
let lang = (conf[1]) ?  conf[1] : "en";
let topic = (conf[2]) ?  conf[2] : "Staging";

let dataURL =  `/l18n/${topic}/strings_${lang}.json`;

console.log(lang, topic, dataURL)

loadStrings()

function loadStrings() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let firstSlot = JSON.parse(this.responseText).first
        let firstMachine = new RoundArray(firstSlot)

        for(let i = 0; i<30; i++){
            console.log(firstMachine.next())
        }

      }
    };
    xhttp.open("GET", dataURL, true);
    xhttp.send();
  }


class RoundArray {
    constructor(arr){
        this.array =  arr
        this.index = 0
    }

    next(){
        this.index++
        if(this.index == this.array.length){
            this.index = 0
        }
        
        return this.array[this.index]

    }
}
