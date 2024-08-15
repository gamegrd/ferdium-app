#include <napi.h>
#include <string>
#include "limit.h"

// 定义一个返回类型为 Napi String 的 greetHello 函数, 注意此处的 info
Napi::String greetHello(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  std::string result = "Init Ok";
  init_limit();
  return Napi::String::New(env, result);
}

// 设置类似于 exports = {key:value}的模块导出
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(
      Napi::String::New(env, "greetHello"), // key
      Napi::Function::New(env, greetHello)  // value
  );

  return exports;
}

NODE_API_MODULE(greet, Init)
