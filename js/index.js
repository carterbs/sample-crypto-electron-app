const url = require('url')
const path = require('path')

var vm=new Vue({
    el:'#app',
    data: {
        keyword:'',
        mode: 'encrypt',
        messageText: '',
        cipherText: '',
        cipherWindow:null,
        alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    },
    methods: {
        setMode:function(mode){
            this.mode=mode;
        },
        handleKeyup: function () {
            if(!this.cipherWindow) this.createCipherWindow();
            if (this.mode == 'encrypt') {
                this.encrypt();
            } else {
                this.decrypt();
            }
        },
        encrypt: function () {
            var cleanedKeyword=this.keyword.replace(/\W/g, '').split('').filter(function (value, index, self) {
                return self.indexOf(value) === index;
            }),
            plainText=this.messageText.split(''),
            alphabet=this.alphabet;

            //Set the cipherALphabet = to the keyword. Then go through the alphabet, letter by letter, adding whatever letters
            //aren't in the keyword.
            var cipherAlphabet = cleanedKeyword;
            alphabet.forEach(function (letter) {
                if (cipherAlphabet.indexOf(letter) === -1) {
                    cipherAlphabet.push(letter);
                }
            });

            //Go through each letter of the plaintext message. For each letter, get the corresponding letter in the cipherAlphabet.
            //If in the cipher Alphabet, the 1st letter is z, all a's will become z. If it isn't a letter, just add it to the end.
            var cipherText = [];
            plainText.forEach(function (letter) {
                if (alphabet.indexOf(letter) > -1) {
                    cipherText.push(cipherAlphabet[alphabet.indexOf(letter)]);
                } else {
                    cipherText.push(letter);
                }

            });
            //take the array of letters and combine it into a string.
            this.cipherText=cipherText.join('');
            this.sendCipherText();             
        },
        decrypt: function () {

        },
        sendCipherText:function(){
            if(!this.cipherWindow) this.createCipherWindow();
            this.cipherWindow.postMessage(this.cipherText,'*');
        },
        createCipherWindow: function () {
            // and load the index.html of the app.
            this.cipherWindow=window.open(url.format({
                pathname: path.join(__dirname, 'cipherText.html'),
                protocol: 'file:',
                slashes: true
            }), '', 'x=801,y=300')
        }
    }
})


window.addEventListener('message', function(e){
    var message=e.data;
    if(e.data=='requestCipherText'){
        vm.sendCipherText();
    }
});