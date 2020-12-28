import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ title }) {
   const titleText = title ? `${title} • ECOMz ` : 'ECOMz';
   return (
      <div>
         <Helmet>
            <title>{titleText}</title>
         </Helmet>
      </div>
   );
}
