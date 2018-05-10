define([
    'jquery',
    'require',
    'contents',
    'base/js/namespace',
    'base/js/utils',
    'tree/js/newnotebook',
    'base/js/i18n',
    'base/js/dialog',
    'base/js/events',
    'services/config'
], function ($,
             require,
             contents_service,
             IPython,
             utils,
             newnotebook,
             i18n,
             dialog,
             events,
             config,
             Jupyter) {
    'use strict';

	function load_ipython_extension(){
			function get_content(){
				content=JSON.stringify(Jupyter.notebook);
				return content;
			}
			
			var common_options = {
            	base_url: $('body').data().baseUrl,
            	notebook_path: $('body').data("notebookPath")
            };
			var cfg = new config.ConfigSection('tree', common_options);
        	cfg.load();
        	common_options.config = cfg;
            var common_config = new config.ConfigSection('common', common_options);
			common_config.load();
            var contents = new contents_service.Contents({
            	base_url: common_options.base_url,
            	common_config: common_config
            });
            
			var new_question = function (path, options) {
            	var fileName = options.content.cells[0].metadata.question_id;
            	var data = JSON.stringify({
               		content: options.content,
                	type: options.type
            	});
            	var settings = {
           	    	processData: false,
                	type: "PUT",
                	data: data,
                	contentType: 'application/json',
                	dataType: "json"
            	};
            return utils.promising_ajax(contents.api_url(path + '/' + fileName + '.ipynb'), settings);
        	};

	
			function addQuestionCell(question_data){
               // console.log(question_data);
                var kernel_name= "python3";
                var w=window.open(undefined, IPython._target);
                new_question(common_options.notebook_path, {type: "notebook", content: question_data}).then(
                	function (data) {

                    	var url = utils.url_path_join(
                       		common_options.base_url, 'notebooks',
                        	utils.encode_uri_components(data.path)
                    	);
						
                    	url += "?kernel_name=" + kernel_name;
                    	w.location = url;
						console.log(url);
						console.log(w.location);
               		},
                	function (error) {
                    	dialog.modal({
                        	title: i18n.msg._('Creating Notebook Failed'),
                        	body: i18n.msg.sprintf(i18n.msg._("The error was: %s"), error.message),
                        	buttons: {'OK': {'class': 'btn-primary'}}
                    	});
                	}
            	);
			}	

			function httpGetAsync(url, callback){
				var data = {"question_id": "bmljuk"};
				var xmlr = new XMLHttpRequest();
				xmlr.open('POST', url , true);
				xmlr.setRequestHeader('Content-type', 'application/json');
				xmlr.onreadystatechange = function(){
					if(xmlr.readyState == 4 && xmlr.status == 200){
						callback(JSON.parse(xmlr.responseText));
					}
				}
				xmlr.send(JSON.stringify(data));
			}

			var getQuestion = function(){
				var url = "http://localhost:5000/getQuestion";
				httpGetAsync(url,addQuestionCell);
			};

			var form = $('<div/>')
            .addClass('pull-right sort_button')
            .appendTo('#notebook_list_header');

        $('<button/>')
            .attr('type', 'button')
            .attr('id', 'new-mentor-hub')
            .addClass('btn btn-default btn-xs')
            .attr('data-toggle', 'button')
            .attr('title', 'Match case')
            .css('font-weight', 'bold')
            .text('Get Question')
            .on('click', getQuestion)
            .appendTo(form);
	}

	return {
		load_ipython_extension: load_ipython_extension
	};
});
