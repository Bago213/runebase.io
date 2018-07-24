exports.os = function(req, res, next) {
  switch(true)
    {
    case !!req.headers['user-agent'].match(/Win64/):
         res.os = "win64";
         res.osExt = "setup.exe";
         break;
    case !!req.headers['user-agent'].match(/Win32/):
         res.os = "win32";
         res.osExt = "setup.exe";
         break;
    case !!req.headers['user-agent'].match(/iPad/):
         res.os = "ipad";
         res.osExt = "exe";
         break;
    case !!req.headers['user-agent'].match(/iPhone/):
         res.os = "iphone";
         res.osExt = "exe";
         break;
    case !!req.headers['user-agent'].match(/Osx/):
         res.os = "osx";
         res.osExt = ".dmg";
         break;
    case !!req.headers['user-agent'].match(/Android/):
         res.os = "android";
         res.osExt = ".apk";
         break;
    case !!req.headers['user-agent'].match(/Linux/):
         res.os = "linux";
         res.osExt = ".tar.gz";
         break;
    default:
         res.os = "linux";
         res.osExt = ".tar.gz";
    }
  next();
}

