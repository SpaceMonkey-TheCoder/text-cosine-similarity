/**
 * Tokenizing a string by a whitespace separator
 * @param {String} str 
 * @returns 
 */
function text2vec (str) {
    const vector = {};
    str = str.toLowerCase().split(' ');
    str.forEach(word => {
      vector[word] = vector[word] ? vector[word] + 1 : 1;
    });
    return vector;
  }

/**
 * Computes A ^ B as if A and B are set
 * @param {Object} vectorA 
 * @param {Object} vectorB 
 * @returns 
 */
function intersection (vectorA, vectorB) {
    const keysA = Object.keys(vectorA);
    const commons = keysA.filter(eachKey => {
      return !!vectorB[eachKey];
    });
    return commons;
  }

/**
 * Computes the cosine similarity score
 * cos(theta) = (AB)/(||A||*||B||)
 * @param {Object} vectorA 
 * @param {Object} vectorB 
 * @param {Array} commons 
 * @returns 
 */
function cosineSimilarity (vectorA, vectorB, commons) {
    let nominator = 0;
    commons.forEach(c => {
      nominator += vectorA[c] * vectorB[c];
    });
    let scalarA = 0;
    let scalarB = 0;
  
    Object.keys(vectorA).forEach(word => {
      scalarA += Math.pow(vectorA[word], 2);
    });
  
    Object.keys(vectorB).forEach(word => {
      scalarB += Math.pow(vectorB[word], 2);
    });
  
    const denom = Math.sqrt(scalarA) * Math.sqrt(scalarB);
    const similarity = nominator / denom;
    return similarity;
  }
  
module.exports = (textA, textB) => {
    const vecA = text2vec(textA);
    const vecB = text2vec(textB);
  
    const commons = intersection(vecA, vecB);
  
    return cosineSimilarity(vecA, vecB, commons);
  };
  