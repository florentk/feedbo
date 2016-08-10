console.log("add functions !");

if (!Array.prototype.filter)
{
   console.log("add filter function !");
   Array.prototype.filter = function(fun /*, thisp*/)
   {
      var len = this.length;
      if (typeof fun != "function")
      throw new TypeError();
      
      var res = new Array();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
      {
         if (i in this)
         {
            var val = this[i]; // in case fun mutates this
            if (fun.call(thisp, val, i, this))
            res.push(val);
         }
      }
      return res;
   };
}

if (!Array.prototype.map)
{
   console.log("add map function !");
   Array.prototype.map = function(fun /*, thisp*/)
   {
      var len = this.length;
      
      if (typeof fun != "function")
      throw new TypeError();
      
      var res = new Array(len);
      var thisp = arguments[1];
      
      for (var i = 0; i < len; i++)
      {
         if (i in this)
         res[i] = fun.call(thisp, this[i], i, this);
      }
      return res;
   };
}
