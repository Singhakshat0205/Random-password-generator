const inputSlider=document.querySelector("[data-LengthSlider]");
const Lengthdisplay=document.querySelector("[data-lengthnumber]");
const passworddisplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#numbers");
const symbolscheck=document.querySelector("#Symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generatebutton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbol='!@#$%^&*()_+=-[]{}.,"?`\|:;/-"()';
let password="";
let passwordlength=10;
let checkcount=0;
handleslider();
// set strength circle color to grey
//set password
function handleslider(){
inputSlider.value=passwordlength;
Lengthdisplay.innerText=passwordlength;
}

function setindicator(color){
  indicator.style.backbroundColor=color;
}


function getrandominteger(max,min){
    return Math.floor(Math.random()*(max-min))+  min;
}

function generaterandomnumber(){
    return getrandominteger(0,9);
}

function generatelowercase(){
  return String.fromCharCode(getrandominteger(97,123));
}

function generateuppercase(){
 return String.fromCharCode(getrandominteger(65,91));
}
function generaterandomsymbol(){
    const randNum=getrandominteger(0,symbol.length);
     return symbol.charAt(randNum);
}

function calcstrength(){
  let upper=false;
  let lower=false;
  let num=false;
  let sym=false;
  if(uppercaseCheck.checked){
    upper=true;
  }
  if(lowercaseCheck.checked){
    lower=true;
  }
  if(numbercheck.checked)num=true;
  if(symbolscheck.checked) sym=true;
  if(upper && lower && (num || sym) && passwordlength>=9){
    setindicator("#0f0");
  }
  else if((lower || upper) && (num || sym) && passwordlength>=6 )
  setindicator("#ff0");
else setindicator("#f00");
}
 
 async function copycontent(){
try{
  navigator.clipboard.writeText(passworddisplay.value);
  copyMsg.innerText="copied";
}
catch(e){
copyMsg.innerText="Failed";
copyMsg.classList.add("active");
setTimeout(()=>{
  copyMsg.classList.remove("active");
},2000);
}
}


function shufflepassword(array){
// fisher yates algo to shuffle password
 
for (let i=array.length-1; i > 0; i--) { 
  const y = Math.floor(Math.random()*(i+1)); 
  const temp = array[i]; 
  array[i] = array[y] ;
  array[y] = temp ;
} 
let str="";
array.forEach((el)=>(str+=el));
return str;
}

function handlecheckboxchange(){
  checkcount=0;
  allcheckbox.forEach((checkbox)=>{
    if(checkbox.checked){
      checkcount++;
    }
  });
  if(passwordlength<checkcount){
    passwordlength=checkcount;
    handleslider();
  }
}
allcheckbox.forEach((checkbox)=>{
  checkbox.addEventListener('change',handlecheckboxchange);
})

inputSlider.addEventListener('input', (e)=>{
  passwordlength=e.target.value;
  handleslider();
})
copybtn.addEventListener('click',()=>{
  if(passworddisplay.value){
    copycontent();
  }
});

generateBtn.addEventListener('click',()=>{
//none of the checkbox checked
if(checkcount==0)return;
if(passwordlength<checkcount){
  passwordlength=checkcount;
  handleslider();
}

password="";
// lets put the stuff mentioned in  checkboxes
// if(uppercaseCheck.checked){
//   password+=generateuppercase();
// }
// if(lowercaseCheck.checked){
//   password+=generatelowercase;
// }
// if(numbercheck.checked){
//   password+=getrandominteger();
// }
// if(symbol.checked){
//   password+=generaterandomsymbol();
// }
let funcarr=[];
if(uppercaseCheck.checked){
   funcarr.push(generateuppercase);
  }
  if(lowercaseCheck.checked){
    funcarr.push(generatelowercase);
   }
   if(numbercheck.checked){
    funcarr.push(generaterandomnumber);
   }
   if(symbolscheck.checked){
    funcarr.push(generaterandomsymbol);
   }
   

   for(let i=0;i<funcarr.length;i++){
    password+=funcarr[i]();
   }

   for(let i=0;i<passwordlength-funcarr.length;i++){
    let randindex=getrandominteger(0,funcarr.length);
    password+=funcarr[randindex]();
   }
    
   password=shufflepassword(Array.from(password));
    
   passworddisplay.value=password; 
   calcstrength();

});