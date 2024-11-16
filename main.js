// Track selected items
let selectedItems = new Set();

// Initialize button click event
document.querySelectorAll('.item-button').forEach(button => {
  button.clickCount = 0;

  button.addEventListener('click', () => {
    button.clickCount = (button.clickCount + 1) % 2;

    if (button.clickCount === 1) {
      button.style.backgroundColor = 'blue';
    } else if (button.clickCount === 2) {
      button.style.backgroundColor = 'red';
    }
     else {
      button.style.backgroundColor = '';
    }
  });
});

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

  "R-SI1(Magic 8ers)": ["R-LI3","R-LIV8","L-LIV1","L-KD3","L-SI8"],
  "L-SI1(Magic 8ers)": ["L-LI3","L-LIV8","R-LIV1","R-KD3","R-SI8"],

  "R-GB44(Magic 8ers)": ["R-GB44","R-BL65","R-HT3","L-HT9","L-LU9","L-GB34"],
  "L-GB44(Magic 8ers)": ["L-GB44","L-BL65","L-HT3","R-HT9","R-LU9","R-GB34"],

  "R-LIV8(Magic 8ers)": ["R-SI1","R-LI3","L-LIV1","L-KD3","L-SI8"],
  "L-LIV8(Magic 8ers)": ["L-SI1","L-LI3","R-LIV1","R-KD3","R-SI8"],




};


// Handle submit button click
document.getElementById('submit-button').addEventListener('click', () => {
  const selectedButtons = []; // Track selected buttons
  const selectedItems = [];

  // Collect items from selected buttons
  document.querySelectorAll('.item-button').forEach(button => {
    if (button.clickCount > 0) {
      selectedButtons.push(button); // Track selected button
      const items = button.getAttribute('data-items').split(',').map(item => item.trim());
      selectedItems.push(new Set(items)); // Store items as sets to detect duplicates later
    }
  });

  let itemsToDisplay;

  if (selectedButtons.length === 1) {
    // If only one button is selected, show all items from that button
    itemsToDisplay = Array.from(selectedItems[0]);
  } else if (selectedButtons.length > 1) {
    // If more than one button is selected, show only items common to all selected buttons
    itemsToDisplay = Array.from(selectedItems.reduce((acc, itemsSet) => {
      // Use a new Set to hold only items that are in both acc and itemsSet
      return new Set([...acc].filter(item => itemsSet.has(item)));
    }));
  }


  // Add related items to the result
  const additionalItems = [];
  itemsToDisplay.forEach(item => {
    if (relatedItemsMap[item]) {
      additionalItems.push(...relatedItemsMap[item]);
    }
  });

  // Combine original items with related items
  const finalItemsToDisplay = [...new Set([...itemsToDisplay, ...additionalItems])];

  
  // Display items in the popup
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = ''; // Clear previous items

  finalItemsToDisplay.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
     // Check if the item is an additional item and apply the class
    if (additionalItems.includes(item)) {
      li.classList.add('additional-item');
    }
    itemList.appendChild(li);
  });

  // Show the popup
  document.getElementById('popup').style.display = 'block';
});

// Close popup
////document.getElementById('close-popup').addEventListener('click', () => {
//  document.getElementById('popup').style.display = 'none';
//});

// Handle reset button click
document.getElementById('reset-button').addEventListener('click', () => {
  // Reset button colors and click count
  document.querySelectorAll('.item-button').forEach(button => {
    button.style.backgroundColor = '';
    button.clickCount = 0;
  });

  // Clear popup content if open
  document.getElementById('item-list').innerHTML = '';
  document.getElementById('popup').style.display = 'none';
});
