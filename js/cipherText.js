var vm=new Vue({
    el:'#app',
    data: {
        cipherText: '',
    },
    methods: {
        receiveCipherText: function (cipherText) {
            this.cipherText=cipherText;            
        },
    }
});

window.addEventListener("message",function(message){
    vm.receiveCipherText(message.data);
});
document.addEventListener("DOMContentLoaded", function() { 
    window.opener.postMessage("requestCipherText", '*');
});
