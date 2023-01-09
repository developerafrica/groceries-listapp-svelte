<script>
	import Router, {link} from "svelte-spa-router";
	import Home from "./routes/index.svelte";
    import Developerafricamw from "./components/developerafricamw.svelte"
    import {menustore} from "./stores/stores"


	$: open = false;
    $: if (open == true) {
        $menustore = true
    }

    $: if (open == false) {
        $menustore = false
    }

  
</script>
<Router routes={{
	"/":Home
}}/>



<section  id="layout">
    <nav class="nav-one">
        <div class="nv">
            <div class="brand">
                <a href="/">
                    <h1>GROCERIES</h1>
                       
              </a>        
            </div>

            <button on:click={()=>{
                open = !open
               

            }}  class="menu">
                <div class:menucolor={open} class="line-1"></div>
                <div class:menucolor={open} class="line-2"></div>
            </button>           


            <div class:open={open}   class="nav-bar">
                <ul  class="navlist">
                    <li>
                        <a href="/help">HELP &rarr;</a>
                        <p>read brief instruction on app usage</p>
                    </li>
                    <li>
                        <a href="https://github.com/Peterbutao/luanar-site-svelte.git">GET INVOLVED AND CONTRIBUTE  &rarr;</a>
                        <p>make contributions to our github project</p>
                    </li>
                    <li>
                        <a href="tel://0880164455">CONTACT DEVELOPER AFRICA MW  &rarr;</a>
                        
                        <Developerafricamw />
                    </li>
                    <li><a href="/assets/businesscard.png" download="developerafricamw business card">DOWNLOAD OUR BUSINESS CARD</a></li>           

                </ul>
            </div>
        </div>
    </nav>


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

                    .navlist{
                    
                        background: var(--fb);
                        height: 100vh;
                        width: 100%;
                        
                    }
                    ul{
                        margin: 0;
                        padding: 10px;
                        padding-top: 5vh;
                        li:nth-child(4){
                            text-align: center;
                            a{
                                border: var(--gn) 1px solid;
                                display: block;
                                padding: 20px;
                                width: 80%;
                                border-radius: 5px;
                                margin: auto;
                            }
                        }
                        li{
                            list-style: none;
                            padding: 30px 10px 0 10px ;
                            a{
                                text-decoration: none;
                                @include font(var(--lbc), 0.8rem, 750);
                                                               
                            }
                            p{
                                @include font(var(--tc), 0.8rem, 500);
                                line-height: 1;
                                                               
                            }
                        }
                    }
                }
            }

        }

    }
</style>