

//create api with localstorage


class groceriesObj{
    constructor(id,title,price,img,category, src,amount, dur) {
        this.id = id;
        this.date = this.date();
        this.title = title;
        this.img = `/images/${img}.jpg`;
        this.category = category;
        this.amount = amount;
        this.price = price;
        this.source = src;
        this.duration= `${dur} months`;
        this.total_price = amount * price;
        
    };
    date () {
        const dateIn = new Date();
        return dateIn.toLocaleDateString();
    }

    
}


        const cosmetics = [
            new groceriesObj("k8s1", "face wash", 1300, "facewash_img", "cosmetics", "wu-han",1, 2 ),
            new groceriesObj("k8s1", "face foam", 1300, "facefoam_img", "cosmetics", "wu-han",1, 2 ),
        ];

        const kitchen = [
            new groceriesObj("9ne0", "tinned fish", 650, "tinnedfish_img", "kitchen", "any", 4, 1),
            new groceriesObj("pwe0", "irish potatoes", 1000, "irishpotatoes_img", "kitchen", "any", 1, 2),
            new groceriesObj("9nma", "spaghetti", 450, "spaghetti_img", "kitchen", "any", 10, 6),
            new groceriesObj("9ms0", "cooking oil", 3800, "cookingoil_img", "kitchen", "any", 1, 2),
            new groceriesObj("9nf0", "maize flour", 400, "maizeflour_img", "kitchen", "any", 4, 1),
            new groceriesObj("9560", "rice", 950, "rice_img", "kitchen", "any", 2, 1),

        ];

        const dailys = [        


            new groceriesObj("k8s1", "sugar", 750, "sugar_img", "dailys", "any", 5, 6 )     , 
            new groceriesObj("g6n7","milk", 3500, "milk_img", "dailys", "any", 1, 1),            
            new groceriesObj("3p45","bathing soap", 750,"bathingsoap_img", "dailys", "any", 10, 6),
            new groceriesObj("g6r5","washing powder", 3000, "washingsoap_img", "dailys", "any", 1, 3),
            new groceriesObj("i9v0","colgate", 0, "colgate_img", "dailys", "any", 1, 6),

            new groceriesObj("i9f1","tooth brush", 1000, "toothbrush_img", "dailys", "any",1, 6),
            new groceriesObj("i3j2","tissue", 0, "tissue_img", "dailys", "any", 10, 6),
            new groceriesObj("i9l8","body spray", 2100, "bodyspray_img", "dailys", "any", 1, 6),            
            new groceriesObj("j6s1", "hard covers", 800, "hardcovers_img", "dailys", "any", 3, 6 ),

            new groceriesObj("j6s2", "pens", 100, "pens_img", "dailys", "any", 10, 6 ),
            new groceriesObj("j6s3", "body lotion", 1600, "bodylotion_img", "dailys", "any",1, 2),
            new groceriesObj("j6s4", "washing tablets", 200, "washingtablets_img", "dailys", "any",10, 6),
            new groceriesObj("jk24", "belly house", 1200, "bellyhouse_img", "dailys", "any",1, 1),


            new groceriesObj("g237","first choice", "5000", "firstchoice_img", "dailys", "daily products lmt", 1, 1),            

        ];
       

console.log({dailys, cosmetics})