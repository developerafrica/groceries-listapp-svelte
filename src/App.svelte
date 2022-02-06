<script>
	import Router, {link} from "svelte-spa-router";
	import Home from "./routes/index.svelte";


	$: open = false;
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

            <div on:click={() => {open = !open}} class="menu">
                <div class="line-1"></div>
                <div class="line-2"></div>
            </div>           


            <div class:open={open}  on:click={() => {open = !open}} class="nav-bar">
                <ul  class="navlist">
                    <li><a href="https://github.com/Peterbutao/luanar-site-svelte.git">GET INVOLVED</a></li>
                    <li><a href="https://github.com/Peterbutao/luanar-site-svelte.git">DOCS</a></li>
                    <li><a href="https://github.com/Peterbutao/luanar-site-svelte.git/licence">LICENCE</a></li>
                    <li><a href="tel://0880164455">CONTACT</a></li>            

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
    }
    
    :root{
        //new
        --dbc: #133F4D;
        --lbc: #2699FB;
        --fbc: #E3ECF5;
        --gc: #F5F5F5;
        --lc:seashell;
        --rc:red;
        --grc: hsl(120deg 100% 18%);
        --tc:hsl(0, 0%, 25%);
        
        //old
        --bc:hsl(0, 0%, 95%);
        --nv:#133f4d;
        --bl:#2699fb;
        --fb:#EBF1F6;
        --fm: #d3dee7;
        --tbc: #d3dee7;
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
            z-index: 80;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            
            .nv{
                padding: 30px 0;
                padding-bottom: 40px;
                box-shadow: #0000002c 0px 3px 11px 0px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: var(--dbc);
                .menu{
                    padding: 20px 10px;
                    position: relative;
                    z-index: 99;
                    div{
                        width: 20px;
                        height: 3px;
                        background: var(--lc);
                     
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
                            @include font(var(--lc), 1rem, 500);  
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
                    z-index: 100;
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
                        width: 80%;
                        
                    }
                    ul{
                        margin: 0;
                        padding-top: 50vh;
                        li{
                            list-style: none;
                            padding: 20px 10px;
                            a{
                                text-decoration: none;
                                @include font(var(--tc), 0.95rem, 500);
                                
                                span{
                                    padding: 0px 5px;
                                    svg{
                                        filter: grayscale(50%);
                                    }
                                }
                                
                            }
                            &:hover{
                                background: #2699fb;
                            }
                        }
                    }
                }
            }

        }

    }
</style>