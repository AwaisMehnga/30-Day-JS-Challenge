'use strict';

const TypeUtils = {
    // 1. Basic Wrapper around typeof (safe version)
    isString: function(value) {
        return typeof value === 'string'
    },

    isNumber: function(value) {
            return typeof value === 'number'
    },

    // 2. Fix the Null bug
    isNull: function(value) {
        return value === null
    },

    isUndefined: function(value) {
        return typeof value === 'undefined'
    },

    // 3. Complex Structures
    isArray: function(value) {
        return Array.isArray(value)
    },

    isObject: function(value) {
        return typeof value === 'object' && !Array.isArray(value) && (value !== null)
    },

    // 4. Robust Number Check
    isRealNumber: function(value) {
        return typeof value === 'number' && !isNaN(value) && Number.isFinite(value) 
    },

    // 5. The "Empty" Check
    isEmpty: function(value) {
        // TODO: Return true if value is null/undefined
        if(this.isUndefined(value) || this.isNull(value)) return true
        // TODO: Return true if array length is 0
        if(this.isArray(value) && value.length === 0 ) return true
        // TODO: Return true if object has no keys
        if(this.isObject(value) && Object.keys(value).length===0) return true
        // TODO: Return true if string length is 0
        if(this.isString(value) && value.length===0) return true

        return false
       
    }
};
