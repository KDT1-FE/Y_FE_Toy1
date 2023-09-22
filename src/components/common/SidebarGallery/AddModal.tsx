import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import MapComponent from '../../map';
import addImg from '../../../assets/add-image.png';
import closeIcon from '../../../assets/close-icon.png';
import { addImage, setGalleryData } from '../../../utils/util';

interface Props {
  src: string;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

const ModalWindow = styled.div`
  width: 1000px;
  height: 570px;
  background-color: var(--color-white);

  display: flex;
  border-radius: 20px;
  overflow: hidden;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseIcon = styled.img`
  width: 15px;
  height: 15px;

  position: absolute;
  top: 13px;
  right: 13px;
  cursor: pointer;
  z-index: 2;
`;

const ModalLeft = styled.div`
  width: 330px;
  height: 550px;
`;

const ImageLabel = styled.label<Props>`
  display: block;
  width: 100%;
  height: 210px;

  background: url(${props => {
      return props.src || addImg;
    }})
    center/cover;
  cursor: pointer;
`;

const InputFile = styled.input`
  display: none;
`;

const FormContainer = styled.form`
  width: 250px;
  height: 280px;
  margin: 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 240px;
`;

const InputTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  font-size: 15px;
`;

const TextField = styled.div`
  overflow: hidden;
  white-space: wrap;
  word-break: keep-all;
  line-height: 1.4;

  font-size: 16px;
  margin-top: 8px;
  padding-bottom: 3px;
  border-bottom: 1px solid #c1c1c1;
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 45px;
  margin-top: 30px;
  background-color: var(--color-primary);

  border: none;
  border-radius: 30px;
  box-shadow: 0 2px 4px #9c9c9c;

  outline: none;
  cursor: pointer;
`;

const ModalRight = styled.div`
  width: 700px;
  height: 900px;
`;

const AddModal = ({ onChange }: { onChange: () => void }) => {
  const [location, setLocation] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [imgFile, setImgFile] = useState<File>();
  const [isSubmitting, setIsSubMitting] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

  const previewImage = () => {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        swal({
          icon: 'error',
          title: '이미지 크기 제한 초과',
          text: '2MB 이하의 이미지를 업로드해주세요.',
        });
        return;
      }

      setImgFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPath(reader.result as string);
      };
    }
  };

  const handleAddress = (address: string) => {
    setLocation(address);
  };

  const handlePlace = (place: string) => {
    setRestaurant(place);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      swal('잠시만 기다려주세요!', '이미지 업로드 중입니다.', 'warning');
      return;
    }

    setIsSubMitting(true);

    const form = e.target as HTMLFormElement;
    if (imgFile) {
      const imageURL = await addImage(imgFile as File);

      await setGalleryData(`${form.category.value}`, {
        category: form.category.value,
        location,
        photo: imageURL,
        restaurant,
      });
    }

    setIsSubMitting(false);
    window.location.replace(`/gallery/${form.category.value}`);
  };

  return (
    <ModalBackground onClick={onChange}>
      <ModalWindow
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          src={closeIcon}
          onClick={onChange}
        />
        <ModalLeft>
          <ImageLabel src={imgPath}>
            <InputFile
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={previewImage}
              ref={imgRef}
            />
          </ImageLabel>
          <FormContainer onSubmit={handleSubmit}>
            <InputContainer>
              <InputTitle>맛집 종류</InputTitle>
              <SortContainer>
                <label htmlFor="korean">
                  <input
                    type="radio"
                    id="korean"
                    name="category"
                    value="korean"
                  />
                  한식
                </label>
                <label htmlFor="chinese">
                  <input
                    type="radio"
                    id="chinese"
                    name="category"
                    value="chinese"
                  />
                  중식
                </label>
                <label htmlFor="japanese">
                  <input
                    type="radio"
                    id="japanese"
                    name="category"
                    value="japanese"
                  />
                  일식
                </label>
                <label htmlFor="western">
                  <input
                    type="radio"
                    id="western"
                    name="category"
                    value="western"
                  />
                  양식
                </label>
              </SortContainer>
            </InputContainer>
            <InputContainer>
              <InputTitle>맛집 이름</InputTitle>
              <TextField>{restaurant}</TextField>
            </InputContainer>
            <InputContainer>
              <InputTitle>맛집 위치</InputTitle>
              <TextField>{location}</TextField>
            </InputContainer>
            <SubmitButton type="submit">맛집 등록</SubmitButton>
          </FormContainer>
        </ModalLeft>
        <ModalRight>
          <MapComponent
            onAddressSelect={handleAddress}
            onPlaceSelect={handlePlace}
          ></MapComponent>
        </ModalRight>
      </ModalWindow>
    </ModalBackground>
  );
};

export default AddModal;
