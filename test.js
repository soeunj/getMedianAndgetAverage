/*
 * Our application servers receive approximately 20 000
 * http requests  per second. Response timeout is 19000ms.
 * Implement a statistics collector that calculates the
 * median and average request response times for a 7 day
 * dataset.
 *
 * Assigment:
 * 1. Implement StatsCollector
 * 2. Write tests (below StatsCollector)
 */

const assert = require('assert');

class StatsCollector {
  constructor( /*void*/ ) {
    this.responseTimes = [];
  }

  pushValue(responseTimeMs /*number*/ ) /*void*/ {
    this.responseTimes.push(responseTimeMs);
  }

  getMedian(inputArray) /*number*/ {
    if (typeof inputArray == undefined) {
      return "Input array is undefined! Cannot calculate median."
    }
    if (inputArray.length == 0) {
      return 0;
    }
    let inputArrayLength = inputArray.length;
    for (let i = 0; i < inputArrayLength; i++) {
      // response timeout is 19000
      // so data value has to be less than 19000 
      if (inputArray[i] < 19000) {
        this.pushValue(inputArray[i]);
      }
    }

    // sort array 'responseTimes'
    this.responseTimes.sort(function(a, b) {
      return a - b
    });
    var median = 0,
      responseTimesLength = this.responseTimes.length;
    // calcuate median
    if (responseTimesLength % 2 === 0) {
      // average of two middle numbers
      median = (this.responseTimes[responseTimesLength / 2 - 1] +
        this.responseTimes[responseTimesLength / 2]) / 2;
    } else {
      // middle number
      median = this.responseTimes[(responseTimesLength - 1) / 2];
    }

    return median;
  }

  getAverage(inputArray) /*number*/ {
    if (typeof inputArray == undefined) {
      return "Input array is undefined! Cannot calculate average."
    }
    if (inputArray.length == 0) {
      return 0;
    }
    let inputArrayLength = inputArray.length;
    for (let i = 0; i < inputArrayLength; i++) {
      // response timeout is 19000
      // so data value has to be less than 19000 
      if (inputArray[i] < 19000) {
        this.pushValue(inputArray[i]);
      }
    }

    // calculate average
    var sum = 0,
      responseTimesLength = this.responseTimes.length;
    for (let i = 0; i < responseTimesLength; i++) {
      sum += this.responseTimes[i];
    }

    return sum / responseTimesLength;
  }

}

describe('StatsCollector', function() {
  it('should return correct median value excluding input greater than or eqaul to timeout 19000', function() {
    // setup
    const statsCollector = new StatsCollector();
    const expectedResult = 7000;
    const inputArray = [19000,10000,1000,20000,7000,5000,8000,6000,19500,12000];
    // exercise
    const result = statsCollector.getMedian(inputArray);
    // verify
    assert.strictEqual(result, expectedResult);
  });
  it('should return correct average value excluding input greater than or eqaul to timeout 19000', function() {
    // setup
    const statsCollector = new StatsCollector();
    const expectedResult = 7000;
    const inputArray = [19000,10000,1000,20000,7000,5000,8000,6000,19500,12000];
    // exercise
    const result = statsCollector.getAverage(inputArray);
    // verify
    assert.strictEqual(result, expectedResult);
  });
  it('function getMedian should return correct error message if inputArray is empty', function() {
    // setup
    const statsCollector = new StatsCollector();
    const expectedResult = 0;
    const inputArray = [];
    // exercise
    const result = statsCollector.getMedian(inputArray);
    // verify
    assert.strictEqual(result, expectedResult);
  });
  it('function getAverage should return correct error message if inputArray is empty', function() {
    // setup
    const statsCollector = new StatsCollector();
    const expectedResult = 0;
    const inputArray = [];
    // exercise
    const result = statsCollector.getAverage(inputArray);
    // verify
    assert.strictEqual(result, expectedResult);
  });
});

