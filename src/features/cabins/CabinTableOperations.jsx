import React from 'react';
import Filter from '../../ui/Filter';

export default function CabinTableOperations() {
  return (
    <Filter
      options={[
        { lable: 'All', value: 'all' },
        { lable: 'No discount', value: 'no-discount' },
        { lable: 'With discount', value: 'with-discount' },
      ]}
    ></Filter>
  );
}
