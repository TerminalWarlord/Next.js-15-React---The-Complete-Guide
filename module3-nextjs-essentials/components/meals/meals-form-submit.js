// 'use client';
// import { useFormStatus } from 'react-dom';


// const MealsFormSubmit = () => {
//   const { pending } = useFormStatus();
//   console.log(pending);
//   return (
//     <button disabled={pending}>
//       {pending ? 'Submitting' : 'Share Meal'}
//     </button>
//   )
// }

// export default MealsFormSubmit

'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}