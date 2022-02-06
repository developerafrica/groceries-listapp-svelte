<script>
    import {createEventDispatcher} from "svelte";
    export let listData;

    const dispatch = createEventDispatcher();

 
    $: toggle = true;
    $: trans= false; 

    


    const cnt = true

    function addEvent(){
        dispatch("adddispatch", cnt)
    }
    function deleteEvent(id){
       dispatch("deldispatch", id)
    }
  
  


</script>

{#each listData as dt}
<article>
    <div class="card">
        <div class="addbutton">
            <svg on:click={addEvent} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><defs><clipPath id="a"><rect width="16" height="15.999" fill="none"/></clipPath></defs><g transform="translate(-321 -292)"><rect width="30" height="30" rx="15" transform="translate(321 292)" fill="#133f4d"/><g transform="translate(328 299)" clip-path="url(#a)"><path d="M-4613,15V9h-6a1,1,0,0,1-1-1,1,1,0,0,1,1-1h6V1a1,1,0,0,1,1-1,1,1,0,0,1,1,1V7h6a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-6v6a1,1,0,0,1-1,1A1,1,0,0,1-4613,15Z" transform="translate(4620)" fill="rgba(255,255,255,0.85)"/></g></g></svg>
        </div>
        <div class="maintext">
            <div class="mntxt">
                <span>
                    <h1 >{dt.title}</h1>                    
                </span>
                <span 
                    
                    class="drop" 
                    on:click={()=>{
                        toggle = !toggle;
                        trans = !trans
                    }}
                >
                    <svg  class:trans={trans}   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 10 10"><defs><clipPath id="a"><rect width="10" height="10" fill="none"/></clipPath></defs><g clip-path="url(#a)"><path d="M6.7,8.1,2,3.4,3.4,2,6.7,5.3,10,2l1.4,1.4Z" transform="translate(-2)" fill="#133f4d"/><rect width="10" height="10" fill="none"/></g></svg>
                </span>
            </div>
        </div>
        {#if toggle == true}
        <div class="toggle">
            <div class="tg">
                <div class="category">
                    <p>
                        {dt.category.toUpperCase()}
                    </p>
                </div>
                <div class="numdetails">
                    <table>
                        <tbody>
                            <tr>
                                <td>QUANTITY</td>
                                <td class="num">: {dt.quantity}</td>
                            </tr>
                            <tr>
                                <td>PRICE</td>
                                <td class="num">: {dt.price}</td>
                            </tr>
                            <tr>
                                <td>TOTAL PRICE</td>
                                <td class="num">: {dt.total_price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/if}
        <div
         on:click={
             deleteEvent(`${dt.id}`)             
         } 
         class="deletebutton"
         >
            <p>DELETE</p>
        </div>
        
    </div>
</article>
{/each}

<style lang="scss">
    @mixin font($c, $s, $w) {
    font-family:Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    color:$c;
    font-size: $s;
    font-weight:$w;

}
.trans{
    transform: rotate(180deg) !important;
    transition: all 1s ease;
}

article{
    padding: 15px 0;

    .card{
        background: var(--fbc);
        padding: 10px;
        .addbutton{
            display: block;
            svg{
                display: flex;                    
                margin-left: auto;   
                box-shadow: #00000077 0px 4px 11px 0px;
                border-radius: 4rem;
                transition: all 1s ease;
                
                
            }
        }
        .maintext{
            padding: 10px 0;
            .mntxt{

                border-left: var(--dbc) solid 2.5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 10px;
                .drop{
                    background: rgba(0, 0, 0, 0.082);
                    padding: 5px 15px;
                }
                span{

                    h1{
                        margin:0;
                        padding:0;
                        @include font(var(--tc), 1rem, 600);
                    }
                }
            }

        }
        .toggle{
            .tg{
                .category{
                    p{

                        @include font(var(--lbc), 0.85rem, 550)
                    }
                }
                .numdetails{

                    display: flex;
                    table{
                        border-spacing: 10px;
                        margin-left: auto;
                        tbody{
                            tr{
                                .num{

                                    @include font(var(--lbc), 0.85rem, 550)
                                }
                                td{

                                    @include font(var(--tc), 0.85rem, 550)
                                }
                            }
                        }
                    }
                }
            }
        }
        .deletebutton{
            background: var(--dbc);
            width: 100px;
            border-radius: 4rem;
            box-shadow: #00000085 0px 5px 11px 0px;
            text-align:center;
            padding: 0.5px 15px;
            p{
                
                @include font(var(--lc), 1rem, 500)
            }
        }


    }
}

</style>