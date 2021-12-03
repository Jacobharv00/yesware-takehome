// DOM Elements & EventListeners
const btn = document.getElementById( 'btn' )
btn.addEventListener( 'click', loadText )
const li1 = document.getElementById( 'li1' )
const li2 = document.getElementById( 'li2' )
const li3 = document.getElementById( 'li3' )
const li4 = document.getElementById( 'li4' )
const li5 = document.getElementById( 'li5' )
const li6 = document.getElementById( 'li6' )
const li7 = document.getElementById( 'li7' )


// Load initial data
function loadText () {
  fetch( 'data.txt' )
    .then( response => response.text() )
    .then( data => storedData( data.replace( /[^a-zA-Z0-9\s!?]+/g, '' ) ) )
    .catch( err => alert( err ) )
}

// Global Variable
let namesArr = []

// Store Names in organized array
function storedData ( data ) {
  const even = ( ele, index ) => index % 2 === 0
  const lines = data.split( '\n' ).filter( even )
  lines.forEach( ( element ) => {
    const firstName = element.split( ' ' )[ 1 ]
    let lastNameTemp = element.split( ' ' )[ 0 ]
    let lastName = lastNameTemp.substring( 0, lastNameTemp.length - 1 )
    namesArr.push( firstName + ' ' + lastName )
  } )
  namesArr.pop()
  uniqueCountFullNames( namesArr )
  uniqueCountLastNames( namesArr )
  uniqueCountFirstNames( namesArr )
  tenMostCommonLastNames( namesArr )
  tenMostCommonFirstNames( namesArr )
  return namesArr
}

// 1. The unique count of full names
const uniqueCountFullNames = ( namesArr ) => {
  uniqueNames = new Set( namesArr )
  li1.innerText = `The unique count for full names is: ${uniqueNames.size}`
  return uniqueNames.size
}

// 2. The unique count of last names
const uniqueCountLastNames = ( namesArr ) => {
  const lastNames = new Set()
  namesArr.map( name => {
    let lastNameElements = name.split( ' ' )[ 1 ]
    lastNames.add( lastNameElements )
  } )
  li2.innerText = `The unique count for last names is: ${lastNames.size}`
  return lastNames.size
}

// 3. The unique count of first names
const uniqueCountFirstNames = ( namesArr ) => {
  const firstNames = new Set()
  namesArr.map( name => {
    let firstNameElements = name.split( ' ' )[ 0 ]
    firstNames.add( firstNameElements )
  } )
  li3.innerText = `The unique count for first names is: ${firstNames.size}`
  return firstNames.size
}

// 4. The ten most common last names (the names and number of occurrences)
const tenMostCommonLastNames = ( namesArr ) => {
  //const commonLastNames = new Set()
  const commonLastNames = []
  let lastNamesObj = {}
  namesArr.map( name => {
    let lastNameElements = name.split( ' ' )[ 1 ]
    commonLastNames.push( lastNameElements )
  } )

  // check/increment count 
  commonLastNames.forEach( name => {
    !lastNamesObj[ name ] ? lastNamesObj[ name ] = 1 : lastNamesObj[ name ]++
  } )

  const lastNameList = []
  let topTen

  for ( const lastName in lastNamesObj ) {
    lastNameList.push( [ lastName, lastNamesObj[ lastName ] ] )
  }
  // sort by number value
  lastNameList.sort( ( a, b ) => a[ 1 ] - b[ 1 ] )

  lastNameList.length < 10
    ? topTen = lastNameList
    : topTen = lastNameList.splice( -10 )

  li4.innerText = `The ten most common last names are: ${topTen.toString().replace( /,(?=[^\s])/g, ", " )}`
  return topTen.toString()
}

// 5. The ten most common first names (the names and number of occurrences)
const tenMostCommonFirstNames = ( namesArr ) => {
  const commonFirstNames = []
  let firstNamesObj = {}
  namesArr.map( name => {
    let firstNameElements = name.split( ' ' )[ 0 ]
    commonFirstNames.push( firstNameElements )
  } )

  // check/increment count 
  commonFirstNames.forEach( name => {
    !firstNamesObj[ name ] ? firstNamesObj[ name ] = 1 : firstNamesObj[ name ]++
  } )

  const firstNameList = []
  let topTen

  for ( const firstName in firstNamesObj ) {
    firstNameList.push( [ firstName, firstNamesObj[ firstName ] ] )
  }
  // sort by number value
  firstNameList.sort( ( a, b ) => a[ 1 ] - b[ 1 ] )

  firstNameList.length < 10
    ? topTen = firstNameList
    : topTen = firstNameList.splice( -10 )

  li5.innerText = `The ten most common first names are: ${topTen.toString().replace( /,(?=[^\s])/g, ", " )}`
  return topTen.toString()
}


// 6. A list of 25 specially unique names( see below for details)

// 7. A list of 25 modified names( see below for details)




