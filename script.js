const buttons = document.querySelectorAll('.item-button');
const itemList = document.getElementById('item-list');

//Track buttons states and selected data
const buttonStates = new Map(); //Tracks states:'default','blue','red'

//Initialize button states
buttons.forEach(button=>{
  buttonStates.set(button,'default');
  button.addEventListener('click',()=> handleButtonClick(button))
  
});

//Handle button click
function handleButtonClick(button){
   const currentState = buttonStates.get(button);

   //Cycle through states: default -> blue -> read ->default
   if(currentState ==='default'){
    buttonStates.set(button,'blue');
    button.classList.add('blue');
    button.classList.remove('red');
   } else if (currentState === 'blue'){
    buttonStates.set(button,'red');
    button.classList.add('red');
    button.classList.remove('blue');
   } else {
      buttonStates.set(button,'default');
      button.classList.remove('red','blue');
   }
   updateResults();
  
}
// Related items mapping
const relatedItemsMap = {
  "R-LU5(Magic 8ers)": ["R-ST43","R-BL67",
                        "L-LU11","L-PC7","L-BL40"
  ],
  "L-LU5(Magic 8ers)": [ "L-ST43","L-BL67",
                        "R-LU11","R-PC7","R-BL40"],

  "R-LI1(Magic 8ers)": ["R-TW3","R-KD10",
                        "L-KD1","L-SP3","L-LI11"
  ],
  "L-LI1(Magic 8ers)": ["L-TW3","L-KD10",
                        "R-KD1","R-SP3","R-LI11"],

  "R-BL67(Magic 8ers)": ["R-ST43","R-LU5",
                          "L-LU11","L-PC7","L-BL40"
  ],
  "L-BL67(Magic 8ers)": ["L-ST43","L-LU5",
                          "R-LU11","R-PC7","R-BL40"
  ],

  "R-KD10(Magic 8ers)": ["R-LI1","R-TW3",
    "L-KD1","L-SP3","L-LI11"],
  "L-KD10(Magic 8ers)": ["L-LI1","L-TW3",
                        "R-KD1","R-SP3","R-LI11"],

  "R-ST45(Magic 8ers)": ["R-GB41","R-PC3","L-PC9","L-HT7","L-ST36"],
  "L-ST45(Magic 8ers)": ["L-GB41","L-PC3","R-PC9","R-HT7","R-ST36"],

  "R-SP9(Magic 8ers)": ["R-TW1","R-SI3","L-SP1","L-LIV3","L-TW10"],
  "L-SP9(Magic 8ers)": ["L-TW1","L-SI3","R-SP1","R-LIV3","R-TW10"],

  "R-PC3(Magic 8ers)": ["R-ST45","R-GB41","L-PC9","L-HT7","L-ST36"],
  "L-PC3(Magic 8ers)": ["L-ST45","L-GB41","R-PC9","R-HT7","R-ST36"],

  "R-TW1(Magic 8ers)": ["R-SI3","R-SP9","L-SP1","L-LIV3","L-TW10"],
  "L-TW1(Magic 8ers)": ["L-SI3","L-SP9","R-SP1","R-LIV3","R-TW10"],

  "R-HT3(Magic 8ers)": ["R-GB44","R-BL65","L-HT9","L-LU9","L-GB34"],
  "L-HT3(Magic 8ers)": ["L-GB44","L-BL65","R-HT9","R-LU9","R-GB34"],

  "R-SI1(Magic 8ers)": ["R-SI3","R-LIV8","L-LIV1","L-KD3","L-SI8"],
  "L-SI1(Magic 8ers)": ["L-SI3","L-LIV8","R-LIV1","R-KD3","R-SI8"],

  "R-GB44(Magic 8ers)": ["R-GB44","R-BL65","R-HT3","L-HT9","L-LU9","L-GB34"],
  "L-GB44(Magic 8ers)": ["L-GB44","L-BL65","L-HT3","R-HT9","R-LU9","R-GB34"],

  "R-LIV8(Magic 8ers)": ["R-SI1","R-SI3","L-LIV1","L-KD3","L-SI8"],
  "L-LIV8(Magic 8ers)": ["L-SI1","L-SI3","R-LIV1","R-KD3","R-SI8"],




};

//Update the results area
function updateResults(){
  const blueButtons = [];
  const redButtons=[];

  //categorize buttons by color
  buttons.forEach(button => {
    const state = buttonStates.get(button);
    if(state === 'blue') blueButtons.push(button);
    if(state === 'red') redButtons.push(button);
  });

  //get common items for all selecte buttons
  const allSelectedButtons = [...blueButtons,...redButtons];
  const commonItemsInAll = getCommonItems(allSelectedButtons);

  //get common items for red buttons only
  const commonItemsInRed = getCommonItems(redButtons).filter(item => !commonItemsInAll.includes(item));
 

  //Display results
  itemList.innerHTML = '';

 //Add common items in all selected buttons
 if(commonItemsInAll.length>0){
  const header = document.createElement('li');
  header.textContent = 'Common in all selected buttons:';
  header.style.fontWeight = 'bold';
  itemList.appendChild(header);

  commonItemsInAll.forEach(item =>{
    const li = document.createElement('li');
    li.textContent = item;
    itemList.appendChild(li);
  });
 }
  //Add common items in red buttons only
  if (commonItemsInRed.length>0){
    const header = document.createElement('li');
    header.textContent = 'common in red buttons:';
    header.style.fontWeight = 'bold';
    itemList.appendChild(header);

    commonItemsInRed.forEach(item =>{
      const li = document.createElement('li');
      li.textContent = item;
      li.classList.add('red-item');//Apply red text
      itemList.appendChild(li);
    });
    
    const appendedItems = [] ;
    const itemsToCheck = [...(commonItemsInAll || []), ...(commonItemsInRed || [])];
    
    if(Array.isArray(itemsToCheck)){
     
      itemsToCheck.forEach(item =>{
        if (relatedItemsMap[item]){
          
          appendedItems.push(...relatedItemsMap[item]);
        }
      })
    }

    if (appendedItems.length>0){
      const header = document.createElement('li');
      header.textContent = 'Related items';
      header.style.fontWeight = 'bold';
      itemList.appendChild(header);

      appendedItems.forEach(item=>{
        const li = document.createElement('li');
      li.textContent = item;
      li.classList.add('blue-item');
      itemList.appendChild(li);
      });     

    };
  }

  
}





function getCommonItems(buttons){
  if(buttons.length === 0) return [];

  const itemSets = buttons.map(button =>
    new Set(button.getAttribute('data-items').split(',').map(item=> item.trim()))
  );

  //find common items
  return Array.from(itemSets.reduce((commonSet,currentSet)=>{
    return new Set([...commonSet].filter(item => currentSet.has(item)));
  }));
  console.log(itemSets)
}


// Handle reset button click
document.getElementById('reset-button').addEventListener('click', () => {
  // Reset button colors and click count
  buttons.forEach(button => {
    buttonStates.set(button,'default');
    button.classList.remove('red','blue')
  });

  
  
});
