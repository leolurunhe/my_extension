define([
    'base/js/namespace'
], function(
    Jupyter
) {
    function load_ipython_extension() {

        var handler = function () {
            fetch("http://localhost:8000", { mode:'cors',method:'POST', headers: {
            "Access-Control-Allow-Credentials" : "true",
            "Access-Control-Allow-Origin" : "http://localhost:8000",
            "Content-Type" : "application/json"
        }})
              .then((response)=>{
                console.log(response);
                return response.json();
              })
              .then((data)=>{
                alert(data.value);
              })
              .catch(error=> console.log(error));
        };

        var action = {
            icon: 'fa-comment-o', // a font-awesome class used on buttons, etc
            help    : 'Hello world!',
            help_index : 'zz',
            handler : handler
        };
        var prefix = 'my_extension';
        var action_name = 'helloworld';
        var full_action_name = Jupyter.actions.register(action, action_name, prefix);
        Jupyter.toolbar.add_buttons_group([full_action_name]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
