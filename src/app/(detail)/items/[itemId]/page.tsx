import React from 'react';

const Items = ({params: {itemId}}: {params: {itemId: string}}) => {
  console.log(itemId)
  return (
    <div>
      {itemId}
    </div>
  );
};

export default Items;
