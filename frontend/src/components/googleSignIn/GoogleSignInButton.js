"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoogleSignInButton;
var google_1 = require("@react-oauth/google");
var material_1 = require("@mui/material");
var fc_1 = require("react-icons/fc");
function GoogleSignInButton(_a) {
    var onSuccess = _a.onSuccess, onError = _a.onError;
    return (<google_1.GoogleLogin onSuccess={onSuccess} onError={onError} render={function (renderProps) { return (<material_1.Button variant="outlined" className="flex items-center justify-center gap-2 border-gray-300 shadow-sm hover:bg-gray-100 transition-all duration-300 py-2 px-4 rounded-lg" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <fc_1.FcGoogle className="text-2xl"/>
          Sign in with Google
        </material_1.Button>); }}/>);
}
