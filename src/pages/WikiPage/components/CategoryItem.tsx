import React,{useState} from 'react';
import { useRecoilState } from 'recoil';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { CategoryItemContainer } from '../../../styled/wiki/Item';
import { CategoryInput } from '../../../styled/wiki/Input';
import { categoryState, categoryNameState } from '../../../recoil/atoms/wiki/CategoryAtom';

interface CategoryProps {
  item: string;
}

export default function CategoryItem({ item }: CategoryProps) {
  const [editedItem, setEditedItem] = useState(item);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categoryNames, setCategoryNames] = useRecoilState(categoryNameState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEditedItem(newValue);
    setCategory((prevCategory) => ({
      ...prevCategory,
      item: editedItem,
    }));

    const updatedCategoryNames = categoryNames.map((name) =>
      name === item ? newValue : name
    );
    setCategoryNames(updatedCategoryNames);
  };

  return (
    <CategoryItemContainer>
      <FolderOpenOutlinedIcon color='action' />
      <CategoryInput
        type='text'
        value={editedItem}
        onChange={handleInputChange}
        readOnly={category.isReadOnly} // readOnly 속성을 동적으로 설정
      />

    </CategoryItemContainer>
  );
}
