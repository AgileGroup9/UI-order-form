
import React from "react";
import Small_item from "./Items";


// Main Application
// Renders a form and keeps track of items the client has selected
class App extends React.Component {
    constructor(props){
        super(props);

        // Hard coded list of items
        // TODO: retrive items and price from server-side api
        this.list_items = new Map([
        ["Picollo" ,175],
        ["Grande" ,265],
        ["Salami mild 20kr / 5 skivor" ,20],
        ["Salami stark 20kr / 5 skivor" ,20],
        ["ParmaSkinka 20kr / 5 skivor",20],
        ["Prosciutto Cotto 20kr / 5 skivor" ,20],
        ["Buffelmozzarella 25kr / 125g",25],
        ["Extra deg 35kr",35],
        ]);

        // Use list_items to create a key-map for tracking the users shopping cart
        this.state = {
            cart : new Map( Array.from(this.list_items.keys()).map((e) => [e,0]) ),
            email : "",
            name : "",
            tel : "",
            addr : "",
            code : "",
            post_nr : "",
        };

        // Required for intercepting onChange events from <input>
        this.handle_detail_update = this.handle_detail_update.bind(this);
    }


    handle_cart_update(item,delta){
        const newValue = this.state.cart.get(item) + delta;
        this.setState({
        cart : this.state.cart.set(item,newValue),
        delivery_method : this.state.delivery_method,
        });
    }

    handle_detail_update(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
        [name]: value    });
    }

    render() {
        // Render toppings dynamicaly
        // Remove pizza-kit from list_items, then map each element to a tag
        const toppings = Array.from(this.list_items.keys()).slice(2);
        const toppings_list = toppings.map((t) => {
            return(<Small_item
                name={t} 
                count={this.state.cart.get(t)}
                onClick={(name,delta) => this.handle_cart_update(name,delta)}
            />);
        });

        const kostnad = Array.from(this.state.cart.entries()).map((e) => [e[0],e[1] * this.list_items.get(e[0])] );
        const sum = kostnad.reduce((acc,val) => acc + val[1], 0);

        // Renders form. For info about how to add stuff, google jsx
        // TODO: remove inline css (code smell)
        return(
            <div class="container-fluid " style={{"max-width": "800px;"}}>
                <div>
                    <div class="form-group">
                        <label>Storlek på pizzakit:</label>
                        <div>
                            <div class="kit-size">
                            {/* TODO, Dynamicaly render pizza-kit sizes*/}
                            <Small_item 
                                name="Picollo" 
                                count={this.state.cart.get("Picollo")}
                                onClick={(name,delta) => this.handle_cart_update(name,delta)}
                                desc={"- kit för 2 pizza"}
                            />
                            </div>
        
                            <div class="kit-size">
                                <Small_item
                                    name="Grande" 
                                    count={this.state.cart.get("Grande")}
                                    onClick={(name,delta) => this.handle_cart_update(name,delta)}
                                    desc={"- kit för 4 pizza"}
                                />
                            </div>
                        </div>
                        <div style={{"padding-top": "10px"}}>
                            <small class="form-text text-muted"> I alla pizzakit ingår Tomatsås, San Marzano Fior di Latte
                                (mozarella) samt en basilikakruka</small>
                        </div>
                    </div>
                    <div class="h-divider"></div>

                    <div class="form-group">
                        <h4>Välj toppings:</h4>
                        {/*Extras are rendered here*/ toppings_list}
                    </div>
                    <div class="h-divider"></div>

                    <h4 style={{"padding-top": "15px", "padding-bottom":"10px"}}> <b>Totalkostnad:</b> {sum}kr</h4>
        
                    <div id="detail-form">
                        <div class="form-group smal" style={{"max-width": "250px"}} id="email">
                            <label for="exampleInputEmail1">Email:</label>
                            <input type="email" name="email" onChange={this.handle_detail_update} class="form-control" id="exampleInputEmail1" placeholder="exempel@mail.se"/>
                        </div>
                        <div class="form-group smal" id="tele">
                            <label>Telefonnummer:</label>
                            <input type="tel" name="tel" onChange={this.handle_detail_update} class="form-control" aria-describedby="emailHelp" placeholder="070......."/>
                        </div>
                        <div class="form-group smal">
                            <label>Namn:</label>
                            <input type="text" name="name" onChange={this.handle_detail_update} class="form-control" aria-describedby="emailHelp" placeholder="Glen Glensson"/>
                        </div>
                        <div class="form-group smal" >
                            <label>Leveransaddress</label>
                            <input type="text" name="addr" onChange={this.handle_detail_update} class="form-control" aria-describedby="emailHelp" placeholder="Pizzagatan 123"/>
                        </div>
                        <div class="form-group smal" >
                            <label>Postkod:</label>
                            <input type="text" name="post_nr" onChange={this.handle_detail_update} class="form-control" aria-describedby="emailHelp" placeholder="123 45"/>
                        </div>
                        <div class="form-group smal" >
                            <label>Portkod:</label>
                            <input type="text" name="code" onChange={this.handle_detail_update} class="form-control" aria-describedby="emailHelp" placeholder="0001"/>
                        </div>
                    </div>
                    <div class="h-divider"></div>
                    <div id="final-form">
                        <textarea rows="2" cols="30" placeholder="Kommentarer"></textarea>
                        <button href="https://bottegamenomale.se/" class="btn btn-primary">Gå till betalning</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
