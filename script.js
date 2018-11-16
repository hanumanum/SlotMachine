//let topics = ["Mood","Lighting","Staging"]

let conf = location.href.split("#")
let lang = (conf[1]) ?  conf[1] : "en";
let topic = (conf[2]) ?  conf[2] : "Staging";
let dataURL =  `/l18n/${topic}/strings_${lang}.json`;

loadStrings()

function loadStrings() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let slotsData = JSON.parse(this.responseText)
        let slot1 = new RoundArray(slotsData.slot1)
        let slot2 = new RoundArray(slotsData.slot2)
        let slot3 = new RoundArray(slotsData.slot3)

        anime({
          round: 1,
          easing: 'easeInCubic',
          backgroundColor: [
            {value: '#FFF'}, // Or #FFFFFF
            {value: 'rgb(255, 0, 0)'},
            {value: 'hsl(100, 60%, 60%)'}
          ],
          update: function() {
            var el = document.querySelector('#slot1');
            el.innerHTML = slot1.next();
          }
        });

        anime({
            round: 1,
            easing: 'easeInCubic',
            delay:1000,
            update: function() {
              var el = document.querySelector('#slot2');
              el.innerHTML = slot2.next();
            }
          });

        anime({
            round: 1,
            easing: 'easeInCubic',
            delay:2000,
            update: function() {
              var el = document.querySelector('#slot3');
              el.innerHTML = slot3.next();
            }
        });

      }
    };
    xhttp.open("GET", dataURL, true);
    xhttp.send();
  }


class RoundArray {
    constructor(arr){
        this.array =  arr
        this.index = 0
        this.setStart()
    }

    next(){
        this.index++
        if(this.index == this.array.length){
            this.index = 0
        }
        
        return this.array[this.index]

    }

    setStart(){
        this.index = randomInt(0, this.array.length-1)
    }
}



randomInt = (min, max) => Math.round(Math.random() * (max - min) + min);
