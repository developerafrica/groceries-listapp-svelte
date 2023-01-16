<script>
    import Developerafricamw from "./developerafricamw.svelte"
</script>
<ul  class="navlist">
    <li>
        <a href="/help">HELP &rarr;</a>
        <p>read brief instruction on app usage</p>
    </li>
    <li>
        <a href="https://github.com/developerafrica/groceries-listapp-svelte">GET INVOLVED AND CONTRIBUTE  &rarr;</a>
        <p>make contributions to our github project</p>
    </li>
    <li>
        <a href="tel://0880164455">CONTACT DEVELOPER AFRICA MW  &rarr;</a>
        
        <Developerafricamw />
    </li>
    <li><a href="/assets/businesscard.png" download="developerafricamw business card">DOWNLOAD OUR BUSINESS CARD </a></li>           

</ul>
<style lang="scss">
    @mixin font($c, $s, $w) {
        font-family:Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale;
        color:$c;
        font-size: $s;
        font-weight:$w;

    }
    .navlist{
        background: var(--wt);
        height: 100vh;
        width: 100%;
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
                padding: 0 15px;
                
            }
            p{
                @include font(var(--tc), 0.8rem, 500);
                padding: 0 20px;
                line-height: 1;
                                                
            }
        }
        
    }

</style>