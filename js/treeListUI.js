function InitUITreeList(root) {

	var treedata= getFileAll(root);

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
        openEditor(obj.parentPath,obj.value);
    }); 


    console.log(treedata)
}


function getFileAll(root,parentId) {
    var list = getFileList(root,"*");
    console.log("getFileList",list);


    var treedata=[];
    for (var i = 0; i < list.length; i++) {
        var id = ""+(i+1);
        if (parentId) {
            id = parentId+"."+id;
        }
        if ( list[i].name!="." && list[i].name!="..") {
            var item = { id:id, value:list[i].name,parentPath:root };
            treedata.push(item); 
            //Dir 类型继续搜索
            if (list[i].type=="dir" ) {

                var subList = getFileAll(root+"/"+item.value,id);

                if (subList.length>0) {
                    item.data=subList;
                }
            }
        }
        
       
    }

    return treedata;
}

function getFileList(root,filter) {
	return LomoX.dir.entryList(root,filter)
}

function openEditor(path,fileName)
{
    console.log(path)

    $$("openFilePath").setValue(fileName);
    var fileData = LomoX.file.readFileData(path+"/"+fileName,"txt","utf-8");

    // var value = fileData.replace(/\n  /g, "\n") + "\n";
    console.log(typeof(fileData));

    if (typeof(fileData)=="string") {
        codeEditor.setValue(fileData);
    }else{
        // alert("目录不是文件");
    }

    
}