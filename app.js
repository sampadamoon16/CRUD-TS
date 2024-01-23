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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
// import  express, { Request, Response } from 'express';
var express = require("express");
var mysql = require("mysql2/promise");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
app.use(express.json());
var pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: process.env.DB_PASS,
    port: 3306,
    database: 'tscrud',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
var getConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.getConnection()];
            case 1:
                connection = _a.sent();
                return [2 /*return*/, connection];
            case 2:
                error_1 = _a.sent();
                console.error('Error getting database connection:', error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
app.post('/postdata', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, data, sql, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getConnection()];
            case 1:
                connection = _a.sent();
                data = req.body;
                sql = 'INSERT INTO user SET ?';
                return [4 /*yield*/, connection.query(sql, [data])];
            case 2:
                result = (_a.sent())[0];
                connection.release();
                console.log('Data Post Successfully....');
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error:', error_2);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/getdata', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, sql, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getConnection()];
            case 1:
                connection = _a.sent();
                sql = 'SELECT * FROM user';
                return [4 /*yield*/, connection.query(sql)];
            case 2:
                result = (_a.sent())[0];
                connection.release();
                console.log('Data Get Successfully...');
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error('Error:', error_3);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/dataupdate/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, id, data, sqlQuery, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getConnection()];
            case 1:
                connection = _a.sent();
                id = req.params.id;
                data = req.body;
                sqlQuery = 'UPDATE user SET ? WHERE id = ?';
                return [4 /*yield*/, connection.query(sqlQuery, [data, id])];
            case 2:
                result = (_a.sent())[0];
                connection.release();
                console.log('Data Update Successfully...');
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error('Error:', error_4);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/deletedata/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, id, sqlQuery, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getConnection()];
            case 1:
                connection = _a.sent();
                id = req.params.id;
                sqlQuery = 'DELETE FROM user WHERE id = ?';
                return [4 /*yield*/, connection.query(sqlQuery, id)];
            case 2:
                result = (_a.sent())[0];
                connection.release();
                console.log('Data Delete Successfully...');
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error('Error:', error_5);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var PORT = 5500;
app.listen(PORT, function () {
    console.log("Server Started On ".concat(PORT));
});
