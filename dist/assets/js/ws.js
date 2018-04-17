document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
  var ws = new WebSocket('ws://0.0.0.0:8080');
  var el = document.getElementById('counter');
  ws.onmessage = (function(data){
    el.innerHTML = data.data;
  });
});
