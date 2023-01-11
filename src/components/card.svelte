<script>
    import {createEventDispatcher} from "svelte";
    export let listData;

    const dispatch = createEventDispatcher();

 
    $: toggle = false;
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
       <div class="maintext">
            <div class="mntxt">
                <span>
                    <h1 >{dt.title}</h1>                    
                </span>
                <button                     
                    class="drop" 
                    on:click={()=>{
                        toggle = !toggle;
                        trans = !trans
                    }}
                >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8114 5.18639L4.05702 11.9298L2.19299 12.4013C2.45615 12.818 2.5329 13.0373 2.52194 13.1469L3.07018 10.943L9.8136 4.18858C9.93422 4.07893 10 3.92542 10 3.74998C10 3.41007 9.71492 3.12498 9.37501 3.12498C9.19957 3.12498 9.04606 3.19077 8.93641 3.31139L1.92983 10.307L1.29387 12.8838C1.19518 13.3991 1.60088 13.8048 2.11623 13.7061L4.69299 13.0702L11.6886 6.06358C11.8092 5.95393 11.875 5.80042 11.875 5.62498C11.875 5.28507 11.5899 4.99998 11.25 4.99998C11.0746 4.99998 10.9211 5.06577 10.8114 5.18639ZM11.6886 6.06358L12.6206 5.13156C13.3882 4.36402 13.4101 3.13595 12.6316 2.3684C11.864 1.5899 10.636 1.61183 9.86843 2.37937L8.93641 3.31139C8.81579 3.42104 8.75001 3.57455 8.75001 3.74998C8.75001 4.0899 9.03509 4.37498 9.37501 4.37498C9.55044 4.37498 9.70395 4.30919 9.8136 4.18858L10.7456 3.25656C11.0965 2.91665 11.4145 2.90569 11.7544 3.2456C12.0943 3.58551 12.0833 3.90349 11.7434 4.25437L10.8114 5.18639C10.6908 5.29604 10.625 5.44955 10.625 5.62498C10.625 5.9649 10.9101 6.24998 11.25 6.24998C11.4254 6.24998 11.579 6.18419 11.6886 6.06358ZM11.6886 5.18639L9.8136 3.31139C9.70395 3.19077 9.55044 3.12498 9.37501 3.12498C9.03509 3.12498 8.75001 3.41007 8.75001 3.74998C8.75001 3.92542 8.81579 4.07893 8.93641 4.18858L10.8114 6.06358C10.9211 6.18419 11.0746 6.24998 11.25 6.24998C11.5899 6.24998 11.875 5.9649 11.875 5.62498C11.875 5.44955 11.8092 5.29604 11.6886 5.18639Z" fill="black"/>
                    </svg>
                    
                </button>
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
        {#if toggle !== true}
        <div class="toggle">
            <div class="tg">
                <div class="numdetails">
                    <table>
                        <tbody>
                            <tr>
                                <td class="num">: {dt.price}</td> 
                                <td class="num">x {dt.quantity}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/if}
        <div class="foot">

            <button
             on:click={
                 deleteEvent(`${dt.id}`)             
             } 
             class="deletebutton"
             >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M18 18C18 19.2632 17.2632 20 16 20H8C6.73684 20 6 19.2632 6 18V7H18V18ZM20 18V5H4V18C4 20.2456 5.75439 22 8 22H16C18.2456 22 20 20.2456 20 18ZM3 7H5C5.54386 7 6 6.54386 6 6C6 5.45614 5.54386 5 5 5H3C2.45614 5 2 5.45614 2 6C2 6.54386 2.45614 7 3 7ZM21 5H19C18.4561 5 18 5.45614 18 6C18 6.54386 18.4561 7 19 7H21C21.5439 7 22 6.54386 22 6C22 5.45614 21.5439 5 21 5ZM15 2H9C8.45614 2 8 2.45614 8 3C8 3.54386 8.45614 4 9 4H15C15.5439 4 16 3.54386 16 3C16 2.45614 15.5439 2 15 2ZM11 17V10C11 9.45614 10.5439 9 10 9C9.45614 9 9 9.45614 9 10V17C9 17.5439 9.45614 18 10 18C10.5439 18 11 17.5439 11 17ZM15 17V10C15 9.45614 14.5439 9 14 9C13.4561 9 13 9.45614 13 10V17C13 17.5439 13.4561 18 14 18C14.5439 18 15 17.5439 15 17Z" fill="#FD2222" fill-opacity="0.63"/>
                 </svg>
                
            </button>
            <p class="num"> {dt.total_price}</p>
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
article{
    padding: 10px 0;

    .card{
        background: var(--wt);
        padding: 0px 10px;
        box-shadow: #0000002c 0px 3px 11px 0px;
       
        .maintext{
            padding: 6px 0;
            .mntxt{

                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 10px;
                .drop{
                    background: rgba(0, 0, 0, 0.082);
                    padding: 8px 10px;
                    border-radius: 4rem;
                    border: none;
                }
                span{

                    h1{
                        border-left: var(--dbc) solid 2.5px;
                        margin:0;
                        padding:0 10px;
                        @include font(var(--tc), 0.9rem, 500);
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
        .foot{
            display: flex;
            justify-content: space-between;
            p{
                @include font(var(--tc), 0.85rem, 550)
            }

        }
        .deletebutton{
            background: rgba(255, 0, 0, 0.163);
            border: none;
            text-align:center;
            padding: 0;
            margin: 0;
            height: 40px;
            width: 80px;
            border-radius: 4rem;
            svg{
                width: 20px;
            }
            
            
        }


    }
}

</style>