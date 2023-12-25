import { FC } from 'react';

import { useAppSelector } from 'hooks/redux';

import { Empty } from 'components/common/empty';

import { Item } from './item';

export const Posts: FC = () => {

   const { posts } = useAppSelector(state => state.personSlice);

   return (
      <div>
         { !posts.length && <Empty title="There are no posts" image="write.png"/> }

         { posts.length > 0 &&
            <>
               { posts.map(elem => <Item data={ elem } key={ elem.id } />) }
            </>
         }
      </div>
   );
};
