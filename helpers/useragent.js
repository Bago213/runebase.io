exports.os = function(req, res, next) {
  switch(true)
    {
    case !!req.headers['user-agent'].match(/Win64/):
         res.os = "win64";
         break;
    case !!req.headers['user-agent'].match(/Win32/):
         res.os = "win32";
         break;
    case !!req.headers['user-agent'].match(/iPad/):
         res.os = "ipad";
         break;
    case !!req.headers['user-agent'].match(/iPhone/):
         res.os = "iphone";
         break;
    case !!req.headers['user-agent'].match(/Osx/):
         res.os = "osx";
         break;
    case !!req.headers['user-agent'].match(/Android/):
         res.os = "android";
         break;
    case !!req.headers['user-agent'].match(/Linux/):
         res.os = "linux";
         break;
    default:
         res.os = "linux";
    }
  next();
}

