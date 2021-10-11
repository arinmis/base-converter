var app = new Vue({    el: '#converter',
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
        number: null,
        baseFrom: 0,
        baseTo: 0, 
        result: null,
        isCalculated: false,
        isErrorOccured: false,
        errorMessage: null,
    },
    methods: {
        // main program
        convert: function() {
            // two base must be selected
            if (this.baseTo == 0 || this.baseFrom == 0) {
                return;
            } 
            // don't display anyting when base same
            else if (this.baseFrom == this.baseTo) {
                // this.display(this.number);
                return;
            }
            let operation = null;
            // make input number case sensitive
            let number = this.number.toString().toUpperCase();
            // binary <-> octal
            if (this.baseFrom  == 2 && this.baseTo == 8)
                operation = this.binaryToOctal;
            else if (this.baseFrom  == 8 && this.baseTo == 2)
                operation = this.octalToBinary;
            // binary <-> decimal
            else if (this.baseFrom  == 2 && this.baseTo == 10)
                operation = this.binaryToDecimal;
            else if (this.baseFrom  == 10 && this.baseTo == 2)
                operation = this.decimalToBinary;
            // binary <-> hex 
            else if (this.baseFrom  == 2 && this.baseTo == 16)
                operation = this.binaryToHex;
            else if (this.baseFrom  == 16 && this.baseTo == 2)
                operation = this.hexToBinary;
            // octal <-> decimal 
            else if (this.baseFrom  == 8 && this.baseTo == 10)
                operation = this.octalToDecimal;
            else if (this.baseFrom  == 10 && this.baseTo == 8)
                operation = this.decimalToOctal;
            // octal <-> hex 
            else if (this.baseFrom  == 8 && this.baseTo == 16)
                operation = this.octalToHex;
            else if (this.baseFrom  == 16 && this.baseTo == 8)
                operation = this.hexToOctal;
            // decimal <-> hex 
            else if (this.baseFrom  == 10  && this.baseTo == 16)
                operation = this.decimalToHex;
            else if (this.baseFrom  == 16 && this.baseTo == 10)
                operation = this.hexToDecimal;
            // reset error status when button is pressed 
            this.isErrorOccured = false;
            this.isCalculated = false;
            // perform operation
            let output = null; 
            try {
                output = operation(number)
            }
            catch (error) {
                this.displayError(error.toString())
            }
            // put it on UI, if input valid
            if (!this.isErrorOccured)
                this.display(output);
        },
        // helper methods
        display: function(output) {
            this.result = output;
            this.isCalculated = true; // render div
        },
        displayError: function(message) {
            this.errorMessage = message;
            this.isErrorOccured = true;
        },
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
        // convert hex digit to binary
        hexMap: function(hex) {
            if (hex == '0')
                return '0'
            else if (hex == '1')
                return '1'
            else if (hex == '2' )
                return  ' 10'
            else if (hex == '3')
                return '11'
            else if (hex == '4') 
                return '100'
            else if (hex == '5')
                return '101'
            else if (hex == '6')
                return '110'
            else if (hex == '7')
                return '111'
            else if (hex == '8') 
                return '1000'
            else if (hex == '9') 
                return '1001'
            else if (hex == 'A')
                return '1010'
            else if (hex == 'B')
                return '1011'
            else if (hex == 'C') 
                return '1100'
            else if (hex == 'D') 
                return '1101'
            else if (hex == 'E')
                return '1110'
            else if (hex == 'F') 
                return '1111'
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
        // determine wheter given target consist of given charset
        isConsistOf(targetStr, validChars) {
            // check case sensitive  
            targetStr = targetStr.toString().toUpperCase();
            validChars = validChars.toUpperCase();
            for (let i = 0; i < targetStr.length; i++) {
                if (!validChars.includes(targetStr.substring(i, i + 1)))
                    return false;
            }
            return true;
        },
        isBinary: function(str) {
            let binaryDigits = "01";
            return this.isConsistOf(str, binaryDigits);
        },
        isOctal: function(str) {
            let octalDigits = "01234567";
            return this.isConsistOf(str, octalDigits);
        },
        // check wheter given string is decimal or not
        isDecimal: function(str) {
            let decimalDigits = "0123456789";
            return this.isConsistOf(str, decimalDigits);
        },
        isHex: function(str) {
            let hexDigits= "0123456789ABCDEF";
            return this.isConsistOf(str, hexDigits);
        },
        decimalToBinary: function(decimal) {
            if (!this.isDecimal(decimal)) {
                throw decimal.toString() + " is not decimal number!";
            }
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
            if (!this.isBinary(binary)) {
                throw binary.toString() + " is not binary number!";
            }
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
            if (!this.isBinary(binary)) {
                throw binary.toString() + " is not binary number!";
            }
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
        // convert octal to decimal
        // convert decimal to binary
        octalToBinary: function(octal) {
            if (!this.isOctal(octal)) {
                throw octal.toString() + " is not octal number!";
            }
            let octalStr = octal.toString();
            let result = 0;
            let r = 0;
            for (let i = octalStr.length - 1; i >= 0; i--) {
                let digit = parseInt(octalStr.substring(i, i + 1))
                result += (digit * Math.pow(8, r));
                r++;
            }
            return this.decimalToBinary(result);
        },
        binaryToHex: function(binary) {
            if (!this.isBinary(binary)) {
                throw binary.toString() + " is not binary number!";
            }
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
        hexToBinary: function(hex) {
            if (!this.isHex(hex)) {
                throw hex.toString() + " is not hex number!";
            }
            let hexStr = hex.toString();
            result = ''  
            for (let i = 0; i < hexStr.length; i++) {
                result += this.hexMap(hexStr.substring(i, i + 1))
            }
            console.log(result);
            return result;
        },
        // first convert octal to binary
        // then covert binary to hex
        octalToHex: function(octal) {
            if (!this.isOctal(octal)) {
                throw octal.toString() + " is not octal number!";
            }
            let binary = this.octalToBinary(octal);
            console.log(binary)
            return this.binaryToHex(binary);
        },
        // covert hex to binary 
        // convert binary to octal 
        hexToOctal: function(hex) {
            if (!this.isHex(hex)) {
                throw hex.toString() + " is not hex number!";
            }
            let binary = this.hexToBinary(hex);
            return this.binaryToOctal(binary);
        },
        decimalToOctal: function(decimal) {
            if (!this.isDecimal(decimal)) {
                throw decimal.toString() + " is not decimal number!";
            }
            let binary = this.decimalToBinary(decimal);
            return this.binaryToOctal(binary);
        },
        octalToDecimal: function(octal) {
            if (!this.isOctal(octal)) {
                throw octal.toString() + " is not octal number!";
            }
            let binary = this.octalToBinary(octal);
            return this.binaryToDecimal(binary);
        },
        decimalToHex: function(decimal) {
            if (!this.isDecimal(decimal)) {
                throw decimal.toString() + " is not decimal number!";
            }
            let binary = this.decimalToBinary(decimal);
            return this.binaryToHex(binary);
        },
        hexToDecimal: function(hex) {
            if (!this.isHex(hex)) {
                throw hex.toString() + " is not hex number!";
            }
            let binary = this.hexToBinary(hex);
            return this.binaryToDecimal(binary);
        },

    }

})

