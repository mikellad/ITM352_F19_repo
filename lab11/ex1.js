 attributes = 'Mikella ; 21 ; 21.5 ; -20.5';
 theSeparator = ';';
 parts = attributes.split(theSeparator);

parts = ['Mikella', 21 , 21.5 , -20.5]; 

for(1 = 0; i < parts.length; i++) {
    console.log(typeof parts[i]);
}

console.log(parts.join(theSeporator));
        
function isNotNetInt(q) {
    console.log('hey');
}
isNotNetInt();
