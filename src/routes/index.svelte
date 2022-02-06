<svelte:head>    
    <title>luanar timetable | HOME</title>
    <meta name="description" content="luanar bssy timetable">
    <meta name="author" content="peter butao">
    <meta name="theme-color" content="#f5f5f5">

</svelte:head>
<script>
    
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

    <main>
        <div class="screen">
            <table>
                <tbody>
                    <tr> <td><h1>BUDGET</h1></td> <td><p style="color: var(--lbc)">{budget}.00</p></td><td on:click={()=>{budgetToggle = !budgetToggle}} style="width:30px !important;" ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><defs><clipPath id="a"><rect width="16" height="15.999" fill="none"/></clipPath></defs><g transform="translate(-321 -292)"><rect width="30" height="30" rx="15" transform="translate(321 292)" fill="#fff"/><g transform="translate(328 299)" clip-path="url(#a)"><path d="M-4613,15V9h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6V1a1,1,0,0,1,1-1,1,1,0,0,1,1,1V7h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-4613,15Z" transform="translate(4620)" fill="#133f4d"/></g></g></svg></td>  </tr>
                    <hr>
                    <tr> <td><h1>BALANCE</h1></td> <td><p style="color: var(--rc)">{balance}.00</p></td></tr>
                    <tr> <td><h1>TOTAL</h1></td> <td><p style="color: var(--grc)">{total}</p></td></tr>
                    <tr> <td><h1>ITEMS</h1></td> <td><p>+ {items}</p></td></tr>                
                </tbody>
            </table>
        </div>
    </main>

    <div class="form">


        <form  class:toggle={toggle} >
            <div class="frm">
                <div class="removebutton">
                    <svg on:click={()=>{toggle = !toggle}} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
                        <defs>
                            <filter id="a" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
                                <feOffset dy="3" input="SourceAlpha"/>
                                <feGaussianBlur stdDeviation="3" result="b"/>
                                <feFlood flood-opacity="0.388"/>
                                <feComposite operator="in" in2="b"/>
                                <feComposite in="SourceGraphic"/>
                            </filter>
                            
                            <clipPath id="c">
                                <rect width="16" height="15.999" fill="none"/>
                            </clipPath>
                        </defs>
                        
                        <g transform="translate(-312 -116)">
                            <g transform="matrix(1, 0, 0, 1, 312, 116)" filter="url(#a)">
                                <rect width="48" height="48" rx="15" transform="translate(0 0)" fill="#E3ECF5"/>
                            </g>
                            <g transform="translate(328 129)" clip-path="url(#c)">
                                <path d="M-4613,15V9h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6V1a1,1,0,0,1,1-1,1,1,0,0,1,1,1V7h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-4613,15Z" transform="translate(3274.833 3263.52) rotate(45)" fill="#133F4D"/>
                            </g>
                        </g>
                    </svg>

                </div>
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

    <div class="footer">
        <footer>

            <div class:grey={toggle} on:click={()=>{toggle = !toggle}} class="initialadd">
                <div class="initadd">
                    <p>ADD</p>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><defs><clipPath id="a"><rect width="16" height="15.999" fill="none"/></clipPath></defs><g transform="translate(-321 -292)"><rect width="30" height="30" rx="15" transform="translate(321 292)" fill="#133f4d"/><g transform="translate(328 299)" clip-path="url(#a)"><path d="M-4613,15V9h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6V1a1,1,0,0,1,1-1,1,1,0,0,1,1,1V7h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-4613,15Z" transform="translate(4620)" fill="rgba(255,255,255,0.85)"/></g></g></svg>
                </div>
            </div>
        </footer>
    </div>
    


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
            z-index: 99;
            width: 100%;
            top: 12vh;
           
            .screen{

                padding: 0 20px;
                table{  
                    background: seashell;
                    filter: blur(100%);
                    border-radius: 4px;
                    width: 100%;
                    padding: 10px;
                    box-shadow: #0000002c 0px 3px 11px 0px;
                    tbody{
                        tr{
                            td{

                                h1{
                                    padding:0;
                                    margin: 5px 0;
                                    @include font(var(--tc), 1rem, 500);
            
                                }
                                p{
                                    margin:5px 0;
                                    padding: 0;
                                    @include font(var(--tc), 1rem, 600);
            
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

    
            .frm{
                background-color: var(--dbc);
                border-radius: 10px;
                padding: 20px;
                width: 80%;
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
                    svg{
                        display: flex;                    
                        margin-left: auto;   
                        box-shadow: #00000083 0px 5px 11px 4px;
                        border-radius: 4rem;
                        transition: all 1s ease;
                        width: 40px;
                        height: 40px;
                      
                    }
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
                            padding: 10px 0 ;
                            label{
                                @include font(white, 0.85rem, 600);

                            }
                            p{
                                border: var(--lbc) solid 1px;
                                padding:10px;
                                text-align: center;
                                @include font(white, 1rem, 600);
                                cursor: pointer;


                            }
                            select{
                                border: red solid 1px;
                                width: 100%;
                                position: relative;
                                option{
                                    border: blue solid 1px;
                                }
                            }
                            input{
                                border:none;
                                border-left: var(--dbc) 3px solid;
                                background: var(--fbc);
                                box-shadow: #00000077 0px 4px 11px 0px;
                                width: 100%;
                                padding: 10px;
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
                .initialadd{
                    position: fixed;
                    z-index: 10;
                    left: 0;
                    bottom: 0;
                    margin: 10px;
                    background: var(--lbc);

                    .initadd{
                        padding: 0px 10px;
                        display: flex;
                        align-items: center;

                        p{
                            @include font(var(--lc), 1rem, 650);
                            padding: 0px 10px;
                        }
                    }
                }
            }
        }
    }
</style>