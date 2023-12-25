import { FC } from 'react';

import s from './style.module.scss';

export const Intro: FC = () => (
   <div className={ s.wrapper }>
      <p className={ s.title }>Hello,</p>
      <div className={ s.logo }>
         <div className={ s.logoIcon } />
         <p className={ s.logoText }><br/>Buzz</p>
      </div>
   </div>
);
