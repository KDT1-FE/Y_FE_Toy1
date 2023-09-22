import React, { useState } from 'react';
import { getDataByField } from '../utils/util';

type Root = {
  id: string;
};

const fetchData = async (category: string, callback: (props: any) => void) => {
  const dbName = `data-collection/best-restaurant-collection/${category}-food`;
  const data = await getDataByField(dbName, 'category', category);
  callback(data);
};

const getGalleryData = (props: string) => {
  const [result, setList] = useState<Root[]>([]);
  fetchData(props, setList);
  return result;
};

export default getGalleryData;
