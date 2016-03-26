var codeEditor;


webix.ready(function(){
    var frame = webix.ui({
            container:"main_window",
            id:"layout",
            width:500,
            height:500,
            view:"layout",
            rows:[
                {
                    view:"toolbar",
                    height:40,

                    elements:[
                        { 
                          view:"button", 
                          type:"icon", icon:"cog",
                          label:"开始", 
                          width:60 ,
                          click:function(){
                            alert("start");
                          }
                        },
                        { view:"button", type:"icon", icon:"cog",label:"停止", width:60 ,
                          click:function(){
                            alert("stop");
                          }},
                        { gravity:1 },
                        { view:"label", label:"Openresty Editor" },
                        { gravity:1 },
                    ]
                },
                {cols:[
                    {
                        id:"leftTree",
                        template:"左侧目录区",
                        width:100,
                        minWidth:50,
                        maxWidth:150
                    },
                    {
                        view:"resizer",
                        id:"resizer1"
                    },
                    {   
                        rows:[
                                {
                                    id:"openFilePath",
                                    view:"label",
                                    align:"left",
                                    label:"file.txt",
                                },
                                {
                                    id:"onlineEditor",  //"编辑区"

                                },
                                {
                                    view:"resizer",
                                    id:"resizer2",
                                },
                                 {
                                    view:"label",
                                    align:"left",
                                    label:"log日志输出:",
                                },
                                {
                                    id:"logArea",

                                    view:"list",
                                      template:"#id#. #title#",
                                      pager:{   
                                        size:6,
                                        group:1
                                      },
                                      data:[
                                         {"id":1,"title":"log 1"},
                                         {"id":2,"title":"Item 2"},
                                         {"id":3,"title":"Item 3"},
                                         {"id":4,"title":"Item 4"},
                                         {"id":5,"title":"Item 5"},
                                         {"id":6,"title":"Item 6"},         
                                      ]


                                }
                            ]
                    },
                    {
                        view:"resizer",
                        id:"resizer3"
                    },
                    {
                        view:"layout",
                        rows:[
                            {
                                 view:"search", 
                                  placeholder:"Search..", 
                                  width: 300
                              },
                              {
                                id:"infoArea",
                                view:"list",
                                template:"#id#. #title#",
                                pager:{   
                                  size:4,
                                  group:1
                                },
                                data:[
                                   {"id":1,"title":"Item 1"},
                                   {"id":2,"title":"Item 2"},
                                   {"id":3,"title":"Item 3"},
                                   {"id":4,"title":"Item 4"},
                                   {"id":5,"title":"Item 5"},
                                   {"id":6,"title":"Item 6"},         
                                ]
                             }
                        ]
                    }
                    
                ],
                }
            ]
        });
    frame.show();

   InitUITreeList( "/Users/colin3dmax/Work/nginx_demo" );
    // $$("onlineEditor").$view.onchange=function(){
    //     console.log("change")
    //     ResizeCodeEditor();
    // }

    // webix.attachEvent("onSwipeX",function(start_context,current_context){
    //     console.log("onSwipeX.......")
    //     ResizeCodeEditor();
    // });

    

    $$("infoArea").attachEvent("onViewResize", function(context, ev){
            console.log("drag.......")
            ResizeCodeEditor();
        });
    $$("logArea").attachEvent("onViewResize", function(context, ev){
            console.log("drag.......")
            ResizeCodeEditor();
        });

    $$("treeList").attachEvent("onViewResize", function(context, ev){
            console.log("drag.......")
            ResizeCodeEditor();
        });



    InitResizeWindow();


    initOnLineEditor();
});

function initOnLineEditor() {
     var value = "// The bindings defined specifically in the Sublime Text mode\nvar bindings = {\n";
  var map = CodeMirror.keyMap.sublime;
  for (var key in map) {
    var val = map[key];
    if (key != "fallthrough" && val != "..." && (!/find/.test(val) || /findUnder/.test(val)))
      value += "  \"" + key + "\": \"" + val + "\",\n";
  }
  value += "}\n\n// The implementation of joinLines\n";
  value += CodeMirror.commands.joinLines.toString().replace(/^function\s*\(/, "function joinLines(").replace(/\n  /g, "\n") + "\n";

  // value = "//insert code here";
  var editorContainer = $$("onlineEditor");
  codeEditor = CodeMirror($$("onlineEditor").$view, {
    value: value,
    lineNumbers: true,
    viewportMargin: Infinity,
    mode: "javascript",
    keyMap: "sublime",
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: "monokai",
    tabSize: 2 }
    );
  ResizeCodeEditor();
}


function InitResizeWindow() {
    ResizeWindow();
    window.onresize=function() {
        ResizeWindow();
    }
}

function ResizeWindow() {
    var mainWin = $$("layout");
    mainWin.define("width", window.innerWidth);
    mainWin.define("height", window.innerHeight);
    mainWin.resize();
    ResizeCodeEditor();
}

function ResizeCodeEditor(){
    if (codeEditor) {
        var editorContainer = $$("onlineEditor");
        codeEditor.setSize(editorContainer.$width, editorContainer.$height);
    }
}