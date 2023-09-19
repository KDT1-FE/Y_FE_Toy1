import ListBox from '../../components/ListBox';
import '../../scss/projectList.scss';
const NoticeList = (): JSX.Element => {
  const handleWriteBtn = (): void => {
    location.href = '/notice/write';
  };

  return (
    <section className="section container">
      <article className="section__filter">
        <button className="section__project-delete-btn btn">삭제</button>
        <input className="section__project-search-input" type="text" />
        <button className="section__project-write-btn btn" onClick={handleWriteBtn}>
          글쓰기
        </button>
      </article>
      <article className="section__project-container">
        <ListBox />
      </article>
    </section>
  );
};

export default NoticeList;
