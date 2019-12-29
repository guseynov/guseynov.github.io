String.prototype.queryStringToJSON = String.prototype.queryStringToJSON || function() { // Turns a params string or url into an array of params
    // Prepare
    var params = String(this);
    // Remove url if need be
    params = params.substring(params.indexOf('?') + 1);
    // params = params.substring(params.indexOf('#')+1);
    // Change + to %20, the %20 is fixed up later with the decode
    params = params.replace(/\+/g, '%20');
    // Do we have JSON string
    if (params.substring(0, 1) === '{' && params.substring(params.length - 1) === '}') { // We have a JSON string
        return eval(decodeURIComponent(params));
    }
    // We have a params string
    params = params.split(/\&(amp\;)?/);
    var json = {};
    // We have params
    for (var i = 0, n = params.length; i < n; ++i) {
        // Adjust
        var param = params[i] || null;
        if (param === null) {
            continue;
        }
        param = param.split('=');
        if (param === null) {
            continue;
        }
        // ^ We now have "var=blah" into ["var","blah"]

        // Get
        var key = param[0] || null;
        if (key === null) {
            continue;
        }
        if (typeof param[1] === 'undefined') {
            continue;
        }
        var value = param[1];
        // ^ We now have the parts

        // Fix
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
        try {
            // value can be converted
            value = eval(value);
        } catch (e) {
            // value is a normal string
        }

        // Set
        // window.console.log({'key':key,'value':value}, split);
        var keys = key.split('.');
        if (keys.length === 1) { // Simple
            json[key] = value;
        } else { // Advanced (Recreating an object)
            var path = '',
                cmd = '';
            // Ensure Path Exists
            $.each(keys, function(ii, key) {
                path += '["' + key.replace(/"/g, '\\"') + '"]';
                jsonCLOSUREGLOBAL = json; // we have made this a global as closure compiler struggles with evals
                cmd = 'if ( typeof jsonCLOSUREGLOBAL' + path + ' === "undefined" ) jsonCLOSUREGLOBAL' + path + ' = {}';
                eval(cmd);
                json = jsonCLOSUREGLOBAL;
                delete jsonCLOSUREGLOBAL;
            });
            // Apply Value
            jsonCLOSUREGLOBAL = json; // we have made this a global as closure compiler struggles with evals
            valueCLOSUREGLOBAL = value; // we have made this a global as closure compiler struggles with evals
            cmd = 'jsonCLOSUREGLOBAL' + path + ' = valueCLOSUREGLOBAL';
            eval(cmd);
            json = jsonCLOSUREGLOBAL;
            delete jsonCLOSUREGLOBAL;
            delete valueCLOSUREGLOBAL;
        }
        // ^ We now have the parts added to your JSON object
    }
    return json;
};
