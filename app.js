// BUDGET CONTROLLER
var budgetController = (() => {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: (type, des, val) => {
            var newItem, ID;
            
            // Create new ID
            if(data.allItems[type].length > 0 ) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on inc or exp type
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push into data struct
            data.allItems[type].push(newItem);

            // Return new element
            return newItem;
        },
        testing: () => {
            console.log(data);
        }
    }

})();

// UI CONTROLLER
var UIController = (() => {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // gets inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },
        getDOMStrings: () => {
            return DOMstrings;
        }
    }
})();

//GLOBAL APP CONTROLLER
var controller = ((budgetCtrl, UICtrl) => {

    var setupEventListeners = () => {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        
        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
    var ctrlAddItem = () => {
        let input, newItem;
        // 1. Get input data
        input = UICtrl.getInput();
        
        // 2. Add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add item to UI

        // 4. Calculate budget

        // 5. Display budget on UI
    };

    return {
        init: () => {
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();