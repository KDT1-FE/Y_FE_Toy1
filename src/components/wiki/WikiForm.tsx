import * as Styled from "./WikiContentStyle";
import * as FormStyled from "./WikiFormStyle";

type WikiFormType = {
  title: string;
  content: string;
  authorName: string;
  updatedAt: string;
};

type WikiFormProps = {
  form: WikiFormType;

  onFormChange: (key: keyof WikiFormType, value: string) => void;
};

export const WikiForm = ({ form, onFormChange }: WikiFormProps) => {
  return (
    <>
      <Styled.ContentsTitle>
        <Styled.TitleText>
          <FormStyled.Input
            type="text"
            value={form.title}
            onChange={(e) => onFormChange("title", e.target.value)}
            placeholder="제목 입력"
          />
        </Styled.TitleText>
      </Styled.ContentsTitle>

      <FormStyled.Textarea
        value={form.content}
        onChange={(e) => onFormChange("content", e.target.value)}
        placeholder="내용 입력"
      />
    </>
  );
};
