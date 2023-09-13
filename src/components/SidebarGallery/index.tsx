import React from 'react';
import { useState } from 'react';
import { ChannelSidebar, Channel, SubChannel } from './style';

const SidebarGallery: React.FC = () => {
    return (
        <ChannelSidebar>
            <Channel># 모든 수강생</Channel>
            <SubChannel>&gt; 프로필</SubChannel>
            <Channel># 래퍼런스 공유</Channel>
            <SubChannel>&gt; 취업</SubChannel>
            <SubChannel>&gt; 테크</SubChannel>
        </ChannelSidebar>
    );
};

export default SidebarGallery;

// getFirestore: Firebase Firestore 데이터베이스 인스턴스를 가져오는 함수. 데이터베이스를 사용하여 문서와 컬렉션을 관리할 수 있음.
// collection: Firestore 데이터베이스 내에서 컬렉션을 참조하는데 사용. 컬렉션은 문서들의 그룹.
// addDoc: Firestore 컬렉션에 새로운 문서를 추가하는 함수. 이 함수는 컬렉션에 새 문서를 생성하고 해당 문서의 고유한 ID를 반환.
// getDocs: Firestore 컬렉션 내의 모든 문서를 가져오는 함수. 컬렉션 내의 모든 문서를 배열로 반환.
// deleteDoc: Firestore에서 문서를 삭제하는 함수. 문서를 삭제할 때 해당 문서의 참조를 전달하여 삭제.
// doc: Firestore 문서를 참조하는데 사용. 컬렉션 내의 특정 문서를 가리키는 데 사용합니다. 문서의 경로를 지정하여 참조.
// setDoc: Firestore 문서를 생성하거나 업데이트하는 함수. 지정된 문서를 만들거나, 이미 존재하는 문서를 업데이트할 때 사용됩니다. 문서의 데이터와 옵션을 설정할 수 있음.

// getStorage: Firebase Storage 인스턴스를 가져오는 함수. 이를 사용하여 Firebase Storage 서비스와 상호작용할 수 있음.
// ref: Firebase Storage 내의 파일 또는 디렉토리를 참조하는데 사용. 파일 또는 디렉토리의 경로를 전달하여 참조 객체를 생성.
// uploadBytes: 로컬 파일 또는 데이터를 Firebase Storage에 업로드하는 함수. Storage 참조와 업로드할 데이터를 전달하여 파일을 업로드.
// getDownloadURL: Firebase Storage 내의 파일의 다운로드 URL을 가져오는 함수. 업로드된 파일에 대한 고유한 URL을 반환하여 해당 파일을 웹 페이지에 표시하거나 공유하는 데 사용.
// deleteObject: Firebase Storage 내의 파일 또는 객체를 삭제하는 함수. Storage 참조를 전달하여 해당 파일을 삭제.

// https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/blob/KDT0_ParkSungHoo/public/components/imprisonRelease.js
// https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/blob/KDT0_ParkSungHoo/public/components/prisonerDetailModal.js
