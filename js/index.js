
var register, formulaeString, inputArray, equallsFlag; 
/*  array to store sequece of keys pressed */


/*************       CLEAR     ************/
/********************************************/
function clear(){
    
    register = 0;   /*  initiaise calculator answer to 0 */
    formulaeString = "";  /* formuale sequence is blank as nothing yet calculated, produced by calcCheck() */
    inputArray = [];  /* array to store sequece of keys pressed is empty*/
    equallsFlag = false;  /* A flag to determine if the ' = ' button has been pressed previously */
    console.log(" - -  CLEAR  formulaeString = " + formulaeString + "     register = " + register);
}



/*************    ALL CLEAR      ************/
/********************************************/
function allClear(){
    console.log("----    AC clearRegister() \n");
    clear();
    displayUpdate();
}




/*********     UPDATE DISPLAY     *********/
/******************************************/
function displayUpdate(){
    console.log("----    displayUpdate \n");
    
    formulaeString = inputArray.join('');

    document.getElementById("toBeCalculated").value = formulaeString;
    document.getElementById("answer").value = register;
    
    console.log(" displayUpdate  -->    formulaeString = " + formulaeString + "     register = " + register);
}




/************      EQUALLS       ***********/
/******************************************/
function equalls(){
    console.log("  = \n");
    if(register === undefined){
        register = 0;} /* if not defined then have just pressed AC so set to 0 */
    
    else{   
            try {
            register = math.eval(formulaeString); /* this might return a number or a string if its an error*/
            }
         
            catch(err) {
                register = "ERROR";
                console.log("  **  catch  : err.message = " + err.message);
            }
        
            finally {
                
                    if(register !== "ERROR"){    /* no errors found */
                            inputArray = [];
                            inputArray.push(register);
                            console.log("  **  finally  : inputArray = " + inputArray);
                        }
            }
        
                
                equallsFlag = false;
                displayUpdate();
        }   
 
}





/*********    ALTERNATIVE MENU     *********/
/******************************************/
function alttMenu(){
    console.log("***  ALTERNATIVE MENU\n");
    
     $("#alternativeMenu").toggleClass("off");
    
}

 
/*********       BRACKETS         *********/
/******************************************/
function brackets(b){
    
    /* Don't make any assumptions about errors, leave this to mathsjs parser
        as too complex for simple if/ flag coditions  */
    if(b === " ("){
        console.log("OPEN BRACKET ( \n");
        inputArray.push(b);
        console.log("OPERATOR --> inputArray now is is " + inputArray + "\n");
        
    }
    
    else if(b === ") "){
        console.log("CLOSE BRACKET ) \n");
        inputArray.push(b);
        console.log("OPERATOR --> inputArray now is is " + inputArray + "\n");
       
    }
    
    displayUpdate();
}






/************    X ÷ + -     *************/
/******************************************/
function operatorUpdate(op){
    console.log("  operator  -->  " + op + " \n");
        
        inputArray.push(op);
        console.log("OPPERATOR --> inputArray now is is " + inputArray + "\n");
        
        displayUpdate();
}





/************    0 1 2 3 4 5 6 7 8 9     **********/
/**************************************************/
function numUpdate(val){
    console.log("  " + val + " \n");
    
    inputArray.push(val);
    displayUpdate();
}





/***********    DECIMAL POINT     **********/
/******************************************/
function decpoint(){
    console.log("  . \n");
   
    inputArray.push(".");   
}





/***********    DELETE  ONE      **********/
/******************************************/
function deleteOne(){
    console.log(" - -  Delete One - - inputArray before " + inputArray + " \n");
    if(equallsFlag === true){return;}  
    /*  delete one shouldn't work if equslls just pressed  */
    inputArray.pop();
    console.log(" inputArray after deleting one " + inputArray + " \n");
    displayUpdate();
}




