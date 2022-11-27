import React from 'react'
import '../../../node_modules/bootstrap/dist/css'
import Header from '../../components/Header'
import Banner from '../../assets/advertiseBanner.png'
import Footer from '../../components/Footer'
import "./wishlist.css"
export default function WishListHomePage() {

    <div>
         <Header />
         <img src={Banner} style={{ "margin": "4vh" }} alt="banner" />
         <Footer />
         <ul id="items">
            <li class="element">Javascript<button class="trash delete">X</button> </li>
            <li class="element">Angular <button class="trash delete">X</button> </li>
            <li class="element">Vuejs<button class="trash delete">X</button> </li>
            <li class="element">Html & Css<button class="trash delete">X</button> </li>
        </ul>
        <form action="#" id="addForm">
            <input type="text" id="item" placeholder="Add" class="add"/>
            <input type="submit" class="btn-dark" id="button1" value="+"/>
            <button type="submit" class="btn-dark" id="button1" >
                <i class="material-icons">+</i>
            </button>
        </form>
    </div>

    let form = document.getElementById('addForm');
    let itemList = document.getElementById('items');
    let filter = document.getElementById('filter');
    
    filter.addEventListener('keyup', filterItem);
    
    // Call function 
    form.addEventListener('submit', runEvent);
    
    let deleteBtn = document.getElementById('items');
        deleteBtn.addEventListener('click', removeItem);
    
    // Filter Items
    function filterItem(e){
        let text = e.target.value.toLowerCase();
         
        //get Item
        let items = itemList.getElementsByTagName('li');
        Array.from(items).forEach(function(item){
            let itemArray = item.firstChild.textContent;
            if(itemArray.toLocaleLowerCase().indexOf(text) != -1){
                item.style.display = 'block';
            }
            else{
                item.style.display = 'none';
            }
        })
        
    
    
    }
    
    // Add item function
    function runEvent(e){
        e.preventDefault();
    
        // Get input value
        let inputValue = document.getElementById('item').value;
        
        // Create item
        let li = document.createElement('li');
    
        // add class to li
        li.className = 'element';
    
        // add text to li
        li.appendChild(document.createTextNode(inputValue));
        
        //push item
        itemList.appendChild(li);
        
        //create button
        let button = document.createElement('button');
    
        //add Text to botton
        button.appendChild(document.createTextNode('X'));
    
        //add classes to button;
        button.className = " trash delete";
    
        // push button to li
        li.appendChild(button);
    
    }
    
    // function remove item
    
    function removeItem(e){
        if(e.target.classList.contains('delete')){
            // eslint-disable-next-line no-restricted-globals
            if(confirm("are you sure")){
                let li = e.target.parentElement;
                itemList.removeChild(li);
            }
        }
        console.log(e.target.parentElement);
    }
    
}

