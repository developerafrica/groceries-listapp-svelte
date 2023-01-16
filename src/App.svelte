<svelte:head>    
    <title>grocery cart | HOME</title>
    <meta name="description" content="luanar bssy timetable">
    <meta name="author" content="peter butao">
    <meta name="theme-color" content="#f5f5f5">

</svelte:head>
<script>

    import {groceryObject} from "./stores/index.js"
    import Screen from "./components/screen.svelte"
    import Menu from "./components/menu.svelte"
    import Card from "./components/card.svelte";
    import {blur} from "svelte/transition"

    let GroceriesObj = $groceryObject

	$: open = false;        
    $: toggle = false;
    $: budgetToggle = false;
    $: error = false;
   
    //input bind
    let nm = "";
    let qn = 1;
    let pr = 0;
    
    let listData = [];
    let budgetData = 0;

    const key =  "BUTAO-GLA-V1.0.0-item";
    const budgetKey =  "BUTAO-GLA-V1.0.0-BUDGET";
    

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
    function budgetDispatch(e){
        budgetToggle = !budgetToggle
    }

    $: items = listData.length;
    $: total = listData.reduce((a,b)=>{
        return a + b.total_price
    },0);

    let budget = "";
    $: balance = (budgetData !== "")? (budgetData - total) : 0;
    $: extra = balance < 0 ? "EXTRA" : "BALANCE"

    

  
</script>

<section  id="layout">
    <header>
        <nav class="nav-one">
            <div class="nv">
                <div class="brand">
                    <a href="/">
                        <h1>BUDGET</h1>                    
                  </a>        
                </div>
    
                <button on:click={()=>{open = !open}}  class="menu">
                    <div class:menucolor={open} class="line-1"></div>
                    <div class:menucolor={open} class="line-2"></div>
                </button>           
    
    
                <div class:open={open}   class="nav-bar">
                    <Menu />
                </div>
            </div>
        </nav>
    </header>
    <main>
        <article>
            {#if open == false}
            <section class="screen-section">
                <Screen
                on:budgetEvent = {budgetDispatch}
                {extra}
                {items}
                {balance}
                {total}
                {budgetData}
                />
            </section>
            {/if}
            {#if toggle == true}
            <section transition:blur={{duration:3000 }} class="itemsform-section">
                   <div class="form">
                        <form   >
                            <div class="frm">
                                <button on:click|preventDefault={()=>{toggle = !toggle}} class="removebutton">
                                    CLOSE
                                </button>
                                <div class:trueerror={error} class="error">
                                    <p>
                                        <strong>ERROR ! </strong>strong> fields cannot be empty
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

            </section>
            {/if}
            {#if budgetToggle == true}
            <section transition:blur={{duration:3000 }} class="budgetform-section">
                <div class="form">
                    <form  >
                        <div class="frm">
                            <div class:trueerror={error} class="error">
                                <p>
                                    <strong>ERROR !</strong> fields cannot be empty
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
                            
                            <button on:click|preventDefault={budgetFunc} class="removebudget">
                                <p>DONE</p>                   
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            {/if}
            <section class="cards-section">
                <article>
        
                    <Card 
                    {listData}
                    on:adddispatch={dispatchadd}
                    on:deldispatch={dispatchdel}
                    />
                </article> 
            </section>
            {#if open == false}
            <section class="add-section">
                <div class="footer">
                    <footer>
        
                        <button on:click={()=>{toggle = !toggle}} class="initialadd">
                            <div class="initadd">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><defs><clipPath id="a"><rect width="16" height="15.999" fill="none"/></clipPath></defs><g transform="translate(-321 -292)"><rect width="30" height="30" rx="15" transform="translate(321 292)" fill="#ffffff"/><g transform="translate(328 299)" clip-path="url(#a)"><path d="M-4613,15V9h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6V1a1,1,0,0,1,1-1,1,1,0,0,1,1,1V7h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-4613,15Z" transform="translate(4620)" fill="#000"/></g></g></svg>
                            </div>
                        </button>
                    </footer>
                </div>
            </section>
            {/if}

        </article>
    </main>
    <footer></footer>


</section>

<style lang="scss">
    :global(body) {
        color: blue;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background: #F7FDF7;
    }    
    :root{
        //v2
        --gn: #113C11;
        --yl: #F5BF00;
        --dyl: hsl(47, 100%, 30%);
        --wt: white;
        --rc: red;
        //new
        --dbc: #133F4D;
        --lbc: #2699FB;
        --fbc: #E3ECF5;
        --tc:hsl(0, 0%, 25%);
        
        --nv:#133f4d;
    }   
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
    #layout{

        .nav-one{
            z-index: 9;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            
            .nv{

                padding-bottom: 10vh;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: linear-gradient(var(--gn) 0, rgba(255, 255, 255, 0.604) 100%);
                .menu{
                    padding: 15px 20px ;
                    position: relative;
                    z-index: 999;
                    border: none;
                    background: none;

                    div{
                        width: 23px;
                        height: 3px;
                        background: var(--wt);
                        
                    }
                     .menucolor{
                         background: var(--tc);
                         
                     }
                    .line-2{
                        margin: 5px 0px;
                        width: 12px;
                    }
                   
                    
                }
                .brand{
                    padding: 0px 10px;
                    a{
                        display: flex;
                        align-items: center;
                        padding: 3px 15px;
                        text-decoration: none;
                        h1{
                            padding: 0px 15px;
                            @include font(var(--wt), 1rem, 500);  
                            font-weight: 490 !important;
                            letter-spacing: 1.3px;
                        }
                    }
                }
                .open{
                    width: 100% !important;
                    transition: all 1s ease !important;
                    opacity: 100% !important;
                    pointer-events: all !important;
                }
                .nav-bar{
                    z-index: 100 !important;
                    position: fixed;
                    top: 0;
                    right: 0;
                    opacity: 0;
                    width:0;
                    height: 100vh;
                    overflow: hidden;
                    padding: 0;
                    transition: all 0.5s ease;
                    pointer-events: none;
                }
            }

        }
        main{
            article{
                main{
                    position: fixed;
                    z-index: 10;
                    width: 100%;
                    top: 8vh;
                }
                .budgetform-section,
                .itemsform-section{
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 100;
                    background: rgba(0, 0, 0, 0.241);
                    min-height: 100vh;
                    transition: 1.3s all ease-in-out;
                    background: url('../assets/wave.jpg');
                    background-size: cover;
                    background-color:#0000003b;
                    background-blend-mode: multiply;
                    
                    form{
                        display: flex;
                        align-items: center;
                        justify-content: center;
    
    
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
                                padding: 15px;
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
                }
                article{
                    padding-top: 45vh;
                    padding-left: 10px;
                    padding-right: 10px;
                    padding-bottom: 30vh;

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
        }
    }
</style>