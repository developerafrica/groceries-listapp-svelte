<svelte:head>    
    <title>grocery cart | HOME</title>
    <meta name="description" content="luanar bssy timetable">
    <meta name="author" content="peter butao">
    <meta name="theme-color" content="#f5f5f5">

</svelte:head>
<script>
     import {menustore} from "../stores/stores"
    
    class GroceriesObj{
        constructor(title,category,quantity,price, src, dur,img) {
            this.id = `${this.uuid()}-${this.uuid()}`;
            this.date = this.date();
            //params
            this.title = title.toUpperCase();
            this.category = category;
            this.quantity = quantity;
            this.price = price;
            this.source = src;
            this.duration= `${dur} months`;

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
    let ct = "";
    let qn = 1;
    let pr = 0;
    let src = "";
    let dur = "";

    const key =  "BUTAO-GLA-V1.0.0";
    
    let listData = [];




    if(localStorage.getItem(key) !== null){
        const localdata  = localStorage.getItem(key);
        const newdata = JSON.parse(localdata) 
        
        listData = [...newdata]                     
    }

    
    function dispatchadd(e){
        toggle = e.detail
    }
  
    
    function submit(e){
        e.preventDefault();
        
        balanceFunc();

        const data =  new GroceriesObj(nm,ct,qn,pr, src,dur,"img.png");
        
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
    $: balance = "";

    function balanceFunc(){
        if(budget == ""){
            budget = 0
        }
        balance = budget - total;
        console.log({balance})
    };


    console.log({balance})
  



</script>
<article>
    {#if !$menustore}
    <main>
        <div class="screen">
            <table>
                <tbody>
                    <tr> <td><h1>BUDGET</h1></td> <td><p style="color: var(--dyl)">{budget}.00</p></td>  </tr>
                    
                    <hr>
                    <tr> <td><h1>BALANCE</h1></td> <td><p style="color: var(--rc)">{balance}.00</p></td></tr>
                    <tr> <td><h1>TOTAL</h1></td> <td><p style="color: var(--grc)">{total}</p></td></tr>
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

                        <div class="source"> 
                            <label for="source">SOURCE // SHOP OF PURCHASE </label>
                             <input bind:value={src} placeholder="SOURCE" type="text">
                        </div>
                        

                        <div class="duration">                             
                             <label for="duration">DURATION</label>
                             <select bind:value={dur} name="duration" >
                                <option value="1">1 month</option>
                                <option value="2">2 months</option>
                                <option value="3">3 months</option>
                                <option value="4">4 months</option>
                                <option value="5">5 months</option>
                                <option value="6">6 months</option>
                            </select>
                        </div>

                        <div class="category">                             
                             <label for="catergory">CATERGORY</label>
                             <select bind:value={ct} name="catergory" >
                                <option value="daily">daily</option>
                                <option value="cosmetics">cosmetics</option>
                                <option value="kitchen">kitchen</option>
                            </select>
                        </div>

                        <div class="button"> <p on:click={submit} >SUBMIT</p>  </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="form">


        <form  class:toggle={budgetToggle} >
            <div class="frm">
                <div on:click={()=>{budgetToggle = !budgetToggle}} class="removebudget">
                    <p>close</p>
                      

                </div>
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


                        <div class="button"> <p on:click={balanceFunc} >SUBMIT</p>  </div>
                    </div>
                </div>
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

                <div class:grey={toggle} on:click={()=>{toggle = !toggle}} class="initialadd">
                    <div class="initadd">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><defs><clipPath id="a"><rect width="16" height="15.999" fill="none"/></clipPath></defs><g transform="translate(-321 -292)"><rect width="30" height="30" rx="15" transform="translate(321 292)" fill="#ffffff"/><g transform="translate(328 299)" clip-path="url(#a)"><path d="M-4613,15V9h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6V1a1,1,0,0,1,1-1,1,1,0,0,1,1,1V7h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-4613,15Z" transform="translate(4620)" fill="#000"/></g></g></svg>
                    </div>
                </div>
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
                    width: 20%;
                    background: red;
                    p{
                        padding: 10px 15px;
                        box-shadow: #00000083 0px 5px 11px 4px;
                        @include font(var(--lc), 0.87rem, 500);

                    }
                  
                   
                }
                .removebutton{
                    margin: 10px 0;
                    border: none;
                    background: red;
                }
                .error{
                    margin:10px 0;
                    
                    padding: 3px 8px;

                    transition:1s all ease-in-out;
                    opacity: 0;
                    pointer-events:none;
                    p{
                        @include font(var(--lc), 0.87rem, 500);
                    }
                }
                .fields{
                    .fld{
                        div{
                            padding: 5px 0 ;
                            label{
                                @include font(var(--dyl), 0.85rem, 750);
                                padding: 5px;
                                
                            }
                            p{
                                background: var(--yl) ;
                                padding:15px;
                                text-align: center;
                                @include font(black, 0.9rem, 600);
                                cursor: pointer;
                                border-radius: 5px;


                            }
                            select{
                                border: black 1px solid;
                                width: 100%;
                                position: relative;
                                padding: 13px;
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
                    border: black solid 1px;
                    background: var(--wt);
                    margin: 10px 30px;
                    border-radius: 5px;
                    .initadd{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 10px;

                        
                    }
                }
            }
        }
    }
</style>