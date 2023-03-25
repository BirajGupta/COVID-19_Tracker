
import React from 'react';
import {Dna} from 'react-loader-spinner'

const DNASpinner = () => {
    return <Dna
    visible={true}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{
      position:"absolute",
      top:"50%",
      left:"50%",
      transform : "translate(-50%, -50%)"
    }}
    wrapperClass="dna-wrapper"
    zIndex={999}
  />
}

export default DNASpinner