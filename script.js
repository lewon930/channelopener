// Track selected items
let selectedItems = new Set();

// Initialize button click event
document.querySelectorAll('.item-button').forEach(button => {
  button.clickCount = 0;

  button.addEventListener('click', () => {
    button.clickCount = (button.clickCount + 1) % 2;

    if (button.clickCount === 1) {
      button.style.backgroundColor = 'blue';
    }// else if (button.clickCount === 2) {
     // button.style.backgroundColor = 'red';
    //}
     else {
      button.style.backgroundColor = '';
    }
  });
});

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
  
  // Display items in the popup
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = ''; // Clear previous items

  itemsToDisplay.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
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
