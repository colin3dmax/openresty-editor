function InitUITreeList(root) {

	var list = getFileList(root,"*");
	console.log(list);


	var treedata=[];
	for (var i = 0; i < list.length; i++) {
		var item = { id:i+1, value:list[i] };
		treedata.push(item); 
	}

	webix.protoUI({
    name:"edittree"
    }, webix.EditAbility, webix.ui.tree);

    var tree = webix.ui({
        id:"treeList",
        container:$$("leftTree"),
        view:"edittree",
        select:true,
        editable:false,
        editor:"select",
        editValue:"value",
        options:["The Shawshank Redemption", "The Godfather" ],
        data: webix.copy(treedata),
        on: {"itemClick": function () {
        	console.log("clicked  item..");
        	// alert("item has just been clicked");
        }}
    });


    $$("onlineEditor").bind( $$("treeList"), "$data", function(obj, source){
        // console.log(source)
        openEditor(obj.value);
    }); 


    console.log(smalltreedata)
}


function getFileList(root,filter) {
	return LomoX.dir.entryList(root,filter)
}

function openEditor(path)
{
    // LomoX.file.readFileData(path);
    LomoX.file.readFileData("/Users/colin3dmax/Work/openresty-ide/index.html");
}