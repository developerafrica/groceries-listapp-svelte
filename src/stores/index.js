import { writable } from "svelte/store";
import {uuid} from "../lib/uuid"
class GroceriesObj{
    constructor(title,quantity,price,img) {
        this.id = `${uuid()}-${uuid()}`;
        this.date = this.date();
        //params
        this.title = title.toUpperCase();
        this.quantity = quantity;
        this.price = price;
        

        //calc & img
        this.total_price = quantity * price;
        this.img = `/images/${img}.jpg`;
        
    };
    date () {
        const dateIn = new Date();
        return dateIn.toLocaleDateString();
    };
}


export const groceryObject = writable(GroceriesObj)