export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  export const recupFirstCapitalLetter = (nom) => {
 
  const initiales = nom.match(/\b\w/g).join('').toUpperCase();
  return initiales;
 
    
  }

  