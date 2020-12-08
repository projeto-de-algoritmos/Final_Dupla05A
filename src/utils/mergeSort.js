function mergeSort (unsortedArray) {

    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
    const middle = Math.floor(unsortedArray.length / 2);
  
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);
  
    return merge(
      mergeSort(left), mergeSort(right)
    );
  }
  
  function merge (left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
    
    const timestampLeft = new Date(left[leftIndex].flight_date).getTime();
    const timestampRight = new Date(right[rightIndex].flight_date).getTime();

      if (timestampLeft < timestampRight) {
        resultArray.push(left[leftIndex]);
        leftIndex++; 
      } else {
        resultArray.push(right[rightIndex]);
              rightIndex++;
      }
    }
  
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
  }

  export { mergeSort };
  export default mergeSort;