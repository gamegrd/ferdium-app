{
  "targets": [
    {
      "target_name": "xgplugin",
      "target_outputs" : {
      "library_dir" : "../../extensions/cxx",
      },
      "cflags!": [ "-fno-exceptions"],    
      "cflags_cc!": ["-fno-exceptions"],
      "sources": [
        "./src/cxx/index.cpp",
        "./src/cxx/limit.cpp"
      ],
      "include_dirs": [                    
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [
        'NAPI_DISABLE_CPP_EXCEPTIONS'
      ],
    }
  ]
} # type: ignore
