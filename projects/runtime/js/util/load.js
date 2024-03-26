(function (window) {
    window.opspark = window.opspark || {};
    
    function _url (url) {
                return new Promise(function(resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open('GET', url);
                    req.onload = function() {
                        if (req.status == 200) {
                            resolve(req.response);
                        } else {
                            reject(Error(req.statusText));
                        }
                    };
                    
                    req.onerror = function() {
                        reject(Error("Network Error"));
                    };
                    
                    req.send();
                });
            }
    
    window.opspark.load  = {
            url: _url ,
            
            json: function (url) {
              return _url(url).then(JSON.parse);
            }
        };
}(window));