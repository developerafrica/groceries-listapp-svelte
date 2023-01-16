<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()

    export let budgetData = 0;
    export let balance = 0;
    export let extra = 0
    export let total =  0
    export let items = 0
    $: budgetToggle = false
    function budgetFunc(){
        budgetToggle = !budgetToggle        
        dispatch("budgetEvent", budgetToggle)
    }
</script>
<main>
    <div class="screen">
        <table>
            <tbody>
                <tr> <td><h1>BUDGET</h1></td> <td><p style="color: var(--dyl)">{budgetData}</p></td></tr>    
                <hr>
                <tr> <td><h1>{extra}</h1></td> <td><p style="color: var(--rc)">{balance}</p></td></tr>
                <tr> <td><h1>TOTAL</h1></td> <td><p style="color: var(--gn)">{total}</p></td></tr>
                <tr> <td><h1>ITEMS</h1></td> <td><p>+ {items}</p></td></tr>  
                <tr> <td></td> <td class="button"><button on:click={budgetFunc} >ADD BUDGET</button></td></tr>              
            </tbody>
        </table>
    </div>
</main>
<style lang="scss">
    @mixin font($c, $s, $w) {
        font-family:Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale;
        color:$c;
        font-size: $s;
        font-weight:$w;

    }
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
    
</style>