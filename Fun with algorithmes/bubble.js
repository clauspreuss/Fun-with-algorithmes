let unsortedArray=null;
let sortedArray=null;

class Bubblesort {

    constructor(lowestValueRange,highestValueRange,numberOfElements){

        //input error handling
        try{
            if (Number.isInteger(lowestValueRange)){
                //alert("If:",Number.isInteger(lowestValueRange))
                console.log(lowestValueRange," is a number!" );
                }
                else{
                    //alert(typeof(lowestValueRange));
                    console.log(lowestValueRange, " is not a number!");
                    throw (lowestValueRange + " is not a number! Defaults to 1");
                }
            }       
        catch(err){
                //alert(err);
            }
        finally{
                //lowestValueRange=1;
        }
            
        
        if (Number.isInteger(highestValueRange))
            console.log(highestValueRange," er en integer" );
        else
            console.log("Error",highestValueRange, " er ikke en integer");

        if (Number.isInteger(numberOfElements))
            console.log(numberOfElements," er en integer" );
        else
            console.log("Error",numberOfElements, " er ikke en integer");

        if(lowestValueRange>highestValueRange)
            console.log("Lowest number has to be smaller or even to greatest number");

        //No errors - lets create the array with random numbers
        let numberIndex=0;
        let numberArray=new Array(numberOfElements);
        let i=0;
        for(i=0;i<numberOfElements;i++){
            numberArray[numberIndex]=Math.floor(Math.random() * (highestValueRange - lowestValueRange + 1) ) + lowestValueRange;
            numberIndex++;
        }        
        unsortedArray=[...numberArray];  //ES6 because arrays really are pointers to memory location, wich means assigment operator wont work
        console.log ("Unsorted Array: ", numberArray);

        //Now we can start sorting
        //we'll loop through numberArray and put numbers
        //in place until only the last element remains
       
        var swapped;
        do{
            swapped = false;
            for (i = 0; i < numberArray.length-1; i++) {
                //raise numbers to compare event
                var numbersToCompare= [numberArray[i],i,numberArray[i+1],i+1];
                var myEventCompare = new CustomEvent("Numbers to compare:",{ detail: numbersToCompare});
                document.body.dispatchEvent(myEventCompare);
                document.body.addEventListener(console.log("Numbers to compare:"), console.log(myEventCompare.detail), false);
                if(numberArray[i]!==undefined && numberArray[i+1]!==undefined && numberArray[i]>numberArray[i+1]){
                    //We need to swap numbers
                    var temp = numberArray[i];
                    var j=i+1;
                    numberArray[i] = numberArray[j];
                    numberArray[j] = temp;
                    swapped=true;
                    var swappedNumbers=[numberArray[i],temp];
                    var myEventSwap = new CustomEvent("Swapped",{detail:swappedNumbers});
                    document.body.dispatchEvent(myEventSwap);
                    document.body.addEventListener(console.log("Swapped"), console.log(myEventSwap.detail), false);
                }
                else {
                    //no need to swap
                    var myEventNoSwap = new CustomEvent("No Swap");
                    document.body.dispatchEvent(myEventNoSwap);
                    document.body.addEventListener("No Swap", console.log(myEventNoSwap), false);
                } //if else
            } //for
        } while (swapped); //do until numberArray is swapped in place => numberArray[i+1]>=numberArray[i] and swap is no longer needed
   console.log ("Array: ", numberArray);
   sortedArray=[...numberArray];
   var myEventSorted = new CustomEvent("Sorted");
   document.body.dispatchEvent(myEventSorted);
   
    } //constructor
} //class

//When click on Submit button
let btn=document.getElementById("submitArray")
btn.addEventListener("click",initBubbleClass,false);

document.body.addEventListener("Numbers to compare:",compareNumbers,false);
document.body.addEventListener("Sorted",showSortedArray, false);

function initBubbleClass(){
    i=0;
    let myBubblesort=new Bubblesort(parseInt(document.getElementById("minValue").value),parseInt(document.getElementById("maxValue").value),parseInt(document.getElementById("numberOfElements").value))  
    var arraySize=parseInt(document.getElementById("numberOfElements").value);
    //add unsorted array to HTML page
    document.getElementById("headerUnsorted").innerHTML = "Unsorted array:";
    do{ 
        var node = document.createElement("li");
        node.id=i;
        var textnode = document.createTextNode(unsortedArray[i]);
        node.appendChild(textnode);                             
        document.getElementById("unsortedArray").appendChild(node);  
        arraySize--;
        i++;
    }while(arraySize>0);
    document.getElementById("compare").innerHTML = "Compare numbers:";

    //clear input fields
    document.getElementById("minValue").value='';
    document.getElementById("maxValue").value='';
    document.getElementById("numberOfElements").value='';

}

function compareNumbers(evt){
    
    var num01=evt.detail[0];
    var index01=evt.detail[1];
    var num02=evt.detail[2];
    var index02=evt.detail[3];
    var action;
    var node=document.createElement("li");
    if (num01>num02){
        action="Swap";
    } else{action="No Swap";
    }
    var textnode=document.createTextNode(num01+"["+index01+"]"+num02+"["+index02+"]" + action);
    node.appendChild(textnode);
    document.getElementById("comparelist").appendChild(node);
}

function showSortedArray(){
    j=0;
    var arraySize=parseInt(document.getElementById("numberOfElements").value);
    //add sorted array to HTML page
    document.getElementById("headersorted").innerHTML = "Sorted array:";
    do{ 
        var node = document.createElement("li");
        node.id=j;
        var textnode = document.createTextNode(sortedArray[j]);
        node.appendChild(textnode);                             
        document.getElementById("sortedArray").appendChild(node);  
        arraySize--;
        j++;
    }while(arraySize>0);
}


