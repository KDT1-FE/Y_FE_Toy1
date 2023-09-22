import React, { useEffect, useState } from 'react';
import { getDataBySnapshot, getDataByTimestamp } from '../utils/util';
import WithComponent from '../components/wiki/With';

export interface Root {
  id: string;
}

const With = (): JSX.Element => {
  const [datas, setDatas] = useState<Root[]>([]);

  useEffect(() => {
    const unsubscribe = getDataBySnapshot('with-collection', setDatas);

    return () => {
      unsubscribe();
    };
  }, []);

  return <WithComponent data={datas} />;
};

export default With;
