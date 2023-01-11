<svelte:head>    
    <title>grocery cart | HOME</title>
    <meta name="description" content="luanar bssy timetable">
    <meta name="author" content="peter butao">
    <meta name="theme-color" content="#f5f5f5">

</svelte:head>
<script>
     import {menustore} from "../stores/stores"
    
    class GroceriesObj{
        constructor(title,quantity,price,img) {
            this.id = `${this.uuid()}-${this.uuid()}`;
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



        uuid() {

            const str1 = 'abcdefghijklm';
            const num1 = Math.floor(Math.random() * 13);
            const strNum1 = num1 - 1
            const subStr1 = str1.substring(strNum1, num1);
            const idNum1 = Math.floor(Math.random() * 9);
            const str = 'nopqrstuvwxyz';
            const num = Math.floor(Math.random() * 13);
            const strNum = num - 1

            const subStr = str.substring(strNum, num);
            const idNum = Math.floor(Math.random() * 9);

            

            const id  = `${subStr1}${idNum1}${subStr}${idNum}`;



            if (id.length == 3) {

                const num2 = `${Math.floor(Math.random() * 9)}`;

                const idMod = id + num2 ;

                return idMod;

            }else if(id.length == 2){

                const numM1 = `${Math.floor(Math.random() * 9)}`;
                const numM2 = `${Math.floor(Math.random() * 9)}`;

                const idMod2 = id + numM1 + numM2 ;

                return idMod2;

                
            }else{
                return id;
            };
        };
       

        
    }



    import Card from "../components/card.svelte";
    $:toggle = false;
    $:budgetToggle = false;
    $:error = false;

    //data
  

    
    //input bind
    let nm = "";
    let qn = 1;
    let pr = 0;

    const key =  "BUTAO-GLA-V1.0.0";
    const budgetKey =  "BUTAO-GLA-V1.0.0-BUDGET";
    
    let listData = [];
    let budgetData = 0;




    if(localStorage.getItem(key) !== null){
        const localdata  = localStorage.getItem(key);
        const newdata = JSON.parse(localdata) 
        
        listData = [...newdata]                     
    }
    if(localStorage.getItem(budgetKey) !== null){
        const localbudgetdata  = localStorage.getItem(budgetKey);
        const newdata = JSON.parse(localbudgetdata) 
        
        budgetData = newdata                     
    }

    
    function dispatchadd(e){
        toggle = e.detail
    }

    function budgetFunc(){
        budgetData = budget == ""?0:budgetData;
        if (budget !== ""){ 
    
          
            
            if(localStorage.getItem(budgetKey) === null) {
                budgetData = budget
                localStorage.setItem(budgetKey, JSON.stringify(budgetData))
            }else{
                budgetData = JSON.parse(localStorage.getItem(budgetKey))
                budgetData = budget
                localStorage.setItem(budgetKey, JSON.stringify(budgetData))
            }

            budgetToggle = !budgetToggle
            
        };

    }
  
    
    function submit(e){
        e.preventDefault();
        const data =  new GroceriesObj(nm,qn,pr,"img.png");
        
        if (nm == "" ){
            error = true
            setTimeout(() => {
                error  = false                
            }, 5000);
        };
        
        
        if (nm !== ""){ 

          
            
            if(localStorage.getItem(key) === null) {
                listData = [...listData, data];
                localStorage.setItem(key, JSON.stringify(listData))
            }else{
                listData = JSON.parse(localStorage.getItem(key))
                listData = [...listData, data]
                localStorage.setItem(key, JSON.stringify(listData))
            }

            nm = "";
            toggle = !toggle
            
        };
    }
    
    function dispatchdel(e){
        

        const delId = e.detail;
        listData = JSON.parse(localStorage.getItem(key))
        const newListData = listData.filter(item =>{ return item.id !== delId });
        
        localStorage.setItem(key, JSON.stringify(newListData))
        listData = [...newListData];
        

    }

    $: items = listData.length;
    $: total = listData.reduce((a,b)=>{
        return a + b.total_price
    },0);

    let budget = "";
    $: balance = (budgetData !== "")? (budgetData - total) : 0;
    $: extra = balance < 0 ? "EXTRA" : "BALANCE"

</script>
<article>
    {#if !$menustore}
    <main>
        <div class="screen">
            <table>
                <tbody>
                    <tr> <td><h1>BUDGET</h1></td> <td><p style="color: var(--dyl)">{budgetData}</p></td></tr>    
                    <hr>
                    <tr> <td><h1>{extra}</h1></td> <td><p style="color: var(--rc)">{balance}</p></td></tr>
                    <tr> <td><h1>TOTAL</h1></td> <td><p style="color: var(--gn)">{total}</p></td></tr>
                    <tr> <td><h1>ITEMS</h1></td> <td><p>+ {items}</p></td></tr>  
                    <tr> <td></td> <td class="button"><button on:click={()=>{budgetToggle = !budgetToggle}} >ADD BUDGET</button></td></tr>              
                </tbody>
            </table>
        </div>
    </main>
    {/if}

    <div class="form">


        <form  class:toggle={toggle} >
            <div class="frm">
                <button on:click={()=>{toggle = !toggle}} class="removebutton">
                    CLOSE
                </button>
                <div class:trueerror={error} class="error">
                    <p>
                        error ! // fields cannot be empty
                    </p>
                </div>
                <div class="fields">
                    <div class="fld">  

                        <div class="name">      <input bind:value={nm} placeholder="NAME" type="text"></div>

                        <div class="quantity"> 
                            <label for="quantity">QUANTITY OF ITEMS TO BE PURCHASED</label>
                             <input bind:value={qn} placeholder="QUANTITY" type="number">
                        </div>

                        <div class="price">    
                            <label for="price">PRICE OF ITEM</label>
                             <input bind:value={pr} placeholder="PRICE" type="number">
                        </div>

                     

                        <div class="button"> <button on:click={submit} >SUBMIT</button>  </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="form">


        <form  class:toggle={budgetToggle} >
            <div class="frm">
                <div class:trueerror={error} class="error">
                    <p>
                        error ! // fields cannot be empty
                    </p>
                </div>
                <div class="fields">
                    <div class="fld">  


                        <div class="budget"> 
                            <label for="budget">ENTER YOUR BUDGET</label>
                             <input bind:value={budget} placeholder="BUDGET" type="number">
                        </div>


                    </div>
                </div>
                
                <button on:click={budgetFunc} class="removebudget">
                    <p>DONE</p>                   
                </button>
            </div>
        </form>
    </div>
    
    <article>
        
        <Card 
        {listData}
        on:adddispatch={dispatchadd}
        on:deldispatch={dispatchdel}
        />
    </article>   
     {#if !$menustore}

        <div class="footer">
            <footer>

                <button class:grey={toggle} on:click={()=>{toggle = !toggle}} class="initialadd">
                    <div class="initadd">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><defs><clipPath id="a"><rect width="16" height="15.999" fill="none"/></clipPath></defs><g transform="translate(-321 -292)"><rect width="30" height="30" rx="15" transform="translate(321 292)" fill="#ffffff"/><g transform="translate(328 299)" clip-path="url(#a)"><path d="M-4613,15V9h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6V1a1,1,0,0,1,1-1,1,1,0,0,1,1,1V7h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-4613,15Z" transform="translate(4620)" fill="#000"/></g></g></svg>
                    </div>
                </button>
            </footer>
        </div>
    {/if}
    


</article>

<style lang="scss">
    @mixin font($c, $s, $w) {
        font-family:Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale;
        color:$c;
        font-size: $s;
        font-weight:$w;

    }
    .trueerror{
        opacity: 100% !important;
        transition: 1s all ease-in-out;
        background: rgba(255, 0, 0, 0.323);
        border-radius: 4px;
        padding: 3px 8px;
        pointer-events: all !important;

    }
    .toggle{
        clip-path: circle(1500px);
        -webkit-clip-path: circle(1500px);
        pointer-events: all;
        transition: 1s all ease-in-out;

    }
    .grey{
        filter: grayscale(100%);
    }
    article{

        main{

            position: fixed;
            z-index: 10;
            width: 100%;
            top: 8vh;
           
            .screen{

                padding: 0 10px;
                table{  
                    background: var(--wt);
 
                    border-radius: 4px;
                    width: 100%;
                    padding: 10px;
                    box-shadow: #0000002c 0px 3px 11px 0px;
                    tbody{
                        width: 100%;
                        tr{
                            td{
                                text-align: end;

                              
                                h1{
                                    padding:0;
                                    margin: 3px 0;
                                    @include font(var(--tc), 0.8rem, 500);
            
                                }
                                p{
                                    margin: 3px 0;
                                    padding: 0;
                                    @include font(var(--tc), 0.9rem, 500);
            
                                }

                                
                                button{
                                    border: none;
                                    padding: 10px;
                                    background: var(--yl);
                                    border-radius: 5px;
                                    @include font(var(--tc), 0.8rem, 750);
        
                                }
                                
                            }
                        }
                    }

                }
            }
        }
        .form{
            position: relative;
            
            
        }
        form{
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            background: rgba(0, 0, 0, 0.241);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            clip-path: circle(0px at 50%); 
            -webkit-clip-path: circle(0px at 50%); 
            transition: 1.3s all ease-in-out;
            background: url('../assets/wave.jpg');
            background-size: cover;
            background-color:#0000003b;
            background-blend-mode: multiply;

    
            .frm{
                padding: 10px;
                width: 100%;
                text-align: end;
                .removebudget{
                    margin: 10px 0;
                    width: 100%;
                    border: none;
                    background: var(--yl);
                    padding: 5px 15px;
                    border-radius: 5px;
                    p{
                        @include font(var(--lc), 0.87rem, 600);

                    }
                  
                   
                }
                .removebutton{
                    margin: 10px 0;
                    border: none;
                    background: red;
                    border-radius: 5px;
                    padding: 5px;
                    @include font(var(--wt), 0.87rem, 500);
                }
                .error{
                    margin:10px 0;
                    
                    padding: 3px 8px;
                    text-align: center;
                    transition:1s all ease-in-out;
                    opacity: 0;
                    pointer-events:none;
                    p{
                        @include font(var(--wt), 0.87rem, 500);
                    }
                }
                .fields{
                    .fld{
                        div{
                            padding: 5px 0 ;
                            label{
                                @include font(var(--tc), 0.85rem, 750);
                                padding: 5px;
                                
                            }
                            button{
                                background: var(--yl) ;
                                padding:15px;
                                text-align: center;
                                @include font(black, 0.9rem, 600);
                                cursor: pointer;
                                border-radius: 5px;


                            }
                            input{
                                border-radius: 5px;
                                border: black 1px solid;
                                box-shadow: rgba(0, 0, 0, 0.467)px 4px 4px 0px;
                                width: 100%;
                                padding: 15px ;
                                @include font(black, 0.85rem, 500);
                            }
                            input:focus{
                                outline: none;
                            }
                        }
                    }
                }
            }

        }
        article{
            padding-top: 45vh;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 10vh;

        }
        .footer{
            footer{
                position: fixed;
                z-index: 10;
                left: 0;
                bottom: 0;
                width: 100%;
                .initialadd{
                    width: 100%;
                    background: none;
                    border: none;
                    margin: 0 0 5px 0;
                    .initadd{
                        background: var(--wt);
                        border-radius: 5px;
                        padding: 10px;
                        border: black solid 1px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        

                        
                    }
                }
            }
        }
    }
</style>