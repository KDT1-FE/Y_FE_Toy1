import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

function usedateFormat(date: Date) {
  const d = new Date(date);
  const now = Date.now();

  const diff = (now - d.getTime()) / 1000;
  if (diff < 60 * 1) {
    return '방금 전';
  }

  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일때 시간차이 출력
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP EEE p', { locale: ko });
}

export default usedateFormat;