/************    INPUT KEY      ***********/
/******************************************/
function keyPressed(row,column){
    
    
    console.log("INPUt KEY gftgrsgtwrtthhtrhwthtrhtrhwtr");
    
    
     switch(row) {
            case 0:
                console.log(" - -  Delete One - - \n");
                deleteOne();
                break;
            
             
            case 1:
               
                          switch(column) {
                                case 1:
                                     allClear();
                                    break;
                                case 2:
                                    brackets(" (");
                                    break;
                                case 3:
                                     brackets(") ");
                                    break;
                                case 4:
                                    alttMenu();
                                    break;
                                }
                break;
             
             
            case 2:
                
                        switch(column) {
                                case 1:
                                    numUpdate(7);
                                    break;
                                case 2:
                                    numUpdate(8);
                                    break;
                                case 3:
                                    numUpdate(9);
                                    break;
                                case 4:
                                    operatorUpdate(" / ");
                                    break;
                                }
                break;
             
             
            case 3:
                
                        switch(column) {
                                case 1:
                                    numUpdate(4);
                                    break;
                                case 2:
                                    numUpdate(5);
                                    break;
                                case 3:
                                    numUpdate(6);
                                    break;
                                case 4:
                                     operatorUpdate(" * ");
                                    break;
                                }
                break;
             
             
            case 4:
                
                        switch(column) {
                                case 1:
                                    numUpdate(1);
                                    break;
                                case 2:
                                    numUpdate(2);
                                    break;
                                case 3:
                                    numUpdate(3);
                                    break;
                                case 4:
                                    operatorUpdate(" -");  /*  need to bee able to have  3 - 2 as well as  -4  */
                                    break;
                                }
                break;
             
             
            case 5:
                
                        switch(column) {
                                case 1:
                                    numUpdate(0);
                                    break;
                                case 2:
                                    decpoint();
                                    break;
                                case 3:
                                    equalls();
                                    break;
                                case 4:
                                    operatorUpdate(" + ");
                                    break;
                                }
                break;
             
             
            default:
                console.log("unknown row ");
             
    }
             
    
}


/****************  EVENT LISTNERS FOR KEYS    ****************
use an anonymous funtion to pass parameters to keyPressed  

Decided to use jquery for compatability

*/


$(document).ready(function() { 

    
$("#delBut").on("click", function() { keyPressed(0,0); });
$("#key_1_1").on("click", function() { keyPressed(1,1); });
$("#key_1_2").on("click", function() { keyPressed(1,2); });
$("#key_1_3").on("click", function() { keyPressed(1,3); });
$("#key_1_4").on("click", function() { keyPressed(1,4); });
$("#key_2_1").on("click", function() { keyPressed(2,1); });
$("#key_2_2").on("click", function() { keyPressed(2,2); });
$("#key_2_3").on("click", function() { keyPressed(2,3); });
$("#key_2_4").on("click", function() { keyPressed(2,4); });
$("#key_3_1").on("click", function() { keyPressed(3,1); });
$("#key_3_2").on("click", function() { keyPressed(3,2); });
$("#key_3_3").on("click", function() { keyPressed(3,3); });
$("#key_3_4").on("click", function() { keyPressed(3,4); });
$("#key_4_1").on("click", function() { keyPressed(4,1); });
$("#key_4_2").on("click", function() { keyPressed(4,2); });
$("#key_4_3").on("click", function() { keyPressed(4,3); });
$("#key_4_4").on("click", function() { keyPressed(4,4); });
$("#key_5_1").on("click", function() { keyPressed(5,1); });
$("#key_5_2").on("click", function() { keyPressed(5,2); });
$("#key_5_3").on("click", function() { keyPressed(5,3); });
$("#key_5_4").on("click", function() { keyPressed(5,4); });

});  


/***********    INITIAL SETUP     ***********/

window.onload = function(){
    
   
    allClear();
    document.getElementById("toBeCalculated").value = "touch or click display to delete last entry";
    
};