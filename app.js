var app = new Vue({
    el: '#converter',
    data: {
        baseOptions: [
            {text:"Select base...", value: 0},
            {text:"binary", value: 2},
            {text:"octal", value: 8},
            {text:"decimal", value: 10},
            {text:"hexadecimal", value: 16}
        ],
        targetBaseOptions: [
            {text:"Select base...", value: 0},
            {text:"binary", value: 2},
            {text:"octal", value: 8},
            {text:"decimal", value: 10},
            {text:"hexadecimal", value: 16}
        ],
        number: 1100,
        baseFrom: 2,
        baseTo: 16, 
        result: "C",
    },
    methods: {
        binaryMap: function(binary) {
            if (binary == '0000')
                return '0'
            else if (binary == '0001')
                return '1'
            else if (binary == '0010' )
                return  '2'
            else if (binary == '0011')
                return '3'
            else if (binary == '0100') 
                return '4'
            else if (binary == '0101')
                return '5'
            else if (binary == '0110')
                return '6'
            else if (binary == '0111')
                return '7'
            else if (binary == '1000') 
                return '8'
            else if (binary == '1001') 
                return '9'
            else if (binary == '1010')
                return 'A'
            else if (binary == '1011')
                return 'B'
            else if (binary == '1100') 
                return 'C'
            else if (binary == '1101') 
                return 'D'
            else if (binary == '1110')
                return 'E'
            else if (binary == '1111') 
                return 'F'
        },
        // separete givne string to length of given chunks
        separateAs: function(str, len) {
            let chunks = []
            let i = str.length;
            while (i > 0) {
                chunks.unshift(str.substring(i, i - len));
                i -= len;
            }
            return chunks;
        },
        // put 0 to make four digit
        makeFourDigit: function(digits) {
            if (digits.length == 1)
                digits = "000" + digits 
            else if (digits.length == 2)
                digits = "00" + digits 
            else if (digits.length == 3) 
                digits = "0" + digits 
            return digits;
        },
        hello: function() {
            let output = this.binaryToHex("1111")
            console.log(output)
        },
        decimalToBinary: function(decimal) {
            let result = "";
            // 10 / 2 = 5 -> 0
            //  5 / 2 = 2 -> 1
            //  2 / 2 = 1 -> 0
            //  1 / 2 = 0 -> 1
            while (Math.floor(decimal / 2) != 0) {
                result = Math.floor(decimal % 2).toString() + result;    
                decimal /= 2; 
            }
            return Math.floor(decimal % 2).toString() + result;
        },
        binaryToDecimal: function(binary) {
            let binStr = binary.toString();
            let result = 0;
            let r = 0;
            for (let i = binStr.length - 1; i >= 0; i--) {
                let digit = parseInt(binStr.substring(i, i + 1))
                result += (digit * Math.pow(2, r));
                r++;
            }
            return result;
        }, 
        /* 1. seperate binary to triple chunks
         * 2. convert each chunks to octal
         * 3. sum up each converted chunk
         */
        binaryToOctal: function(binary) {
            let binStr = binary.toString();
            let chunks = this.separateAs(binStr, 3);
            let result = "";
            // convert first part with considering possible leap  
            let firstChunk = this.makeFourDigit(chunks[0])
            result += this.binaryMap(firstChunk);
            // convert other chunks
            for (let i = 1; i < chunks.length; i++) { 
                result += this.binaryMap("0" + chunks[i]);
            }
            return result;
        },
        octalToBinary: function(octal) {
            let octalStr = octal.toString();
            result = ''  
            for (let i = 0; i < octalStr.length; i++) {
                result += this.decimalToBinary(
                    parseInt(octalStr.substring(i, i + 1)))
            }
            return result;
        },
        binaryToHex: function(binary) {
            let binStr = binary.toString();
            let chunks = this.separateAs(binStr, 4);
            let result = "";
            // convert first part with considering possible leap  
            let firstChunk = this.makeFourDigit(chunks[0])
            result += this.binaryMap(firstChunk);
            // convert other chunks
            for (let i = 1; i < chunks.length; i++) { 
                result += this.binaryMap(chunks[i]);
            }
            return result;
        },
        /* create key-value pair of first 16
         * binary and hex */
        hexToBinary: function(hex) {
        }
    }
})

