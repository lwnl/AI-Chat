"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var dotenv = require("dotenv");
dotenv.config();
// 替换成你的 DeepSeek API Key 和 Base URL
var API_KEY = process.env.DEEPSEEK_API_KEY;
var BASE_URL = process.env.BASE_URL; // 或官方指定的最新URL
console.log("API_KEY:", API_KEY);
console.log("BASE_URL:", BASE_URL);
function testDeepSeekAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(BASE_URL, "/chat/completions"), {
                            model: "deepseek-chat", // 或 "deepseek-v3", "deepseek-v2"
                            messages: [
                                { role: "user", content: "你好！请告诉我 1+1 等于几？" }
                            ],
                            temperature: 0.7,
                            max_tokens: 50,
                        }, {
                            headers: {
                                'Authorization': "Bearer ".concat(API_KEY),
                                'Content-Type': 'application/json',
                            },
                        })];
                case 1:
                    response = _c.sent();
                    console.log('✅ API 请求成功！响应数据：');
                    console.log(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    console.error('❌ API 请求失败：');
                    if (axios_1.default.isAxiosError(error_1)) {
                        console.error('HTTP 状态码:', (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status);
                        console.error('错误信息:', ((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data) || error_1.message);
                    }
                    else {
                        console.error('未知错误:', error_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 执行测试
testDeepSeekAPI();
