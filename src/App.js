import React, {Component} from 'react';
import './stylesheets/App.css';
import contacts from './contacts.json';
import Celebrity from "./components/Celebrity.js"

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      allContacts: contacts,
      displayedContacts: [...contacts].slice(0,5),
      finalContacts: [...contacts].slice(0,5)
    };

    this.random = this.random.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortPopularity = this.sortPopularity.bind(this);
    this.search = this.search.bind(this)
  }

  // We can use normal functions + bind OR arrow functions


  /* ---------- RANDOM ADD ----------- */

  random = function() {
    let displayedContactsLength = this.state.displayedContacts.length;

    // slice one element from full list...
    let newContact = this.state.allContacts.slice(displayedContactsLength, displayedContactsLength+1)[0];

    //...and push it to displayed contacts in THREE STEPS:
    // 1) Make a copy of displayedContacts
    // 2) Push this new element to this copied array
    let newDisplayedContacts = [...this.state.displayedContacts,newContact]
    // 3) in setState (which updates the original state), set the displayedContacts array equal to newDisplayedContacts
    this.setState({
      displayedContacts: newDisplayedContacts,
      finalContacts: newDisplayedContacts
    }); 
  }

  /* ---------- SORT BY NAME ----------- */

  sortName = function() {
    // MAKE A TEMPORARY COPY OF ORIGINAL ARRAY!! BECAUSE WE ARE GOING TO MODIFY IT
    let originalContacts = [...this.state.displayedContacts];
    
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
    
      let comparison = 0;
      if (nameA >= nameB) {
        comparison = 1;
      } else if (nameA <= nameB) {
        comparison = -1;
      }
      return comparison; 
    }
    
    let sortedContacts = originalContacts.sort(compare);

    this.setState({
      displayedContacts: sortedContacts,
      finalContacts: sortedContacts
    })
  }

  /* ---------- SORT BY POPULARITY ----------- */

  sortPopularity = function() {
    let originalContacts = [...this.state.displayedContacts];
    
    function compare(a, b) {
      let popularityA = a.popularity
      let popularityB = b.popularity;
    
      let comparison = 0;
      if (popularityA >= popularityB) {
        comparison = 1;
      } else if (popularityA <= popularityB) {
        comparison = -1;
      }
      return comparison;
    }
    
    let sortedContacts = originalContacts.sort(compare);

    this.setState({
      displayedContacts: sortedContacts,
      finalContacts: sortedContacts
    })
  }

  /* ---------- SEARCH ----------- */

  search = function(e) {
    let allDisplayedCelebrities = [...this.state.displayedContacts];
    let searchedTerm = e.target.value; // element that trigered the Search function, that is: the input field
    let final = this.state.finalContacts;

    if (searchedTerm !== ""){
      let searchedCelebrities = allDisplayedCelebrities.filter((celebrity) => (
        celebrity.name.toLowerCase().indexOf(searchedTerm) >= 0
      ))
      this.setState({
        displayedContacts: searchedCelebrities,
      })
    } else {
      this.setState({
        displayedContacts: final
      })
    }
  }

  /* ---------- MAIN RENDER ----------- */

  render() {
    let contactComponents = this.state.displayedContacts.map((celebrity)=> {
      return (
        <Celebrity 
          name={celebrity.name} 
          pictureUrl={celebrity.pictureUrl}
          popularity={celebrity.popularity.toFixed(2)}
        />
      )
    })

    return(
      <div className="App">
        <button onClick = {this.random}>Add random contact</button>
        <button onClick = {this.sortName}>Sort by Name</button>
        <button onClick = {this.sortPopularity}>Sort by Popularity</button>
        <input onChange = {this.search} type="text" placeholder="search for celebrity"/>
        <table>
          <thead>
            <tr>
              <th colspan="3">IronContacts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Picture</td>
              <td>Name</td>
              <td>Popularity</td>
            </tr>
            {contactComponents}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
