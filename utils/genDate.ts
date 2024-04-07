import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function formatCreatedAt(createdAt: string): string {
    const createdAtDate = parseISO(createdAt);
    const now = new Date();

    if (isToday(createdAtDate)) {
        return formatDistanceToNow(createdAtDate, { addSuffix: true, locale: zhCN });
    } else if (isYesterday(createdAtDate)) {
        return '昨天';
    } else {
        return format(createdAtDate, 'yyyy-MM-dd', { locale: zhCN });
    }
}

