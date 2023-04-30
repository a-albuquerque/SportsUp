// An Interactive Bar Chart Generator Library
function IBCG() {
    this.container = null;
    this.component = null;
    this.canvas = null;
    this.table = null;
    this.state = {
        'select_mapping': [['Default', 1]]
    };
    this.current_graph = 1;
    this.import_string = '';
}

IBCG.prototype = {
    init: function (container) {
        this.container = document.querySelector(container);
        console.log('Container Set');
        return this;
    },

    render: function () {
        let starting_state = '<div id="inner-container"> <div> <span class="label w-30">Select Graph</span> <select id="select-graph" class="select w-65" name="chart"> <option value="1">Default</option></select> </div> <br> <div name="create-graph"> <input id="graph-name" class="input w-65" placeholder="Enter New Graph Name Here" type="text"> <button id="create-graph-button" class="input-button w-30">Create Graph</button> </div> <br> <div name="import-export"> <input class="input w-65" placeholder="State" type="text" id="state-output"> <button id="import-state" class="input-button w-15">Import</button> <button id="export-state" class="input-button w-15">Export</button> </div> <br> <div id="table-graph" name="table-graph"> <div id="canvas-container"> <canvas id="main-canvas" class="main-canvas"></canvas> </div> <div id="table-container"> <table id="data-table"> <tr> <th>Name</th> <th>Value</th> </tr> <tr> <td> <input class="name" type="text" name="name" id="name" > </td> <td> <input class="val" type="text" name="val" id="val" > </td> </tr> <tr> <td> <input class="name" type="text" name="name" id="name" > </td> <td> <input class="val" type="text" name="val" id="val" > </td> </tr> <tr> <td colspan="2"> <button id="add-row-button" class="w-100 input-button">Add Row</button> </td> </tr> </table> </div> </div> </div>';
        this.container.innerHTML = starting_state;
        this.canvas = this.container.querySelector('#main-canvas');
        this.table = this.container.querySelector('#data-table');
        
        this.event_listeners();
        
        return this;
    },

    event_listeners: function () {
        
        this.container.querySelector('#add-row-button').addEventListener(
            "click",
             this.table_add_row.bind(this),
             false
        );

        this.container.querySelector('#create-graph-button').addEventListener(
            "click",
             this.create_graph.bind(this),
             false
        );

        this.container.querySelector('#select-graph').addEventListener(
            "change",
             this.switch_graph.bind(this),
             false
        );        

        this.container.querySelector('#import-state').addEventListener(
            "click",
             this.import_state.bind(this),
             false
        );

        this.container.querySelector('#export-state').addEventListener(
            "click",
             this.export_state.bind(this),
             false
        );
        
        window.addEventListener(
            "keyup",
            this.render_the_graph.bind(this),
            false
        );

    },



    table_add_row: function (e) {
        var r = this.table.insertRow(this.table.rows.length-1);
        r.innerHTML = '<td> <input class="name" type="text" name="name" id="name" > </td> <td> <input class="val" type="text" name="val" id="val" > </td>';
    },

    table_delete_all_value_rows: function () {
        for(var i = 1; i<this.table.rows.length-1;){
            this.table.deleteRow(i);
        }
    },

    table_create_new: function () {

        for (var i = 0; i < 2; i++){
            var r = this.table.insertRow(this.table.rows.length-1);
            r.innerHTML = '<td> <input class="name" type="text" name="name" id="name" > </td> <td> <input class="val" type="text" name="val" id="val" > </td>';    
        }

    },

    table_restore: function (e) {
        
        var tn = this.state[this.current_graph].table_names
        var tv = this.state[this.current_graph].table_vals

        for(var i = 0; i < tn.length; i++){
            var r = this.table.insertRow(this.table.rows.length-1);
            r.innerHTML = '<td> <input value="' + tn[i] + '" class="name" type="text" name="name" id="name" > </td> <td> <input value="' + tv[i] + '" class="val" type="text" name="val" id="val" > </td>';
        }

    },

    render_the_graph: function () {

        let graph_inputs = this.container.getElementsByClassName('val')

        let graph_values = [].slice.call(graph_inputs).map(
            function(element){return element.value;}
        );

        for (let i = graph_values.length - 1; i >= 0; i--) {
            if (!(/^\d+$/.test(graph_values[i]))) {
              graph_values.splice(i, 1);
            }
        }

        var c = this.canvas;
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);

        var cycle_colour = ["#FF0000", "#00FF00", "#0000FF"]
        var per_bar_width = c.width / graph_values.length;
        var max_val = Math.max.apply(Math, graph_values);
        var val_mult_const = (0.75 * c.height) / max_val;
        var normalised_height = graph_values.map(x => x * val_mult_const);

        

        normalised_height.forEach((x, i) => {
            ctx.fillStyle = cycle_colour[i % cycle_colour.length];
            ctx.fillRect(i * per_bar_width, c.height - x, per_bar_width, x);
        });

        return this;

    },

    create_graph: function(){

        select_control = this.container.querySelector('#select-graph');        

        this.state['select_mapping'].push([
            this.container.querySelector('#graph-name').value,
            select_control.children.length + 1
        ]);

        option = document.createElement( 'option' );
        option.text = this.container.querySelector('#graph-name').value;
        this.container.querySelector('#graph-name').value = '';
        option.value = select_control.children.length + 1;
        select_control.add( option );
        


        alert('New Graph Created!');
        return this;
    },

    switch_graph: function(){
        this.save_current_table();
        
        // Wipe
        this.table_delete_all_value_rows();
        this.render_the_graph();

        if(!(this.current_graph in this.state)){
            // Create 2 new rows
            this.table_create_new();
        }else {
            // Reinstanitate rows
            this.table_restore();
            this.render_the_graph();
        }
    },

    save_current_table: function(){
        let e_table_vals = this.container.getElementsByClassName('val')
        let e_table_names = this.container.getElementsByClassName('name')
        
        let table_vals = [].slice.call(e_table_vals).map(
            function(element){return element.value;}
        );

        let table_names = [].slice.call(e_table_names).map(
            function(element){return element.value;}
        );
        
        this.state[this.current_graph] = {
            'table_names' : table_names,
            'table_vals' : table_vals
        }

        this.current_graph = this.container.querySelector('#select-graph').value;

    },

    export_state: function(){
        this.save_current_table();
        var state_str = JSON.stringify(this.state);
        var encoded_str = btoa(state_str);
        this.container.querySelector('#state-output').value = encoded_str;
    },

    import: function(import_string){
        this.import_string = import_string;
        this.import_state();  
        return this;
    },

    import_state: function(){

        if (this.import_string.length !== 0){
            var decoded_str = atob(this.import_string);
            this.import_string = '';
        }else {
            var decoded_str = atob(this.container.querySelector('#state-output').value);
        }
        
        this.container.querySelector('#state-output').value = '';
        
        this.state = JSON.parse(decoded_str);

        // Re-Render
        this.table_delete_all_value_rows();
        this.render_the_graph();
        this.table_restore();
        this.render_the_graph();

        // Select Option Render

        select_control = this.container.querySelector('#select-graph');        
        select_control.innerHTML = '';
        
        for (var i = 0; i < this.state['select_mapping'].length; i++){
            var pair = this.state['select_mapping'][i]
            option = document.createElement( 'option' );
            option.text = pair[0];
            option.value = pair[1];
            select_control.add( option );
        }
        
    },

    render_deprecated: function () {
        this.component = document.createElement('div');
        this.component.style = 'background-color: coral';
        this.component.innerHTML = 'Hello';
        this.container.append(this.component);
        console.log('Injected');
        return this;
    }
}