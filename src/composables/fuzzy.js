export const fuzzy = {
    fuzzysearch(array, keys, pattern) {
        if (!Array.isArray(array) || array.length === 0) {
            console.log("Yea, this is not an array: "+array);
            return array;
        };
        let regex = pattern.value;
        if (!this.isValidRegex(pattern.value)) {
            try {
                regex = this.stringToRegex(String(pattern.value))
            } catch (e) {
                console.log(pattern.value + " is not valid regex")
                return array
            }
        }

        const newArr = array.map(Obj => {
            let flatString = '';
            for(const element of keys) {
                if (!Obj[element]) {
                    return;
                }
                flatString += String(Obj[element] + ' ')
            }
            Obj.matches = ((flatString || '').match(regex) || []).length;
            return Obj;
        })

        return newArr.filter(item => item.matches > 0).sort((a, b) => (a.matches > b.matches) ? 1 : -1)

    },
    createFlatStringKeys(array, keys) {
        const newArr = array.map(Obj => {
            Obj.flatString = ''
            for(const element of keys) {
                if (!Obj[element]) {
                    return;
                }
                Obj.flatString += String(Obj[element] + ' ')
            }
            return Obj;
        })
        return newArr
    },
    flatStringSearch(array, pattern) {
        let regex = pattern.value;
        if (!this.isValidRegex(pattern.value)) {
            try {
                regex = this.stringToRegex(String(pattern.value))
            } catch (e) {
                console.log(pattern.value + " is not valid regex")
                return array
            }
        }
        for(let item of array) {
            if (item.hasOwnProperty('flatString')) {
                item.matches = ((item.flatString || '').match(regex) || []).length
            }
        }
        return array.filter(item => item.matches > 0).sort((a, b) => (a.matches > b.matches) ? 1 : -1)
    },
    isValidRegex(s) {
        try {
            const m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/);
            return m ? !!new RegExp(m[2],m[3])
                : false;
        } catch (e) {
            return false
        }
    },
    stringToRegex(s) {
        const m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/);
        return m ? new RegExp(m[2], "i") : new RegExp(s, "i");
     },

}