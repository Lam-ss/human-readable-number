module.exports = function toReadable (number) {
    let string = number.toString(), units, tens, scales, start, end, str, strLen, chunk, ints, i, word, words;

    string = string.replace(/[, ]/g,"");

    if( parseInt( string ) === 0 ) {
        return 'zero';
    }
    
    units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
    
    tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
    
    scales = [ '', 'thousand', 'million', ];
    
    start = string.length;
    str = [];
    while( start > 0 ) {
        end = start;
        str.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
    }
    
    strLen = str.length;
    if( strLen > scales.length ) {
        return '';
    }
    
    words = [];
    for( i = 0; i < strLen; i++ ) {
        
        chunk = parseInt( str[i] );
        
        if( chunk ) {
            
            ints = str[i].split( '' )
            ints = ints.reverse()
            ints = ints.map( parseFloat );
        
            if( ints[1] === 1 ) {
                ints[0] += 10;
            }
            
            if( ( word = scales[i] ) ) {
                words.push( word );
            }
            
            if( ( word = units[ ints[0] ] ) ) {
                words.push( word );
            }
            
            if( ( word = tens[ ints[1] ] ) ) {
                words.push( word );
            }
            
            if( ( word = units[ ints[2] ] ) ) {
                words.push( word + ' hundred' );
            }
            
        }
        
    }
    
    return words.reverse().join( ' ' );
}
