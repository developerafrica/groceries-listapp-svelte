<article class="help">
    <div class="art-hlp">
        <ul>
            <li>
                <h1>BUDGET</h1>
                <h4>the total amount you want to spend </h4>
                <p></p>
                <p></p>
            </li>
            <li>
                <h1>BALANCE</h1>
                <h4>the remaining amount of money the user has after making a purchase. </h4>
                <p></p>
                <p></p>
            </li>
            <li>
                <h1>TOTAL</h1>
                <h4>the sum of all purchases the user has made </h4>
                <p></p>
                <p></p>
            </li>
            <li>
                <h1>ITEMS</h1>
                <h4>the number of items the user has purchased </h4>
                <p></p>
                <p></p>
            </li>
            <li>
                <h1>EXTRA</h1>
                <h4>extra required cash needed above your current budget </h4>
                <p></p>
                <p></p>
            </li>
        </ul>
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
    article{
        padding: 15px;
        .art-hlp{
            background: #F7FDF7;
            ul{
                padding: 15px;
                li{
                    h1{
                        @include font(var(--gn), 0.85rem, 500)
                    }
                    h4{
                        @include font(var(--tc), 0.7rem, 500)
                    }
                }
            }
        }
    }
</style>